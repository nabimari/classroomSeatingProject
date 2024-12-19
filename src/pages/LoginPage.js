/*
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
      gap: "20px",
    },
    input: {
      width: "100%",
      height: "50px",
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
      width: "105%",
      height: "50px",
      padding: "12px",
      margin : "20px auto",
      borderRadius: "8px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      fontSize: "18px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
      backgroundColor: "#45A049",
      transform: "scale(0.98)",
    },
  };


  return (

    <div style={styles.container}>
  <h2 style={styles.header}>Login</h2>
  {error && <p style={styles.error}>{error}</p>}
  <form style={styles.form} onSubmit={handleSubmit}>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      style={styles.input}
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      style={styles.input}
      required
    />
    <button
      type="submit"
      style={styles.button}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#45A049")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    >
      Log In
    </button>
  </form>
</div>
  );
};

export default LoginPage;