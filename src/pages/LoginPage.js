/*
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Login successful!");
      navigate("/teacher"); // Redirect to the dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
*/
/*
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firebase DB instance

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Fetch the teacher's data from Firestore
      const teacherDoc = await getDoc(doc(db, "Teachers", userCredential.user.uid));
      if (teacherDoc.exists()) {
        console.log("Teacher Data:", teacherDoc.data());
        alert("Login successful!");
        navigate("/teacher"); // Redirect to the teacher dashboard
      } else {
        throw new Error("No teacher record found. Please contact support.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Login</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid lightgray",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid lightgray",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
*/
/*
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firebase DB instance

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Fetch the teacher's data from Firestore
      const teacherDoc = await getDoc(doc(db, "Teachers", userCredential.user.uid));
      if (teacherDoc.exists()) {
        console.log("Teacher Data:", teacherDoc.data());
        navigate("/teacher"); // Redirect to the teacher dashboard
      } else {
        throw new Error("No teacher record found. Please contact support.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid lightgray",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid lightgray",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
*/

import React, { useState, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ThemeContext } from "../App"; // Import ThemeContext

const LoginPage = () => {
  const { theme } = useContext(ThemeContext); // Access theme
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const teacherDoc = await getDoc(doc(db, "Teachers", userCredential.user.uid));
      if (teacherDoc.exists()) {
        console.log("Teacher Data:", teacherDoc.data());
        navigate("/teacher");
      } else {
        throw new Error("No teacher record found. Please contact support.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  // Dynamic styles based on the theme
  const styles = {
    body: {
      backgroundColor: theme === "light" ? "#f0f0f0" : "#121212",
      backgroundImage: `url(${theme === "light" ? "/path/to/light-image.jpg" : "/path/to/dark-image.jpg"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: theme === "light" ? "#333" : "#fff",
      fontFamily: "'Poppins', sans-serif",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "400px",
      backgroundColor: theme === "light" ? "#ffffff" : "rgba(40, 40, 40, 0.9)",
      padding: "50px 35px",
      borderRadius: "10px",
      backdropFilter: theme === "light" ? "none" : "blur(10px)",
      border: theme === "light" ? "1px solid #ddd" : "2px solid rgba(255, 255, 255, 0.1)",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 0 40px rgba(8, 7, 16, 0.6)",
    },
    header: {
      fontSize: "32px",
      fontWeight: "600",
      color: theme === "light" ? "#333" : "#fff",
      textAlign: "center",
      borderBottom: `2px solid ${theme === "light" ? "#007bff" : "#fff"}`,
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    input: {
      display: "block",
      width: "100%",
      height: "50px",
      marginTop: "20px",
      padding: "10px",
      borderRadius: "3px",
      backgroundColor: theme === "light" ? "#f9f9f9" : "rgba(255, 255, 255, 0.07)",
      color: theme === "light" ? "#333" : "#fff",
      fontSize: "14px",
      outline: "none",
      border: theme === "light" ? "1px solid #ddd" : "1px solid #444",
    },
    button: {
      width: "100%",
      marginTop: "30px",
      padding: "15px",
      borderRadius: "5px",
      backgroundColor: theme === "light" ? "#007bff" : "#333",
      color: theme === "light" ? "#fff" : "#fff",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      border: "none",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginTop: "10px",
    },
  };

  return (

    <div style={styles.body}>
      <form style={styles.container} onSubmit={handleSubmit}>
        <h3 style={styles.header}>Login</h3>
        {error && <p style={styles.error}>{error}</p>}
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
        <button type="submit" style={styles.button}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
