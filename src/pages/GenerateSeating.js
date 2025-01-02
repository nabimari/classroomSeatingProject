import React, { useState, useEffect, useContext } from "react";
import { getClassesByTeacherID } from "../services/classHandler";
import { getStudentsByClassID, getQuestionnaireResponses } from "../services/studentHandler";
import { saveGeneratedSeating, fetchExistingSeating } from "../services/seatingHandler";
import { ThemeContext } from "../App";
import ClassroomCSP from '../services/CSP';

const GenerateSeating = ({ teacherId }) => {
 const [classes, setClasses] = useState([]);
 const [students, setStudents] = useState([]);
 const [selectedClass, setSelectedClass] = useState("");
 const [attendance, setAttendance] = useState({});
 const [seatingMatrix, setSeatingMatrix] = useState([]);
 const [loading, setLoading] = useState(false);
 const { theme } = useContext(ThemeContext);
 const studentsArr = [
  { id: '1735725823787', name: 'Mia Taylor', score: 3.0, specialNeeds: false, avoid: ['1735725776681', '1735725809881'] },
  { id: '1735725776681', name: 'William Jones', score: 3.0, specialNeeds: false, avoid: ['1735725823787'] },
  { id: '1735725753960', name: 'Chloe Brown', score: 3.0, specialNeeds: true, avoid: [] },
  { id: '1735725809881', name: 'Liam Moore', score: 4.0, specialNeeds: false, avoid: ['1735725823787'] },
  { id: '1735725655309', name: 'Sarah Davis', score: 3.0, specialNeeds: false, avoid: [] },
  { id: '1735725798421', name: 'Isabella Martinez', score: 2.0, specialNeeds: true, avoid: ['1735725835760'] },
  { id: '1735725835760', name: 'Ethan White', score: 5.0, specialNeeds: false, avoid: [] },
  { id: '1735725904827', name: 'Sophia Johnson', score: 3.0, specialNeeds: false, avoid: [] },
  { id: '1735725704655', name: 'Michael Lee', score: 3.0, specialNeeds: false, avoid: [] },
  { id: '1735725881421', name: 'Olivia Garcia', score: 3.0, specialNeeds: true, avoid: ['1735725896293'] },
  { id: '1735725918059', name: 'Noah Martinez', score: 3.0, specialNeeds: false, avoid: ['1735725881421'] },
  { id: '1735725609177', name: 'John Smith', score: 4.0, specialNeeds: false, avoid: [] },
  { id: '1735725621980', name: 'Emily Johnson', score: 3.0, specialNeeds: false, avoid: [] },
  { id: '1735725764408', name: 'Benjamin Brown', score: 5.0, specialNeeds: false, avoid: [] },
  { id: '1735725686661', name: 'David Miller', score: 5.0, specialNeeds: false, avoid: [] },
  { id: '1735725940077', name: 'Ella Davis', score: 5.0, specialNeeds: false, avoid: [] },
  { id: '1735725855198', name: 'Ava Clark', score: 3.0, specialNeeds: true, avoid: ['1735725609177'] },
  { id: '1735725640085', name: 'Lily Martinez', score: 3.0, specialNeeds: true, avoid: [] },
  { id: '1735725896293', name: 'James Garcia', score: 5.0, specialNeeds: false, avoid: [] }
];

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
 behavior: responses["Behavioral and Social Traits"] === "Exemplary behavior" ? 1 :
 responses["Behavioral and Social Traits"] === "Positive influence" ? 2 :
 responses["Behavioral and Social Traits"] === "Neutral" ? 3 :
 responses["Behavioral and Social Traits"] === "Occasionally disruptive" ? 4 : 5,
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


 const generateSeatingArrangement = (students) => {
  return students.map(row => row.map(student => student ? student.name : null));

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

//  const scoredStudents = analyzeStudentScores(studentData);
 
const classroom = new ClassroomCSP(5, 8, studentsArr);
const seating = classroom.solve();
console.log("Seating Arrangement:", seating);
 const seatingMatrix = generateSeatingArrangement(seating);

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
  zIndex: 0,
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
 tableStyle: {
  width: "100%",
  borderCollapse: "separate", // Allows spacing
  borderSpacing: "10px 15px", // Horizontal and vertical spacing between tables
  marginTop: "20px",
  textAlign: "center",
  
},
headerCellStyle: {
  fontWeight: "bold",
  border: theme === "light" ?"5px solid white" :"5px solid black",
  padding: "15px",
  backgroundColor: theme === "light" ? "#000" : "#fff",
  color: theme === "light" ? "#fff" : "#000",
},
cellStyle: {
  textAlign: "center",
  padding: "15px",
  border: theme==="light" ?"5px solid white": "5px solid black" , // Default border for all sides
  borderRight: "none", // Handled conditionally in the render logic
  backgroundColor: theme === "light" ? "#7e93a2" : "#0d2b39",
  color: theme === "light" ? "#000" : "#f9f9f9",
  fontWeight: "bold",
  borderRadius: "0px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
},
emptyCellStyle: {
  backgroundColor: theme === "light" ? "#fff" : "#000",
  color: theme === "light" ? "#aaa" : "#777",
  fontStyle: "italic",
  fontWeight: "normal",
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
  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
    <thead>
      <tr>
        <th></th>
        {Array.from({ length: 4 }, (_, index) => (
          <th key={index} colSpan="2" style={Styles.headerCellStyle}>
            Table {index + 1}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
  {seatingMatrix.map((row, rowIndex) => (
    <tr key={rowIndex}>
      <td style={Styles.headerCellStyle}>Row {rowIndex + 1}</td>
      {row.map((studentName, colIndex) => {
        // Determine if this cell is at the start or end of a table group
        const isLeftBorder = colIndex % 2 === 0; // Start of a new group
        const isRightBorder = (colIndex + 1) % 2 === 0; // End of a group
        return (
          <td
            key={colIndex}
            style={{
              ...Styles.cellStyle,
              borderLeft: isLeftBorder ?theme === "light" ?"5px solid white" :"5px solid black" : "none",
              borderRight: isRightBorder ? theme === "light" ?"5px solid white" :"5px solid black" : "none",
            }}
          >
            {studentName || ""}
          </td>
        );
      })}
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