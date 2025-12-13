import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BsCalendarDate, BsEye, BsArrowLeft } from "react-icons/bs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaComment, FaGraduationCap, FaBuilding, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import { questionsAPI, interviewsAPI } from '../../services/api';
import SideBar from '../SideBar/sideBar';
import './postDetail.css';

function PostDetail() {
  const { type, id } = useParams(); 
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPostDetail();
  }, [type, id]);

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      let response;

      if (type === ':question') {
        response = await questionsAPI.getQuestion(id);
      } else if (type === ':interview') {
        response = await interviewsAPI.getInterview(id);
      } else {
        throw new Error('Invalid post type');
      }

      console.log("This is happening");

      if (response.success) {
        setPost(response.data.post || response.data.question || response.data.interview);
        setComments(response.data.comments || []);
      } else {
        setError('Post not found');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });
  };

  const handleLike = async () => {
    // Implement like functionality here
    setLiked(!liked);
    // You would typically make an API call here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getResultBadgeStyle = (result) => {
    const styles = {
      'Selected': { backgroundColor: '#10B981', color: 'white' },
      'Rejected': { backgroundColor: '#EF4444', color: 'white' },
      'Waiting': { backgroundColor: '#F59E0B', color: 'white' },
      'Withdrew': { backgroundColor: '#6B7280', color: 'white' }
    };
    return styles[result] || { backgroundColor: '#E5E7EB', color: '#374151' };
  };

  if (loading) {
    return (
      <div className="post-detail-layout">
        <SideBar />
        <main className="post-detail-main">
          <div className="loading-container">
            <h2>Loading...</h2>
            <p>Please wait while we fetch the post</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-detail-layout">
        <SideBar />
        <main className="post-detail-main">
          <div className="error-container">
            <h2>Error</h2>
            <p style={{ color: 'red' }}>{error}</p>
            <button onClick={() => navigate(-1)} className="btn-back">
              Go Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  const isQuestion = type === 'question';

  return (
    <div className="post-detail-layout">
      <SideBar />
      
      <main className="post-detail-main">
        <div className="post-detail-container">
          {/* Header with back button */}
          <div className="post-detail-header">
            <button onClick={() => navigate(-1)} className="btn-back">
              <BsArrowLeft /> Back
            </button>
            <div className="post-type-indicator">
              {isQuestion ? '📝 Question' : '🎯 Interview Experience'}
            </div>
          </div>

          {/* Post content */}
          <article className="post-detail-article">
            <div className="post-meta">
              <div className="meta-info">
                <Link to="#" className="author-link">
                  <img 
                    src="https://via.placeholder.com/40" 
                    alt="Profile" 
                    className="author-avatar"
                  />
                  <div className="author-details">
                    <span className="author-name">
                      {post.first_name} {post.last_name}
                    </span>
                    <span className="post-date">
                      <BsCalendarDate /> {formatDate(post.created_at)}
                    </span>
                  </div>
                </Link>
              </div>
              
              {!isQuestion && post.result && (
                <span 
                  className="result-badge"
                  style={getResultBadgeStyle(post.result)}
                >
                  {post.result}
                </span>
              )}
            </div>

            <h1 className="post-title">{post.title}</h1>

            {/* Post-specific info */}
            <div className="post-info-bar">
              {isQuestion ? (
                <>
                  <span className="info-item">
                    <FaGraduationCap /> {post.semester}/{post.academic_year}
                  </span>
                  <span className="info-item">
                    📚 {post.topic}
                  </span>
                </>
              ) : (
                <>
                  <span className="info-item">
                    <FaBuilding /> {post.company}
                  </span>
                  <span className="info-item">
                    💼 {post.position}
                  </span>
                  <span className="info-item">
                    <FaMapMarkerAlt /> {post.location_type}
                  </span>
                  {post.interview_date && (
                    <span className="info-item">
                      📅 {formatDateShort(post.interview_date)}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="post-content">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {!isQuestion && post.tags && (
              <div className="post-tags">
                <strong>Tags: </strong>
                {post.tags.split(',').map((tag, index) => (
                  <span key={index} className="tag">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Post stats and actions */}
            <div className="post-actions">
              <div className="post-stats">
                <span className="stat-item">
                  <BsEye /> {post.views} views
                </span>
                <span className="stat-item">
                  <AiFillLike /> {post.likes} likes
                </span>
                <span className="stat-item">
                  <FaComment /> {comments.length} comments
                </span>
              </div>
              
              <div className="action-buttons">
                <button 
                  className={`btn-like ${liked ? 'liked' : ''}`}
                  onClick={handleLike}
                >
                  {liked ? <AiFillLike /> : <AiOutlineLike />}
                  {liked ? 'Liked' : 'Like'}
                </button>
                <button className="btn-share" onClick={handleShare}>
                  <FaShare /> Share
                </button>
              </div>
            </div>
          </article>

          {/* Comments section */}
          <section className="comments-section">
            <h3>Comments ({comments.length})</h3>
            
            {/* Add comment form */}
            <div className="add-comment">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows="3"
              />
              <button 
                className="btn-submit-comment"
                disabled={!newComment.trim()}
              >
                Post Comment
              </button>
            </div>

            {/* Comments list */}
            <div className="comments-list">
              {comments.length === 0 ? (
                <div className="no-comments">
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <img 
                      src="https://via.placeholder.com/32" 
                      alt="Profile" 
                      className="comment-avatar"
                    />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">
                          {comment.first_name} {comment.last_name}
                        </span>
                        <span className="comment-date">
                          {formatDateShort(comment.created_at)}
                        </span>
                      </div>
                      <p className="comment-text">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Right sidebar with related posts */}
      <aside className="post-detail-sidebar">
        <section className="sidebar-widget">
          <h3>Related {isQuestion ? 'Questions' : 'Experiences'}</h3>
          <div className="related-posts">
            {/* You can implement related posts here */}
            <p>Related posts will appear here...</p>
          </div>
        </section>

        <section className="sidebar-widget">
          <h3>Popular Topics</h3>
          <div className="topic-list">
            {isQuestion ? (
              ['Data Structures', 'Algorithms', 'Web Development', 'Database'].map(topic => (
                <Link key={topic} to={`/questions?topic=${topic}`} className="topic-link">
                  {topic}
                </Link>
              ))
            ) : (
              ['Google', 'Microsoft', 'Amazon', 'Meta'].map(company => (
                <Link key={company} to={`/interviews?company=${company}`} className="topic-link">
                  {company}
                </Link>
              ))
            )}
          </div>
        </section>
      </aside>
    </div>
  );
}

export default PostDetail;