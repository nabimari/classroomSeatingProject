/*
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
*/
/*
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firebase Firestore instance
import { collection, query, where, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MyClassesPage = ({ teacherId, teacherName }) => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [newClassStudents, setNewClassStudents] = useState(0);

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
          teacherName: teacherName,
          students: [],
          numberOfStudents: newClassStudents,
        });

        console.log("Class added successfully!");

        setClasses((prev) => [
          ...prev,
          { id: classId, name: newClassName, numberOfStudents: newClassStudents, students: [] },
        ]);

        setNewClassName("");
        setNewClassStudents(0);
      } catch (err) {
        console.error("Error adding class:", err.message);
      }
    } else {
      alert("Please provide a valid class name and number of students.");
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>My Classes</h2>
      {classes.length > 0 ? (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id} style={{ marginBottom: "10px" }}>
              <div>
                <strong>{classItem.name}</strong> - {classItem.numberOfStudents} Students
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
                  Add Students
                </button>
              </div>
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
*/
/*
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firebase Firestore instance
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MyClassesPage = ({ teacherId, teacherName }) => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [newClassStudents, setNewClassStudents] = useState(0);

  const navigate = useNavigate(); // Hook for navigation

  // Fetch classes for the teacher
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesRef = collection(db, "Classes"); // Ensure collection name matches Firestore rules
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
        const classRef = doc(db, "Classes", classId); // Ensure "Classes" matches your Firestore collection name
        await setDoc(classRef, {
          name: newClassName,
          teacherId: teacherId,
          teacherName: teacherName,
          students: [],
          numberOfStudents: newClassStudents,
        });

        setClasses((prev) => [
          ...prev,
          { id: classId, name: newClassName, numberOfStudents: newClassStudents, students: [] },
        ]);

        console.log("Class added successfully!");
        alert("Class added successfully!");
        setNewClassName("");
        setNewClassStudents(0);
      } catch (err) {
        console.error("Error adding class:", err.message);
        alert(`Error adding class: ${err.message}`);
      }
    } else {
      alert("Please provide a valid class name and number of students.");
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>My Classes</h2>
      {classes.length > 0 ? (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id} style={{ marginBottom: "10px" }}>
              <div>
                <strong>{classItem.name}</strong> - {classItem.numberOfStudents} Students
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
                  Add Students
                </button>
              </div>
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
*/
/*
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firebase Firestore instance
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MyClassesPage = ({ teacherId, teacherName }) => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [newClassStudents, setNewClassStudents] = useState(0);

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
    console.log("Adding class:", { newClassName, newClassStudents, teacherId, teacherName });
    if (newClassName.trim() && newClassStudents > 0) {
      const classId = newClassName.replace(/\s+/g, "-");
      try {
        const classRef = doc(db, "Classes", classId);
        await setDoc(classRef, {
          name: newClassName,
          teacherId: teacherId,
          teacherName: teacherName,
          students: [],
          numberOfStudents: newClassStudents,
        });

        setClasses((prev) => [
          ...prev,
          { id: classId, name: newClassName, numberOfStudents: newClassStudents, students: [] },
        ]);

        console.log("Class added successfully to Firestore.");
        alert("Class added successfully!");
        setNewClassName("");
        setNewClassStudents(0);
      } catch (err) {
        console.error("Error adding class to Firestore:", err.message);
        alert(`Error: ${err.message}`);
      }
    } else {
      alert("Please provide a valid class name and number of students.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>My Classes</h2>

      {classes.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {classes.map((classItem) => (
            <li
              key={classItem.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  <strong>{classItem.name}</strong> - {classItem.numberOfStudents} Students
                </span>
                <button
                  onClick={() => navigate(`/add-student/${classItem.id}`)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Add Students
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>No classes found. Add a new class below.</p>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#333" }}>Add a New Class</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Class Name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <input
            type="number"
            placeholder="Number of Students"
            value={newClassStudents}
            onChange={(e) => setNewClassStudents(Number(e.target.value))}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleAddClass}
            style={{
              padding: "10px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyClassesPage;
*/
/*
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firebase Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MyClassesPage = ({ teacherId, teacherName }) => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [newClassStudents, setNewClassStudents] = useState(0);

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
    console.log("Adding class:", { newClassName, newClassStudents, teacherId, teacherName });
    if (newClassName.trim() && newClassStudents > 0) {
      const classId = newClassName.replace(/\s+/g, "-");
      try {
        const classRef = doc(db, "Classes", classId);
        await setDoc(classRef, {
          name: newClassName,
          teacherId: teacherId,
          teacherName: teacherName,
          students: [],
          numberOfStudents: newClassStudents,
        });

        setClasses((prev) => [
          ...prev,
          { id: classId, name: newClassName, numberOfStudents: newClassStudents, students: [] },
        ]);

        console.log("Class added successfully to Firestore.");
        alert("Class added successfully!");
        setNewClassName("");
        setNewClassStudents(0);
      } catch (err) {
        console.error("Error adding class to Firestore:", err.message);
        alert(`Error: ${err.message}`);
      }
    } else {
      alert("Please provide a valid class name and number of students.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>My Classes</h2>

      {classes.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {classes.map((classItem) => (
            <li
              key={classItem.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  <strong>{classItem.name}</strong> - {classItem.numberOfStudents} Students
                </span>
                <button
                  onClick={() => navigate(`/view-students/${classItem.id}`)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  View Students
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>No classes found. Add a new class below.</p>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#333" }}>Add a New Class</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Class Name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <input
            type="number"
            placeholder="Number of Students"
            value={newClassStudents}
            onChange={(e) => setNewClassStudents(Number(e.target.value))}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleAddClass}
            style={{
              padding: "10px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add Class
          </button>
        </div>
      </div>
    </div>
  );
};

*/
/*
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firebase Firestore instance
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore"; // Ensure doc and setDoc are imported
import { useNavigate } from "react-router-dom";

const MyClassesPage = ({ teacherId, teacherName }) => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [newClassStudents, setNewClassStudents] = useState(0);

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
    console.log("Adding class:", { newClassName, newClassStudents, teacherId, teacherName });
    if (newClassName.trim() && newClassStudents > 0) {
      const classId = newClassName.replace(/\s+/g, "-");
      try {
        const classRef = doc(db, "Classes", classId);
        await setDoc(classRef, {
          name: newClassName,
          teacherId: teacherId,
          teacherName: teacherName,
          students: [],
          numberOfStudents: newClassStudents,
        });

        setClasses((prev) => [
          ...prev,
          { id: classId, name: newClassName, numberOfStudents: newClassStudents, students: [] },
        ]);

        console.log("Class added successfully to Firestore.");
        alert("Class added successfully!");
        setNewClassName("");
        setNewClassStudents(0);
      } catch (err) {
        console.error("Error adding class to Firestore:", err.message);
        alert(`Error: ${err.message}`);
      }
    } else {
      alert("Please provide a valid class name and number of students.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>My Classes</h2>

      {classes.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {classes.map((classItem) => (
            <li
              key={classItem.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  <strong>{classItem.name}</strong> - {classItem.numberOfStudents} Students
                </span>
                <button
                  onClick={() => navigate(`/view-students/${classItem.id}`)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  View Students
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>No classes found. Add a new class below.</p>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#333" }}>Add a New Class</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Class Name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <input
            type="number"
            placeholder="Number of Students"
            value={newClassStudents}
            onChange={(e) => setNewClassStudents(Number(e.target.value))}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleAddClass}
            style={{
              padding: "10px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyClassesPage;
*/
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import Firebase Firestore instance
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore"; // Ensure doc and setDoc are imported
import { useNavigate } from "react-router-dom";

const MyClassesPage = ({ teacherId, teacherName }) => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");

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

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>My Classes</h2>

      {classes.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {classes.map((classItem) => (
            <li
              key={classItem.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  <strong>{classItem.name}</strong>
                </span>
                <button
                  onClick={() => navigate(`/view-students/${classItem.id}`)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  View Students
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>No classes found. Add a new class below.</p>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#333" }}>Add a New Class</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Class Name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleAddClass}
            style={{
              padding: "10px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyClassesPage;
