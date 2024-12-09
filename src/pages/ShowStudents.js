/*
import React, { useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure the path to your firebase.js file is correct
import { useNavigate } from "react-router-dom";

const ShowStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFetchButton, setShowFetchButton] = useState(true);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Students"));
      const studentList = await Promise.all(
        querySnapshot.docs.map(async (docSnapshot) => {
          const questionnaireDoc = await getDoc(
            doc(db, "Students", docSnapshot.id, "Questionnaire", "Responses")
          );
          return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
            hasSubmitted: questionnaireDoc.exists(), // Check if questionnaire exists
          };
        })
      );

      setStudents(studentList);
      setShowSearch(true);
      setShowFetchButton(false); // Hide the Fetch Students button after clicking it
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "900px",
      margin: "20px auto",
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      textAlign: "center",
      color: "#333",
      fontSize: "30px",
      marginBottom: "20px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    fetchButton: {
      padding: "15px 30px",
      borderRadius: "50px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      marginBottom: "20px",
      fontSize: "18px",
      fontWeight: "bold",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
    },
    searchBar: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      borderRadius: "30px",
      border: "2px solid #ccc",
      fontSize: "16px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    note: {
      marginBottom: "10px",
      color: "#007bff",
      fontSize: "16px",
      fontStyle: "italic",
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#e3f2fd",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    tableContainer: {
      overflowY: "auto",
      maxHeight: "400px",
      borderRadius: "15px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
      padding: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "15px",
      backgroundColor: "#007bff",
      color: "#fff",
      borderBottom: "3px solid #ddd",
      textAlign: "left",
      fontWeight: "bold",
      fontSize: "16px",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
      fontSize: "14px",
    },
    doButton: {
      padding: "10px 20px",
      borderRadius: "20px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.3s ease",
    },
    showResultsButton: {
      padding: "10px 20px",
      borderRadius: "20px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.3s ease",
    },
    noData: {
      textAlign: "center",
      color: "#666",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Student List</h2>

      {showFetchButton && (
        <button onClick={fetchStudents} style={styles.fetchButton}>
          Fetch Students
        </button>
      )}

      {showSearch && (
        <>
          <p style={styles.note}>Use the search bar below to filter students by name.</p>
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchBar}
          />
        </>
      )}

      <div style={styles.tableContainer}>
        {filteredStudents.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Academic Level</th>
                <th style={styles.th}>Behavior</th>
                <th style={styles.th}>Language</th>
                <th style={styles.th}>Special Needs</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.age}</td>
                  <td style={styles.td}>{student.academicLevel}</td>
                  <td style={styles.td}>{student.behavior}</td>
                  <td style={styles.td}>{student.language}</td>
                  <td style={styles.td}>{student.specialNeeds ? "Yes" : "No"}</td>
                  <td style={styles.td}>
                    {student.hasSubmitted ? (
                      <button
                      onClick={() => navigate(`/Show-results/${student.id}`)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "20px",
                        backgroundColor: "#dc3545", // Red color
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Show Results
                    </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/Questionnaire/${student.id}`)}
                        style={styles.doButton}
                      >
                        Do Questionnaire
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noData}>
            No students found. Click "Fetch Students" to load data.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowStudents;
*/
import React, { useState, useContext, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App"; // Import ThemeContext

const ShowStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]); // For storing available grades
  const [selectedClass, setSelectedClass] = useState(""); // Currently selected class
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFetchButton, setShowFetchButton] = useState(true);

  const { theme } = useContext(ThemeContext); // Access theme from ThemeContext

  // Dynamically update styles based on the theme
  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "#f9f9f9" : "#121212";
    document.body.style.color = theme === "light" ? "#333" : "#f9f9f9";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, [theme]);

  // Fetch list of grades/classes
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Grades"));
        const gradesList = querySnapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setGrades(gradesList);
      } catch (error) {
        console.error("Error fetching grades: ", error);
      }
    };

    fetchGrades();
  }, []);

  const fetchStudents = async () => {
    try {
      let studentList = [];

      if (selectedClass) {
        const classRef = doc(db, "Grades", selectedClass);
        const classDoc = await getDoc(classRef);

        if (classDoc.exists()) {
          const studentIds = classDoc.data()?.students || [];
          studentList = await Promise.all(
            studentIds.map(async (studentId) => {
              const studentDoc = await getDoc(doc(db, "Students", studentId));
              const questionnaireDoc = await getDoc(
                doc(db, "Students", studentId, "Questionnaire", "Responses")
              );
              return {
                id: studentDoc.id,
                ...studentDoc.data(),
                hasSubmitted: questionnaireDoc.exists(),
              };
            })
          );
        }
      } else {
        const querySnapshot = await getDocs(collection(db, "Students"));
        studentList = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const questionnaireDoc = await getDoc(
              doc(db, "Students", docSnapshot.id, "Questionnaire", "Responses")
            );
            return {
              id: docSnapshot.id,
              ...docSnapshot.data(),
              hasSubmitted: questionnaireDoc.exists(),
            };
          })
        );
      }

      setStudents(studentList);
      setShowSearch(true);
      setShowFetchButton(false);
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      backgroundColor: theme === "light" ? "#007bff" : "#444",
      color: "#fff",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      marginBottom: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    headerTitle: {
      fontSize: "36px",
      fontWeight: "bold",
    },
    headerSubtitle: {
      fontSize: "18px",
      fontStyle: "italic",
      marginTop: "10px",
    },
    dropdownContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    dropdown: {
      width: "48%",
      padding: "12px",
      borderRadius: "8px",
      border: theme === "light" ? "2px solid #ccc" : "2px solid #555",
      fontSize: "16px",
      backgroundColor: theme === "light" ? "#fff" : "#333",
      color: theme === "light" ? "#333" : "#f9f9f9",
    },
    searchBar: {
      width: "48%",
      padding: "12px",
      borderRadius: "8px",
      border: theme === "light" ? "2px solid #ccc" : "2px solid #555",
      fontSize: "16px",
      backgroundColor: theme === "light" ? "#fff" : "#333",
      color: theme === "light" ? "#333" : "#f9f9f9",
    },
    fetchButton: {
      padding: "15px 30px",
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#007bff" : "#555",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
      marginBottom: "20px",
    },
    tableContainer: {
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#fff" : "#333",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "15px",
      backgroundColor: theme === "light" ? "#007bff" : "#444",
      color: "#fff",
      textAlign: "left",
    },
    td: {
      padding: "15px",
      borderBottom: "1px solid #ddd",
      color: theme === "light" ? "#333" : "#f9f9f9",
    },
    noData: {
      textAlign: "center",
      fontSize: "16px",
      margin: "20px 0",
      color: theme === "light" ? "#666" : "#ccc",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTitle}>Student Management</div>
      </header>

      <div style={styles.dropdownContainer}>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={styles.dropdown}
        >
          <option value="">Select class</option>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>
        {showSearch && (
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchBar}
          />
        )}
      </div>

      {showFetchButton && (
        <button onClick={fetchStudents} style={styles.fetchButton}>
          Fetch Students
        </button>
      )}

      <div style={styles.tableContainer}>
        {filteredStudents.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Academic Level</th>
                <th style={styles.th}>Behavior</th>
                <th style={styles.th}>Language</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.age}</td>
                  <td style={styles.td}>{student.academicLevel}</td>
                  <td style={styles.td}>{student.behavior}</td>
                  <td style={styles.td}>{student.language}</td>
                  <td style={styles.td}>
                    {student.hasSubmitted ? (
                      <button
                        onClick={() => navigate(`/show-results/${student.id}`)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          borderRadius: "8px",
                          padding: "8px 15px",
                          cursor: "pointer",
                        }}
                      >
                        Show Results
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/questionnaire/${student.id}`)}
                        style={{
                          backgroundColor: "#28a745",
                          color: "#fff",
                          borderRadius: "8px",
                          padding: "8px 15px",
                          cursor: "pointer",
                        }}
                      >
                        Do Questionnaire
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noData}>
            No students found. Click "Fetch Students" to load data.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowStudents;