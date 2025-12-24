import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 TEMP: Frontend-only placeholder auth
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Simulate successful login
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);

    // Reward daily login (if rewards loaded)
    if (window.rewardForDailyLogin) {
      window.rewardForDailyLogin();
    }

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log In</button>
        </form>

        <p>
          Don’t have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
