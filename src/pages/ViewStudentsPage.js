/*
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ViewStudentsPage = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [newStudent, setNewStudent] = useState("");

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classRef = doc(db, "Classes", classId);
        const classSnapshot = await getDoc(classRef);
        if (classSnapshot.exists()) {
          setClassData({ id: classSnapshot.id, ...classSnapshot.data() });
        }
      } catch (err) {
        console.error("Error fetching class data:", err.message);
      }
    };

    fetchClassData();
  }, [classId]);

  const handleAddStudent = async () => {
    if (newStudent.trim()) {
      const newStudentObject = {
        id: `${Date.now()}`, // Generate a unique ID for the student
        name: newStudent,
        age: null,
        academicLevel: null,
        behavior: null,
        specialNeeds: false,
        language: null,
        classId,
      };

      try {
        const classRef = doc(db, "Classes", classId);
        await updateDoc(classRef, {
          students: arrayUnion(newStudentObject),
        });

        setClassData((prev) => ({
          ...prev,
          students: [...prev.students, newStudentObject],
        }));
        setNewStudent("");
        alert("Student added successfully!");
      } catch (err) {
        console.error("Error adding student:", err.message);
      }
    } else {
      alert("Please enter a valid student name.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {classData ? (
        <>
          <h2>
            {classData.name} - {classData.students.length} Students
          </h2>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {classData.students.map((student, index) => (
              <li
                key={student.id || index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <strong>Name:</strong> {student.name || "N/A"} <br />
                <strong>Age:</strong> {student.age || "N/A"} <br />
                <strong>Academic Level:</strong> {student.academicLevel || "N/A"} <br />
                <strong>Behavior:</strong> {student.behavior || "N/A"} <br />
                <strong>Language:</strong> {student.language || "N/A"} <br />
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Student Name"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
                marginRight: "10px",
              }}
            />
            <button
              onClick={handleAddStudent}
              style={{
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add Student
            </button>
          </div>
        </>
      ) : (
        <p>Loading class data...</p>
      )}
    </div>
  );
};

export default ViewStudentsPage;
*/
/*
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ViewStudentsPage = () => {
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

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classRef = doc(db, "Classes", classId);
        const classSnapshot = await getDoc(classRef);
        if (classSnapshot.exists()) {
          setClassData({ id: classSnapshot.id, ...classSnapshot.data() });
        }
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

    if (!newStudent.name || !newStudent.age || !newStudent.academicLevel || !newStudent.behavior || !newStudent.language) {
      alert("Please fill in all fields.");
      return;
    }

    const newStudentObject = {
      ...newStudent,
      id: `${Date.now()}`, // Generate a unique ID for the student
      classId,
    };

    try {
      const classRef = doc(db, "Classes", classId);
      await updateDoc(classRef, {
        students: arrayUnion(newStudentObject),
      });

      setClassData((prev) => ({
        ...prev,
        students: [...prev.students, newStudentObject],
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

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {classData ? (
        <>
          <h2>
            {classData.name} - {classData.students.length} Students
          </h2>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {classData.students.map((student, index) => (
              <li
                key={student.id || index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <strong>Name:</strong> {student.name || "N/A"} <br />
                <strong>Age:</strong> {student.age || "N/A"} <br />
                <strong>Academic Level:</strong> {student.academicLevel || "N/A"} <br />
                <strong>Behavior:</strong> {student.behavior || "N/A"} <br />
                <strong>Language:</strong> {student.language || "N/A"} <br />
                <strong>Special Needs:</strong> {student.specialNeeds ? "Yes" : "No"}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h3>Add New Student</h3>
            <form onSubmit={handleAddStudent} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newStudent.name}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newStudent.age}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <input
                type="text"
                name="academicLevel"
                placeholder="Academic Level"
                value={newStudent.academicLevel}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <input
                type="text"
                name="behavior"
                placeholder="Behavior"
                value={newStudent.behavior}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <input
                type="text"
                name="language"
                placeholder="Language"
                value={newStudent.language}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <label>
                <input
                  type="checkbox"
                  name="specialNeeds"
                  checked={newStudent.specialNeeds}
                  onChange={handleChange}
                />
                Special Needs
              </label>
              <button
                type="submit"
                style={{
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add Student
              </button>
            </form>
          </div>
        </>
      ) : (
        <p>Loading class data...</p>
      )}
    </div>
  );
};

export default ViewStudentsPage;
*/
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ViewStudentsPage = () => {
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
  const [editingStudent, setEditingStudent] = useState(null); // Track the student being edited

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classRef = doc(db, "Classes", classId);
        const classSnapshot = await getDoc(classRef);
        if (classSnapshot.exists()) {
          setClassData({ id: classSnapshot.id, ...classSnapshot.data() });
        }
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
      !newStudent.academicLevel ||
      !newStudent.behavior ||
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
      id: `${Date.now()}`, // Generate a unique ID for the student
      classId,
    };

    try {
      const classRef = doc(db, "Classes", classId);
      await updateDoc(classRef, {
        students: arrayUnion(newStudentObject),
      });

      setClassData((prev) => ({
        ...prev,
        students: [...prev.students, newStudentObject],
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

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (newStudent.age > 18) {
      alert("Age must be 18 or below. This system is for school students only.");
      return;
    }

    try {
      const updatedStudents = classData.students.map((student) =>
        student.id === editingStudent.id ? { ...newStudent } : student
      );

      const classRef = doc(db, "Classes", classId);
      await updateDoc(classRef, { students: updatedStudents });

      setClassData((prev) => ({ ...prev, students: updatedStudents }));
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


  const handleDeleteStudent = async (student) => {
    try {
      const classRef = doc(db, "Classes", classId);
      await updateDoc(classRef, {
        students: arrayRemove(student),
      });

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
    setEditingStudent(student);
    setNewStudent(student);
  };



  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {classData ? (
        <>
          <h2>
            {classData.name} - {classData.students.length} Students
          </h2>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {classData.students.map((student, index) => (
              <li
                key={student.id || index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <strong>Name:</strong> {student.name || "N/A"} <br />
                <strong>Age:</strong> {student.age || "N/A"} <br />
                <strong>Academic Level:</strong> {student.academicLevel || "N/A"} <br />
                <strong>Behavior:</strong> {student.behavior || "N/A"} <br />
                <strong>Language:</strong> {student.language || "N/A"} <br />
                <strong>Special Needs:</strong> {student.specialNeeds ? "Yes" : "No"} <br />
                <button
                  onClick={() => handleEditStudent(student)}
                  style={{
                    marginTop: "10px",
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStudent(student)}
                  style={{
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h3>{editingStudent ? "Edit Student" : "Add New Student"}</h3>
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
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newStudent.age}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <input
                type="text"
                name="academicLevel"
                placeholder="Academic Level"
                value={newStudent.academicLevel}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <input
                type="text"
                name="behavior"
                placeholder="Behavior"
                value={newStudent.behavior}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <input
                type="text"
                name="language"
                placeholder="Language"
                value={newStudent.language}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              />
              <label>
                <input
                  type="checkbox"
                  name="specialNeeds"
                  checked={newStudent.specialNeeds}
                  onChange={handleChange}
                />
                Special Needs
              </label>
              <button
                type="submit"
                style={{
                  padding: "10px",
                  backgroundColor: editingStudent ? "#4CAF50" : "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
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
  );
};

export default ViewStudentsPage;
