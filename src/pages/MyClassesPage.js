import React, { useEffect, useState ,useContext} from "react";
import { db } from "../firebase"; // Import Firebase Firestore instance
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore"; // Ensure doc and setDoc are imported
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App"; // Import ThemeContext


const MyClassesPage = ({ teacherId, teacherName }) => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const { theme } = useContext(ThemeContext); // Access theme

  const navigate = useNavigate();

  // Fetch classes for the teacher
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesRef = collection(db, "Classes");
        const q = query(classesRef, where("teacherId", "==", teacherId));
        const querySnapshot = await getDocs(q);

        const fetchedClasses = [];
        querySnapshot.forEach((doc) => {
          fetchedClasses.push({ id: doc.id, ...doc.data() });
        });

        setClasses(fetchedClasses);
      } catch (err) {
        console.error("Error fetching classes:", err.message);
      }
    };

    fetchClasses();
  }, [teacherId]);

  // Add a new class
  const handleAddClass = async () => {
    console.log("Adding class:", { newClassName, teacherId, teacherName });
    if (newClassName.trim()) {
      const classId = newClassName.replace(/\s+/g, "-").toLowerCase(); // Class ID generated from name
      try {
        const classRef = doc(db, "Classes", classId);
        await setDoc(classRef, {
          name: newClassName,
          teacherId: teacherId,
          teacherName: teacherName,
          students: [],
        });

        setClasses((prev) => [
          ...prev,
          { id: classId, name: newClassName, students: [] },
        ]);

        console.log("Class added successfully to Firestore.");
        alert("Class added successfully!");
        setNewClassName(""); // Reset input field
      } catch (err) {
        console.error("Error adding class to Firestore:", err.message);
        alert(`Error: ${err.message}`);
      }
    } else {
      alert("Please provide a valid class name.");
    }
  };


  const styles = {
    pageLayout: {
      display: "flex",
      flexDirection: "row",
      minHeight: "100vh",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
      color: theme === "light" ? "#333" : "#f9f9f9",
      fontFamily: "'Roboto', sans-serif",
      flexWrap: "wrap", // Ensures wrapping on smaller screens
    },
    sidebarSpacing: {
      width: "300px", // Matches the width of the sidebar
      flexShrink: 0,
    },
    pageContainer: {
      flex: 1,
      marginBottom:"300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      "@media (maxWidth: 768px)": {
    padding: "10px", // Reduce padding
    marginBottom: "150px", // Adjust margin for smaller screens
  },
    },
    headerTitle: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: theme === "light" ? "#333" : "#f9f9f9",
    },
    listContainer: {
      listStyleType: "none",
      padding: "0",
      width: "100%",
      maxWidth: "800px",
      "@media (maxWidth: 768px)": {
    maxWidth: "100%", // Use full width on smaller screens
  },
    },
    classItem: {
      marginBottom: "15px",
      padding: "20px",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#fff" : "#1E1E1E",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(0, 0, 0, 0.4)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      "@media (maxWidth: 768px)": {
    flexDirection: "column", // Stack items vertically on smaller screens
  },
    },
    itemRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    viewStudentsButton: {
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    viewStudentsButtonHover: {
      backgroundColor: "#45A049",
    },
    noClassesText: {
      textAlign: "center",
      color: theme === "light" ? "#777" : "#ccc",
      fontSize: "16px",
      marginTop: "20px",
    },
    addClassContainer: {
      marginTop: "20px",
      padding: "20px",
      borderRadius: "12px",
      backgroundColor: theme === "light" ? "#fff" : "#1E1E1E",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(0, 0, 0, 0.4)",
      width: "100%",
      maxWidth: "800px",
      "@media (maxWidth: 768px)": {
    maxWidth: "100%", // Use full width on smaller screens
  },
    },
    addClassHeader: {
      textAlign: "center",
      fontSize: "20px",
      fontWeight: "bold",
      color: theme === "light" ? "#333" : "#f9f9f9",
    },
    addClassForm: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginTop: "15px",
    },
    inputField: {
      width: "95%",
      padding: "10px",
      borderRadius: "8px",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
      backgroundColor: theme === "light" ? "#fff" : "#1E1E1E",
      color: theme === "light" ? "#333" : "#f9f9f9",
      fontSize: "16px",
      outline: "none",
      boxShadow: theme === "light"
        ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
        : "inset 0 2px 4px rgba(255, 255, 255, 0.1)",
    },
    addClassButton: {
      padding: "10px 20px",
      backgroundColor:  "#007bff" ,
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease",
    },
    addClassButtonHover: {
      backgroundColor: theme === "light" ? "#0056b3" : "#444",
    },
  };



  return (
    <div style={styles.pageLayout}> {/* New container for sidebar spacing */}
      <div style={styles.sidebarSpacing}></div> {/* Space for sidebar */}
      <div style={styles.pageContainer}>
        {classes.length > 0 ? (
          <ul style={styles.listContainer}>
            {classes.map((classItem) => (
              <li key={classItem.id} style={styles.classItem}>
                <div style={styles.itemRow}>
                  <span>
                    <strong>{classItem.name}</strong>
                  </span>
                  <button
                    onClick={() => navigate(`/view-students/${classItem.id}`)}
                    style={styles.viewStudentsButton}
                  >
                    View Students
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noClassesText}>No classes found. Add a new class below.</p>
        )}

        <div style={styles.addClassContainer}>
          <h3 style={styles.addClassHeader}>Add a New Class</h3>
          <div style={styles.addClassForm}>
            <input
              type="text"
              placeholder="Class Name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              style={styles.inputField}
            />
            <button
              onClick={handleAddClass}
              style={styles.addClassButton}
            >
              Add Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default MyClassesPage;