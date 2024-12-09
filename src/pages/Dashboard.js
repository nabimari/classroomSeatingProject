
/*
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Welcome to the Dashboard</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => navigate("/login")} // Navigate to Login page
        >
          Login
        </button>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => navigate("/register")} // Navigate to Register page
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

*/

import React from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Welcome to the Dashboard</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => navigate("/login")} // Navigate to Login page
        >
          Login
        </button>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => navigate("/register")} // Navigate to Register page
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Dashboard;