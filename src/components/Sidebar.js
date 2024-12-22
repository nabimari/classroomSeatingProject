import React, { useContext, useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { ThemeContext } from "../App";
import {
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaHome,
  FaSchool,
  FaListAlt,
  FaChartBar,
  FaChair,
} from "react-icons/fa";

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const teacherName = currentUser?.displayName || "Teacher";
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();



  const handleNavigation = (path) => {
    if (!currentUser && path !== "/Dashboard") {
      setShowAlert(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
      }, 500);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(path);
    }, 500);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      signOut(auth)
        .then(() => {
          setIsLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error during logout: ", error);
          alert("Failed to log out. Please try again.");
        });
    }, 500);
  };

  const styles = {
    sidebar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "270px",
      height: "100vh",
      backgroundColor: theme === "light" ? "#f4f4f4" : "#2C2C2C",
      color: theme === "light" ? "#333" : "#f9f9f9",
      boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
      borderRight: "1px solid rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "30px 20px",
    },
    virtualClassroom: {
      fontSize: "45px",
      fontWeight: "bold",
      color: "transparent",
      textTransform: "uppercase",
      background:
        "linear-gradient(45deg, #13cf61, #3717eb, #a417c7, #0e0e0f, #f4f5fc, #6a1ad3, #22b8cf, #20c997)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      backgroundSize: "300% 300%",
      animation: "moveGradient 7s linear infinite",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      marginBottom: "50px",
    },
    welcome: {
      fontSize: "25px",
      fontWeight: "600",
      textAlign: "center",
      marginBottom: "30px",
    },
    menu: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "15px 20px",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#ffffff" : "#333333",
      color: theme === "light" ? "#333" : "#f9f9f9",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    activeMenuItem: {
      backgroundColor: theme === "light" ? "#7e93a2" : "#0d2b39", // Active color
      color: theme === "light" ? "#000" : "#fff", // Active text color
      transform: "scale(1.05)", // Slightly enlarge active menu item
    },
    menuItemHover: {
    backgroundColor: theme === "light" ? "#f1f3f5" : "#555555",
    transform: "scale(1.05)",
  },
  darkModeToggle: {
    marginTop: "50px",
    marginLeft : "115px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "35px", // Circular button size
    height: "35px",
    borderRadius: "50%", // Circle shape
    cursor: "pointer",
    backgroundColor: "transparent", // No background
    color: "#FFD700", // Yellow color for both icons
    fontSize: "15px", // Icon size
    boxShadow: theme === "light"
      ? "0 2px 4px rgba(0, 0, 0, 0.1)"
      : "0 2px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow for modern look
    transition: "all 0.3s ease", // Smooth transitions for hover and toggling
  },

  darkModeToggleHover: {
    backgroundColor: theme === "light" ? "#e0e0e0" : "#666",
    transform: "scale(1.05)", // Slightly enlarge on hover
    boxShadow: theme === "light"
      ? "0 4px 8px rgba(0, 0, 0, 0.15)"
      : "0 4px 8px rgba(0, 0, 0, 0.4)", // Enhanced shadow effect
  },

    spinner: {
      border: "8px solid #f3f3f3",
      borderTop: "8px solid #3498db",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      animation: "spin 1s linear infinite",
    },
    menuItemLogout: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "15px 20px",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: "#e51515", // Default background
      color: theme === "light" ? "#333" : "#f9f9f9",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={styles.spinner}></div>
        </div>
      )}
      {showAlert && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme === "light" ? "#ffffff" : "#333333",
      color: theme === "light" ? "#333" : "#f9f9f9",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: theme === "light"
        ? "0 4px 8px rgba(0, 0, 0, 0.2)"
        : "0 4px 8px rgba(255, 255, 255, 0.2)",
      textAlign: "center",
      zIndex: 1000,
    }}
  >
    <p style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "bold" }}>
      You must log in to access this page.
    </p>
    <button
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: theme === "light" ? "#4CAF50" : "#6C757D",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
      }}
      onClick={() => setShowAlert(false)}
    >
      Close
    </button>
  </div>
)}
      <div style={styles.sidebar}>
        <h1 style={styles.virtualClassroom}>Virtual Classroom</h1>
        <div style={styles.welcome}>Welcome, {teacherName}</div>

        <div style={styles.menu}>
  <div
    style={{...styles.menuItem,
      ...(location.pathname === "/Dashboard" && styles.activeMenuItem),}}
    onClick={() => handleNavigation("/Dashboard")}
  >
    <FaHome style={{ fontSize: "20px" }} />
    Home
  </div>
  <div
    style={{...styles.menuItem,
      ...(location.pathname === "/my-classes" && styles.activeMenuItem),}}

    onClick={() => handleNavigation("/my-classes")}
  >
    <FaSchool style={{ fontSize: "20px" }} />
    My Classes
  </div>
  <div
    style={{...styles.menuItem,
      ...(location.pathname === "/show-students" && styles.activeMenuItem),}}

    onClick={() => handleNavigation("/show-students")}
  >
    <FaListAlt style={{ fontSize: "20px" }} />
    Questionnaire
  </div>
  <div
    style={{...styles.menuItem,
      ...(location.pathname === "/Analytics" && styles.activeMenuItem),}}
    onClick={() => handleNavigation("/Analytics")}
  >
    <FaChartBar style={{ fontSize: "20px" }} />
    Analytics
  </div>
  <div
    style={{...styles.menuItem,
      ...(location.pathname === "/generate-seating" && styles.activeMenuItem),}}
    onClick={() => handleNavigation("/generate-seating")}
  >
    <FaChair style={{ fontSize: "20px" }} />
    Seating Arrangement
  </div>
  {currentUser &&
  location.pathname !== "/login" &&
 location.pathname !== "/register" &&
  (
    <div
      style={styles.menuItemLogout}
      onMouseEnter={(e) =>
        (e.target.style.backgroundColor =  "#a40909")
      }
      onMouseLeave={(e) =>
        (e.target.style.backgroundColor = "#e51515")
      }
      onClick={handleLogout}
    >
      <FaSignOutAlt style={{ fontSize: "20px" }} />
      Logout
    </div>
  )}
</div>


        <div
          style={styles.darkModeToggle}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.darkModeToggleHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.darkModeToggle)}
          onClick={toggleTheme}
        >

          {theme === "light" ? (
    <FaSun style={{ color: "#000" }} /> // Black sun for light mode
  ) : (
    <FaMoon style={{ color: "#FFD700" }} /> // Yellow moon for dark mode
  )}
        </div>
      </div>

      <style>
        {`
          @keyframes moveGradient {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;