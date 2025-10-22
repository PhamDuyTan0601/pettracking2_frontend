import React, { useState } from "react";
import { registerUser as register } from "../api/api";

import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await register({ name, email, password });
      if (res.data.success) {
        alert("Registered successfully!");
        navigate("/");
      } else alert(res.data.message);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
