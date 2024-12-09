/*
import React, { useState } from "react";
import Header from "../components/Header";

const GenerateSeatingPage = () => {
  const [criteria, setCriteria] = useState({
    academicLevel: false,
    behavior: false,
    specialNeeds: false,
    language: false,
  });

  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCriteriaChange = (e) => {
    const { name, checked } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: checked }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    // Simulated algorithm (replace with actual clustering or CSP logic)
    setTimeout(() => {
      const mockMatrix = [
        ["Student A", "Student B", "Student C"],
        ["Student D", "Student E", "Student F"],
        ["Student G", "Student H", "Student I"],
      ];
      setSeatingMatrix(mockMatrix);
      setLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    alert("Seating arrangement saved!");
    // Implement Firebase save logic here
  };

  const handleReset = () => {
    setCriteria({
      academicLevel: false,
      behavior: false,
      specialNeeds: false,
      language: false,
    });
    setSeatingMatrix([]);
  };

  return (
    <div>
      <Header title=" log out header" />
      <div style={containerStyle}>
        <h2 style={headerStyle}>Select Criteria</h2>
        <div style={criteriaStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="academicLevel"
              checked={criteria.academicLevel}
              onChange={handleCriteriaChange}
            />
            Academic Level
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="behavior"
              checked={criteria.behavior}
              onChange={handleCriteriaChange}
            />
            Behavior
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="specialNeeds"
              checked={criteria.specialNeeds}
              onChange={handleCriteriaChange}
            />
            Special Needs
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              name="language"
              checked={criteria.language}
              onChange={handleCriteriaChange}
            />
            Language
          </label>
        </div>
        <div style={buttonContainerStyle}>
          <button onClick={handleGenerate} style={buttonStyle}>
            Generate Seating
          </button>
          <button onClick={handleReset} style={buttonStyle}>
            Reset
          </button>
          {seatingMatrix.length > 0 && (
            <button onClick={handleSave} style={buttonStyle}>
              Save Arrangement
            </button>
          )}
        </div>
        {loading ? (
          <p>Loading seating arrangement...</p>
        ) : seatingMatrix.length > 0 ? (
          <div style={matrixStyle}>
            {seatingMatrix.map((row, rowIndex) => (
              <div key={rowIndex} style={rowStyle}>
                {row.map((student, colIndex) => (
                  <div key={colIndex} style={seatStyle}>
                    {student}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No seating arrangement generated yet.</p>
        )}
      </div>
    </div>
  );
};

const containerStyle = {
  padding: "20px",
  maxWidth: "800px",
  margin: "20px auto",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const headerStyle = {
  color: "#007bff",
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "bold",
};

const criteriaStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "10px",
  marginBottom: "20px",
};

const checkboxLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "16px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  margin: "20px 0",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const matrixStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  marginTop: "20px",
};

const rowStyle = {
  display: "flex",
  gap: "10px",
};

const seatStyle = {
  padding: "10px",
  backgroundColor: "#e7f3ff",
  border: "1px solid #007bff",
  borderRadius: "4px",
  minWidth: "100px",
  textAlign: "center",
};

export default GenerateSeatingPage;
*/

/*
import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure Firebase is set up correctly
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import Header from "../components/Header";

const EditStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    academicLevel: "",
    behavior: "",
    specialNeeds: false,
    language: "",
  });

  // Fetch students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, "Students");
      const snapshot = await getDocs(studentsCollection);
      const studentsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsList);
    };

    fetchStudents();
  }, []);

  // Handle student selection
  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);

    // Pre-fill the form with the selected student's data
    const selectedStudent = students.find((student) => student.id === studentId);
    if (selectedStudent) {
      setStudentData(selectedStudent);
    }
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStudentId) {
      alert("Please select a student to edit.");
      return;
    }

    try {
      const studentDoc = doc(db, "Students", selectedStudentId);
      await updateDoc(studentDoc, studentData);
      alert("Student information updated successfully!");
    } catch (error) {
      console.error("Error updating student: ", error);
      alert("An error occurred while updating student information.");
    }
  };

  return (
    <div>
      <Header title="Edit Student" />
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "20px auto",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#007bff", marginBottom: "20px" }}>
          Edit Student
        </h2>
        <select
          value={selectedStudentId}
          onChange={handleStudentChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
            border: "1px solid lightgray",
          }}
        >
          <option value="">Select a Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        {selectedStudentId && (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              required
              placeholder="Student Name"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid lightgray",
              }}
            />
            <input
              type="number"
              name="age"
              value={studentData.age}
              onChange={handleChange}
              required
              placeholder="Student Age"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid lightgray",
              }}
            />
            <input
              type="text"
              name="academicLevel"
              value={studentData.academicLevel}
              onChange={handleChange}
              required
              placeholder="Academic Level"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid lightgray",
              }}
            />
            <input
              type="text"
              name="behavior"
              value={studentData.behavior}
              onChange={handleChange}
              required
              placeholder="Behavior"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid lightgray",
              }}
            />
            <input
              type="text"
              name="language"
              value={studentData.language}
              onChange={handleChange}
              required
              placeholder="Language"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid lightgray",
              }}
            />
            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                name="specialNeeds"
                checked={studentData.specialNeeds}
                onChange={handleCheckboxChange}
              />
              Special Needs
            </label>
            <button
              type="submit"
              style={{
                padding: "12px",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditStudent;
*/
/*
import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure Firebase is set up correctly
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Header from "../components/Header";

const EditStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsCollection = collection(db, "Students");
        const snapshot = await getDocs(studentsCollection);
        const studentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Handle student selection
  const handleStudentClick = (student) => {
    setSelectedStudent(student.id);
    setStudentData(student); // Prefill the form with student data
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStudent) {
      alert("Please select a student to edit.");
      return;
    }

    try {
      const studentDoc = doc(db, "Students", selectedStudent);
      await updateDoc(studentDoc, studentData);
      alert("Student information updated successfully!");
      // Optionally, refresh the students list
    } catch (error) {
      console.error("Error updating student: ", error);
      alert("An error occurred while updating student information.");
    }
  };

  return (
    <div>
      <Header title="Edit Student" />
      <div style={containerStyle}>
        <h2 style={headerStyle}>Edit Student</h2>


        {loading ? (
          <p>Loading students...</p>
        ) : (
          <div style={listContainerStyle}>
            {students.map((student) => (
              <div
                key={student.id}
                style={{
                  ...listItemStyle,
                  backgroundColor: selectedStudent === student.id ? "#007bff" : "#f9f9f9",
                  color: selectedStudent === student.id ? "#fff" : "#333",
                }}
                onClick={() => handleStudentClick(student)}
              >
                {student.name} - {student.academicLevel}
              </div>
            ))}
          </div>
        )}


        {studentData && (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}
          >
            <input
              type="text"
              name="name"
              value={studentData.name || ""}
              onChange={handleChange}
              required
              placeholder="Student Name"
              style={inputStyle}
            />
            <input
              type="number"
              name="age"
              value={studentData.age || ""}
              onChange={handleChange}
              required
              placeholder="Student Age"
              style={inputStyle}
            />
            <input
              type="text"
              name="academicLevel"
              value={studentData.academicLevel || ""}
              onChange={handleChange}
              required
              placeholder="Academic Level"
              style={inputStyle}
            />
            <input
              type="text"
              name="behavior"
              value={studentData.behavior || ""}
              onChange={handleChange}
              required
              placeholder="Behavior"
              style={inputStyle}
            />
            <input
              type="text"
              name="language"
              value={studentData.language || ""}
              onChange={handleChange}
              required
              placeholder="Language"
              style={inputStyle}
            />
            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                name="specialNeeds"
                checked={studentData.specialNeeds || false}
                onChange={handleCheckboxChange}
              />
              Special Needs
            </label>
            <button type="submit" style={buttonStyle}>
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "20px",
  maxWidth: "800px",
  margin: "20px auto",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const headerStyle = {
  color: "#007bff",
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "bold",
};

const listContainerStyle = {
  maxHeight: "300px",
  overflowY: "auto",
  border: "1px solid lightgray",
  borderRadius: "5px",
  marginBottom: "20px",
};

const listItemStyle = {
  padding: "10px",
  borderBottom: "1px solid lightgray",
  cursor: "pointer",
  textAlign: "left",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

export default EditStudent;
*/
import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure Firebase is set up correctly
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Header from "../components/Header";

const EditStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsCollection = collection(db, "Students");
        const snapshot = await getDocs(studentsCollection);
        const studentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Handle student selection
  const handleStudentClick = (student) => {
    setSelectedStudent(student.id);
    setStudentData(student); // Prefill the form with student data
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStudent) {
      alert("Please select a student to edit.");
      return;
    }

    try {
      const studentDoc = doc(db, "Students", selectedStudent);
      await updateDoc(studentDoc, studentData);
      alert("Student information updated successfully!");
      // Optionally, refresh the students list
    } catch (error) {
      console.error("Error updating student: ", error);
      alert("An error occurred while updating student information.");
    }
  };

  return (
    <div>

      <div style={containerStyle}>

        {/* Student List */}
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <div style={listContainerStyle}>
            {students.map((student) => (
              <div
                key={student.id}
                style={{
                  ...listItemStyle,
                  backgroundColor: selectedStudent === student.id ? "#007bff" : "#f9f9f9",
                  color: selectedStudent === student.id ? "#fff" : "#333",
                }}
                onClick={() => handleStudentClick(student)}
              >
                {student.name} - {student.academicLevel}
              </div>
            ))}
          </div>
        )}

        {/* Edit Form */}
        {studentData && (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}
          >
            <input
              type="text"
              name="name"
              value={studentData.name || ""}
              onChange={handleChange}
              required
              placeholder="Student Name"
              style={inputStyle}
            />
            <input
              type="number"
              name="age"
              value={studentData.age || ""}
              onChange={handleChange}
              required
              placeholder="Student Age"
              style={inputStyle}
            />
            <input
              type="text"
              name="academicLevel"
              value={studentData.academicLevel || ""}
              onChange={handleChange}
              required
              placeholder="Academic Level"
              style={inputStyle}
            />
            <input
              type="text"
              name="behavior"
              value={studentData.behavior || ""}
              onChange={handleChange}
              required
              placeholder="Behavior"
              style={inputStyle}
            />
            <input
              type="text"
              name="language"
              value={studentData.language || ""}
              onChange={handleChange}
              required
              placeholder="Language"
              style={inputStyle}
            />
            <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                name="specialNeeds"
                checked={studentData.specialNeeds || false}
                onChange={handleCheckboxChange}
              />
              Special Needs
            </label>
            <button type="submit" style={buttonStyle}>
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "20px",
  maxWidth: "800px",
  margin: "20px auto",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const headerStyle = {
  color: "#007bff",
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "bold",
};

const listContainerStyle = {
  maxHeight: "300px",
  overflowY: "auto",
  border: "1px solid lightgray",
  borderRadius: "5px",
  marginBottom: "20px",
};

const listItemStyle = {
  padding: "10px",
  borderBottom: "1px solid lightgray",
  cursor: "pointer",
  textAlign: "left",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

export default EditStudent;
