/*
import React, { useState } from "react";
import Header from "../components/Header";

const GenerateSeating = () => {
  const [criteria, setCriteria] = useState({
    academicLevel: false,
    behavior: false,
    specialNeeds: false,
    language: false,
  });

  const handleCriteriaChange = (e) => {
    const { name, checked } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: checked }));
  };

  const handleGenerate = () => {
    alert("Seating arrangement will be generated based on selected criteria.");
    // Implement algorithm call here
  };

  return (
    <div>



      <Header title="Generate Seating Arrangement" />
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
        <button onClick={handleGenerate} style={buttonStyle}>
          Generate Seating
        </button>
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

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
};

export default GenerateSeating;
*/

/*
import React, { useState } from "react";
import Header from "../components/Header";

const GenerateSeating = () => {
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
      <Header title="Generate Seating Arrangement" />
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

// Styles for consistent UI
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

export default GenerateSeating;
*/

/*
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import Header from "../components/Header";

const GenerateSeating = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [criteria, setCriteria] = useState({
    academicLevel: false,
    behavior: false,
    specialNeeds: false,
    language: false,
  });
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Fetch students when a class is selected
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      return;
    }
    const fetchStudents = async () => {
      const studentsQuery = query(
        collection(db, "Students"),
        where("classId", "==", selectedClass)
      );
      const snapshot = await getDocs(studentsQuery);
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    };
    fetchStudents();
  }, [selectedClass]);

  const handleCriteriaChange = (e) => {
    const { name, checked } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: checked }));
  };

  const handleGenerate = async () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    // Simulated algorithm (replace with real logic later)
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

  const handleSave = async () => {
    try {
      const seatingDocRef = doc(db, "SeatingArrangements", selectedClass);
      await setDoc(seatingDocRef, {
        classId: selectedClass,
        seatingMatrix,
        criteria,
      });
      alert("Seating arrangement saved successfully!");
    } catch (error) {
      console.error("Error saving seating arrangement:", error);
      alert("An error occurred while saving the seating arrangement.");
    }
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
      <Header title="Generate Seating Arrangement" />
      <div style={containerStyle}>
        <h2 style={headerStyle}>Generate Seating Arrangement</h2>


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

const dropdownStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
  marginBottom: "20px",
  width: "100%",
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

export default GenerateSeating;
*/

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import Header from "../components/Header";

const GenerateSeating = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [criteria, setCriteria] = useState({
    academicLevel: false,
    behavior: false,
    specialNeeds: false,
    language: false,
  });
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Fetch students when a class is selected
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      return;
    }
    const fetchStudents = async () => {
      const studentsQuery = query(
        collection(db, "Students"),
        where("classId", "==", selectedClass)
      );
      const snapshot = await getDocs(studentsQuery);
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    };
    fetchStudents();
  }, [selectedClass]);

  const handleCriteriaChange = (e) => {
    const { name, checked } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: checked }));
  };

  const handleGenerate = async () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    // Simulated algorithm (replace with real logic later)
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

  const handleSave = async () => {
    try {
      const seatingDocRef = doc(db, "SeatingArrangements", selectedClass);
      await setDoc(seatingDocRef, {
        classId: selectedClass,
        seatingMatrix,
        criteria,
      });
      alert("Seating arrangement saved successfully!");
    } catch (error) {
      console.error("Error saving seating arrangement:", error);
      alert("An error occurred while saving the seating arrangement.");
    }
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
      <div style={containerStyle}>

        {/* Class Selection */}
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

        {/* Criteria Selection */}
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

        {/* Buttons */}
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

        {/* Display Seating Matrix */}
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

const dropdownStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid lightgray",
  marginBottom: "20px",
  width: "100%",
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

export default GenerateSeating;