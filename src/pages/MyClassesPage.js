import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firebase Firestore instance
import { collection, query, where, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MyClassesPage = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [newClassStudents, setNewClassStudents] = useState(0);
  const [editingClass, setEditingClass] = useState(null);
  const [editedStudents, setEditedStudents] = useState(0);

  const navigate = useNavigate(); // Hook for navigation

  // Fetch classes for the teacher
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesRef = collection(db, "classes");
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
    if (newClassName.trim() && newClassStudents > 0) {
      const classId = newClassName.replace(/\s+/g, "-");
      try {
        const classRef = doc(db, "classes", classId);
        await setDoc(classRef, {
          name: newClassName,
          teacherId: teacherId,
          studentIds: [],
          numberOfStudents: newClassStudents,
        });

        setClasses((prev) => [
          ...prev,
          { id: classId, name: newClassName, numberOfStudents: newClassStudents, studentIds: [] },
        ]);

        setNewClassName("");
        setNewClassStudents(0);
      } catch (err) {
        console.error("Error adding class:", err.message);
      }
    }
  };

  // Start editing a class
  const startEditing = (classItem) => {
    setEditingClass(classItem.id);
    setEditedStudents(classItem.numberOfStudents);
  };

  // Save the edited class
  const saveEditedClass = async () => {
    if (editedStudents >= 0) {
      try {
        const classRef = doc(db, "classes", editingClass);
        await updateDoc(classRef, {
          numberOfStudents: editedStudents,
        });

        setClasses((prev) =>
          prev.map((classItem) =>
            classItem.id === editingClass
              ? { ...classItem, numberOfStudents: editedStudents }
              : classItem
          )
        );

        setEditingClass(null);
        setEditedStudents(0);
      } catch (err) {
        console.error("Error updating class:", err.message);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Classes</h2>
      {classes.length > 0 ? (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id} style={{ marginBottom: "10px" }}>
              {editingClass === classItem.id ? (
                <div>
                  <input
                    type="number"
                    min="0"
                    value={editedStudents}
                    onChange={(e) => setEditedStudents(Number(e.target.value))}
                    style={{ marginRight: "10px", padding: "5px" }}
                  />
                  <button
                    onClick={saveEditedClass}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingClass(null)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <strong>{classItem.name}</strong> - {classItem.numberOfStudents} Students
                  <button
                    onClick={() => startEditing(classItem)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "blue",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/add-student/${classItem.id}`)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "purple",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Add Student
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No classes found. Add a new class below.</p>
      )}
      <div style={{ marginTop: "20px" }}>
        <h3>Add a New Class</h3>
        <input
          type="text"
          placeholder="Class Name"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          placeholder="Number of Students"
          value={newClassStudents}
          onChange={(e) => setNewClassStudents(Number(e.target.value))}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          onClick={handleAddClass}
          style={{
            padding: "5px 10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Class
        </button>
      </div>
    </div>
  );
};

export default MyClassesPage;
