/*
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
*/

import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ThemeContext } from "../App"; // Ensure you import ThemeContext from App.js

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
      const q = query(collection(db, "Students"), where("id", "==", studentId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents found.");
        return;
      }

      querySnapshot.forEach(async (studentDoc) => {
        const studentRef = doc(db, "Students", studentDoc.id, "Questionnaire", "Responses");
        await setDoc(studentRef, { ...responses });
      });

      alert("Responses saved successfully!");
      navigate("/show-students");
    } catch (error) {
      console.error("Error updating document:", error);
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
      fontSize: "24px",
      color: "#fff",
      backgroundColor: "#333",
      padding: "15px 0",
      borderRadius: "8px 8px 0 0",
    },
    sectionTitle: {
      fontWeight: "bold",
      fontSize: "18px",
      marginTop: "20px",
      marginBottom: "10px",
      textAlign: "center",
      textTransform: "uppercase",
    },
    questionBox: {
      marginBottom: "20px",
      padding: "20px",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#f4f4f9" : "#2e2e2e",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    inputRadioGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginLeft: "20px",
    },
    textarea: {
      width: "100%",
      height: "60px",
      padding: "10px",
      borderRadius: "6px",
      border: theme === "light" ? "1px solid #ccc" : "1px solid #555",
      backgroundColor: theme === "light" ? "#ffffff" : "#1e1e1e",
      color: theme === "light" ? "#333" : "#f9f9f9",
      resize: "none",
    },
    submitButton: {
      display: "block",
      width: "100%",
      padding: "15px",
      backgroundColor: "#28a745",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
    },
    radioOption: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: theme === "light" ? "#333" : "#f9f9f9",
    },
    radioInput: {
      appearance: "none",
      width: "20px",
      height: "20px",
      border: "2px solid",
      borderColor: theme === "light" ? "#333" : "#f9f9f9",
      borderRadius: "50%",
      outline: "none",
      cursor: "pointer",
      backgroundColor: theme === "light" ? "#fff" : "#444",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      transition: "all 0.3s ease",
    },
    radioInputChecked: {
      backgroundColor: "#28a745",
      borderColor: "#28a745",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <header style={styles.header}>
          <h1>Student Questionnaire</h1>
        </header>

        {/* Academic Performance */}
        <section>
          <h2 style={styles.sectionTitle}>Academic Performance</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Rate the student’s academic performance in the subject:
            </label>
            <div style={styles.inputRadioGroup}>
              {["Needs significant support", "Below average", "Average", "Above average", "Exceptional"].map((option) => (
                <div key={option} style={styles.radioOption}>
                <input
                  type="radio"
                  name="academicPerformance"
                  value={option}
                  onChange={(e) =>
                    handleInputChange("Academic Performance", "Rate performance", e.target.value)
                  }
                  style={{
                    ...styles.radioInput,
                    ...(responses?.["Academic Performance"]?.["Rate performance"] === option
                      ? styles.radioInputChecked
                      : {}),
                  }}
                />
                <span>{option}</span>
              </div>

              ))}
            </div>

            <label style={styles.label}>
              Does the student require additional academic assistance?
            </label>
            <div style={styles.inputRadioGroup}>
  {["Yes", "No"].map((option) => (
    <div key={option} style={styles.radioOption}>
      <input
        type="radio"
        name="additionalAssistance"
        value={option}
        onChange={(e) =>
          handleInputChange("Academic Performance", "Requires assistance?", e.target.value)
        }
        style={{
          ...styles.radioInput,
          ...(responses?.["Academic Performance"]?.["Requires assistance?"] === option
            ? styles.radioInputChecked
            : {}),
        }}
      />
      <span>{option}</span>
    </div>
  ))}
</div>

          </div>
        </section>

        {/* Behavioral and Social Traits */}
        <section>
          <h2 style={styles.sectionTitle}>Behavioral and Social Traits</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>Rate the student’s behavior in class:</label>
            <div style={styles.inputRadioGroup}>
  {["Disruptive", "Occasionally disruptive", "Neutral", "Positive influence", "Exemplary behavior"].map((option) => (
    <div key={option} style={styles.radioOption}>
      <input
        type="radio"
        name="behaviorInClass"
        value={option}
        onChange={(e) =>
          handleInputChange("Behavioral and Social Traits", "Behavior rating", e.target.value)
        }
        style={{
          ...styles.radioInput,
          ...(responses?.["Behavioral and Social Traits"]?.["Behavior rating"] === option
            ? styles.radioInputChecked
            : {}),
        }}
      />
      <span>{option}</span>
    </div>
  ))}
</div>


            <label style={styles.label}>
              Are there specific students this student should not be seated with? If yes, list names:
            </label>
            <textarea
              style={styles.textarea}
              onChange={(e) =>
                handleInputChange("Behavioral and Social Traits", "Students to avoid", e.target.value)
              }
            />
          </div>
        </section>

        {/* Special Needs */}
        <section>
          <h2 style={styles.sectionTitle}>Special Needs</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Does the student have any special needs or accommodations?
            </label>
            <div style={styles.inputRadioGroup}>
  {["Yes", "No"].map((option) => (
    <div key={option} style={styles.radioOption}>
      <input
        type="radio"
        name="specialNeeds"
        value={option}
        onChange={(e) =>
          handleInputChange("Special Needs", "Special accommodations", e.target.value)
        }
        style={{
          ...styles.radioInput,
          ...(responses?.["Special Needs"]?.["Special accommodations"] === option
            ? styles.radioInputChecked
            : {}),
        }}
      />
      <span>{option}</span>
    </div>
  ))}
</div>

          </div>
        </section>

        {/* Additional Insights */}
        <section>
          <h2 style={styles.sectionTitle}>Additional Insights</h2>
          <div style={styles.questionBox}>
            <label style={styles.label}>
              Are there any other notes about the student that could help with seating arrangements?
            </label>
            <textarea
              style={styles.textarea}
              onChange={(e) =>
                handleInputChange("Additional Insights", "Other notes", e.target.value)
              }
            />
          </div>
        </section>

        <button style={styles.submitButton} onClick={handleSubmit}>
          Submit Questionnaire
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;