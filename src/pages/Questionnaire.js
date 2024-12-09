/*
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";


const Questionnaire = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});

  const handleInputChange = (section, question, value) => {
    setResponses((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [question]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!studentId) {
      alert("Student ID is missing. Please select a student.");
      return;
    }

    try {
      await setDoc(doc(db, "Students", studentId, "Questionnaire", "Responses"), {
        ...responses,
      });
      alert("Responses saved successfully!");
    } catch (error) {
      console.error("Error saving responses:", error);
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
    },
    textarea: {
      width: "100%",
      height: "100px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      resize: "none",
      boxSizing: "border-box",
    },
    submitButton: {
      display: "block",
      width: "100%",
      padding: "15px",
      backgroundColor: "#1e88e5",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
    },
    debug: {
      marginTop: "30px",
      padding: "10px",
      backgroundColor: "#f5f5f5",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <header style={styles.header}>
          <h1>Student Seating Preferences Questionnaire</h1>
        </header>

        <section style={styles.section}>
          <h2>Comfort and Focus</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Where do you like to sit in the classroom?
              <input
                type="text"
                style={styles.input}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Preferred Seating Location",
                    e.target.value
                  )
                }
              />
            </label>
            <label style={styles.label}>
              Why do you like sitting there?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Reason for Seating Preference",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Do you find it easier to focus in a specific part of the room? If
              yes, where?
              <input
                type="text"
                style={styles.input}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Focus Location",
                    e.target.value
                  )
                }
              />
            </label>
            <label style={styles.label}>
              Are there places where you find it harder to concentrate?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Hard to Concentrate Areas",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Peer Interaction</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Do you prefer sitting next to your friends, or do you focus better
              with other classmates?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Peer Interaction",
                    "Sitting with Friends",
                    e.target.value
                  )
                }
              />
            </label>
            <label style={styles.label}>
              During group activities, do you prefer being with friends or mixed
              with others?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Peer Interaction",
                    "Group Activity Preference",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Behavior and Participation</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Does where you sit affect how much you participate in class?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Behavior and Participation",
                    "Participation Effect",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Are there certain spots where it’s harder to stay on task?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Behavior and Participation",
                    "Hard to Stay on Task Spots",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Special Needs</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Is there anything special you need to feel comfortable in class?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange("Special Needs", "Comfort Needs", e.target.value)
                }
              />
            </label>
          </div>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Do certain seating arrangements make it easier for you to learn?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Special Needs",
                    "Easier Learning Arrangement",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <button
          style={styles.submitButton}
          onClick={() => {
          handleSubmit();
          navigate("/show-students");
  }}
>
  Submit Questionnaire
</button>
      </div>
    </div>
  );
};

export default Questionnaire;
*/
/*
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Import the Header component

const Questionnaire = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});

  const handleInputChange = (section, question, value) => {
    setResponses((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [question]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!studentId) {
      alert("Student ID is missing. Please select a student.");
      return;
    }

    try {
      await setDoc(doc(db, "Students", studentId, "Questionnaire", "Responses"), {
        ...responses,
      });
      alert("Responses saved successfully!");
    } catch (error) {
      console.error("Error saving responses:", error);
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
    },
    textarea: {
      width: "100%",
      height: "100px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      resize: "none",
      boxSizing: "border-box",
    },
    submitButton: {
      display: "block",
      width: "100%",
      padding: "15px",
      backgroundColor: "#1e88e5",
      color: "white",
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
    },
    debug: {
      marginTop: "30px",
      padding: "10px",
      backgroundColor: "#f5f5f5",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
  };

  return (
    <div>

    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <header style={styles.header}>
          <h1>Student Seating Preferences Questionnaire</h1>
        </header>

        <section style={styles.section}>
          <h2>Comfort and Focus</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Where do you like to sit in the classroom?
              <input
                type="text"
                style={styles.input}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Preferred Seating Location",
                    e.target.value
                  )
                }
              />
            </label>
            <label style={styles.label}>
              Why do you like sitting there?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Reason for Seating Preference",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Do you find it easier to focus in a specific part of the room? If
              yes, where?
              <input
                type="text"
                style={styles.input}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Focus Location",
                    e.target.value
                  )
                }
              />
            </label>
            <label style={styles.label}>
              Are there places where you find it harder to concentrate?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Hard to Concentrate Areas",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Peer Interaction</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Do you prefer sitting next to your friends, or do you focus better
              with other classmates?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Peer Interaction",
                    "Sitting with Friends",
                    e.target.value
                  )
                }
              />
            </label>
            <label style={styles.label}>
              During group activities, do you prefer being with friends or mixed
              with others?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Peer Interaction",
                    "Group Activity Preference",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Behavior and Participation</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Does where you sit affect how much you participate in class?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Behavior and Participation",
                    "Participation Effect",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Are there certain spots where it’s harder to stay on task?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Behavior and Participation",
                    "Hard to Stay on Task Spots",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Special Needs</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Is there anything special you need to feel comfortable in class?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange("Special Needs", "Comfort Needs", e.target.value)
                }
              />
            </label>
          </div>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Do certain seating arrangements make it easier for you to learn?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Special Needs",
                    "Easier Learning Arrangement",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <button
          style={styles.submitButton}
          onClick={() => {
          handleSubmit();
          navigate("/show-students");
  }}
>
  Submit Questionnaire
</button>
      </div>
    </div>
    </div>
  );

};

export default Questionnaire;
*/
import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ThemeContext } from "../App"; // Ensure you import the ThemeContext from App.js

const Questionnaire = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Access dark mode state
  const [responses, setResponses] = useState({});

  const handleInputChange = (section, question, value) => {
    setResponses((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [question]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!studentId) {
      alert("Student ID is missing. Please select a student.");
      return;
    }

    try {
      await setDoc(doc(db, "Students", studentId, "Questionnaire", "Responses"), {
        ...responses,
      });
      alert("Responses saved successfully!");
      navigate("/show-students");
    } catch (error) {
      console.error("Error saving responses:", error);
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
      backgroundColor: theme === "light" ? "#ffffff" : "#1e1e1e",
      color: theme === "light" ? "#333" : "#f9f9f9",
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
      backgroundColor: theme === "light" ? "#ffffff" : "#1e1e1e",
      color: theme === "light" ? "#333" : "#f9f9f9",
    },
    submitButton: {
      display: "block",
      width: "100%",
      padding: "15px",
      backgroundColor: theme === "light" ? "#1e88e5" : "#33ff52",
      color: "#181815",
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <header style={styles.header}>
          <h1>Student Seating Preferences Questionnaire</h1>
        </header>

        <section style={styles.section}>
          <h2>Comfort and Focus</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Where do you like to sit in the classroom?
              <input
                type="text"
                style={styles.input}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Preferred Seating Location",
                    e.target.value
                  )
                }
              />
            </label>
            <label style={styles.label}>
              Why do you like sitting there?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Reason for Seating Preference",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Do you find it easier to focus in a specific part of the room? If
              yes, where?
              <input
                type="text"
                style={styles.input}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Focus Location",
                    e.target.value
                  )
                }
              />
            </label>
            <label style={styles.label}>
              Are there places where you find it harder to concentrate?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Comfort and Focus",
                    "Hard to Concentrate Areas",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Peer Interaction</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Do you prefer sitting next to your friends, or do you focus better
              with other classmates?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Peer Interaction",
                    "Sitting with Friends",
                    e.target.value
                  )
                }
              />
            </label>
            <label style={styles.label}>
              During group activities, do you prefer being with friends or mixed
              with others?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Peer Interaction",
                    "Group Activity Preference",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Behavior and Participation</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Does where you sit affect how much you participate in class?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Behavior and Participation",
                    "Participation Effect",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Are there certain spots where it’s harder to stay on task?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Behavior and Participation",
                    "Hard to Stay on Task Spots",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Special Needs</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Is there anything special you need to feel comfortable in class?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange("Special Needs", "Comfort Needs", e.target.value)
                }
              />
            </label>
          </div>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Do certain seating arrangements make it easier for you to learn?
              <textarea
                style={styles.textarea}
                onChange={(e) =>
                  handleInputChange(
                    "Special Needs",
                    "Easier Learning Arrangement",
                    e.target.value
                  )
                }
              />
            </label>
          </div>
        </section>

        <button
          style={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit Questionnaire
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;