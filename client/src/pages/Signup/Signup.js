import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", 
    repassword: "",
    university: "",
    degree: "",
    major: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.repassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(formData)

     try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          university: formData.university,
          degree: formData.degree,
          major: formData.major
        }),
      });

      const data = await response.json();

      console.log(response);
      

      if (response.ok) {
        alert("Account created successfully!");
        // Redirect to sign in page or dashboard
        window.location.href = '/signin';
      } else {
        alert(data.message || "Error creating account");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Please try again.");
    }
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