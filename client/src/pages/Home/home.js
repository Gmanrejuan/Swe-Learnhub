import React, { useState, useEffect } from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaGraduationCap, FaBuilding } from "react-icons/fa";
import SideBar from '../../components/SideBar/sideBar';
import { feedAPI, statsAPI } from '../../services/api';

function Home() {
  const [feedData, setFeedData] = useState([]);
  const [stats, setStats] = useState({
    questions: 0,
    interviews: 0,
    comments: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data when component mounts
  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      
      // Fetch feed data and stats in parallel
      const [feedResponse, statsResponse] = await Promise.all([
        feedAPI.getHomeFeed(1, 10),
        statsAPI.getCommunityStats()
      ]);

      if (feedResponse.success) {
        setFeedData(feedResponse.data);
      }

      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
      setError('Failed to load content. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  // Render individual post
  const renderPost = (post, index) => {
    const isQuestion = post.type === 'question';
    
    return (
      <ul key={`${post.type}-${post.id}`}>
        <li>
          <div className="text-box">
            <p>
              <Link to="#" className="category-link">
                {isQuestion ? `${post.topic} Question` : 'Interview Experience'}
              </Link> by{' '}
              <Link to="#" className="author-link">
                {post.first_name} {post.last_name}
              </Link>
            </p>
            <h1>{post.title}</h1>
            <p>{post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}</p>

            <div className="post-meta">
              <span className="meta-item">
                <BsCalendarDate /> {formatDate(post.created_at)}
              </span>
              <span className="meta-item">
                {isQuestion ? (
                  <><FaGraduationCap /> {post.semester}/{post.academic_year}</>
                ) : (
                  <><FaBuilding /> {post.company}</>
                )}
              </span>
              <span className="meta-item">
                <AiFillLike /> {post.likes}
              </span>
              <span className="meta-item">
                <FaComment /> {post.comment_count}
              </span>
            </div>
          </div>
          <div className="img-box">
            <img 
              src={isQuestion 
                ? `https://via.placeholder.com/300x200/28a745/ffffff?text=${encodeURIComponent(post.topic)}`
                : `https://via.placeholder.com/300x200/1877f2/ffffff?text=${encodeURIComponent(post.company)}`
              } 
              alt={isQuestion ? post.topic : `${post.company} Interview`} 
            />
          </div>
        </li>
      </ul>
    );
  };

  if (loading) {
    return (
      <div className="container">
        <SideBar/>
        <div className="middle">
          <div className="feed-header">
            <h2>Loading...</h2>
            <p>Fetching latest content from the community</p>
          </div>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Loading feed...</p>
          </div>
        </div>
        <div className="right"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <SideBar/>
        <div className="middle">
          <div className="feed-header">
            <h2>Error</h2>
            <p style={{ color: 'red' }}>{error}</p>
          </div>
          <button onClick={fetchHomeData} style={{ padding: '10px 20px', margin: '20px' }}>
            Retry
          </button>
        </div>
        <div className="right"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <SideBar/>

      <div className="middle">
        <div className="feed-header">
          <h2>Latest from LearnHub</h2>
          <p>Questions, experiences, and knowledge shared by the community</p>
        </div>

        {feedData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h3>No posts yet</h3>
            <p>Be the first to share your question or interview experience!</p>
            <Link to="/write" style={{ 
              display: 'inline-block', 
              marginTop: '20px', 
              padding: '10px 20px', 
              backgroundColor: '#1877f2', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}>
              Write a Post
            </Link>
          </div>
        ) : (
          feedData.map((post, index) => renderPost(post, index))
        )}
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
          </ul>
        </div>

        <div className="quick-stats">
          <h3>Community Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.questions}</span>
              <span className="stat-label">Questions Asked</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.interviews}</span>
              <span className="stat-label">Interview Experiences</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.comments}</span>
              <span className="stat-label">Helpful Answers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.users}</span>
              <span className="stat-label">Active Members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;