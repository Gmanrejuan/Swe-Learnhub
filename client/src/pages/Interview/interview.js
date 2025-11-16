import React from "react";
import "./interview.css"
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiBriefcase } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

function Interview() {
  return (
    <div className="interview-layout">
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
              <Link to="/interview" className="nav-link nav-link--active">
                <HiBriefcase className="nav-icon" /> Interview
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/question" className="nav-link">
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
          <article className="interview-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">Interview Experience</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">Sarah Johnson</Link>
              </div>
              <h2 className="card-title">My Google Software Engineer Interview Journey</h2>
              <p className="card-excerpt">Sharing my complete experience from application to offer. Covers technical rounds, behavioral questions, and preparation strategies that helped me land the role.</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 15/11/25
                </span>
                <span className="stat-item">
                  <FaBuilding className="stat-icon" /> Google
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 2,847
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 342
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="Google interview experience" />
            </div>
          </article>

          <article className="interview-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">Interview Experience</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">Mike Chen</Link>
              </div>
              <h2 className="card-title">Microsoft Frontend Developer Interview - What to Expect</h2>
              <p className="card-excerpt">Detailed breakdown of my Microsoft interview process including coding challenges, system design, and tips for acing the behavioral rounds.</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 12/11/25
                </span>
                <span className="stat-item">
                  <FaBuilding className="stat-icon" /> Microsoft
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 1,923
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 187
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="Microsoft interview experience" />
            </div>
          </article>

          <article className="interview-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">Interview Experience</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">Priya Sharma</Link>
              </div>
              <h2 className="card-title">Amazon SDE Interview: From Rejection to Success</h2>
              <p className="card-excerpt">How I failed my first Amazon interview, learned from mistakes, and successfully cleared it in my second attempt. Includes practice resources and timeline.</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 10/11/25
                </span>
                <span className="stat-item">
                  <FaBuilding className="stat-icon" /> Amazon
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 4,156
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 528
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="Amazon interview experience" />
            </div>
          </article>

          <article className="interview-card">
            <div className="card-content">
              <div className="card-meta">
                <Link to="#" className="meta-category">Interview Experience</Link> 
                <span className="meta-separator">by</span> 
                <Link to="#" className="meta-author">David Wilson</Link>
              </div>
              <h2 className="card-title">Meta (Facebook) Backend Engineer Interview Experience</h2>
              <p className="card-excerpt">Complete walkthrough of Meta's interview process for backend engineers. System design questions, coding rounds, and cultural fit discussions covered.</p>

              <div className="card-stats">
                <span className="stat-item">
                  <BsCalendarDate className="stat-icon" /> 08/11/25
                </span>
                <span className="stat-item">
                  <FaBuilding className="stat-icon" /> Meta
                </span>
                <span className="stat-item">
                  <AiFillLike className="stat-icon" /> 3,291
                </span>
                <span className="stat-item">
                  <FaComment className="stat-icon" /> 425
                </span>
              </div>
            </div>
            <div className="card-image">
              <img src="../../resource/image.png" alt="Meta interview experience" />
            </div>
          </article>
        </div>
      </main>

      {/* Fixed Right Sidebar */}
      <aside className="sidebar-right">
        <section className="widget">
          <h3 className="widget-title">Popular Companies</h3>
          <div className="company-tags">
            <button className="company-tag">Google</button>
            <button className="company-tag">Microsoft</button>
            <button className="company-tag">Amazon</button>
            <button className="company-tag">Meta</button>
            <button className="company-tag">Apple</button>
            <button className="company-tag">Netflix</button>
            <button className="company-tag">Uber</button>
            <button className="company-tag">Airbnb</button>
            <button className="company-tag">Tesla</button>
            <button className="company-tag">Spotify</button>
          </div>
        </section>

        <section className="widget">
          <h3 className="widget-title">Trending This Week</h3>
          <div className="trending-list">
            <article className="trending-item">
              <span className="trending-label">Hot</span>
              <h4 className="trending-title">Goldman Sachs Technical Interview</h4>
              <p className="trending-excerpt">Investment banking technology division interview experience</p>
              <span className="trending-meta">3 days ago • Goldman Sachs</span>
            </article>
            
            <article className="trending-item">
              <span className="trending-label">New</span>
              <h4 className="trending-title">Stripe Payment Engineer Interview</h4>
              <p className="trending-excerpt">Backend engineering role interview breakdown</p>
              <span className="trending-meta">5 days ago • Stripe</span>
            </article>

            <article className="trending-item">
              <span className="trending-label">New</span>
              <h4 className="trending-title">Stripe Payment Engineer Interview</h4>
              <p className="trending-excerpt">Backend engineering role interview breakdown</p>
              <span className="trending-meta">5 days ago • Stripe</span>
            </article>

            <article className="trending-item">
              <span className="trending-label">New</span>
              <h4 className="trending-title">Stripe Payment Engineer Interview</h4>
              <p className="trending-excerpt">Backend engineering role interview breakdown</p>
              <span className="trending-meta">5 days ago • Stripe</span>
            </article>

            <article className="trending-item">
              <span className="trending-label">New</span>
              <h4 className="trending-title">Stripe Payment Engineer Interview</h4>
              <p className="trending-excerpt">Backend engineering role interview breakdown</p>
              <span className="trending-meta">5 days ago • Stripe</span>
            </article>
            
            <article className="trending-item">
              <span className="trending-label">Popular</span>
              <h4 className="trending-title">Adobe Creative Cloud Team Interview</h4>
              <p className="trending-excerpt">Full-stack developer position interview journey</p>
              <span className="trending-meta">1 week ago • Adobe</span>
            </article>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default Interview;