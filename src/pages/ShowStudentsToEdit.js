/*
import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure the path to your firebase.js file is correct
import Header from "../components/Header";

const ShowStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      console.log("Fetching students...");
      const querySnapshot = await getDocs(collection(db, "Students"));
      const studentList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Students:", studentList); // Log fetched data
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students: ", error); // Log the error
    }
  };


  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "20px auto" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Student List</h2>
      <button
        onClick={fetchStudents}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Fetch Students
      </button>
      <div>
        {students.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={{ border: "1px solid lightgray", padding: "10px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid lightgray", padding: "10px" }}>
                  Age
                </th>
                <th style={{ border: "1px solid lightgray", padding: "10px" }}>
                  Academic Level
                </th>
                <th style={{ border: "1px solid lightgray", padding: "10px" }}>
                  Behavior
                </th>
                <th style={{ border: "1px solid lightgray", padding: "10px" }}>
                  Language
                </th>
                <th style={{ border: "1px solid lightgray", padding: "10px" }}>
                  Special Needs
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td style={{ border: "1px solid lightgray", padding: "10px" }}>
                    {student.name}
                  </td>
                  <td style={{ border: "1px solid lightgray", padding: "10px" }}>
                    {student.age}
                  </td>
                  <td style={{ border: "1px solid lightgray", padding: "10px" }}>
                    {student.academicLevel}
                  </td>
                  <td style={{ border: "1px solid lightgray", padding: "10px" }}>
                    {student.behavior}
                  </td>
                  <td style={{ border: "1px solid lightgray", padding: "10px" }}>
                    {student.language}
                  </td>
                  <td style={{ border: "1px solid lightgray", padding: "10px" }}>
                    {student.specialNeeds ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            No students found. Click "Fetch Students" to load data.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowStudents;
*/
/*
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";

const ShowStudentsToEdit = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch classes from Firestore
  useEffect(() => {
    const fetchClasses = async () => {
      const classCollection = collection(db, "Classes");
      const snapshot = await getDocs(classCollection);
      const classList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    };
    fetchClasses();
  }, []);

  // Fetch students dynamically based on selected class
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      return;
    }
    const fetchStudents = async () => {
      setLoading(true);
      const studentQuery = query(
        collection(db, "Students"),
        where("classId", "==", selectedClass)
      );
      const snapshot = await getDocs(studentQuery);
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
      setLoading(false);
    };
    fetchStudents();
  }, [selectedClass]);

  return (
    <div>
      <Header title="Show Students" />
      <div style={containerStyle}>
        <h2 style={headerStyle}>View Students</h2>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={dropdownStyle}
        >
          <option value="">Select a Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length > 0 ? (
          <div style={studentListStyle}>
            {students.map((student) => (
              <div key={student.id} style={studentCardStyle}>
                <h4>{student.name}</h4>
                <p>Age: {student.age}</p>
                <p>Academic Level: {student.academicLevel}</p>
                <p>Behavior: {student.behavior}</p>
                <p>Language: {student.language}</p>
                <p>Special Needs: {student.specialNeeds ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No students found for the selected class.</p>
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

const dropdownStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
  marginBottom: "20px",
  width: "100%",
};

const studentListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
};

const studentCardStyle = {
  padding: "15px",
  backgroundColor: "#e7f3ff",
  border: "1px solid #007bff",
  borderRadius: "8px",
  textAlign: "left",
};

export default ShowStudentsToEdit;
*/

import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";

const ShowStudentsToEdit = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch classes from Firestore
  useEffect(() => {
    const fetchClasses = async () => {
      const classCollection = collection(db, "Classes");
      const snapshot = await getDocs(classCollection);
      const classList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    };
    fetchClasses();
  }, []);

  // Fetch students dynamically based on selected class
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      return;
    }
    const fetchStudents = async () => {
      setLoading(true);
      const studentQuery = query(
        collection(db, "Students"),
        where("classId", "==", selectedClass)
      );
      const snapshot = await getDocs(studentQuery);
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
      setLoading(false);
    };
    fetchStudents();
  }, [selectedClass]);

  return (
    <div>

      <div style={containerStyle}>
        <h2 style={headerStyle}>View Students</h2>
        {/* Class Selection Dropdown */}
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={dropdownStyle}
        >
          <option value="">Select a Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>

        {/* Students Display */}
        {loading ? (
          <p>Loading students...</p>
        ) : students.length > 0 ? (
          <div style={studentListStyle}>
            {students.map((student) => (
              <div key={student.id} style={studentCardStyle}>
                <h4>{student.name}</h4>
                <p>Age: {student.age}</p>
                <p>Academic Level: {student.academicLevel}</p>
                <p>Behavior: {student.behavior}</p>
                <p>Language: {student.language}</p>
                <p>Special Needs: {student.specialNeeds ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No students found for the selected class.</p>
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

const dropdownStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
  marginBottom: "20px",
  width: "100%",
};

const studentListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
};

const studentCardStyle = {
  padding: "15px",
  backgroundColor: "#e7f3ff",
  border: "1px solid #007bff",
  borderRadius: "8px",
  textAlign: "left",
};

export default ShowStudentsToEdit;
