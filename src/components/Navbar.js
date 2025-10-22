import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
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
          }}
        >
          Dashboard
        </Link>
        <Link to="/add-pet" style={{ color: "white", textDecoration: "none" }}>
          Add Pet
        </Link>
      </div>
      {userId && (
        <button
          onClick={handleLogout}
          style={{
            background: "#e53e3e",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
