import React from "react";
import "./question.css"
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiBriefcase } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";

function Question() {
  return (
    <div className="question-layout">
      {/* Fixed Left Sidebar */}
      <aside className="sidebar-left">
        <nav className="navigation-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <FaHome className="nav-icon" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/interview" className="nav-link">
                <HiBriefcase className="nav-icon" /> Interview
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/question" className="nav-link nav-link--active">
                <MdOutlineQuestionMark className="nav-icon" /> Questions
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/write" className="nav-link">
                <FiEdit className="nav-icon" /> Write
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                <CgProfile className="nav-icon" /> Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Scrollable Main Content */}
      <main className="main-content">
        <div className="content-feed">
          <article className="question-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">Programming Question</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">Alex Kumar</Link>
              </div>
              <h2 className="card-title">How to implement Binary Search Tree in Java?</h2>
              <p className="card-excerpt">Need help understanding BST implementation with insertion, deletion, and traversal methods. Also looking for time complexity analysis.</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 15/11/25
                </span>
                <span className="stat-item">
                  <FaGraduationCap className="stat-icon" /> 3/2
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 124
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 18
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="Programming question" />
            </div>
          </article>

          <article className="question-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">Database Question</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">Priya Singh</Link>
              </div>
              <h2 className="card-title">SQL Query optimization techniques for large datasets</h2>
              <p className="card-excerpt">Working with tables having millions of records. Need suggestions on indexing, query structure, and performance optimization strategies.</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 14/11/25
                </span>
                <span className="stat-item">
                  <FaGraduationCap className="stat-icon" /> 4/2
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 89
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 23
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="Database question" />
            </div>
          </article>

          <article className="question-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">Algorithm Question</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">Rohit Sharma</Link>
              </div>
              <h2 className="card-title">Dynamic Programming approach for Longest Common Subsequence</h2>
              <p className="card-excerpt">Struggling with the DP table construction and understanding the recursive relation. Can someone explain with a step-by-step example?</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 13/11/25
                </span>
                <span className="stat-item">
                  <FaGraduationCap className="stat-icon" /> 3/1
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 156
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 31
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="Algorithm question" />
            </div>
          </article>

          <article className="question-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">Web Development</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">Maya Patel</Link>
              </div>
              <h2 className="card-title">React State Management: useState vs useReducer</h2>
              <p className="card-excerpt">When should I use useReducer instead of useState? Looking for practical examples and performance considerations for complex state logic.</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 12/11/25
                </span>
                <span className="stat-item">
                  <FaGraduationCap className="stat-icon" /> 4/1
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 203
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 45
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="Web development question" />
            </div>
          </article>

          <article className="question-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">System Design</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">Arjun Gupta</Link>
              </div>
              <h2 className="card-title">Microservices vs Monolithic Architecture comparison</h2>
              <p className="card-excerpt">Planning a medium-scale application. Need guidance on choosing between microservices and monolithic architecture considering team size and scalability.</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 11/11/25
                </span>
                <span className="stat-item">
                  <FaGraduationCap className="stat-icon" /> 4/2
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 178
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 67
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="System design question" />
            </div>
          </article>

          <article className="question-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">Programming Basics</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">Neha Joshi</Link>
              </div>
              <h2 className="card-title">Understanding Object-Oriented Programming concepts</h2>
              <p className="card-excerpt">New to OOP concepts like inheritance, polymorphism, and encapsulation. Need clear explanations with simple Java examples for better understanding.</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 10/11/25
                </span>
                <span className="stat-item">
                  <FaGraduationCap className="stat-icon" /> 2/1
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 267
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 52
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="OOP question" />
            </div>
          </article>
        </div>
      </main>

      {/* Fixed Right Sidebar */}
      <aside className="sidebar-right">
        <section className="widget">
          <h3 className="widget-title">Filter by Semester</h3>
          <div className="semester-tags">
            <button className="semester-tag semester-tag--active">All</button>
            <button className="semester-tag">1/1</button>
            <button className="semester-tag">1/2</button>
            <button className="semester-tag">2/1</button>
            <button className="semester-tag">2/2</button>
            <button className="semester-tag">3/1</button>
            <button className="semester-tag">3/2</button>
            <button className="semester-tag">4/1</button>
            <button className="semester-tag">4/2</button>
          </div>
        </section>

        <section className="widget">
          <h3 className="widget-title">Popular Topics</h3>
          <div className="topic-tags">
            <button className="topic-tag">Data Structures</button>
            <button className="topic-tag">Algorithms</button>
            <button className="topic-tag">Web Development</button>
            <button className="topic-tag">Database</button>
            <button className="topic-tag">System Design</button>
            <button className="topic-tag">Machine Learning</button>
            <button className="topic-tag">Networking</button>
            <button className="topic-tag">Operating Systems</button>
          </div>
        </section>

        <section className="widget">
          <h3 className="widget-title">Recommended for You</h3>
          <div className="recommended-list">
            <article className="recommended-item">
              <span className="recommended-label">Trending</span>
              <h4 className="recommended-title">Graph Algorithms Interview Questions</h4>
              <p className="recommended-excerpt">Most asked graph problems in technical interviews</p>
              <span className="recommended-meta">2 days ago • 3/2</span>
            </article>
            
            <article className="recommended-item">
              <span className="recommended-label">Popular</span>
              <h4 className="recommended-title">JavaScript Async/Await Best Practices</h4>
              <p className="recommended-excerpt">Common mistakes and solutions in async programming</p>
              <span className="recommended-meta">4 days ago • 4/1</span>
            </article>
            
            <article className="recommended-item">
              <span className="recommended-label">Hot</span>
              <h4 className="recommended-title">SQL Join Types Explained</h4>
              <p className="recommended-excerpt">Inner, outer, left, right joins with examples</p>
              <span className="recommended-meta">1 week ago • 3/1</span>
            </article>

            <article className="recommended-item">
              <span className="recommended-label">New</span>
              <h4 className="recommended-title">Python List Comprehension Tips</h4>
              <p className="recommended-excerpt">Advanced list comprehension techniques and performance</p>
              <span className="recommended-meta">3 days ago • 2/2</span>
            </article>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default Question;