import React from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiBriefcase } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaGraduationCap, FaBuilding } from "react-icons/fa";

function Home() {
  return (
    <div className="container">
      <div className="left">
        <ul>
          <li>
            <Link to="/" className="link active-link">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/interview" className="link">
              <HiBriefcase /> Interview
            </Link>
          </li>
          <li>
            <Link to="/question" className="link">
              <MdOutlineQuestionMark /> Questions
            </Link>
          </li>
          <li>
            <Link to="/write" className="link">
              <FiEdit /> Write
            </Link>
          </li>
          <li>
            <Link to="/profile" className="link">
              <CgProfile /> Profile
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="middle">
        <div className="feed-header">
          <h2>Latest from LearnHub</h2>
          <p>Questions, experiences, and knowledge shared by the community</p>
        </div>

        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#" className="category-link">Programming Question</Link> by <Link to="#" className="author-link">Alex Kumar</Link></p>
              <h1>How to implement Binary Search Tree in Java?</h1>
              <p>I'm working on a data structures assignment and need help understanding BST implementation. Specifically struggling with insertion and deletion methods. Can someone explain the logic with code examples?</p>

              <div className="post-meta">
                <span className="meta-item"><BsCalendarDate /> 16/11/25</span>
                <span className="meta-item"><FaGraduationCap /> 3/2</span>
                <span className="meta-item"><AiFillLike /> 124</span>
                <span className="meta-item"><FaComment /> 18</span>
              </div>
            </div>
            <div className="img-box">
              <img src="https://via.placeholder.com/300x200/28a745/ffffff?text=Binary+Tree" alt="Binary Search Tree" />
            </div>
          </li>
        </ul>

        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#" className="category-link">Interview Experience</Link> by <Link to="#" className="author-link">Sarah Johnson</Link></p>
              <h1>My Google Software Engineer Interview Experience</h1>
              <p>Just completed my Google SWE interview process! Sharing the complete journey from application to offer. Includes technical rounds, behavioral questions, and preparation strategies that helped me succeed.</p>

              <div className="post-meta">
                <span className="meta-item"><BsCalendarDate /> 15/11/25</span>
                <span className="meta-item"><FaBuilding /> Google</span>
                <span className="meta-item"><AiFillLike /> 2,847</span>
                <span className="meta-item"><FaComment /> 342</span>
              </div>
            </div>
            <div className="img-box">
              <img src="https://via.placeholder.com/300x200/1877f2/ffffff?text=Google+Interview" alt="Google Interview Experience" />
            </div>
          </li>
        </ul>

        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#" className="category-link">Database Question</Link> by <Link to="#" className="author-link">Priya Sharma</Link></p>
              <h1>SQL Query optimization for large datasets - Need help!</h1>
              <p>Working with a table containing 10M+ records. My current queries are extremely slow. Looking for indexing strategies and query optimization techniques. Any suggestions for better performance?</p>

              <div className="post-meta">
                <span className="meta-item"><BsCalendarDate /> 14/11/25</span>
                <span className="meta-item"><FaGraduationCap /> 4/2</span>
                <span className="meta-item"><AiFillLike /> 289</span>
                <span className="meta-item"><FaComment /> 45</span>
              </div>
            </div>
            <div className="img-box">
              <img src="https://via.placeholder.com/300x200/6f42c1/ffffff?text=SQL+Database" alt="Database Optimization" />
            </div>
          </li>
        </ul>

        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#" className="category-link">Interview Experience</Link> by <Link to="#" className="author-link">Mike Chen</Link></p>
              <h1>Microsoft Frontend Developer Interview - What to Expect</h1>
              <p>Recently interviewed for Microsoft's frontend team. Detailed breakdown of the process including React challenges, system design discussions, and behavioral rounds. Here's everything you need to know.</p>

              <div className="post-meta">
                <span className="meta-item"><BsCalendarDate /> 13/11/25</span>
                <span className="meta-item"><FaBuilding /> Microsoft</span>
                <span className="meta-item"><AiFillLike /> 1,923</span>
                <span className="meta-item"><FaComment /> 187</span>
              </div>
            </div>
            <div className="img-box">
              <img src="https://via.placeholder.com/300x200/0078d4/ffffff?text=Microsoft+Interview" alt="Microsoft Interview" />
            </div>
          </li>
        </ul>

        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#" className="category-link">Algorithm Question</Link> by <Link to="#" className="author-link">Rohit Gupta</Link></p>
              <h1>Dynamic Programming - Longest Common Subsequence confusion</h1>
              <p>I understand the recursive approach but struggling with the DP table construction. Can someone walk me through the step-by-step process with a simple example? Also confused about time complexity.</p>

              <div className="post-meta">
                <span className="meta-item"><BsCalendarDate /> 12/11/25</span>
                <span className="meta-item"><FaGraduationCap /> 3/1</span>
                <span className="meta-item"><AiFillLike /> 456</span>
                <span className="meta-item"><FaComment /> 67</span>
              </div>
            </div>
            <div className="img-box">
              <img src="https://via.placeholder.com/300x200/dc3545/ffffff?text=Dynamic+Programming" alt="Dynamic Programming" />
            </div>
          </li>
        </ul>

        <ul>
          <li>
            <div className="text-box">
              <p><Link to="#" className="category-link">Interview Experience</Link> by <Link to="#" className="author-link">Emily Rodriguez</Link></p>
              <h1>Amazon SDE Internship Interview: From Rejection to Success</h1>
              <p>Failed my first Amazon interview but didn't give up. Sharing my complete preparation journey, what went wrong the first time, and how I improved to finally get the offer. Timeline and resources included.</p>

              <div className="post-meta">
                <span className="meta-item"><BsCalendarDate /> 11/11/25</span>
                <span className="meta-item"><FaBuilding /> Amazon</span>
                <span className="meta-item"><AiFillLike /> 4,156</span>
                <span className="meta-item"><FaComment /> 528</span>
              </div>
            </div>
            <div className="img-box">
              <img src="https://via.placeholder.com/300x200/ff9900/ffffff?text=Amazon+Success" alt="Amazon Interview Success" />
            </div>
          </li>
        </ul>
      </div>

      <div className="right">
        <div className="buttons">
          <h2>Popular Topics</h2>
          <div className="topic-buttons">
            <button className="topic-btn">Data Structures</button>
            <button className="topic-btn">Algorithms</button>
            <button className="topic-btn">System Design</button>
            <button className="topic-btn">Web Development</button>
            <button className="topic-btn">Database</button>
            <button className="topic-btn">Machine Learning</button>
            <button className="topic-btn">Interview Tips</button>
            <button className="topic-btn">Career Advice</button>
          </div>
        </div>

        <div className="saved-blogs">
          <h3>Trending This Week</h3>
          <ul>
            <li>
              <div className="saved-item">
                <span className="saved-label">Most Popular</span>
                <h4>Complete Guide to System Design Interviews</h4>
                <p>Everything you need to know about system design rounds</p>
                <span className="saved-meta">2 days ago</span>
              </div>
            </li>
            <li>
              <div className="saved-item">
                <span className="saved-label">Trending Question</span>
                <h4>React vs Vue.js - Which to choose in 2024?</h4>
                <p>Comprehensive comparison for beginners and experienced developers</p>
                <span className="saved-meta">3 days ago</span>
              </div>
            </li>
            <li>
              <div className="saved-item">
                <span className="saved-label">Hot Discussion</span>
                <h4>Google Interview Experience - L3 SWE Role</h4>
                <p>Detailed breakdown of the entire interview process</p>
                <span className="saved-meta">5 days ago</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="quick-stats">
          <h3>Community Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">1,247</span>
              <span className="stat-label">Questions Asked</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">856</span>
              <span className="stat-label">Interview Experiences</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3,421</span>
              <span className="stat-label">Helpful Answers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2,156</span>
              <span className="stat-label">Active Members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;