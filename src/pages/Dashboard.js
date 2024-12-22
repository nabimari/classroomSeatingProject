import React, { useContext } from "react";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const styles = {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
      color: theme === "light" ? "#333" : "#f9f9f9",
      boxSizing: "border-box",
    },
    contentWrapper: {
      display: "flex",
      flex: 1,
    },
    sidebarSpacing: {
      width: "300px",
      flexShrink: 0,
    },
    mainContent: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      backgroundColor: theme === "light" ? "#ffffff" : "#1E1E1E",
      borderRadius: "12px",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.1)"
        : "0 4px 8px rgba(0, 0, 0, 0.5)",
    },
    dashboardContent: {
      textAlign: "center",
      maxWidth: "600px",
    },
    header: {
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "bold",
    },
    buttonContainer: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      backgroundColor: theme === "light" ? "#007bff" : "#555",
      color: "#fff",
      transition: "all 0.3s ease",
    },
    footerWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 0",
      backgroundColor: "#0d2b39",
      color: "#ffffff",
      textAlign: "center",
      borderTop: "1px solid #ccc",
      width: "100%",
    },
    footerSpacing: {
      width: "300px",
      flexShrink: 0,
    },
    footerContentArea: {
      flex: 1,
      padding: "20px",
    },
    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "20px",
    },
    footerColumn: {
      flex: "1 1 calc(25% - 20px)",
      textAlign: "center",
    },
    footerHeader: {
      fontWeight: "bold",
      marginTop: "-20px",
      fontSize: "20px",
      borderBottom: "2px solid #fff",
      paddingBottom: "5px",
    },
    footerCopyright: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#bbb",
      textAlign: "center",
    },
    socialIcons: {
      display: "flex",
      marginRight:"10px",
      gap: "40px",
      justifyContent: "center",
      marginTop: "20px",
    },
    socialIcon: {
      fontSize: "30px",
      textDecoration: "none",
      transition: "transform 0.3s ease, color 0.3s ease",
      cursor: "pointer",
    },
    facebookIcon: {
      color: "#1877F2",
    },
    twitterIcon: {
      color: "#1DA1F2",
    },
    linkedinIcon: {
      color: "#0077B5",
    },
    socialText: {
      marginTop: "10px",
      fontSize: "14px",
      color: "#fff",
    },
    socialIconContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Content Wrapper */}
      <div style={styles.contentWrapper}>
        {/* Sidebar Placeholder */}
        <div style={styles.sidebarSpacing}></div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <h1 style={styles.header}>Welcome to the Dashboard</h1>
          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.button, backgroundColor: "#007bff" }}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              style={{ ...styles.button, backgroundColor: "#28a745" }}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footerWrapper}>
      <div style={styles.footerSpacing}></div>
      <div style={styles.footerContentArea}>
  <div style={styles.footerContent}>
    <div style={styles.footerColumn}>
      <h3 style={styles.footerHeader}>About Us</h3>
      <p>Professional project/system offering solutions for classroom management and virtual learning environments.</p>
    </div>

    <div style={styles.footerColumn}>
      <h3 style={styles.footerHeader}>Stay Connected</h3>
      <div style={styles.socialIcons}>
      <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
/>
<div style={styles.socialIconContainer}>
      <a
        href="https://facebook.com"
        style={{ ...styles.socialIcon, ...styles.facebookIcon }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <span style={styles.socialText}>Facebook</span>
    </div>
    {/* Twitter */}
    <div style={styles.socialIconContainer}>
      <a
        href="https://twitter.com"
        style={{ ...styles.socialIcon, ...styles.twitterIcon }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter"></i>
      </a>
      <span style={styles.socialText}>Twitter</span>
    </div>
    {/* LinkedIn */}
    <div style={styles.socialIconContainer}>
      <a
        href="https://linkedin.com"
        style={{ ...styles.socialIcon, ...styles.linkedinIcon }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-linkedin-in"></i>
      </a>
      <span style={styles.socialText}>LinkedIn</span>
    </div>
      </div>
    </div>
  </div>
  <div style={styles.footerCopyright}>
    © {new Date().getFullYear()} Virtual Classroom. All Rights Reserved.
  </div>
  </div>
</footer>
    </div>
  );
};

export default Dashboard;