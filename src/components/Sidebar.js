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
  const [isOpen, setIsOpen] = useState(false);
  const pageTitles = {
    "/Dashboard": "home",
    "/my-classes": "My Classes",
    "/show-students": "Show students for queestionnaire",
    "/Analytics": "Analytics",
    "/generate-seating": "Seating Arrangement",
    "/login": "Login",
    "/register": "Register",
  };
  const currentPath = location.pathname.split('/')[1]; // Get the first segment of the path
const dynamicPaths = {
  "questionnaire": "Questionnaire",
  "show-results": "Questionnaire Results",
  "view-students": "Student management",
};



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
      setIsOpen(false);
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
      zIndex: 1000, 
      backgroundColor: theme === "light" ? "#f4f4f4" : "#2C2C2C",
      color: theme === "light" ? "#333" : "#f9f9f9",
      boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
      borderRight: "1px solid rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "30px 20px",
      transform: "translateY(-50px)", 
    },
    virtualClassroom: {
      fontSize: "45px",
      fontWeight: "bold",
      color: "transparent",
      textTransform: "uppercase",
      background:
      //"#7e93a2" : "#0d2b39"
      "linear-gradient(90deg,#0d2b39,#7e93a2 , #000 ,#fff ,#7e93a2 ,#0d2b39)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      backgroundSize: "400% 400%",
      animation: "moveGradient 8s linear infinite", // Smoother animation
      textShadow:
        theme === "light"
          ? "2px 2px 4px rgba(0, 0, 0, 0.3)"
          : "2px 2px 4px rgba(255, 255, 255, 0.3)", // Shadow for better readability
      textAlign: "center",
      marginBottom: "30px",
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
    Logo : {
      
    },
    pageHeader: {
      position: "fixed",
      top: 0,
      left: "270px", // Matches the sidebar width
      width: "calc(100% - 270px)", // Adjusts to fit outside the sidebar
      height: "100px", 
      backgroundColor: theme === "light" ? "#7e93a2" : "#0d2b39", 
      color: theme === "light" ? "#000" : "#fff", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
      zIndex: 900, 
      borderBottom: "2px solid rgba(0, 0, 0, 0.1)", 
    },
    
    headerTitle: {
      fontSize: "30px", 
      fontWeight: "bold",
      margin: 0,
      textTransform: "uppercase", 
    },
    loginButtonContainer: {
      position: "absolute",
      bottom: "10px",
      right: "10px",
    },
    loginButton: {
      padding: "8px 15px",
      fontSize: "14px",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: theme === "light" ? "#0d2b39" : "#6C757D",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    disabledMenuItem: {
      opacity: 0,
      display:"none",
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
  {/* Include @keyframes for sidebar gradient */}
  <style>
    {`
      @keyframes moveGradient {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: 100% 50%;
        }
      }
      @keyframes headerFadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `}
  </style>

  {/* Dynamic Header */}
  <div style={styles.pageHeader}>
    <h2 style={styles.headerTitle}>
      {pageTitles[location.pathname] || dynamicPaths[currentPath]|| "Virtual ClassRoom"}
    </h2>
  {location.pathname === "/Dashboard" && !currentUser && (
    <div style={styles.loginButtonContainer}>
      <button
        style={styles.loginButton}
        onClick={() => navigate("/login")}
      >
        Log In
      </button>
    </div>
  )}
  </div>
  <button onClick={() => setIsOpen(!isOpen)} className="toggle-button">
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div style={styles.sidebar}>
        {/* Logo Container */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/VS-Logo.jpg" 
            alt="Logo"
            style={{
              width: "170px",
              height: "170px",
              objectFit: "contain",
              borderRadius: "50%",
              marginBottom: "-20px",
              
            }}
          />
        </div>
  
        {/* Sidebar Title */}
        <h1 style={styles.virtualClassroom}>Virtual Classroom</h1>
  
        {/* Welcome Message */}
        <div style={styles.welcome}>Welcome, {teacherName}</div>
  
        {/* Sidebar Menu */}
        <div style={styles.menu}>
          <div
            style={{
              ...styles.menuItem,
              ...(location.pathname === "/Dashboard" && styles.activeMenuItem),
            }}
            onClick={() => handleNavigation("/Dashboard")}
          >
            <FaHome style={{ fontSize: "20px" }} />
            Home
          </div>
          
          <div
            style={{
              ...styles.menuItem,
              ...(location.pathname === "/my-classes" && styles.activeMenuItem),
              ...(currentUser ? {} : styles.disabledMenuItem),
            }}
            onClick={currentUser ? () => handleNavigation("/my-classes") : null}
          >
            <FaSchool style={{ fontSize: "20px" }} />
            My Classes
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(location.pathname === "/show-students" && styles.activeMenuItem),
              ...(currentUser ? {} : styles.disabledMenuItem),
            }}
            onClick={currentUser ? () => handleNavigation("/show-students") : null}
          >
            <FaListAlt style={{ fontSize: "20px" }} />
            Questionnaire
          </div>
          <div
            style={{
              ...styles.menuItem,
              ...(location.pathname === "/Analytics" && styles.activeMenuItem),
              ...(currentUser ? {} : styles.disabledMenuItem),
            }}
            onClick={currentUser ? () => handleNavigation("/Analytics") : null}
          >
            <FaChartBar style={{ fontSize: "20px" }} />
            Analytics
          </div>
          
            <div
            style={{
              ...styles.menuItem,
              ...(location.pathname === "/generate-seating" && styles.activeMenuItem),
              ...(currentUser ? {} : styles.disabledMenuItem),
            }}
            onClick={currentUser ? () => handleNavigation("/generate-seating") : null}
          >
            <FaChair style={{ fontSize: "20px" }} />
            Seating Arrangement
          </div>
          
          
          {currentUser &&
            location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <div
                style={styles.menuItemLogout}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#a40909")
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
  
        {/* Dark Mode Toggle */}
        <div
          style={styles.darkModeToggle}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.darkModeToggleHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, styles.darkModeToggle)}
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <FaSun style={{ color: "#000" }} />
          ) : (
            <FaMoon style={{ color: "#FFD700" }} />
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes moveGradient {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }
        `}
      </style>
      {/* Add Margin to Main Content */}
    <div style={{ marginTop: "70px" }}>
    </div>
    </div>
    </>
  );
  
};

export default Sidebar;