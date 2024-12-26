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
      <div style={containerStyle}>


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

const GenerateSeating = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({}); // { studentId: true/false }
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
      setAttendance({});
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

      const initialAttendance = {};
      studentList.forEach((student) => {
        initialAttendance[student.id] = true; // Mark all as present by default
      });

      setStudents(studentList);
      setAttendance(initialAttendance);
    };

    fetchStudents();
  }, [selectedClass]);

  // Update attendance status
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

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

    // Filter only present students
    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );

    if (presentStudents.length === 0) {
      alert("No students are marked as present.");
      setLoading(false);
      return;
    }

    // Simulate seating arrangement algorithm (replace with your logic)
    const rows = 3;
    const cols = Math.ceil(presentStudents.length / rows);
    const matrix = Array.from({ length: rows }, (_, rowIndex) =>
      presentStudents
        .slice(rowIndex * cols, (rowIndex + 1) * cols)
        .map((student) => student.name)
    );

    setTimeout(() => {
      setSeatingMatrix(matrix);
      setLoading(false);
    }, 1000);
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


      {students.length > 0 && (
        <div style={attendanceContainerStyle}>
          <h3 style={{ textAlign: "center" }}>Mark Attendance</h3>
          {students.map((student) => (
            <label key={student.id} style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={attendance[student.id]}
                onChange={() => handleAttendanceChange(student.id)}
              />
              {student.name}
            </label>
          ))}
        </div>
      )}


      <div style={criteriaStyle}>
        <h3>Seating Criteria</h3>
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

const GenerateSeating = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [criteria, setCriteria] = useState({
    academicLevel: false,
    behavior: false,
    specialNeeds: false,
    language: false,
  });
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch teacher-specific classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return; // Validate teacherId
      try {
        const classesQuery = query(
          collection(db, "Classes"),
          where("teacherId", "==", teacherId)
        );
        const snapshot = await getDocs(classesQuery);
        const classList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classList);
      } catch (err) {
        console.error("Error fetching classes:", err.message);
      }
    };
    fetchClasses();
  }, [teacherId]);

  // Fetch students based on selected class
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setAttendance({});
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

      const initialAttendance = {};
      studentList.forEach((student) => (initialAttendance[student.id] = true));

      setStudents(studentList);
      setAttendance(initialAttendance);
    };

    fetchStudents();
  }, [selectedClass]);

  // Handle attendance toggle
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  // Generate seating matrix
  const handleGenerate = () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );

    if (presentStudents.length === 0) {
      alert("No students are marked as present.");
      setLoading(false);
      return;
    }

    const rows = 3;
    const cols = Math.ceil(presentStudents.length / rows);
    const matrix = Array.from({ length: rows }, (_, rowIndex) =>
      presentStudents
        .slice(rowIndex * cols, (rowIndex + 1) * cols)
        .map((student) => student.name)
    );

    setTimeout(() => {
      setSeatingMatrix(matrix);
      setLoading(false);
    }, 1000);
  };

  // Save seating arrangement
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

  // Reset Attendance
  const resetAttendance = () => {
    const reset = {};
    students.forEach((student) => (reset[student.id] = false));
    setAttendance(reset);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Generate Seating Arrangement</h2>


      <div style={cardContainerStyle}>
        {classes.map((cls) => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            style={{
              ...classCardStyle,
              backgroundColor: selectedClass === cls.id ? "#007bff" : "#f9f9f9",
              color: selectedClass === cls.id ? "white" : "black",
            }}
          >
            {cls.name}
          </div>
        ))}
      </div>


      {students.length > 0 && (
        <div style={attendanceSectionStyle}>
          <h3>Mark Attendance</h3>
          <button onClick={resetAttendance} style={resetButtonStyle}>
            Reset Attendance
          </button>
          <div style={attendanceGridStyle}>
            {students.map((student) => (
              <div key={student.id} style={attendanceItemStyle}>
                <label>
                  <input
                    type="checkbox"
                    checked={attendance[student.id]}
                    onChange={() => handleAttendanceChange(student.id)}
                  />
                  {student.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}


      <div style={buttonContainerStyle}>
        <button onClick={handleGenerate} style={buttonStyle}>
          Generate Seating
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
        <table style={matrixStyle}>
          <tbody>
            {seatingMatrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((student, colIndex) => (
                  <td key={colIndex} style={seatStyle}>
                    {student}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No seating arrangement generated yet.</p>
      )}
    </div>
  );
};

// Styles (updated)
const resetButtonStyle = { marginBottom: "10px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" };
const containerStyle = { padding: "20px", maxWidth: "800px", margin: "auto" };
const headerStyle = { textAlign: "center", color: "#007bff" };
const cardContainerStyle = { display: "flex", gap: "10px", flexWrap: "wrap" };
const classCardStyle = { padding: "15px", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer", width: "150px", textAlign: "center" };
const attendanceSectionStyle = { marginTop: "20px" };
const attendanceGridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" };
const attendanceItemStyle = { padding: "10px", border: "1px solid #ccc", borderRadius: "5px" };
const buttonContainerStyle = { textAlign: "center", marginTop: "20px" };
const buttonStyle = { padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" };
const matrixStyle = { marginTop: "20px", borderCollapse: "collapse", width: "100%" };
const seatStyle = { padding: "10px", border: "1px solid #ccc", textAlign: "center", backgroundColor: "#e7f3ff" };

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

const GenerateSeating = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [criteria, setCriteria] = useState({
    academicLevel: false,
    behavior: false,
    specialNeeds: false,
    language: false,
  });
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch teacher-specific classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return; // Validate teacherId
      try {
        const classesQuery = query(
          collection(db, "Classes"),
          where("teacherId", "==", teacherId)
        );
        const snapshot = await getDocs(classesQuery);
        const classList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classList);
      } catch (err) {
        console.error("Error fetching classes:", err.message);
      }
    };
    fetchClasses();
  }, [teacherId]);

  // Fetch students based on selected class
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setAttendance({});
      setSeatingMatrix([]); // Clear seating matrix when switching classes
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

      const initialAttendance = {};
      studentList.forEach((student) => (initialAttendance[student.id] = true));

      setStudents(studentList);
      setAttendance(initialAttendance);
    };

    fetchStudents();
  }, [selectedClass]);

  // Handle attendance toggle
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  // Generate seating matrix
  const handleGenerate = () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );

    if (presentStudents.length === 0) {
      alert("No students are marked as present.");
      setLoading(false);
      return;
    }

    const rows = 3;
    const cols = Math.ceil(presentStudents.length / rows);
    const matrix = Array.from({ length: rows }, (_, rowIndex) =>
      presentStudents
        .slice(rowIndex * cols, (rowIndex + 1) * cols)
        .map((student) => student.name)
    );

    setTimeout(() => {
      setSeatingMatrix(matrix);
      setLoading(false);
    }, 1000);
  };

  // Save seating arrangement
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

  // Reset Attendance
  const resetAttendance = () => {
    const reset = {};
    students.forEach((student) => (reset[student.id] = false));
    setAttendance(reset);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Generate Seating Arrangement</h2>


      <div style={cardContainerStyle}>
        {classes.map((cls) => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            style={{
              ...classCardStyle,
              backgroundColor: selectedClass === cls.id ? "#007bff" : "#f9f9f9",
              color: selectedClass === cls.id ? "white" : "black",
            }}
          >
            {cls.name}
          </div>
        ))}
      </div>

      {students.length > 0 && (
        <div style={attendanceSectionStyle}>
          <h3>Mark Attendance</h3>
          <button onClick={resetAttendance} style={resetButtonStyle}>
            Reset Attendance
          </button>
          <div style={attendanceGridStyle}>
            {students.map((student) => (
              <div key={student.id} style={attendanceItemStyle}>
                <label>
                  <input
                    type="checkbox"
                    checked={attendance[student.id]}
                    onChange={() => handleAttendanceChange(student.id)}
                  />
                  {student.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}


      <div style={buttonContainerStyle}>
        <button onClick={handleGenerate} style={buttonStyle}>
          Generate Seating
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
        <div style={matrixContainerStyle}>
          <h3>Seating Arrangement for {classes.find(cls => cls.id === selectedClass)?.name}</h3>
          <table style={matrixStyle}>
            <tbody>
              {seatingMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((student, colIndex) => (
                    <td key={colIndex} style={seatStyle}>
                      {student}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No seating arrangement generated yet.</p>
      )}
    </div>
  );
};

// Styles (updated)
const resetButtonStyle = { marginBottom: "10px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" };
const containerStyle = { padding: "20px", maxWidth: "800px", margin: "auto" };
const headerStyle = { textAlign: "center", color: "#007bff" };
const cardContainerStyle = { display: "flex", gap: "10px", flexWrap: "wrap" };
const classCardStyle = { padding: "15px", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer", width: "150px", textAlign: "center" };
const attendanceSectionStyle = { marginTop: "20px" };
const attendanceGridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" };
const attendanceItemStyle = { padding: "10px", border: "1px solid #ccc", borderRadius: "5px" };
const buttonContainerStyle = { textAlign: "center", marginTop: "20px" };
const buttonStyle = { padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" };
const matrixContainerStyle = { marginTop: "20px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" };
const matrixStyle = { borderCollapse: "collapse", width: "100%" };
const seatStyle = { padding: "10px", border: "1px solid #ccc", textAlign: "center", backgroundColor: "#e7f3ff" };

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

const GenerateSeating = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch teacher-specific classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return; // Validate teacherId
      try {
        const classesQuery = query(
          collection(db, "Classes"),
          where("teacherId", "==", teacherId)
        );
        const snapshot = await getDocs(classesQuery);
        const classList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classList);
      } catch (err) {
        console.error("Error fetching classes:", err.message);
      }
    };
    fetchClasses();
  }, [teacherId]);

  // Fetch students based on selected class
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setAttendance({});
      setSeatingMatrix([]); // Clear seating matrix when switching classes
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

      const initialAttendance = {};
      studentList.forEach((student) => (initialAttendance[student.id] = true));

      setStudents(studentList);
      setAttendance(initialAttendance);
      setSeatingMatrix([]); // Clear previous seating arrangement
    };

    fetchStudents();
  }, [selectedClass]);

  // Handle attendance toggle
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  // Generate seating matrix with 8 students per row
  const handleGenerate = () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );

    if (presentStudents.length === 0) {
      alert("No students are marked as present.");
      setLoading(false);
      return;
    }

    const matrix = [];
    for (let i = 0; i < presentStudents.length; i += 8) {
      const row = presentStudents
        .slice(i, i + 8)
        .map((student) => student.name);
      matrix.push(row);
    }

    setTimeout(() => {
      setSeatingMatrix(matrix);
      setLoading(false);
    }, 500);
  };

  // Save seating arrangement
  const handleSave = async () => {
    try {
      const seatingDocRef = doc(db, "SeatingArrangements", selectedClass);
      await setDoc(seatingDocRef, {
        classId: selectedClass,
        seatingMatrix,
      });
      alert("Seating arrangement saved successfully!");
    } catch (error) {
      console.error("Error saving seating arrangement:", error);
      alert("An error occurred while saving the seating arrangement.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Generate Seating Arrangement</h2>


      <div style={cardContainerStyle}>
        {classes.map((cls) => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            style={{
              ...classCardStyle,
              backgroundColor: selectedClass === cls.id ? "#007bff" : "#f9f9f9",
              color: selectedClass === cls.id ? "white" : "black",
            }}
          >
            {cls.name}
          </div>
        ))}
      </div>


      {students.length > 0 && (
        <div style={attendanceSectionStyle}>
          <h3>Mark Attendance</h3>
          <div style={attendanceGridStyle}>
            {students.map((student) => (
              <div key={student.id} style={attendanceItemStyle}>
                <label>
                  <input
                    type="checkbox"
                    checked={attendance[student.id]}
                    onChange={() => handleAttendanceChange(student.id)}
                  />
                  {student.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}


      <div style={buttonContainerStyle}>
        <button onClick={handleGenerate} style={buttonStyle}>
          Generate Seating
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
        <div style={matrixContainerStyle}>
          <h3>Seating Arrangement for {classes.find((cls) => cls.id === selectedClass)?.name}</h3>
          <table style={matrixStyle}>
            <tbody>
              {seatingMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((student, colIndex) => (
                    <td key={colIndex} style={seatStyle}>
                      {student}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No seating arrangement generated yet.</p>
      )}
    </div>
  );
};

// Styles
const containerStyle = { padding: "20px", maxWidth: "800px", margin: "auto" };
const headerStyle = { textAlign: "center", color: "#007bff" };
const cardContainerStyle = { display: "flex", gap: "10px", flexWrap: "wrap" };
const classCardStyle = { padding: "15px", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer", width: "150px", textAlign: "center" };
const attendanceSectionStyle = { marginTop: "20px" };
const attendanceGridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" };
const attendanceItemStyle = { padding: "10px", border: "1px solid #ccc", borderRadius: "5px" };
const buttonContainerStyle = { textAlign: "center", marginTop: "20px" };
const buttonStyle = { padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" };
const matrixContainerStyle = { marginTop: "20px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" };
const matrixStyle = { borderCollapse: "collapse", width: "100%" };
const seatStyle = { padding: "10px", border: "1px solid #ccc", textAlign: "center", backgroundColor: "#e7f3ff" };

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
  getDoc,
} from "firebase/firestore";

const GenerateSeating = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch teacher-specific classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return; // Validate teacherId
      try {
        const classesQuery = query(
          collection(db, "Classes"),
          where("teacherId", "==", teacherId)
        );
        const snapshot = await getDocs(classesQuery);
        const classList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classList);
      } catch (err) {
        console.error("Error fetching classes:", err.message);
      }
    };
    fetchClasses();
  }, [teacherId]);

  // Fetch students and saved seating for the selected class
  useEffect(() => {
    const fetchStudentsAndSeating = async () => {
      if (!selectedClass) {
        setStudents([]);
        setAttendance({});
        setSeatingMatrix([]);
        return;
      }

      // Fetch students
      const studentsQuery = query(
        collection(db, "Students"),
        where("classId", "==", selectedClass)
      );
      const snapshot = await getDocs(studentsQuery);
      const studentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const initialAttendance = {};
      studentList.forEach((student) => (initialAttendance[student.id] = true));

      setStudents(studentList);
      setAttendance(initialAttendance);

      // Fetch saved seating arrangement
      const seatingDocRef = doc(db, "SeatingArrangements", selectedClass);
      const seatingSnapshot = await getDoc(seatingDocRef);
      if (seatingSnapshot.exists()) {
        const { seatingMatrix } = seatingSnapshot.data();
        setSeatingMatrix(seatingMatrix);
      } else {
        setSeatingMatrix([]); // No saved arrangement
      }
    };

    fetchStudentsAndSeating();
  }, [selectedClass]);

  // Handle attendance toggle
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  // Generate seating matrix
  const handleGenerate = async () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );

    if (presentStudents.length === 0) {
      alert("No students are marked as present.");
      setLoading(false);
      return;
    }

    // Create matrix of 8 students per row
    const matrix = [];
    for (let i = 0; i < presentStudents.length; i += 8) {
      const row = presentStudents
        .slice(i, i + 8)
        .map((student) => student.name);
      matrix.push(row);
    }

    setSeatingMatrix(matrix);
    setLoading(false);

    // Save seating to Firestore
    await saveSeatingArrangement(matrix);
  };

  // Save seating arrangement
  const saveSeatingArrangement = async (matrix) => {
    try {
      const seatingDocRef = doc(db, "SeatingArrangements", selectedClass);
      await setDoc(seatingDocRef, {
        classId: selectedClass,
        seatingMatrix: matrix,
      });
    } catch (error) {
      console.error("Error saving seating arrangement:", error);
      alert("An error occurred while saving the seating arrangement.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Generate Seating Arrangement</h2>


      <div style={cardContainerStyle}>
        {classes.map((cls) => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            style={{
              ...classCardStyle,
              backgroundColor: selectedClass === cls.id ? "#007bff" : "#f9f9f9",
              color: selectedClass === cls.id ? "white" : "black",
            }}
          >
            {cls.name}
          </div>
        ))}
      </div>


      {students.length > 0 && (
        <div style={attendanceSectionStyle}>
          <h3>Mark Attendance</h3>
          <div style={attendanceGridStyle}>
            {students.map((student) => (
              <div key={student.id} style={attendanceItemStyle}>
                <label>
                  <input
                    type="checkbox"
                    checked={attendance[student.id]}
                    onChange={() => handleAttendanceChange(student.id)}
                  />
                  {student.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}


      <div style={buttonContainerStyle}>
        <button onClick={handleGenerate} style={buttonStyle}>
          Generate Seating
        </button>
      </div>


      {loading ? (
        <p>Loading seating arrangement...</p>
      ) : seatingMatrix.length > 0 ? (
        <div style={matrixContainerStyle}>
          <h3>Seating Arrangement</h3>
          <table style={matrixStyle}>
            <tbody>
              {seatingMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((student, colIndex) => (
                    <td key={colIndex} style={seatStyle}>
                      {student}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No seating arrangement generated yet.</p>
      )}
    </div>
  );
};

// Styles
const containerStyle = { padding: "20px", maxWidth: "800px", margin: "auto" };
const headerStyle = { textAlign: "center", color: "#007bff" };
const cardContainerStyle = { display: "flex", gap: "10px", flexWrap: "wrap" };
const classCardStyle = { padding: "15px", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer", width: "150px", textAlign: "center" };
const attendanceSectionStyle = { marginTop: "20px" };
const attendanceGridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" };
const attendanceItemStyle = { padding: "10px", border: "1px solid #ccc", borderRadius: "5px" };
const buttonContainerStyle = { textAlign: "center", marginTop: "20px" };
const buttonStyle = { padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" };
const matrixContainerStyle = { marginTop: "20px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" };
const matrixStyle = { borderCollapse: "collapse", width: "100%" };
const seatStyle = { padding: "10px", border: "1px solid #ccc", textAlign: "center", backgroundColor: "#e7f3ff" };

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
  getDoc,
} from "firebase/firestore";

const GenerateSeating = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch teacher-specific classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return;
      try {
        const classesQuery = query(
          collection(db, "Classes"),
          where("teacherId", "==", teacherId)
        );
        const snapshot = await getDocs(classesQuery);
        const classList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classList);
      } catch (err) {
        console.error("Error fetching classes:", err.message);
      }
    };
    fetchClasses();
  }, [teacherId]);

  // Fetch students based on selected class
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClass) {
        setStudents([]);
        setAttendance({});
        setSeatingMatrix([]); // Clear seating matrix when switching classes
        return;
      }
      try {
        const studentsQuery = query(
          collection(db, "Students"),
          where("classId", "==", selectedClass)
        );
        const snapshot = await getDocs(studentsQuery);
        const studentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const initialAttendance = {};
        studentList.forEach((student) => (initialAttendance[student.id] = true));

        setStudents(studentList);
        setAttendance(initialAttendance);

        // Fetch existing seating arrangement (if any)
        const seatingDocRef = doc(db, "SeatingArrangements", selectedClass);
        const seatingDoc = await getDoc(seatingDocRef);
        if (seatingDoc.exists()) {
          setSeatingMatrix(seatingDoc.data().seatingMatrix);
        } else {
          setSeatingMatrix([]);
        }
      } catch (err) {
        console.error("Error fetching students:", err.message);
      }
    };
    fetchStudents();
  }, [selectedClass]);

  // Handle attendance toggle
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  // Generate seating matrix
  const handleGenerate = async () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );

    if (presentStudents.length === 0) {
      alert("No students are marked as present.");
      setLoading(false);
      return;
    }

    // Generate matrix of 8 students per row
    const matrix = [];
    for (let i = 0; i < presentStudents.length; i += 8) {
      const row = presentStudents
        .slice(i, i + 8)
        .map((student) => student.name);
      matrix.push(row);
    }

    console.log("Generated Seating Matrix:", matrix);
    setSeatingMatrix(matrix);
    setLoading(false);

    // Save seating arrangement automatically
    await saveSeatingArrangement(matrix);
  };

  // Save seating arrangement
  const saveSeatingArrangement = async (matrix) => {
    try {
      const seatingDocRef = doc(db, "SeatingArrangements", selectedClass);
      await setDoc(seatingDocRef, {
        classId: selectedClass,
        seatingMatrix: matrix,
        timestamp: new Date(), // Optional: add a timestamp
      });
      console.log("Seating arrangement saved successfully.");
      alert("Seating arrangement saved successfully!");
    } catch (error) {
      console.error("Error saving seating arrangement:", error.message);
      alert("An error occurred while saving the seating arrangement.");
    }
  };

  // Reset Attendance
  const resetAttendance = () => {
    const reset = {};
    students.forEach((student) => (reset[student.id] = false));
    setAttendance(reset);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Generate Seating Arrangement</h2>


      <div style={cardContainerStyle}>
        {classes.map((cls) => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            style={{
              ...classCardStyle,
              backgroundColor: selectedClass === cls.id ? "#007bff" : "#f9f9f9",
              color: selectedClass === cls.id ? "white" : "black",
            }}
          >
            {cls.name}
          </div>
        ))}
      </div>


      {students.length > 0 && (
        <div style={attendanceSectionStyle}>
          <h3>Mark Attendance</h3>
          <button onClick={resetAttendance} style={resetButtonStyle}>
            Reset Attendance
          </button>
          <div style={attendanceGridStyle}>
            {students.map((student) => (
              <div key={student.id} style={attendanceItemStyle}>
                <label>
                  <input
                    type="checkbox"
                    checked={attendance[student.id]}
                    onChange={() => handleAttendanceChange(student.id)}
                  />
                  {student.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}


      <div style={buttonContainerStyle}>
        <button onClick={handleGenerate} style={buttonStyle}>
          Generate Seating
        </button>
      </div>


      {loading ? (
        <p>Loading seating arrangement...</p>
      ) : seatingMatrix.length > 0 ? (
        <div style={matrixContainerStyle}>
          <h3>Seating Arrangement for {classes.find(cls => cls.id === selectedClass)?.name}</h3>
          <table style={matrixStyle}>
            <tbody>
              {seatingMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((student, colIndex) => (
                    <td key={colIndex} style={seatStyle}>
                      {student}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No seating arrangement generated yet.</p>
      )}
    </div>
  );
};

// Styles
const resetButtonStyle = { marginBottom: "10px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" };
const containerStyle = { padding: "20px", maxWidth: "800px", margin: "auto" };
const headerStyle = { textAlign: "center", color: "#007bff" };
const cardContainerStyle = { display: "flex", gap: "10px", flexWrap: "wrap" };
const classCardStyle = { padding: "15px", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer", width: "150px", textAlign: "center" };
const attendanceSectionStyle = { marginTop: "20px" };
const attendanceGridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" };
const attendanceItemStyle = { padding: "10px", border: "1px solid #ccc", borderRadius: "5px" };
const buttonContainerStyle = { textAlign: "center", marginTop: "20px" };
const buttonStyle = { padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" };
const matrixContainerStyle = { marginTop: "20px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" };
const matrixStyle = { borderCollapse: "collapse", width: "100%" };
const seatStyle = { padding: "10px", border: "1px solid #ccc", textAlign: "center", backgroundColor: "#e7f3ff" };

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
  getDoc,
  updateDoc,
} from "firebase/firestore";

const GenerateSeating = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch teacher-specific classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return;
      try {
        const classesQuery = query(
          collection(db, "Classes"),
          where("teacherId", "==", teacherId)
        );
        const snapshot = await getDocs(classesQuery);
        const classList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classList);
      } catch (err) {
        console.error("Error fetching classes:", err.message);
      }
    };
    fetchClasses();
  }, [teacherId]);

  // Fetch students based on selected class
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClass) {
        setStudents([]);
        setAttendance({});
        setSeatingMatrix([]);
        return;
      }
      try {
        const studentsQuery = query(
          collection(db, "Students"),
          where("classId", "==", selectedClass)
        );
        const snapshot = await getDocs(studentsQuery);
        const studentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const initialAttendance = {};
        studentList.forEach((student) => (initialAttendance[student.id] = true));

        setStudents(studentList);
        setAttendance(initialAttendance);

        // Fetch existing seating for current class
        const seatingDocRef = doc(
          db,
          "GeneratedSeating",
          teacherId,
          "Classes",
          selectedClass
        );
        const seatingDoc = await getDoc(seatingDocRef);
        if (seatingDoc.exists()) {
          setSeatingMatrix(seatingDoc.data().matrix || []);
        } else {
          setSeatingMatrix([]);
        }
      } catch (err) {
        console.error("Error fetching students:", err.message);
      }
    };
    fetchStudents();
  }, [selectedClass, teacherId]);

  // Handle attendance toggle
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  // Generate seating matrix
  const handleGenerate = async () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );

    if (presentStudents.length === 0) {
      alert("No students are marked as present.");
      setLoading(false);
      return;
    }

    // Generate matrix of 8 students per row
    const matrix = [];
    for (let i = 0; i < presentStudents.length; i += 8) {
      const row = presentStudents
        .slice(i, i + 8)
        .map((student) => student.name);
      matrix.push(row);
    }

    setSeatingMatrix(matrix);
    setLoading(false);

    // Save the generated seating
    await saveSeatingToDB(matrix);
  };

  // Save seating arrangement into Firestore
  const saveSeatingToDB = async (matrix) => {
    if (!teacherId) {
      console.error("Error: Missing teacherId.");
      alert("Teacher ID is missing. Unable to save arrangement.");
      return;
    }

    if (!selectedClass) {
      console.error("Error: Missing selected class.");
      alert("Class is not selected. Unable to save arrangement.");
      return;
    }

    if (!matrix || matrix.length === 0) {
      alert("No seating arrangement to save.");
      return;
    }

    try {
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
      const time = currentDate.toTimeString().split(" ")[0]; // HH:MM:SS

      console.log("Original Matrix:", matrix);

      // Flatten the seating matrix into an array of objects
      const flattenedMatrix = matrix.flatMap((row, rowIndex) =>
        row.map((student, colIndex) => ({
          row: rowIndex + 1,
          seat: colIndex + 1,
          studentName: student,
        }))
      );

      console.log("Flattened Matrix:", flattenedMatrix);

      // Reference to Firestore
      const seatingDocRef = doc(
        db,
        "GeneratedSeating", // Main collection
        teacherId, // Document: teacher ID
        "Classes", // Subcollection
        selectedClass // Document: class ID
      );

      // Fetch existing data
      const seatingDoc = await getDoc(seatingDocRef);
      const existingSeating = seatingDoc.exists()
        ? seatingDoc.data().generatedSeatings || []
        : [];

      // Append the new seating arrangement
      const updatedSeating = [
        ...existingSeating,
        { date, time, seatingMatrix: flattenedMatrix },
      ];

      // Save back to Firestore
      await setDoc(seatingDocRef, { generatedSeatings: updatedSeating }, { merge: true });

      console.log("Seating arrangement saved successfully!");
      alert("Seating arrangement saved successfully!");
    } catch (error) {
      console.error("Error saving seating arrangement:", error.message);
      alert("An error occurred: " + error.message);
    }
  };




  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Generate Seating Arrangement</h2>


      <div style={cardContainerStyle}>
        {classes.map((cls) => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            style={{
              ...classCardStyle,
              backgroundColor: selectedClass === cls.id ? "#007bff" : "#f9f9f9",
              color: selectedClass === cls.id ? "white" : "black",
            }}
          >
            {cls.name}
          </div>
        ))}
      </div>


      {students.length > 0 && (
        <div style={attendanceSectionStyle}>
          <h3>Mark Attendance</h3>
          <div style={attendanceGridStyle}>
            {students.map((student) => (
              <div key={student.id} style={attendanceItemStyle}>
                <label>
                  <input
                    type="checkbox"
                    checked={attendance[student.id]}
                    onChange={() => handleAttendanceChange(student.id)}
                  />
                  {student.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}


      <div style={buttonContainerStyle}>
        <button onClick={handleGenerate} style={buttonStyle}>
          Generate Seating
        </button>
      </div>


      {loading ? (
        <p>Loading seating arrangement...</p>
      ) : seatingMatrix.length > 0 ? (
        <div style={matrixContainerStyle}>
          <h3>
            Seating Arrangement for{" "}
            {classes.find((cls) => cls.id === selectedClass)?.name}
          </h3>
          <table style={matrixStyle}>
            <tbody>
              {seatingMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((student, colIndex) => (
                    <td key={colIndex} style={seatStyle}>
                      {student}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No seating arrangement generated yet.</p>
      )}
    </div>
  );
};

// Styles
const containerStyle = { padding: "20px", maxWidth: "800px", margin: "auto" };
const headerStyle = { textAlign: "center", color: "#007bff" };
const cardContainerStyle = { display: "flex", gap: "10px", flexWrap: "wrap" };
const classCardStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  cursor: "pointer",
  width: "150px",
  textAlign: "center",
};
const attendanceSectionStyle = { marginTop: "20px" };
const attendanceGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "10px",
};
const attendanceItemStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};
const buttonContainerStyle = { textAlign: "center", marginTop: "20px" };
const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
};
const matrixContainerStyle = {
  marginTop: "20px",
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "8px",
};
const matrixStyle = { borderCollapse: "collapse", width: "100%" };
const seatStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "center",
  backgroundColor: "#e7f3ff",
};

export default GenerateSeating;
*/
import React, { useState, useEffect,useContext } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { ThemeContext } from "../App"; // Import ThemeContext

const GenerateSeating = ({ teacherId }) => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState({});
  const [seatingMatrix, setSeatingMatrix] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext); // Access theme

  // Fetch teacher-specific classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return;
      try {
        const classesQuery = query(
          collection(db, "Classes"),
          where("teacherId", "==", teacherId)
        );
        const snapshot = await getDocs(classesQuery);
        const classList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classList);
      } catch (err) {
        console.error("Error fetching classes:", err.message);
      }
    };
    fetchClasses();
  }, [teacherId]);

  // Fetch students and existing seating when a class is selected
  useEffect(() => {
    const fetchStudentsAndSeating = async () => {
      if (!selectedClass) {
        setStudents([]);
        setAttendance({});
        setSeatingMatrix([]);
        return;
      }
      try {
        const studentsQuery = query(
          collection(db, "Students"),
          where("classId", "==", selectedClass)
        );
        const snapshot = await getDocs(studentsQuery);
        const studentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const initialAttendance = {};
        studentList.forEach((student) => (initialAttendance[student.id] = true));

        setStudents(studentList);
        setAttendance(initialAttendance);

        // Fetch existing seating for the current class
        const seatingDocRef = doc(
          db,
          "GeneratedSeating",
          teacherId,
          "Classes",
          selectedClass
        );
        const seatingDoc = await getDoc(seatingDocRef);

        if (seatingDoc.exists() && seatingDoc.data().generatedSeatings.length) {
          const latestSeating =
            seatingDoc.data().generatedSeatings.slice(-1)[0].seatingMatrix;

          // Reconstruct seating matrix
          const reconstructedMatrix = reconstructMatrix(latestSeating);
          setSeatingMatrix(reconstructedMatrix);
        } else {
          setSeatingMatrix([]);
          console.log("No previous seating arrangement found.");
        }
      } catch (err) {
        console.error("Error fetching students and seating:", err.message);
      }
    };
    fetchStudentsAndSeating();
  }, [selectedClass, teacherId]);

  // Helper function to reconstruct matrix from flattened data
  const reconstructMatrix = (flattenedMatrix) => {
    const matrix = [];
    flattenedMatrix.forEach((seat) => {
      const { row, studentName } = seat;

      if (!matrix[row - 1]) matrix[row - 1] = []; // Ensure row exists
      matrix[row - 1].push(studentName);
    });
    return matrix;
  };

  // Handle attendance toggle
  const handleAttendanceChange = (studentId) => {
    setAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  // Generate seating matrix
  const handleGenerate = async () => {
    if (!selectedClass) {
      alert("Please select a class before generating the seating arrangement.");
      return;
    }

    setLoading(true);

    const presentStudents = students.filter(
      (student) => attendance[student.id]
    );

    if (presentStudents.length === 0) {
      alert("No students are marked as present.");
      setLoading(false);
      return;
    }

    const matrix = [];
    for (let i = 0; i < presentStudents.length; i += 8) {
      const row = presentStudents
        .slice(i, i + 8)
        .map((student) => student.name);
      matrix.push(row);
    }

    setSeatingMatrix(matrix);
    setLoading(false);

    // Save the generated seating
    await saveSeatingToDB(matrix);
  };

  // Save seating arrangement into Firestore
  const saveSeatingToDB = async (matrix) => {
    if (!teacherId || !selectedClass) return;

    try {
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0];
      const time = currentDate.toTimeString().split(" ")[0];

      const flattenedMatrix = matrix.flatMap((row, rowIndex) =>
        row.map((student, colIndex) => ({
          row: rowIndex + 1,
          seat: colIndex + 1,
          studentName: student,
        }))
      );

      const seatingDocRef = doc(
        db,
        "GeneratedSeating",
        teacherId,
        "Classes",
        selectedClass
      );

      const seatingDoc = await getDoc(seatingDocRef);
      const existingSeating = seatingDoc.exists()
        ? seatingDoc.data().generatedSeatings || []
        : [];

      const updatedSeating = [
        ...existingSeating,
        { date, time, seatingMatrix: flattenedMatrix },
      ];

      await setDoc(
        seatingDocRef,
        { generatedSeatings: updatedSeating },
        { merge: true }
      );

      alert("Seating arrangement saved successfully!");
    } catch (error) {
      console.error("Error saving seating arrangement:", error);
      alert("Failed to save seating arrangement. Please try again.");
    }
  };


  const Styles = {
    pageContainer: {
      display: "flex",
      flexDirection: "row",
      minHeight: "95vh",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
      color: theme === "light" ? "#333" : "#f9f9f9",
      boxSizing: "border-box",
      flexWrap: "wrap", // Allow wrapping for smaller screens
    },
    sidebarSpacing: {
      width: "300px",
      flexShrink: 0,
      "@media (maxWidth: 768px)": {
        display: "none", // Hide sidebar on smaller screens
      },
    },
    mainContent: {
      flex: 1,
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme === "light" ? "#ffffff" : "#1E1E1E",
      borderRadius: "12px",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(0, 0, 0, 0.5)",
        "@media (maxWidth: 768px)": {
    padding: "10px", // Less padding for mobile
  },
    },
    containerStyle: {
      padding: "20px",
      maxWidth: "800px",
      width: "100%",
    },
    headerStyle: {
      textAlign: "center",
      color: theme === "light" ? "#007bff" : "#90CAF9",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    cardContainerStyle: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    classCardStyle: {
      padding: "15px",
      border: "1px solid",
      borderColor: theme === "light" ? "#ddd" : "#444",
      borderRadius: "8px",
      cursor: "pointer",
      width: "150px",
      textAlign: "center",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#2C2C2C",
      color: theme === "light" ? "#333" : "#f9f9f9",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    attendanceSectionStyle: {
      marginTop: "20px",
      width: "100%",
    },
    attendanceGridStyle: {
      display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", // Flexible grid for mobile
  gap: "10px",
    },
    attendanceItemStyle: {
      padding: "10px",
      border: "1px solid",
      borderColor: theme === "light" ? "#ccc" : "#444",
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#ffffff" : "#2C2C2C",
      color: theme === "light" ? "#333" : "#f9f9f9",
    },
    buttonContainerStyle: {
      textAlign: "center",
      marginTop: "20px",
    },
    buttonStyle: {
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    matrixContainerStyle: {
      marginTop: "20px",
      backgroundColor: theme === "light" ? "#ffffff" : "#1E1E1E",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(0, 0, 0, 0.3)",
      width: "100%",
      display: "flex", // Ensures all items are in a row
      flexWrap: "wrap", // Allows wrapping to the next line if needed
      gap: "15px", // Add spacing between items
      justifyContent: "center", // Center align for mobile
    },
    ixStyle: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
      gap: "10px",
    },
    seatStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      borderRadius: "10px",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #555",
      backgroundColor: theme === "light" ? "#e3f2fd" : "#37474f",
      color: theme === "light" ? "#333" : "#f9f9f9",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      flex: "0 0 auto", // Ensures consistent size and prevents shrinking
      minWidth: "80px", // Adjust to ensure consistent spacing
      maxWidth: "150px", // Optional: prevent seats from being too large
    },
  };
  
  
  
  


  return (
    <div style={Styles.pageContainer}>
      <div style={Styles.sidebarSpacing}></div> {/* Sidebar spacing for alignment */}
      <div style={Styles.mainContent}>
        <div style={Styles.containerStyle}>
          
  
          {/* Class Selection */}
          <div style={Styles.cardContainerStyle}>
            {classes.map((cls) => (
              <div
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                style={{
                  ...Styles.classCardStyle,
                  backgroundColor: selectedClass === cls.id ? "#007bff" : "#f9f9f9",
                  color: selectedClass === cls.id ? "white" : "black",
                }}
              >
                {cls.name}
              </div>
            ))}
          </div>
  
          {/* Attendance Section */}
          {students.length > 0 && (
            <div style={Styles.attendanceSectionStyle}>
              <h3>Mark Attendance</h3>
              <div style={Styles.attendanceGridStyle}>
                {students.map((student) => (
                  <div key={student.id} style={Styles.attendanceItemStyle}>
                    <label>
                      <input
                        type="checkbox"
                        checked={attendance[student.id]}
                        onChange={() => handleAttendanceChange(student.id)}
                      />
                      {student.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
  
          <div style={Styles.buttonContainerStyle}>
            <button onClick={handleGenerate} style={Styles.buttonStyle}>
              Generate Seating
            </button>
          </div>
  
          {loading ? (
            <p>Loading seating arrangement...</p>
          ) : seatingMatrix.length > 0 ? (
            <div style={Styles.matrixContainerStyle}>
              <h3>Seating Arrangement</h3>
              <table style={Styles.matrixStyle}>
                <tbody>
                  {seatingMatrix.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {row.map((student, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        style={Styles.seatStyle}
                      >
                        {student}
                      </div>
                      ))}
                    </div>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No seating arrangement generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
  
};



export default GenerateSeating;
