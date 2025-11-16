import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "", 
    repassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log("Sign up attempt:", formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Welcome to our SWE LearnHub</h1>
        <p>Create a new account</p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="repassword">Re-enter your password</label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              value={formData.repassword}
              onChange={handleChange}
              placeholder="Enter your password again"
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Have an account? 
            <Link to="/signin" className="signin-link"> Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;