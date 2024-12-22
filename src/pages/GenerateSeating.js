import React, { useState, useEffect,useContext } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ThemeContext } from "../App"; // Import ThemeContext

const GenerateSeating = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext); // Access theme

  // Fetch teacher-specific classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return;
      try {
        const classesQuery = query(
          collection(db, "Classes"),
          where("teacherId", "==", teacherId)
        );
        const snapshot = await getDocs(classesQuery);
        const classList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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
        const studentsQuery = query(
          collection(db, "Students"),
          where("classId", "==", selectedClass)
        );
        const snapshot = await getDocs(studentsQuery);
        const studentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const initialAttendance = {};
        studentList.forEach((student) => (initialAttendance[student.id] = true));

        setStudents(studentList);
        setAttendance(initialAttendance);

        // Fetch existing seating for the current class
        const seatingDocRef = doc(
          db,
          "GeneratedSeating",
          teacherId,
          "Classes",
          selectedClass
        );
        const seatingDoc = await getDoc(seatingDocRef);

        if (seatingDoc.exists() && seatingDoc.data().generatedSeatings.length) {
          const latestSeating =
            seatingDoc.data().generatedSeatings.slice(-1)[0].seatingMatrix;

          // Reconstruct seating matrix
          const reconstructedMatrix = reconstructMatrix(latestSeating);
          setSeatingMatrix(reconstructedMatrix);
        } else {
          setSeatingMatrix([]);
          console.log("No previous seating arrangement found.");
        }
      } catch (err) {
        console.error("Error fetching students and seating:", err.message);
      }
    };
    fetchStudentsAndSeating();
  }, [selectedClass, teacherId]);

  // Helper function to reconstruct matrix from flattened data
  const reconstructMatrix = (flattenedMatrix) => {
    const matrix = [];
    flattenedMatrix.forEach((seat) => {
      const { row, studentName } = seat;

      if (!matrix[row - 1]) matrix[row - 1] = []; // Ensure row exists
      matrix[row - 1].push(studentName);
    });
    return matrix;
  };

  // Handle attendance toggle
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  // Generate seating matrix
  const handleGenerate = async () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );

    if (presentStudents.length === 0) {
      alert("No students are marked as present.");
      setLoading(false);
      return;
    }

    const matrix = [];
    for (let i = 0; i < presentStudents.length; i += 8) {
      const row = presentStudents
        .slice(i, i + 8)
        .map((student) => student.name);
      matrix.push(row);
    }

    setSeatingMatrix(matrix);
    setLoading(false);

    // Save the generated seating
    await saveSeatingToDB(matrix);
  };

  // Save seating arrangement into Firestore
  const saveSeatingToDB = async (matrix) => {
    if (!teacherId || !selectedClass) return;

    try {
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0];
      const time = currentDate.toTimeString().split(" ")[0];

      const flattenedMatrix = matrix.flatMap((row, rowIndex) =>
        row.map((student, colIndex) => ({
          row: rowIndex + 1,
          seat: colIndex + 1,
          studentName: student,
        }))
      );

      const seatingDocRef = doc(
        db,
        "GeneratedSeating",
        teacherId,
        "Classes",
        selectedClass
      );

      const seatingDoc = await getDoc(seatingDocRef);
      const existingSeating = seatingDoc.exists()
        ? seatingDoc.data().generatedSeatings || []
        : [];

      const updatedSeating = [
        ...existingSeating,
        { date, time, seatingMatrix: flattenedMatrix },
      ];

      await setDoc(
        seatingDocRef,
        { generatedSeatings: updatedSeating },
        { merge: true }
      );

      alert("Seating arrangement saved successfully!");
    } catch (error) {
      console.error("Error saving seating arrangement:", error);
      alert("Failed to save seating arrangement. Please try again.");
    }
  };


  const Styles = {
    pageContainer: {
      display: "flex",
      flexDirection: "row",
      minHeight: "100vh",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
      color: theme === "light" ? "#333" : "#f9f9f9",
      boxSizing: "border-box",
    },
    sidebarSpacing: {
      width: "300px", // Matches the sidebar width
      flexShrink: 0,
    },
    mainContent: {
      flex: 1,
      padding: "40px",
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
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
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
      width: "100%",
      display: "flex", // Ensures all items are in a row
      flexWrap: "wrap", // Allows wrapping to the next line if needed
      gap: "15px", // Add spacing between items
      justifyContent: "flex-start", // Align items to the start of the row
    },
    ixStyle: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
      gap: "10px",
    },
    seatStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      borderRadius: "10px",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #555",
      backgroundColor: theme === "light" ? "#e3f2fd" : "#37474f",
      color: theme === "light" ? "#333" : "#f9f9f9",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      flex: "0 0 auto", // Ensures consistent size and prevents shrinking
      minWidth: "80px", // Adjust to ensure consistent spacing
      maxWidth: "150px", // Optional: prevent seats from being too large
    },


  };






  return (
    <div style={Styles.pageContainer}>
      <div style={Styles.sidebarSpacing}></div> {/* Sidebar spacing for alignment */}
      <div style={Styles.mainContent}>
        <div style={Styles.containerStyle}>
          <h2 style={Styles.headerStyle}>Generate Seating Arrangement</h2>

          {/* Class Selection */}
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

          {/* Attendance Section */}
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
              <h3>Seating Arrangement</h3>
              <table style={Styles.matrixStyle}>
                <tbody>
                  {seatingMatrix.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {row.map((student, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        style={Styles.seatStyle}
                      >
                        {student}
                      </div>
                      ))}
                    </div>
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