import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/home";
import Interview from "./pages/Interview/interview"
import Question from "./pages/Question/question";
import Write from "./pages/Write/write";
import Signin from "./pages/Signin/signin";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/profile";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/question" element={<Question />} />
          <Route path="/write" element={<Write />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
