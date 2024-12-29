import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ThemeContext } from "../App"; // Import ThemeContext
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerUser } from "../services/authHandler"; 
import { addTeacher } from "../services/teacherHandler"; 




const RegisterPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await registerUser(formData.email, formData.password, formData.name);

      // Save teacher details to Firestore
      await addTeacher(user.uid, {
        name: formData.name,
        email: formData.email,
      });

      alert(`Registration successful! Welcome, ${user.email}.`);
      setFormData({ email: "", password: "", name: "" });
      navigate("/login");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };
  const styles = {
    pageContainer: {
      display: "flex",
      flexDirection: "row",
      minHeight: "100vh",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
      color: theme === "light" ? "#333" : "#f9f9f9",
      padding: "20px",
      boxSizing: "border-box",
      flexWrap: "wrap",
    },
    sidebarSpacing: {
      width: "300px", // Adjust according to your sidebar width
      flexShrink: 0,
    },
    mainContent: {
      flex: 1,
      marginLeft: "250px",
      marginBottom: "500px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "300px",
      "@media (idth: 768px)": {
    marginLeft: "0", // Remove left margin for smaller screens
    marginTop: "50px", 
  },
    },
    container: {
      padding: "40px",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
      color: theme === "light" ? "#333" : "#f9f9f9",
      borderRadius: "12px",
      boxShadow: theme === "light"
        ? "0 4px 20px rgba(0, 0, 0, 0.1)"
        : "0 4px 20px rgba(0, 0, 0, 0.4)",
      fontFamily: "'Roboto', sans-serif",
      
      "@media (maxWidth: 768px)": {
    width: "90%", // Reduce width for smaller screens
    padding: "20px", // Adjust padding for compact view
  },
    },
    header: {
      textAlign: "center",
      fontSize: "28px",
      color: theme === "light" ? "#333" : "#f9f9f9",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    error: {
      color: "#e74c3c",
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "14px",
      fontWeight: "bold",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    input: {
      width: "95%",
      height: "15px",
      padding: "12px",
      borderRadius: "8px",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
      backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
      color: theme === "light" ? "#333" : "#f9f9f9",
      fontSize: "25px",
      outline: "none",
      boxShadow: theme === "light"
        ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
        : "inset 0 2px 4px rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease",
      "@media (maxWidth: 768px)": {
    height: "40px", // Reduce height for smaller screens
    fontSize: "16px", // Smaller font size for mobile
  },
    },
    button: {
      padding: "15px",
      borderRadius: "8px",
      width:"102%",
      backgroundColor: "#4CAF50" ,
      color: "#fff",
      fontSize: "18px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      boxShadow: theme === "light"
        ? "0 4px 10px rgba(0, 0, 0, 0.1)"
        : "0 4px 10px rgba(255, 255, 255, 0.1)",
    },
    buttonHover: {
      backgroundColor: theme === "light" ? "#45A049" : "#555", // Slightly darker color on hover
      transform: "scale(1.02)", // Enlarge slightly on hover
      boxShadow: theme === "light"
        ? "0 6px 15px rgba(0, 0, 0, 0.2)"
        : "0 6px 15px rgba(255, 255, 255, 0.2)", // Enhanced shadow effect
    },
    inputIcon: {
      position: "absolute",
      top: "50%",
      right: "10px", // Adjust based on padding
      transform: "translateY(-50%)",
      color: theme === "light" ? "#333" : "#f9f9f9",
      fontSize: "18px",
    },
    inputWrapper: {
      position: "relative",
      width: "100%",
      marginBottom: "15px",
    },
  };





  return (
    <div style={styles.container}>
      <div style={styles.sidebarSpacing}></div>
      <div style={styles.mainContent}>
      <div style={styles.container}>
<h2 style={styles.header}>Sign Up</h2>
{error && <p style={styles.error}>{error}</p>}
<form onSubmit={handleSubmit} style={styles.form}>
<div style={styles.inputWrapper}>
<FaUser style={styles.inputIcon} />
  <input
    type="text"
    name="name"
    placeholder="Full Name"
    value={formData.name}
    onChange={handleChange}
    required
    style={styles.input}
  />
  </div>
  <div style={styles.inputWrapper}>
  <FaEnvelope style={styles.inputIcon} />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    required
    style={styles.input}
  />
  </div>
  <div style={styles.inputWrapper}>
   <FaLock style={styles.inputIcon} />
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
    style={styles.input}
  />
  </div>
  <button
  type="submit"
  style={styles.button}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = theme === "light" ? "#007bff" : "#555";
    e.target.style.transform = "scale(1.02)";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#4CAF50";
    e.target.style.transform = "scale(1)";
  }}
  onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
  onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
>
Create Account
</button>


</form>
</div>
</div>
</div>
  );
};

export default RegisterPage;