import React, { useEffect, useState ,useContext} from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../App"; // Import ThemeContext
import {getStudentsByClassID,updateStudentMainInfo,addStudentToClass,removeStudent} from "../services/studentHandler"




const ViewStudentsPage = ({ teacherName  }) => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    academicLevel: "",
    behavior: "",
    specialNeeds: false,
    language: "",
  });
  const { theme } = useContext(ThemeContext); // Access theme
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const studentsData = await getStudentsByClassID(classId);

        setClassData({
          id: classId, 
          name: `Class ${classId}`, 
          students: studentsData, 
        });
      } catch (err) {
        console.error("Error fetching class data:", err.message);
      }
    };
  
    fetchClassData();
  }, [classId]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (
      !newStudent.name ||
      !newStudent.age ||
      !newStudent.language
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (newStudent.age > 18) {
      alert("Age must be 18 or below. This system is for school students only.");
      return;
    }

    const newStudentObject = {
      ...newStudent,
      id: `${Date.now()}`,
      classId,
    };

    try {
      const studentId = await addStudentToClass(newStudentObject);

      setClassData((prev) => ({
        ...prev,
        students: [...prev.students, { id: studentId, ...newStudentObject }],
      }));

      setNewStudent({
        name: "",
        age: "",
        academicLevel: "",
        behavior: "",
        specialNeeds: false,
        language: "",
      });
      alert("Student added successfully!");
    } catch (err) {
      console.error("Error adding student:", err.message);
    }
  };

  const handleDeleteStudent = async (student) => {
    try {
      await removeStudent(classId, student.id);
      setClassData((prev) => ({
        ...prev,
        students: prev.students.filter((s) => s.id !== student.id),
      }));
      alert("Student deleted successfully!");
    } catch (err) {
      console.error("Error deleting student:", err.message);
    }
  };

  const handleEditStudent = (student) => {
    if (editingStudent && editingStudent.id === student.id) {
      // Cancel editing
      setEditingStudent(null);
      setNewStudent({
        name: "",
        age: "",
        academicLevel: "",
        behavior: "",
        specialNeeds: false,
        language: "",
      });
    } else {
      // Start editing the selected student
      setEditingStudent(student);
      setNewStudent(student);
    }
  };
  

  const handleSaveEdit = async (e) => {
    e.preventDefault();
  
    if (newStudent.age > 18) {
      alert("Age must be 18 or below. This system is for school students only.");
      return;
    }
  
    try {
      await updateStudentMainInfo(editingStudent.id, { ...newStudent });
      setClassData((prev) => ({
        ...prev,
        students: prev.students.map((student) =>
          student.id === editingStudent.id ? { ...newStudent } : student
        ),
      }));
      setEditingStudent(null);
      setNewStudent({
        name: "",
        age: "",
        academicLevel: "",
        behavior: "",
        specialNeeds: false,
        language: "",
      });
      alert("Student updated successfully!");
    } catch (err) {
      console.error("Error updating student:", err.message);
    }
  };
  



  const styles = {
    container: {
      display: "flex",
      minHeight: "95vh",
      flexDirection: "row",
      padding: "20px",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: theme === "light" ? "#333" : "#f9f9f9",
      "@media (maxWidth: 768px)": {
        flexDirection: "column", // Stack the layout vertically for smaller screens
        padding: "10px", // Reduce padding
      },
      
    },
    sidebarSpacing: {
      width: "300px", // Matches sidebar width
      flexShrink: 0,
    },
    mainContent: {
      flex: 1,
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: theme === "light" ? "#ffffff" : "#1E1E1E",
      borderRadius: "12px",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(0, 0, 0, 0.5)",
        "@media (maxWidth: 768px)": {
  maxWidth: "100%", // Make it full-width
  margin: "0", // Remove auto margins
  padding: "10px", // Reduce padding for smaller screens
},
    },
    header: {
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      color: theme === "light" ? "#1E88E5" : "#90CAF9",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#2E3B4E",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
      boxShadow: theme === "light"
        ? "0 2px 4px rgba(0, 0, 0, 0.1)"
        : "0 2px 4px rgba(0, 0, 0, 0.3)",
    },
    tableWrapper: {
      maxHeight: "400px", // Set the desired max height
      overflowY: "auto", // Enable vertical scrolling
      marginTop: "20px",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#2E3B4E",
      borderRadius: "8px",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
      boxShadow: theme === "light"
        ? "0 2px 4px rgba(0, 0, 0, 0.1)"
        : "0 2px 4px rgba(0, 0, 0, 0.3)",
      padding: "10px", // Optional padding for aesthetics
      overflowX: "auto", // Horizontal scroll for small screens
"@media (maxWidth: 768px)": {
  padding: "5px", // Smaller padding for mobile
},
    },
    th: {
      padding: "12px",
      backgroundColor: theme === "light" ? "#4CAF50" : "#3C4049",
      color: "#fff",
      textAlign: "left",
      fontWeight: "bold",
      textTransform: "uppercase",
      "@media (maxWidth: 768px)": { 
        fontSize: "12px", // Smaller font for mobile
        padding: "8px", // Adjust padding for mobile
      },
    },
    td: {
      padding: "10px",
      color: theme === "light" ? "#333" : "#ddd",
      borderBottom: theme === "light" ? "1px solid #ddd" : "1px solid #444",
      transition: "background-color 0.3s ease-in-out",
      "@media (maxWidth: 768px)": { 
        fontSize: "12px", // Smaller font for mobile
        padding: "8px", // Adjust padding for mobile
      },
    },
    tableRowHover: {
      backgroundColor: theme === "light" ? "#F8F9FA" : "#2D3748",
    },
    editButton: {
      marginRight: "10px",
      padding: "8px 16px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      boxShadow: theme === "light"
        ? "0 2px 4px rgba(0, 0, 0, 0.2)"
        : "0 2px 4px rgba(0, 0, 0, 0.5)",
      transition: "background-color 0.3s ease",
    },
    deleteButton: {
      padding: "8px 10px",
      backgroundColor: "#f44336",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      boxShadow: theme === "light"
        ? "0 2px 4px rgba(0, 0, 0, 0.2)"
        : "0 2px 4px rgba(0, 0, 0, 0.5)",
      transition: "background-color 0.3s ease",
    },
    formContainer: {
      marginTop: "100px",
      padding: "25px",
      width:"60%",
      marginLeft:"140px",
      borderRadius: "12px",
      backgroundColor: theme === "light" ? "#ffffff" : "#2E3B4E",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(0, 0, 0, 0.5)",
        "@media (maxWidth: 768px)": {
  width: "100%", // Full-width for mobile
  marginLeft: "0", // Remove left margin
  padding: "10px", // Reduce padding
},
    },
    formHeader: {
      marginBottom: "15px",
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      color: theme === "light" ? "#1E88E5" : "#90CAF9",
    },
    input: {
      padding: "10px",
      borderRadius: "8px",
      border: theme === "light" ? "1px solid #ccc" : "1px solid #555",
      fontSize: "14px",
      backgroundColor: theme === "light" ? "#F5F5F5" : "#1E1E1E",
      color: theme === "light" ? "#333" : "#f9f9f9",
      marginBottom: "10px",
      outline: "none",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "14px",
      color: theme === "light" ? "#333" : "#f9f9f9",
    },
    checkbox: {
      transform: "scale(1.2)",
      cursor: "pointer",
    },
    submitButton: {
      padding: "12px 20px",
      backgroundColor: "#2196F3",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(0, 0, 0, 0.5)",
      transition: "background-color 0.3s ease",
    },
    submitButtonHover: {
      backgroundColor: "#1769aa",
    },
    
  };




  return (
    <div style={styles.container}>
      <div style={styles.sidebarSpacing}></div>
      <div style={styles.mainContent}>
      {classData ? (
        <>
          <h2 style={styles.header}>
            {classData.name} - {classData.students?.length || 0} Students
          </h2>
          {classData.students && classData.students.length > 0 ? (
            <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
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
                {classData.students.map((student) => (
                  <tr key={student.id}>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.age}</td>
                    <td style={styles.td}>{student.academicLevel}</td>
                    <td style={styles.td}>{student.behavior}</td>
                    <td style={styles.td}>{student.language}</td>
                    <td style={styles.td}>
                      {student.specialNeeds ? "Yes" : "No"}
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleEditStudent(student)}
                        style={styles.editButton}
                      >
                        {editingStudent && editingStudent.id === student.id ? "Cancel Edit" : "Edit"}
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <p>No students found in this class.</p>
          )}
          <div style={styles.formContainer}>
            <h3 style={styles.formHeader}>
              {editingStudent ? "Edit Student" : "Add New Student"}
            </h3>
            <form
              onSubmit={editingStudent ? handleSaveEdit : handleAddStudent}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newStudent.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newStudent.age}
                onChange={handleChange}
                required
                min="5"
                max="18"
                style={styles.input}
              />
              
              <input
                type="text"
                name="language"
                placeholder="Language"
                value={newStudent.language}
                onChange={handleChange}
                required
                style={styles.input}
              />
              
              <button
                type="submit"
                style={{
                  ...styles.submitButton,
                  backgroundColor: editingStudent ? "#4CAF50" : "#2196F3",
                }}
              >
                {editingStudent ? "Save Changes" : "Add Student"}
              </button>
            </form>
          </div>
        </>
      ) : (
        <p>Loading class data...</p>
      )}
    </div>
    </div>
  );

};

export default ViewStudentsPage;