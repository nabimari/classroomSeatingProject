


export default class ClassroomCSP {
    constructor(rows, seatsPerRow, students) {
        this.rows = rows; // Number of rows in the classroom
        this.seatsPerRow = seatsPerRow; // Number of seats per row
        this.students = students; // List of student objects
        this.seating = Array.from({ length: rows }, () => Array(seatsPerRow).fill(null)); // Seating arrangement
    }

    resetSeating() {
        this.seating = Array.from({ length: this.rows }, () => Array(this.seatsPerRow).fill(null));
    }

    assignRows() {
        const specialNeedsStudents = this.students.filter(student => student.specialNeeds);
        const otherStudents = this.students.filter(student => !student.specialNeeds);

        const sortedStudents = [
            ...specialNeedsStudents.sort((a, b) => b.score - a.score),
            ...otherStudents.sort((a, b) => b.score - a.score),
        ];

        const unseatedStudents = [];
        for (let student of sortedStudents) {
            if (student.specialNeeds) {
                if (!this.placeStudentInRow(student, [0, 1])) {
                    unseatedStudents.push(student);
                }
            } else if (student.score >= 4.2) {
                if (!this.placeStudentInRow(student, [0])) unseatedStudents.push(student);
            } else if (student.score >= 3.4) {
                if (!this.placeStudentInRow(student, [1])) unseatedStudents.push(student);
            } else if (student.score >= 2.6) {
                if (!this.placeStudentInRow(student, [2])) unseatedStudents.push(student);
            } else if (student.score >= 1.8) {
                if (!this.placeStudentInRow(student, [3])) unseatedStudents.push(student);
            } else {
                if (!this.placeStudentInRow(student, [4])) unseatedStudents.push(student);
            }
        }

        for (let student of unseatedStudents) {
            if (!this.placeStudentAnywhere(student)) {
                console.warn(`Could not seat student with ID ${student.id}`);
            }
        }
    }

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

    isValidPlacement(student, row, seat) {
        const directions = [
            [0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1],
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
                if (student.avoid.includes(neighbor.id) || neighbor.avoid.includes(student.id)) {
                    return false;
                }
            }
        }
        return true;
    }

    fillGaps() {
        const specialNeeds = [];
        const others = [];

        for (let row = 0; row < this.rows; row++) {
            for (let seat = 0; seat < this.seatsPerRow; seat++) {
                if (this.seating[row][seat]) {
                    const student = this.seating[row][seat];
                    if (student.specialNeeds) {
                        specialNeeds.push(student);
                    } else {
                        others.push(student);
                    }
                    this.seating[row][seat] = null;
                }
            }
        }

        specialNeeds.sort((a, b) => b.score - a.score);
        others.sort((a, b) => b.score - a.score);

        for (let student of specialNeeds) {
            this.placeStudentInRow(student, [0, 1]);
        }

        for (let student of others) {
            this.placeStudentAnywhere(student);
        }
    }

    solve() {
        this.resetSeating();
        this.assignRows();
        this.fillGaps();
        return this.seating;
    }
}

// Example usage
const students = [
    { id: 1, score: 4.5, specialNeeds: true, avoid: [2, 3] },
    { id: 2, score: 3.9, specialNeeds: false, avoid: [1] },
    { id: 3, score: 4.8, specialNeeds: true, avoid: [] },
    { id: 4, score: 2.5, specialNeeds: false, avoid: [] },
    { id: 5, score: 1.5, specialNeeds: false, avoid: [] },
    { id: 6, score: 3.2, specialNeeds: false, avoid: [] },
    { id: 7, score: 4.1, specialNeeds: false, avoid: [] },
    { id: 8, score: 2.7, specialNeeds: false, avoid: [] },
    { id: 9, score: 2.0, specialNeeds: false, avoid: [] },
    { id: 10, score: 3.0, specialNeeds: false, avoid: [] },
    { id: 11, score: 3.6, specialNeeds: true, avoid: [] },
];

const classroom = new ClassroomCSP(5, 8, students);
const seating = classroom.solve();
console.log("Seating Arrangement:", seating);
