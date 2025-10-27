import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#2b6cb0",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px",
            fontWeight: "bold",
          }}
        >
          🏠 Dashboard
        </Link>
        <Link
          to="/add-pet"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px",
            fontWeight: "bold",
          }}
        >
          ➕ Add Pet
        </Link>
        <Link
          to="/devices"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          📱 Devices
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {user.name && (
          <span style={{ fontSize: "14px" }}>👋 Hello, {user.name}</span>
        )}
        {token && (
          <button
            onClick={handleLogout}
            style={{
              background: "#e53e3e",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
