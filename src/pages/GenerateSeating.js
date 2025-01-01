import React, { useState, useEffect, useContext } from "react";
import { getClassesByTeacherID } from "../services/classHandler";
import { getStudentsByClassID, getQuestionnaireResponses } from "../services/studentHandler";
import { saveGeneratedSeating, fetchExistingSeating } from "../services/seatingHandler";
import { ThemeContext } from "../App";

const GenerateSeating = ({ teacherId }) => {
 const [classes, setClasses] = useState([]);
 const [students, setStudents] = useState([]);
 const [selectedClass, setSelectedClass] = useState("");
 const [attendance, setAttendance] = useState({});
 const [seatingMatrix, setSeatingMatrix] = useState([]);
 const [loading, setLoading] = useState(false);
 const { theme } = useContext(ThemeContext);

 // Fetch teacher-specific classes
 useEffect(() => {
 const fetchClasses = async () => {
 if (!teacherId) return;
 try {
 const classList = await getClassesByTeacherID(teacherId);
 setClasses(classList);
 } catch (err) {
 console.error("Error fetching classes:", err.message);
 }
 };
 fetchClasses();
 }, [teacherId]);

 // Fetch students and existing seating when a class is selected
 useEffect(() => {
 const fetchStudentsAndSeating = async () => {
 if (!selectedClass) {
 setStudents([]);
 setAttendance({});
 setSeatingMatrix([]);
 return;
 }
 try {
 const studentList = await getStudentsByClassID(selectedClass);
 const initialAttendance = {};
 studentList.forEach((student) => (initialAttendance[student.id] = true));
 setStudents(studentList);
 setAttendance(initialAttendance);

 const existingSeating = await fetchExistingSeating(teacherId, selectedClass);
 if (existingSeating && existingSeating.length > 0) {
 setSeatingMatrix(existingSeating);
 } else {
 setSeatingMatrix([]);
 }
 } catch (err) {
 console.error("Error fetching students and seating:", err.message);
 }
 };

 fetchStudentsAndSeating();
 }, [selectedClass, teacherId]);

 const handleAttendanceChange = (studentId) => {
 setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
 };

 const fetchStudentDataWithResponses = async (students) => {
 return Promise.all(
 students.map(async (student) => {
 try {
 const responses = await getQuestionnaireResponses(student.id);
 return { ...student, responses };
 } catch (error) {
 console.error(`Error fetching questionnaire for student ${student.id}:`, error.message);
 return { ...student, responses: null };
 }
 })
 );
 };

 //most important
 const analyzeStudentScores = (students) => {
 return students.map((student) => {
 const responses = student.responses || {};
 const scores = {
 academicPerformance: responses["Academic Performance"] === "Exceptional" ? 5 :
 responses["Academic Performance"] === "Above average" ? 4 :
 responses["Academic Performance"] === "Average" ? 3 :
 responses["Academic Performance"] === "Below average" ? 2 : 1,
 behavior: responses["Behavioral and Social Traits"] === "Exemplary behavior" ? 5 :
 responses["Behavioral and Social Traits"] === "Positive influence" ? 4 :
 responses["Behavioral and Social Traits"] === "Neutral" ? 3 :
 responses["Behavioral and Social Traits"] === "Occasionally disruptive" ? 2 : 1,
 specialNeeds: responses["Special Needs"] === "Yes" ? 5 : 1,
 };

 const totalWeight = scores.academicPerformance + scores.behavior + scores.specialNeeds;
 return { ...student, totalWeight };
 });
 };

 const prioritizeStudents = (students) => {
 // Filter and sort special needs students by totalWeight
 const specialNeeds = students
 .filter((s) => s.responses?.["Special Needs"] === "Yes")
 .sort((a, b) => b.totalWeight - a.totalWeight);

 // Filter and sort other students by totalWeight
 const others = students
 .filter((s) => s.responses?.["Special Needs"] !== "Yes")
 .sort((a, b) => b.totalWeight - a.totalWeight);

 // Combine the two groups
 return [...specialNeeds, ...others];
 };


 const generateSeatingArrangement = (students, rowSize = 8) => {
 const matrix = [];
 for (let i = 0; i < students.length; i += rowSize) {
 matrix.push(students.slice(i, i + rowSize).map((student) => student.name)); // Extract only names
 }

 // Log only the names in the matrix
 console.log("Generated Seating Matrix (Names Only):", JSON.stringify(matrix, null, 2));

 return matrix;
 };


 const handleGenerate = async () => {
 if (!selectedClass) {
 alert("Please select a class before generating the seating arrangement.");
 return;
 }

 setLoading(true);

 try {
 const presentStudents = students.filter((student) => attendance[student.id]);
 const studentData = await fetchStudentDataWithResponses(presentStudents);

 const scoredStudents = analyzeStudentScores(studentData);
 const prioritizedStudents = prioritizeStudents(scoredStudents);
 const seatingMatrix = generateSeatingArrangement(prioritizedStudents);

 setSeatingMatrix(seatingMatrix);

 await saveGeneratedSeating(teacherId, selectedClass, seatingMatrix);
 alert("Seating arrangement saved successfully!");


 } catch (error) {
 console.error("Error generating seating arrangement:", error.message);
 alert("Failed to generate seating arrangement. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 const Styles = {
 pageContainer: {
 display: "flex",
 flexDirection: "row",
 minHeight: "95vh",
 backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
 color: theme === "light" ? "#333" : "#f9f9f9",
 boxSizing: "border-box",
 flexWrap: "wrap",
 },
 sidebarSpacing: {
 width: "300px",
 flexShrink: 0,
 "@media (maxWidth: 768px)": {
 display: "none",
 },
 },
 mainContent: {
 flex: 1,
 padding: "20px",
 display: "flex",
 flexDirection: "column",
 gap: "20px",
 alignItems: "center",
 justifyContent: "flex-start",
 backgroundColor: theme === "light" ? "#ffffff" : "#1E1E1E",
 borderRadius: "12px",
 boxShadow: theme === "light"
 ? "0 4px 8px rgba(0, 0, 0, 0.1)"
 : "0 4px 8px rgba(0, 0, 0, 0.5)",
 "@media (maxWidth: 768px)": {
 padding: "10px",
 },
 },
 containerStyle: {
 padding: "20px",
 maxWidth: "800px",
 width: "100%",
 },
 headerStyle: {
 textAlign: "center",
 color: theme === "light" ? "#007bff" : "#90CAF9",
 fontSize: "28px",
 fontWeight: "bold",
 marginBottom: "20px",
 },
 cardContainerStyle: {
 display: "flex",
 gap: "15px",
 flexWrap: "wrap",
 justifyContent: "center",
 },
 classCardStyle: {
 padding: "15px",
 border: "1px solid",
 borderColor: theme === "light" ? "#ddd" : "#444",
 borderRadius: "8px",
 cursor: "pointer",
 width: "150px",
 textAlign: "center",
 backgroundColor: theme === "light" ? "#f9f9f9" : "#2C2C2C",
 color: theme === "light" ? "#333" : "#f9f9f9",
 transition: "background-color 0.3s ease, transform 0.2s ease",
 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
 },
 attendanceSectionStyle: {
 marginTop: "20px",
 width: "100%",
 },
 attendanceGridStyle: {
 display: "grid",
 gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
 gap: "10px",
 },
 attendanceItemStyle: {
 padding: "10px",
 border: "1px solid",
 borderColor: theme === "light" ? "#ccc" : "#444",
 borderRadius: "8px",
 backgroundColor: theme === "light" ? "#ffffff" : "#2C2C2C",
 color: theme === "light" ? "#333" : "#f9f9f9",
 },
 buttonContainerStyle: {
 textAlign: "center",
 marginTop: "20px",
 },
 buttonStyle: {
 padding: "10px 20px",
 backgroundColor: "#4CAF50",
 color: "#fff",
 border: "none",
 borderRadius: "8px",
 cursor: "pointer",
 fontSize: "16px",
 transition: "background-color 0.3s ease, transform 0.2s ease",
 },
 matrixContainerStyle: {
 marginTop: "20px",
 backgroundColor: theme === "light" ? "#ffffff" : "#1E1E1E",
 padding: "20px",
 borderRadius: "12px",
 boxShadow: theme === "light"
 ? "0 4px 8px rgba(0, 0, 0, 0.1)"
 : "0 4px 8px rgba(0, 0, 0, 0.3)",
 width: "120%",
 display: "flex",
 flexWrap: "wrap",
 gap: "15px",
 marginLeft: "-100px",
 justifyContent: "center",
 },
 seatStyle: {
 display: "flex",
 justifyContent: "center",
 alignItems: "center",
 padding: "10px",
 borderRadius: "20px",
 border: theme === "light" ? "1px solid #ddd" : "1px solid #555",
 backgroundColor: theme === "light" ? "#e3f2fd" : "#37474f",
 color: theme === "light" ? "#333" : "#f9f9f9",
 fontSize: "14px",
 fontWeight: "bold",
 textAlign: "center",
 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
 transition: "all 0.3s ease",
 cursor: "pointer",
 flex: "0 0 auto",
 minWidth: "80px",
 maxWidth: "150px",
 },
 };
 return (
 <div style={Styles.pageContainer}>
 <div style={Styles.sidebarSpacing}></div>
 <div style={Styles.mainContent}>
 <div style={Styles.containerStyle}>
 <div style={Styles.cardContainerStyle}>
 {classes.map((cls) => (
 <div
 key={cls.id}
 onClick={() => setSelectedClass(cls.id)}
 style={{
 ...Styles.classCardStyle,
 backgroundColor: selectedClass === cls.id ? "#007bff" : "#f9f9f9",
 color: selectedClass === cls.id ? "white" : "black",
 }}
 >
 {cls.name}
 </div>
 ))}
 </div>

 {students.length > 0 && (
 <div style={Styles.attendanceSectionStyle}>
 <h3>Mark Attendance</h3>
 <div style={Styles.attendanceGridStyle}>
 {students.map((student) => (
 <div key={student.id} style={Styles.attendanceItemStyle}>
 <label>
 <input
 type="checkbox"
 checked={attendance[student.id]}
 onChange={() => handleAttendanceChange(student.id)}
 />
 {student.name}
 </label>
 </div>
 ))}
 </div>
 </div>
 )}

 <div style={Styles.buttonContainerStyle}>
 <button onClick={handleGenerate} style={Styles.buttonStyle}>
 Generate Seating
 </button>
 </div>

 {loading ? (
 <p>Loading seating arrangement...</p>
) : seatingMatrix.length > 0 ? (
 
 <div style={Styles.matrixContainerStyle}>
  <h3 style={{ marginBottom: "20px" }}>Seating Arrangement</h3>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <tbody>
      {seatingMatrix.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((studentName, colIndex) => (
            <td
              key={colIndex}
              style={{
                textAlign: "center",
                padding: "10px",
                verticalAlign: "middle",
              }}
            >
              <div style={Styles.seatStyle}>{studentName}</div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>


) : (
 <p>No seating arrangement generated yet.</p>
)}

 </div>
 </div>
 </div>
 );
};

export default GenerateSeating;