/*
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import GenerateSeating from "./pages/GenerateSeating";
import Questionnaire from "./pages/Questionnaire";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
//import LoginPage from "./pages/LoginPage"; // If login is still used
import RegisterPage from "./pages/RegisterPage";
function App() {
  const navStyle = {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "#42a5f5",
    color: "white",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  };

  return (
    <Router>
       <nav style={navStyle}>

        </nav>
      <div>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student" element={<EditStudent />} />
        <Route path="/generate-seating" element={<GenerateSeating />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<RegisterPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
*/
/*
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/LoginPage"; // Import Login page
import Register from "./pages/RegisterPage"; // Import Register page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
*/

/*
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/teacher"
          element={
            <PrivateRoute>
              <TeacherPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <PrivateRoute>
              <AddStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/show-students"
          element={
            <PrivateRoute>
              <ShowStudents />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-student/:id"
          element={
            <PrivateRoute>
              <EditStudent />
            </PrivateRoute>
          }
        />
      </Routes>

    </Router>
  );
};
*/
/*
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddStudent from "./pages/AddStudent";
import ShowStudents from "./pages/ShowStudents";
import PrivateRoute from "./components/PrivateRoute";
import TeacherPage from "./pages/TeacherPage";
import EditStudent from "./pages/EditStudent";
import GenerateSeating from "./pages/GenerateSeating";
import ShowQuesResults from "./pages/ShowQuesResults";
import ShowStudents from "./pages/ShowStudentsToEdit";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/teacher"
          element={
            <PrivateRoute>
              <TeacherPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <PrivateRoute>
              <AddStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/show-students"
          element={
            <PrivateRoute>
              <ShowStudents />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-student"
          element={
            <PrivateRoute>
              <EditStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/generate-seating"
          element={
            <PrivateRoute>
              <GenerateSeating />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};


export default App;
*/
/*
import React, { createContext, useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddStudent from "./pages/AddStudent";
import ShowStudents from "./pages/ShowStudents";
import ShowStudentsToEdit from "./pages/ShowStudentsToEdit";
import EditStudent from "./pages/EditStudent";
import GenerateSeating from "./pages/GenerateSeating";
import Questionnaire from "./pages/Questionnaire";
import ShowQuesResults from "./pages/ShowQuesResults";
import TeacherPage from "./pages/TeacherPage";
import PrivateRoute from "./components/PrivateRoute";

// Create a Theme Context
export const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState("light");

  // Check saved theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
          color: theme === "light" ? "#333" : "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/teacher"
              element={
                <PrivateRoute>
                  <TeacherPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-student"
              element={
                <PrivateRoute>
                  <AddStudent />
                </PrivateRoute>
              }
            />
            <Route
              path="/show-students-to-edit"
              element={
                <PrivateRoute>
                  <ShowStudentsToEdit />
                </PrivateRoute>
              }
            />
                  <Route
              path="/show-students"
              element={
                <PrivateRoute>
                  <ShowStudents />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-student/:id"
              element={
                <PrivateRoute>
                  <EditStudent />
                </PrivateRoute>
              }
            />
            <Route
              path="/generate-seating"
              element={
                <PrivateRoute>
                  <GenerateSeating />
                </PrivateRoute>
              }
            />
            <Route
              path="/questionnaire"
              element={
                <PrivateRoute>
                  <ShowStudents />
                </PrivateRoute>
              }
            />
            <Route
              path="/show-results/:studentId"
              element={
                <PrivateRoute>
                  <ShowQuesResults />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

// Header Component with Theme Toggle
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: theme === "light" ? "#42a5f5" : "#1e88e5",
    color: "#fff",
  };

  const toggleContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const toggleButtonStyle = {
    position: "relative",
    width: "50px",
    height: "25px",
    backgroundColor: theme === "light" ? "#ccc" : "#444",
    borderRadius: "25px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: theme === "light" ? "flex-start" : "flex-end",
    padding: "5px",
    transition: "all 0.3s ease",
  };

  const toggleCircleStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    transition: "all 0.3s ease",
  };

  return (
    <header style={headerStyle}>
      <span>Virtual Classroom</span>
      <div style={toggleContainerStyle}>
        <span>Dark Mode</span>
        <div style={toggleButtonStyle} onClick={toggleTheme}>
          <div style={toggleCircleStyle}></div>
        </div>
      </div>
    </header>
  );
};

export default App;
*/
/*
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddStudent from "./pages/AddStudent";
import ShowStudents from "./pages/ShowStudents";
import ShowStudentsToEdit from "./pages/ShowStudentsToEdit";
import EditStudent from "./pages/EditStudent";
import GenerateSeating from "./pages/GenerateSeating";
import Questionnaire from "./pages/Questionnaire";
import ShowQuesResults from "./pages/ShowQuesResults";
import TeacherPage from "./pages/TeacherPage";
import MyClassesPage from "./pages/MyClassesPage"; // Import the "My Classes" page
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header"; // Modularized Header

// Create a Theme Context
export const ThemeContext = createContext();

const INACTIVITY_TIMEOUT = 3 * 60 * 1000; // 5 minutes inactivity timeout

const App = () => {
  const [theme, setTheme] = useState("light");
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  // Load the saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Inactivity timeout logic
  useEffect(() => {
    let timeout;

    const logoutOnInactivity = () => {
      if (isLoggedIn) {
        signOut(auth)
          .then(() => {
            alert("You have been logged out due to inactivity.");
            window.location.href = "/login";
          })
          .catch((error) => console.error("Error during logout:", error));
      }
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      if (isLoggedIn) {
        timeout = setTimeout(logoutOnInactivity, INACTIVITY_TIMEOUT);
      }
    };

    // Attach event listeners
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    // Start the timer initially if logged in
    resetTimer();

    // Cleanup on unmount
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [auth, isLoggedIn]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
          color: theme === "light" ? "#333" : "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Router>
          <Header />
          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />


            <Route
              path="/teacher"
              element={
                <PrivateRoute>
                  <TeacherPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-student/:classId"
              element={
                <PrivateRoute>
                  <AddStudent />
                </PrivateRoute>
              }
            />
            <Route
              path="/show-students-to-edit"
              element={
                <PrivateRoute>
                  <ShowStudentsToEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/show-students"
              element={
                <PrivateRoute>
                  <ShowStudents />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-student/:id"
              element={
                <PrivateRoute>
                  <EditStudent />
                </PrivateRoute>
              }
            />
            <Route
              path="/generate-seating"
              element={
                <PrivateRoute>
                  <GenerateSeating />
                </PrivateRoute>
              }
            />
            <Route
              path="/questionnaire"
              element={
                <PrivateRoute>
                  <Questionnaire />
                </PrivateRoute>
              }
            />
            <Route
              path="/show-results/:studentId"
              element={
                <PrivateRoute>
                  <ShowQuesResults />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-classes"
              element={
                <PrivateRoute>
                  <MyClassesPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
*/
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddStudent from "./pages/AddStudent";
import ShowStudents from "./pages/ShowStudents";
import ShowStudentsToEdit from "./pages/ShowStudentsToEdit";
import EditStudent from "./pages/EditStudent";
import GenerateSeating from "./pages/GenerateSeating";
import Questionnaire from "./pages/Questionnaire";
import ShowQuesResults from "./pages/ShowQuesResults";
import TeacherPage from "./pages/TeacherPage";
import MyClassesPage from "./pages/MyClassesPage"; // Import the "My Classes" page
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header"; // Modularized Header
import ViewStudentsPage from "./pages/ViewStudentsPage";

// Create a Theme Context
export const ThemeContext = createContext();

const INACTIVITY_TIMEOUT = 3 * 60 * 1000; // 3 minutes inactivity timeout

const App = () => {
  const [theme, setTheme] = useState("light");
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  // Load the saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Inactivity timeout logic
  useEffect(() => {
    let timeout;

    const logoutOnInactivity = () => {
      if (isLoggedIn) {
        signOut(auth)
          .then(() => {
            alert("You have been logged out due to inactivity.");
            window.location.href = "/login";
          })
          .catch((error) => console.error("Error during logout:", error));
      }
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      if (isLoggedIn) {
        timeout = setTimeout(logoutOnInactivity, INACTIVITY_TIMEOUT);
      }
    };

    // Attach event listeners
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    // Start the timer initially if logged in
    resetTimer();

    // Cleanup on unmount
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [auth, isLoggedIn]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          backgroundColor: theme === "light" ? "#f9f9f9" : "#121212",
          color: theme === "light" ? "#333" : "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Router>
        <Header teacherName={currentUser?.displayName || "Teacher"} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Private Routes */}
            <Route
              path="/teacher"
              element={
                <PrivateRoute>
                  <TeacherPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-student/:classId"
              element={
                <PrivateRoute>
                  <AddStudent teacherId={currentUser?.uid} />
                </PrivateRoute>
              }
            />
            <Route
              path="/show-students-to-edit"
              element={
                <PrivateRoute>
                  <ShowStudentsToEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/show-students"
              element={
                <PrivateRoute>
                  <ShowStudents />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-student/:id"
              element={
                <PrivateRoute>
                  <EditStudent />
                </PrivateRoute>
              }
            />
            <Route
              path="/generate-seating"
              element={
                <PrivateRoute>
                  <GenerateSeating />
                </PrivateRoute>
              }
            />
            <Route
              path="/questionnaire/:studentId"
              element={
                <PrivateRoute>
                  <Questionnaire />
                </PrivateRoute>
              }
            />
            <Route
              path="/show-results/:studentId"
              element={
                <PrivateRoute>
                  <ShowQuesResults />
                </PrivateRoute>
              }
            />
           <Route
  path="/my-classes"
  element={
    <PrivateRoute>
      <MyClassesPage
        teacherId={currentUser?.uid}
        teacherName={currentUser?.displayName}
      />
    </PrivateRoute>
  }
/>
<Route
  path="/view-students/:classId"
  element={
    <PrivateRoute>
      <ViewStudentsPage />
    </PrivateRoute>
  }
/>
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
