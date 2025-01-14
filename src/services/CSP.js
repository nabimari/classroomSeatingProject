
export default class ClassroomCSP {
    constructor(rows, seatsPerRow, students) {
        this.rows = rows;
        this.seatsPerRow = seatsPerRow;
        this.students = students;
        this.noResponsesStudents = [];
        this.seating = Array.from({ length: rows }, () => Array(seatsPerRow).fill(null));
    }

    // Reset the seating matrix
    resetSeating() {
        this.seating = Array.from({ length: this.rows }, () => Array(this.seatsPerRow).fill(null));
    }

    static async callGPT4Turbo(prompt,feedback="") {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4-turbo',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant for analyzing teacher notes.' },
                        {
                            role: 'user',
                            content: `
                                Analyze the following note:
                                "${prompt}".
                                Output only the numeric values for:
                                Behavioral Score, Academic Support Score, Seating Adjustment.

                                Use this format:
                                <Behavioral Score>, <Academic Support Score>, <Requires Assistance>
                              `
                        }
                    ],
                    max_tokens: 100,
                    temperature: 0.7,
                }),
            });
    
            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Error ${response.status}: ${errorDetails.error.message}`);
            }
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error(`Error: ${error.message}`);
            return {
                behavioralScore: 3, // Neutral as default
                academicSupportScore: 0, // No support as default
                requiresAssistance: 0, // No preference as default
            };
        }
    }
    
    splitByResponses() { // No parameter needed since we're using this.students
     const withResponses = this.students.filter(obj => obj.responses);
      this.noResponsesStudents = this.students.filter(obj => !obj.responses); 
      this.students = withResponses; } // Update the original students array 


    async preprocessStudents() {
        for (let student of this.students) {
            // Map academic level responses to scores
            const academicLevelScore = {
                "Exceptional": 5,
                "Above average": 4,
                "Average": 3,
                "Below average": 2,
                "Needs significant support": 1,
            }[student.responses?.academicLevel || "Average"];
    
            // Map behavior responses to scores
            const behaviorScore = {
                "Exemplary behavior": 1,
                "Positive influence": 2,
                "Neutral": 3,
                "Occasionally disruptive": 4,
                "Disruptive": 5,
            }[student.responses?.behavior || "Neutral"];
    
            // Map assistance field
            const assistanceScore = student.responses["Academic Performance"]["Requires assistance?"] ? 2 : 0;
    
            
            const gptResponse = student.responses?.["Additional Insights"]?.["Other notes"] 
            ? await ClassroomCSP.callGPT4Turbo(student.responses["Additional Insights"]["Other notes"]) 
            : "3, 0, 0";
            // Parse GPT response into scores
            const [behavioralAdjustment, academicSupportAdjustment, requiresAssistance] = gptResponse.split(",").map(str => (!isNaN(str) && str.trim() !== '' ? Number(str) : 0)).concat([0, 0, 0]) // Ensure there are at least 3 elements
            .slice(0, 3); // Keep only the first 3 elements
    
            // Calculate the total priority score
            student.priorityScore =
                -academicLevelScore +
                behaviorScore +
                assistanceScore +
                behavioralAdjustment 
                -academicSupportAdjustment +
                requiresAssistance;
    
            // Store parsed notes for reference
            student.parsedNotes = {
                behavioralAdjustment,
                academicSupportAdjustment,
                requiresAssistance,
            };
        }
    
        // Sort students based on their priority score
        this.students.sort((a, b) => b.priorityScore - a.priorityScore);
    }
    
    async RegenerateSeating(studentMatrix, previousFeedback = "") {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: ` You are a classroom seating arrangement assistant. Your task is to optimize student seating based on academic performance, special needs, and interpersonal dynamics. Return only a 5x8 matrix of student names in the optimal arrangement.`
                        },
                        {
                            role: 'user',
                            content: `
                                Given this 5x8 classroom layout, create an optimal seating arrangement based on these student details:
                                ${JSON.stringify(this.seating)}
                                
                                Consider these factors for each student:
                                1. Academic Performance: Higher performing students should be distributed to enable peer support
                                2. Special Needs: Ensure appropriate accommodations (front seats for visual/auditory needs)
                                3. Student Interactions: Consider "avoid" preferences to prevent disruptive combinations
                                
                                Previous Feedback to incorporate:
                                ${previousFeedback}
                                *** Output only the Matrix ***
                                Return ONLY a 5x8 matrix of student names in this format:
                                [
                                    ["Name1", "Name2", ..., "Name8"],
                                    ["Name1", "Name2", ..., "Name8"],
                                    ["Name1", "Name2", ..., "Name8"],
                                    ["Name1", "Name2", ..., "Name8"],
                                    ["Name1", "Name2", ..., "Name8"]
                                ]
                                    **If you didnt place any student in a cell then write null
                                    don't add any introductions just give me the answer!!!!!!!
                            `
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7,
                }),
            });
    
            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(` Error ${response.status}: ${errorDetails.error.message}`);
            }
    
            const data = await response.json();
            return JSON.parse(data.choices[0].message.content);
    
        } catch (error) {
            console.error(` Error: ${error}`);
            return studentMatrix; // Return original arrangement if there's an error
        }
    }

    createNewSeatingArrangement(nameMatrix, originalSeating) {
        // Create a map of names to their original student objects
        const studentMap = new Map();
        
        // Populate the map with student objects from original seating
        originalSeating.forEach(row => {
            row.forEach(student => {
                if (student && student.name) {
                    studentMap.set(student.name, student);
                }
            });
        });
    
        // Create new seating arrangement based on the name matrix
        return nameMatrix.map(row => {
            return row.map(name => {
                if (!name || name === "null") return null;
                return studentMap.get(name) || null; // Return the original student object or null if not found
            });
        });
    }

    
    placeStudentsSequentially() {
        // Deep copy the noResponsesStudents array so we can remove from it
        let remainingStudents = [...this.noResponsesStudents];
        
        // Go through each row and column sequentially
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 8; col++) {
                // If we find an empty seat and we still have students
                if (this.seating[row][col] === null && remainingStudents.length > 0) {
                    // Pick a random student from remaining ones
                    const randomIndex = Math.floor(Math.random() * remainingStudents.length);
                    const randomStudent = remainingStudents[randomIndex];
                    
                    // Place them in the current empty seat
                    this.seating[row][col] = randomStudent;
                    
                    // Remove this student from the remaining pool
                    remainingStudents.splice(randomIndex, 1);
                }
            }
        }
    }

    // Assign students requiring special attention to the front rows
    // assignFrontRows() {
    //     for (let student of this.students) {
    //         if (student.specialNeeds) {
    //             this.placeStudentInRow(student, [0, 1]); // Front rows
    //         }
    //     }
    // }

    // Place a student in specific rows
    placeStudentInRow(student, rows) {
        for (let row of rows) {
            for (let seat = 0; seat < this.seatsPerRow; seat++) {
                if (this.seating[row][seat] === null && this.isValidPlacement(student, row, seat)) {
                    this.seating[row][seat] = student;
                    return true;
                }
            }
        }
        return false;
    }

    // Place student anywhere as a fallback
    placeStudentAnywhere(student) {
        for (let row = 0; row < this.rows; row++) {
            for (let seat = 0; seat < this.seatsPerRow; seat++) {
                if (this.seating[row][seat] === null && this.isValidPlacement(student, row, seat)) {
                    this.seating[row][seat] = student;
                    return true;
                }
            }
        }
        return false;
    }

    // Check if placement is valid based on constraints
    isValidPlacement(student, row, seat) {
        const directions = [
            [0, -1], [0, 1], [-1, 0], [1, 0],
            [-1, -1], [-1, 1], [1, -1], [1, 1],
        ];

        for (let [dx, dy] of directions) {
            const newRow = row + dx;
            const newSeat = seat + dy;

            if (
                newRow >= 0 &&
                newRow < this.rows &&
                newSeat >= 0 &&
                newSeat < this.seatsPerRow &&
                this.seating[newRow][newSeat]
            ) {
                const neighbor = this.seating[newRow][newSeat];
                if(student.responses["Behavioral and Social Traits"]["Students to avoid"] && neighbor.responses["Behavioral and Social Traits"]["Students to avoid"]){

                    if (student.responses["Behavioral and Social Traits"]["Students to avoid"].includes(neighbor.id) || neighbor.responses["Behavioral and Social Traits"]["Students to avoid"].includes(student.id)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // Distribute remaining students evenly
    distributeRemainingStudents() {
        for (let student of this.students) {
            if (!this.placeStudentAnywhere(student)) {
                console.warn(`Could not place student ${student.id}`);
            }
        }
    }
 //***************this Algo works but still placing the SN studentts not as prioretyScore******** */
    
    rearrangeSpecialNeeds() {
        // Step 1: Find all special needs students in back rows (2-4)
        const specialNeedsInBack = [];
        for (let row = 2; row < this.rows; row++) {
            for (let seat = 0; seat < this.seatsPerRow; seat++) {
                const student = this.seating[row][seat];
                if (student && student.specialNeeds === "Yes") {
                    specialNeedsInBack.push({
                        student,
                        row,
                        seat
                    });
                }
            }
        }
    
        if (specialNeedsInBack.length === 0) {
            console.log("No special needs students in back rows to move");
            return;
        }
    
        // Step 2: Find non-special needs students in front rows (0-1) by priority score
        const nonSpecialInFront = [];
        for (let row = 0; row <= 1; row++) {
            for (let seat = 0; seat < this.seatsPerRow; seat++) {
                const student = this.seating[row][seat];
                if (student && student.specialNeeds === "No") {
                    nonSpecialInFront.push({
                        student,
                        row,
                        seat,
                        priorityScore: student.priorityScore
                    });
                }
            }
        }
    
        // Sort non-special needs students by priority score (ascending, so lowest priority first)
        nonSpecialInFront.sort((a, b) => a.priorityScore - b.priorityScore);
    
        // Step 3: Perform the swaps
        for (const specialStudent of specialNeedsInBack) {
            if (nonSpecialInFront.length === 0) {
                console.warn("No more available spots in front rows for special needs students");
                break;
            }
    
            // Get the lowest priority non-special needs student from front
            const regularStudent = nonSpecialInFront.shift();
    
            // Perform the swap
            const tempStudent = this.seating[regularStudent.row][regularStudent.seat];
            this.seating[regularStudent.row][regularStudent.seat] = specialStudent.student;
            this.seating[specialStudent.row][specialStudent.seat] = tempStudent;
    
            console.log(`Swapped special needs student from row ${specialStudent.row} with regular student from row ${regularStudent.row}`);
        }
    
        // Step 4: Reorganize back rows (2-4) by priority score
        for (let row = 2; row < this.rows; row++) {
            // Collect all students in this row
            const studentsInRow = [];
            for (let seat = 0; seat < this.seatsPerRow; seat++) {
                const student = this.seating[row][seat];
                if (student) {
                    studentsInRow.push(student);
                    this.seating[row][seat] = null;
                }
            }
    
            // Sort by priority score
            studentsInRow.sort((a, b) => b.priorityScore - a.priorityScore);
    
            // Place them back in the row
            for (let i = 0; i < studentsInRow.length; i++) {
                this.seating[row][i] = studentsInRow[i];
            }
        }
    
        // Final validation
        let specialNeedsCount = 0;
        let totalStudents = 0;
        let specialNeedsInBackAfter = 0;
    
        for (let row = 0; row < this.rows; row++) {
            for (let seat = 0; seat < this.seatsPerRow; seat++) {
                const student = this.seating[row][seat];
                if (student) {
                    totalStudents++;
                    if (student.specialNeeds === "Yes") {
                        specialNeedsCount++;
                        if (row >= 2) {
                            specialNeedsInBackAfter++;
                        }
                    }
                }
            }
        }
    
        console.log(`Final arrangement:`);
        console.log(`- Total students: ${totalStudents}`);
        console.log(`- Special needs students: ${specialNeedsCount}`);
        console.log(`- Special needs students still in back: ${specialNeedsInBackAfter}`);
    }
    
    
    
    
    // Solve the seating arrangement
    async solve(feedback="") {
        this.resetSeating();
        this.splitByResponses();
        await this.preprocessStudents();
        // this.assignFrontRows();
        this.distributeRemainingStudents();
        this.rearrangeSpecialNeeds();
        this.placeStudentsSequentially();
        
        if(feedback!==""){
            const newSeatingString=await this.RegenerateSeating(this.seating,feedback);
            this.seating=this.createNewSeatingArrangement(newSeatingString,this.seating);
        }
        console.log(this.seating);
        return this.seating;
    }
}


