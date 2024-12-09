/*
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const ShowQuesResults = () => {
  const navigate = useNavigate();
  const { studentId } = useParams(); // Get the student ID from the URL
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const questionnaireStructure = {
    "Comfort and Focus": [
      "Preferred Seating Location",
      "Reason for Seating Preference",
      "Focus Location",
      "Hard to Concentrate Areas",
    ],
    "Peer Interaction": [
      "Sitting with Friends",
      "Group Activity Preference",
    ],
    "Behavior and Participation": [
      "Participation Effect",
      "Hard to Stay on Task Spots",
    ],
    "Special Needs": [
      "Comfort Needs",
      "Easier Learning Arrangement",
    ],
    "Language Proficiency": [
      "Home Language",
      "Same Language Preference",
      "Language Practice Preference",
    ],
    "General Preferences and Observations": [
      "Best Learning Spot",
      "Additional Thoughts",
    ],
  };

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const docRef = doc(db, "Students", studentId, "Questionnaire", "Responses");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResponses(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching questionnaire responses: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [studentId]);

  const handleInputChange = (section, question, value) => {
    setResponses((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [question]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "Students", studentId, "Questionnaire", "Responses");
      await setDoc(docRef, responses);
      alert("Responses updated successfully!");
      setIsEditing(false); // Disable editing after saving
    } catch (error) {
      console.error("Error saving responses: ", error);
      alert("Failed to save responses. Please try again.");
    }
  };

  const styles = {
    container: {
      width: "100%",
      height: "100%",
      padding: "20px",
      background: "linear-gradient(to bottom, #e3f2fd, #bbdefb)",
      fontFamily: "'Arial', sans-serif",
    },
    innerContainer: {
      maxWidth: "900px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      padding: "20px",
    },
    header: {
      textAlign: "center",
      color: "#ffffff",
      backgroundColor: "#1e88e5",
      padding: "20px",
      borderRadius: "8px 8px 0 0",
    },
    section: {
      marginBottom: "30px",
    },
    backButton: {
      position: "absolute",
      left: "20px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      zIndex: 1000,
    },
    questionBox: {
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f4f4f9",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontWeight: "bold",
      color: "#333",
      fontSize: "16px",
    },
    input: {
      width: "100%",
      height: "40px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      marginBottom: "10px",
      fontSize: "14px",
      boxSizing: "border-box",
      backgroundColor: isEditing ? "#ffffff" : "#e9ecef",
      cursor: isEditing ? "text" : "not-allowed",
    },
    textarea: {
      width: "100%",
      height: "100px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      boxSizing: "border-box",
      backgroundColor: isEditing ? "#ffffff" : "#e9ecef",
      cursor: isEditing ? "text" : "not-allowed",
    },
    editButton: {
      padding: "15px 25px",
      backgroundColor: "#ff4933",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom: "30px",
    },
    saveButton: {
      display: "block",
      width: "100%",
      padding: "15px",
      backgroundColor: "#28a745",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
    },
    noData: {
      textAlign: "center",
      color: "#666",
      fontSize: "16px",
    },
  };

  if (loading) {
    return <p style={styles.noData}>Loading results...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <header style={styles.header}>
          <h1>Questionnaire Results</h1>
        </header>
        <button
          style={styles.backButton}
          onClick={() => navigate("/show-students")}
        >
          Back
        </button>
        <button
          style={styles.editButton}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Cancel Edit" : "Edit"}
        </button>

        {Object.keys(questionnaireStructure).map((section) => (
          <section key={section} style={styles.section}>
            <h2>{section}</h2>
            {questionnaireStructure[section].map((question) => (
              <div key={question} style={styles.questionBox}>
                <label style={styles.label}>
                  {question}
                  {question.includes("Why") || question.includes("Reason") ? (
                    <textarea
                      value={responses[section]?.[question] || ""}
                      style={styles.textarea}
                      onChange={(e) =>
                        isEditing &&
                        handleInputChange(section, question, e.target.value)
                      }
                      readOnly={!isEditing}
                    />
                  ) : (
                    <input
                      type="text"
                      value={responses[section]?.[question] || ""}
                      style={styles.input}
                      onChange={(e) =>
                        isEditing &&
                        handleInputChange(section, question, e.target.value)
                      }
                      readOnly={!isEditing}
                    />
                  )}
                </label>
              </div>
            ))}
          </section>
        ))}

        {isEditing && (
          <button style={styles.saveButton} onClick={handleSave}>
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowQuesResults;
*/
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

const ShowQuesResults = () => {
  const { theme } = useContext(ThemeContext); // Access theme from context
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const questionnaireStructure = {
    "Comfort and Focus": [
      "Preferred Seating Location",
      "Reason for Seating Preference",
      "Focus Location",
      "Hard to Concentrate Areas",
    ],
    "Peer Interaction": [
      "Sitting with Friends",
      "Group Activity Preference",
    ],
    "Behavior and Participation": [
      "Participation Effect",
      "Hard to Stay on Task Spots",
    ],
    "Special Needs": [
      "Comfort Needs",
      "Easier Learning Arrangement",
    ],
    "Language Proficiency": [
      "Home Language",
      "Same Language Preference",
      "Language Practice Preference",
    ],
    "General Preferences and Observations": [
      "Best Learning Spot",
      "Additional Thoughts",
    ],
  };

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const docRef = doc(db, "Students", studentId, "Questionnaire", "Responses");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResponses(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching questionnaire responses: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [studentId]);

  const handleInputChange = (section, question, value) => {
    setResponses((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [question]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "Students", studentId, "Questionnaire", "Responses");
      await setDoc(docRef, responses);
      alert("Responses updated successfully!");
      setIsEditing(false); // Disable editing after saving
      navigate("/show-students"); // Redirect to the Show Students page
    } catch (error) {
      console.error("Error saving responses: ", error);
      alert("Failed to save responses. Please try again.");
    }
  };

  const styles = {
    container: {
      width: "100%",
      height: "100%",
      padding: "20px",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
      color: theme === "light" ? "#333" : "#f9f9f9",
      fontFamily: "'Arial', sans-serif",
    },
    innerContainer: {
      maxWidth: "900px",
      margin: "0 auto",
      backgroundColor: theme === "light" ? "#ffffff" : "#1e1e1e",
      borderRadius: "8px",
      boxShadow: theme === "light" ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "0 8px 16px rgba(0, 0, 0, 0.6)",
      padding: "20px",
    },
    header: {
      textAlign: "center",
      color: theme === "light" ? "#ffffff" : "#f9f9f9",
      backgroundColor: theme === "light" ? "#1e88e5" : "#333",
      padding: "20px",
      borderRadius: "8px 8px 0 0",
    },
    section: {
      marginBottom: "30px",
    },
    questionBox: {
      marginBottom: "20px",
      padding: "15px",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#f4f4f9" : "#2e2e2e",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontWeight: "bold",
      color: theme === "light" ? "#333" : "#f9f9f9",
      fontSize: "16px",
    },
    input: {
      width: "100%",
      height: "40px",
      padding: "10px",
      border: theme === "light" ? "1px solid #ccc" : "1px solid #555",
      borderRadius: "6px",
      marginBottom: "10px",
      fontSize: "14px",
      boxSizing: "border-box",
      backgroundColor: isEditing
        ? theme === "light"
          ? "#ffffff"
          : "#1e1e1e"
        : theme === "light"
        ? "#e9ecef"
        : "#333",
      color: theme === "light" ? "#333" : "#f9f9f9",
      cursor: isEditing ? "text" : "not-allowed",
    },
    textarea: {
      width: "100%",
      height: "100px",
      padding: "10px",
      border: theme === "light" ? "1px solid #ccc" : "1px solid #555",
      borderRadius: "6px",
      fontSize: "14px",
      resize: "none",
      boxSizing: "border-box",
      backgroundColor: isEditing
        ? theme === "light"
          ? "#ffffff"
          : "#1e1e1e"
        : theme === "light"
        ? "#e9ecef"
        : "#333",
      color: theme === "light" ? "#333" : "#f9f9f9",
      cursor: isEditing ? "text" : "not-allowed",
    },
    editButton: {
      padding: "15px 25px",
      backgroundColor: "#ff4933",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom: "30px",
    },
    saveButton: {
      display: "block",
      width: "100%",
      padding: "15px",
      backgroundColor: "#28a745",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
    },
    noData: {
      textAlign: "center",
      color: theme === "light" ? "#666" : "#ccc",
      fontSize: "16px",
    },
  };

  if (loading) {
    return <p style={styles.noData}>Loading results...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <header style={styles.header}>
          <h1>Questionnaire Results</h1>
        </header>
        <button
          style={styles.editButton}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Cancel Edit" : "Edit"}
        </button>

        {Object.keys(questionnaireStructure).map((section) => (
          <section key={section} style={styles.section}>
            <h2>{section}</h2>
            {questionnaireStructure[section].map((question) => (
              <div key={question} style={styles.questionBox}>
                <label style={styles.label}>
                  {question}
                  {question.includes("Why") || question.includes("Reason") ? (
                    <textarea
                      value={responses[section]?.[question] || ""}
                      style={styles.textarea}
                      onChange={(e) =>
                        isEditing &&
                        handleInputChange(section, question, e.target.value)
                      }
                      readOnly={!isEditing}
                    />
                  ) : (
                    <input
                      type="text"
                      value={responses[section]?.[question] || ""}
                      style={styles.input}
                      onChange={(e) =>
                        isEditing &&
                        handleInputChange(section, question, e.target.value)
                      }
                      readOnly={!isEditing}
                    />
                  )}
                </label>
              </div>
            ))}
          </section>
        ))}

        {isEditing && (
          <button style={styles.saveButton} onClick={handleSave}>
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowQuesResults;