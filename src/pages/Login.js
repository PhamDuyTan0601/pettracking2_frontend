import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser as login } from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      if (res.data.success) {
        localStorage.setItem("userId", res.data.user.id);
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/register")}>No account? Register</p>
    </div>
  );
}

export default Login;
