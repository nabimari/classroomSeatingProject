
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { ThemeContext } from "../App";
import { FaCaretDown, FaSun, FaMoon ,FaSignOutAlt,FaHome, FaSchool  } from "react-icons/fa";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const teacherName = currentUser?.displayName || "Teacher";


  // Automatically log out if on Dashboard or Login page
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/login") {
      signOut(auth)
        .then(() => {
          console.log("User automatically logged out.");
        })
        .catch((error) => {
          console.error("Error logging out: ", error);
        });
    }
  }, [location.pathname, auth]);

  const handleNavigation = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(path);
    }, 2000);
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
    }, 2000);
  };
  const isDashboardPage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "20px",
    },
    virtualClassroom: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "transparent",
      textTransform: "uppercase",
      background: "linear-gradient(45deg,rgb(19, 207, 97),rgb(55, 23, 235),rgb(164, 23, 199),rgb(14, 14, 15),rgb(244, 245, 252),rgb(106, 26, 211), #22b8cf, #20c997)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      backgroundSize: "300% 300%",
      animation: "moveGradient 7s linear infinite",
      textShadow: "2px 2px 4px rgba(35, 172, 115, 0.3)",
      marginLeft: "150px",
    },
    header: {
      backgroundColor: theme === "light" ? "lightblue" : "#333",
      color: theme === "light" ? "#000" : "#fff",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    backButton: {
      padding: "8px 12px",
      backgroundColor: theme === "light" ? "#fff" : "#555",
      color: theme === "light" ? "#000" : "#fff",
      border: theme === "light" ? "1px solid lightgray" : "1px solid #777",
      borderRadius: "5px",
      cursor: "pointer",
    },
    toggleContainer: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      gap: "20px",
    },
    darkModeToggle: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: theme === "light" ? "#fff" : "#444",
      borderRadius: "20px",
      width: "60px",
      height: "30px",
      position: "relative",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    },
    toggleCircle: {
      position: "absolute",
      top: "3px",
      left: theme === "light" ? "5px" : "32px",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      backgroundColor: theme === "light" ? "#FFD700" : "#555",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme === "light" ? "#fff" : "#FFD700",
      fontSize: "16px",
      transition: "all 0.3s ease",
    },
    dropdownContainer: {
      position: "relative",
    },
    dropdownToggle: {
      display: "flex",
      alignItems: "center",
      fontWeight: "bold",
      cursor: "pointer",
    },
    dropdownMenu: {
      display: isDropdownOpen ? "block" : "none",
      position: "absolute",
      right: 0,
      backgroundColor: theme === "light" ? "#fff" : "#555",
      color: theme === "light" ? "#000" : "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
      marginTop: "10px",
      minWidth: "150px",
      zIndex: 1000,
    },
    dropdownItem: {
      padding: "10px 15px",
      cursor: "pointer",
      borderBottom: theme === "light" ? "1px solid #ddd" : "1px solid #777",
    },
    loadingOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    spinner: {
      border: "8px solid #f3f3f3",
      borderTop: "8px solid #3498db",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      animation: "spin 1s linear infinite",
    },
  };

  return (
    <>
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
        </div>
      )}

      <div style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          Back
        </button>

        <div style={styles.container}>
        <FaSchool style={{ fontSize: "40px", color: "#4CAF50",marginRight: "-120px" }} />
  <h1 style={styles.virtualClassroom}>Virtual Classroom</h1>

  <style>
    {`
      @keyframes moveGradient {
        0% { background-position: 0 0; }
        100% { background-position: 100% 100%; }
      }


    `}
  </style>
</div>


        <div style={styles.toggleContainer}>
          <div style={styles.darkModeToggle} onClick={toggleTheme}>
            <div style={styles.toggleCircle}>
              {theme === "light" ? <FaSun /> : <FaMoon />}
            </div>
          </div>

          <div style={styles.dropdownContainer}
            onMouseEnter={() => setIsDropdownOpen(true)}
          >
            {isDashboardPage ? (
              <div style={{ fontWeight: "bold" }}>Welcome, {teacherName}</div>
            ) : (
              <>
                <div
                  style={styles.dropdownToggle}

                  onClick={() => setIsDropdownOpen((prev) => !prev)}

                >
                  Welcome, {teacherName} <FaCaretDown style={{ marginLeft: "5px" }} />
                </div>
                <div style={styles.dropdownMenu}
                onMouseLeave={() => setIsDropdownOpen(false)}

                >
                  <div style={styles.dropdownItem} onClick={() => handleNavigation("/")}>
                  <FaHome style={{ marginRight: "8px" }} />
                    Home
                  </div>
                  {!isLoginPage && !isRegisterPage && (
                    <div
                      style={{ ...styles.dropdownItem, borderBottom: "none" }}
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt style={{ marginRight: "8px" }} />
                      Logout
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default Header;