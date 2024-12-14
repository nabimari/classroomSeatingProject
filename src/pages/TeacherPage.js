/*import React from "react";
import { useNavigate } from "react-router-dom";

const TeacherPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Teacher Dashboard</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        <button
          onClick={() => navigate("/add-student")}
          style={buttonStyle}
        >
          Add Student
        </button>
        <button
          onClick={() => navigate("/edit-student")}
          style={buttonStyle}
        >
          Edit Student
        </button>
        <button
          onClick={() => navigate("/generate-seating")}
          style={buttonStyle}
        >
          Generate Seating Arrangement
        </button>
        <button
          onClick={() => navigate("/questionnaire")}
          style={buttonStyle}
        >
          Questionnaire
        </button>
        <button
          onClick={() => navigate("/analytics")}
          style={buttonStyle}
        >
          Analytics
        </button>
        <button
          onClick={() => navigate("/logout")}
          style={{ ...buttonStyle, backgroundColor: "red", color: "white" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "15px 30px",
  backgroundColor: "lightblue",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  color: "#333",
};

export default TeacherPage;
*/

/*
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const TeacherPage = () => {
  const navigate = useNavigate();

  return (
  <div>
  <Header title="log out header" />


    <div style={containerStyle}>
      <h1 style={headerStyle}>Teacher Dashboard</h1>
      <div style={buttonContainerStyle}>
        <button
          onClick={() => navigate("/add-student")}
          style={buttonStyle}
        >
          Add Student
        </button>
        <button
          onClick={() => navigate("/edit-student")}
          style={buttonStyle}
        >
          Edit Student
        </button>
        <button
          onClick={() => navigate("/generate-seating")}
          style={buttonStyle}
        >
          Seating Arrangement
        </button>
        <button
          onClick={() => navigate("/questionnaire")}
          style={buttonStyle}
        >
          Questionnaire
        </button>
        <button
          onClick={() => navigate("/analytics")}
          style={buttonStyle}
        >
          Analytics
        </button>
      </div>
    </div>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  padding: "40px",
  backgroundColor: "#f0f8ff",
  minHeight: "100vh",
};

const headerStyle = {
  marginBottom: "30px",
  color: "#007bff",
  fontSize: "36px",
  fontWeight: "bold",
};

const buttonContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
};

const buttonStyle = {
  padding: "20px 40px",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "18px",
  color: "#fff",
  fontWeight: "bold",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s, box-shadow 0.2s",
};

export default TeacherPage;
*/
/*
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Ensure Firebase is set up
import { collection, getDocs, addDoc } from "firebase/firestore";
import Header from "../components/Header";

const TeacherPage = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [newClassName, setNewClassName] = useState("");

  // Fetch classes from Firestore
  useEffect(() => {
    const fetchClasses = async () => {
      const classesCollection = collection(db, "Classes");
      const snapshot = await getDocs(classesCollection);
      const classList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    };
    fetchClasses();
  }, []);

  // Handle adding a new class
  const handleAddClass = async () => {
    if (!newClassName) {
      alert("Please enter a class name.");
      return;
    }
    try {
      const newClass = { name: newClassName };
      const docRef = await addDoc(collection(db, "Classes"), newClass);
      setClasses((prev) => [...prev, { id: docRef.id, ...newClass }]);
      setNewClassName(""); // Clear the input field
      alert("Class added successfully!");
    } catch (error) {
      console.error("Error adding class: ", error);
    }
  };

  return (
    <div>
      <Header title="Teacher Dashboard" />


      <div style={containerStyle}>
        <h1 style={headerStyle}>Teacher Dashboard</h1>

        <div style={classContainerStyle}>
          <h2 style={subHeaderStyle}>Manage Classes</h2>
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
          <input
            type="text"
            placeholder="New Class Name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleAddClass} style={addClassButtonStyle}>
            Add Class
          </button>
        </div>

        <div style={buttonContainerStyle}>
          <button
            onClick={() => navigate("/add-student")}
            style={buttonStyle}
          >
            Add Student
          </button>
          <button
            onClick={() => navigate("/show-students-to-edit")}
            style={buttonStyle}
          >
            Edit Student
          </button>
          <button
            onClick={() => navigate("/generate-seating")}
            style={buttonStyle}
          >
            Seating Arrangement
          </button>
          <button
            onClick={() => navigate("/questionnaire")}
            style={buttonStyle}
          >
            Questionnaire
          </button>
          <button
            onClick={() => navigate("/analytics")}
            style={buttonStyle}
          >
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  textAlign: "center",
  padding: "40px",
  backgroundColor: "#f0f8ff",
  minHeight: "100vh",
};

const headerStyle = {
  marginBottom: "30px",
  color: "#007bff",
  fontSize: "36px",
  fontWeight: "bold",
};

const classContainerStyle = {
  marginBottom: "30px",
};

const subHeaderStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
};

const dropdownStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
  marginRight: "10px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
  marginRight: "10px",
};

const addClassButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const buttonContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
};

const buttonStyle = {
  padding: "20px 40px",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "18px",
  color: "#fff",
  fontWeight: "bold",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s, box-shadow 0.2s",
};

export default TeacherPage;
*/
/*
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Ensure Firebase is set up
import { collection, getDocs, addDoc } from "firebase/firestore";
import Header from "../components/Header";

const TeacherPage = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [newClassName, setNewClassName] = useState("");

  // Fetch classes from Firestore
  useEffect(() => {
    const fetchClasses = async () => {
      const classesCollection = collection(db, "Classes");
      const snapshot = await getDocs(classesCollection);
      const classList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    };
    fetchClasses();
  }, []);

  // Handle adding a new class
  const handleAddClass = async () => {
    if (!newClassName) {
      alert("Please enter a class name.");
      return;
    }
    try {
      const newClass = { name: newClassName };
      const docRef = await addDoc(collection(db, "Classes"), newClass);
      setClasses((prev) => [...prev, { id: docRef.id, ...newClass }]);
      setNewClassName(""); // Clear the input field
      alert("Class added successfully!");
    } catch (error) {
      console.error("Error adding class: ", error);
    }
  };

  return (

    <div>


      <div style={containerStyle}>


        <div style={classContainerStyle}>
          <h2 style={subHeaderStyle}>Manage Classes</h2>
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
          <input
            type="text"
            placeholder="New Class Name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleAddClass} style={addClassButtonStyle}>
            Add Class
          </button>
        </div>

        <div style={buttonContainerStyle}>
          <button
            onClick={() => navigate("/add-student")}
            style={buttonStyle}
          >
            Add Student
          </button>
          <button
            onClick={() => navigate("/show-students-to-edit")}
            style={buttonStyle}
          >
            Edit Student
          </button>
          <button
            onClick={() => navigate("/generate-seating")}
            style={buttonStyle}
          >
            Seating Arrangement
          </button>
          <button
            onClick={() => navigate("/show-students")}
            style={buttonStyle}
          >
            Questionnaire
          </button>
          <button
            onClick={() => navigate("/analytics")}
            style={buttonStyle}
          >
            Analytics
          </button>
          <button
            onClick={() => navigate("/my-classes")}
            style={buttonStyle}
          >
            My Classes
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  textAlign: "center",
  padding: "40px",
  backgroundColor: "#f0f8ff",
  minHeight: "100vh",
};

const headerStyle = {
  marginBottom: "30px",
  color: "#007bff",
  fontSize: "36px",
  fontWeight: "bold",
};

const classContainerStyle = {
  marginBottom: "30px",
};

const subHeaderStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
};

const dropdownStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
  marginRight: "10px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
  marginRight: "10px",
};

const addClassButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const buttonContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
};

const buttonStyle = {
  padding: "20px 40px",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "18px",
  color: "#fff",
  fontWeight: "bold",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s, box-shadow 0.2s",
};

export default TeacherPage;
*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Ensure Firebase is set up
import { collection, getDocs } from "firebase/firestore";



const TeacherPage = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  // Fetch classes from Firestore
  useEffect(() => {
    const fetchClasses = async () => {
      const classesCollection = collection(db, "Classes");
      const snapshot = await getDocs(classesCollection);
      const classList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    };
    fetchClasses();
  }, []);

  return (
    <div>
      {/* Main Container */}
      <div style={containerStyle}>
        {/* Navigation Buttons */}
        <div style={buttonContainerStyle}>
          <button
            onClick={() => navigate("/generate-seating")}
            style={buttonStyle}
          >
            Seating Arrangement
          </button>
          <button
            onClick={() => navigate("/show-students")}
            style={buttonStyle}
          >
            Questionnaire
          </button>
          <button
            onClick={() => navigate("/analytics")}
            style={buttonStyle}
          >
            Analytics
          </button>
          <button
            onClick={() => navigate("/my-classes")}
            style={buttonStyle}
          >
            My Classes
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  textAlign: "center",
  padding: "40px",
  backgroundColor: "#f0f8ff",
  minHeight: "100vh",
};

const buttonContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
};

const buttonStyle = {
  padding: "20px 40px",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "18px",
  color: "#fff",
  fontWeight: "bold",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.2s, box-shadow 0.2s",
};

export default TeacherPage;
