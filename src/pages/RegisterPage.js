/*
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase"; // Ensure the correct path to your firebase.js file
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save teacher details to Firestore
      await setDoc(doc(db, "Teachers", user.uid), {
        name: formData.name,
        email: formData.email,
      });

      alert(`Registration successful! Welcome, ${formData.name}.`);

      // Redirect to login page
      navigate("/login");

      setFormData({ email: "", password: "", name: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid lightgray" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid lightgray" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid lightgray" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: "lightblue",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
*/
import React, { useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { db } from "../firebase"; // Ensure the correct path to your firebase.js file
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ThemeContext } from "../App"; // Import ThemeContext

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
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: formData.name
      })

      // Save teacher details to Firestore
      await setDoc(doc(db, "Teachers", user.uid), {
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
    container: {
      padding: "40px",
      maxWidth: "500px",
      margin: "40px auto",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
      color: theme === "light" ? "#333" : "#f9f9f9",
      borderRadius: "12px",
      boxShadow: theme === "light"
        ? "0 4px 20px rgba(0, 0, 0, 0.1)"
        : "0 4px 20px rgba(0, 0, 0, 0.4)",
      fontFamily: "'Roboto', sans-serif",
      transform: "translateY(100px)",
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
      gap: "15px",
    },
    input: {
      padding: "12px",
      borderRadius: "8px",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
      backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
      color: theme === "light" ? "#333" : "#f9f9f9",
      fontSize: "16px",
      outline: "none",
      boxShadow: theme === "light"
        ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
        : "inset 0 2px 4px rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease",
    },
    button: {
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#4CAF50" : "#333",
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
  };


  return (
    <div style={styles.container}>
<h2 style={styles.header}>Register</h2>
{error && <p style={styles.error}>{error}</p>}
<form onSubmit={handleSubmit} style={styles.form}>
  <input
    type="text"
    name="name"
    placeholder="Full Name"
    value={formData.name}
    onChange={handleChange}
    required
    style={styles.input}
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    required
    style={styles.input}
  />
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
    style={styles.input}
  />
  <button
    type="submit"
    style={styles.button}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#45A049")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
    Register
  </button>
</form>
</div>
  );
};

export default RegisterPage;