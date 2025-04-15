import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response ? err.response.data.message : "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Attendance System Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-link">
          New user? <span onClick={() => navigate('/signup')}>Sign up here</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
