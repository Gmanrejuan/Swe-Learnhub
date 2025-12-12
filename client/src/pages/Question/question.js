import React, { useState, useEffect } from "react";
import "./question.css"
import { Link } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaGraduationCap } from "react-icons/fa";
import SideBar from '../../components/SideBar/sideBar';
import { questionsAPI } from '../../services/api';

function Question() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  // Fetch data when component mounts
  useEffect(() => {
    fetchQuestions();
  }, [selectedSemester, selectedTopic]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      
      const filters = {};
      if (selectedSemester) filters.semester = selectedSemester;
      if (selectedTopic) filters.topic = selectedTopic;

      const response = await questionsAPI.getQuestions(filters);

      if (response.success) {
        setQuestions(response.data);
      } else {
        setError('Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Please try again.');
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

  // Get unique topics for filter
  const getUniqueTopics = () => {
    const topics = questions.map(question => question.topic);
    return [...new Set(topics)];
  };

  // Handle semester filter
  const handleSemesterFilter = (semester) => {
    setSelectedSemester(semester === selectedSemester ? '' : semester);
  };

  // Handle topic filter
  const handleTopicFilter = (topic) => {
    setSelectedTopic(topic === selectedTopic ? '' : topic);
  };

  // Semester options
  const semesters = ['1/1', '1/2', '2/1', '2/2', '3/1', '3/2', '4/1', '4/2'];

  // Common topics
  const commonTopics = [
    'Data Structures', 'Algorithms', 'Web Development', 'Database', 
    'System Design', 'Machine Learning', 'Networking', 'Operating Systems'
  ];

  if (loading) {
    return (
      <div className="question-layout">
        <SideBar/>
        <main className="main-content">
          <div className="content-feed">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2>Loading questions...</h2>
              <p>Please wait while we fetch the latest questions</p>
            </div>
          </div>
        </main>
        <aside className="sidebar-right"></aside>
      </div>
    );
  }

  if (error) {
    return (
      <div className="question-layout">
        <SideBar/>
        <main className="main-content">
          <div className="content-feed">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2>Error</h2>
              <p style={{ color: 'red' }}>{error}</p>
              <button 
                onClick={fetchQuestions}
                style={{ 
                  padding: '10px 20px', 
                  marginTop: '20px',
                  backgroundColor: '#1877f2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </main>
        <aside className="sidebar-right"></aside>
      </div>
    );
  }

  return (
    <div className="question-layout">
      <SideBar/>
      
      {/* Scrollable Main Content */}
      <main className="main-content">
        <div className="content-feed">
          {/* Filter Bar */}
          <div className="filter-bar" style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ marginBottom: '15px' }}>
              <h4>Filter by Semester:</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {semesters.map(semester => (
                  <button
                    key={semester}
                    onClick={() => handleSemesterFilter(semester)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '20px',
                      backgroundColor: semester === selectedSemester ? '#1877f2' : 'white',
                      color: semester === selectedSemester ? 'white' : '#333',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    {semester}
                  </button>
                ))}
                {selectedSemester && (
                  <button
                    onClick={() => setSelectedSemester('')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '20px',
                      backgroundColor: '#f8f9fa',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {questions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h3>No questions found</h3>
              <p>Be the first to ask a question in this category!</p>
              <Link 
                to="/write" 
                style={{ 
                  display: 'inline-block', 
                  marginTop: '20px', 
                  padding: '10px 20px', 
                  backgroundColor: '#1877f2', 
                  color: 'white', 
                  textDecoration: 'none', 
                  borderRadius: '5px' 
                }}
              >
                Ask a Question
              </Link>
            </div>
          ) : (
            questions.map((question) => (
              <article key={question.id} className="question-card">
                <div className="card-content">
                  <div className="card-meta">
                    <Link to="#" className="meta-category">{question.topic}</Link> 
                    <span className="meta-separator">by</span> 
                    <Link to="#" className="meta-author">
                      {question.first_name} {question.last_name}
                    </Link>
                  </div>
                  <h2 className="card-title">{question.title}</h2>
                  <p className="card-excerpt">
                    {question.content.length > 200 
                      ? `${question.content.substring(0, 200)}...` 
                      : question.content}
                  </p>

                  <div className="card-stats">
                    <span className="stat-item">
                      <BsCalendarDate className="stat-icon" /> {formatDate(question.created_at)}
                    </span>
                    <span className="stat-item">
                      <FaGraduationCap className="stat-icon" /> {question.semester}/{question.academic_year}
                    </span>
                    <span className="stat-item">
                      <AiFillLike className="stat-icon" /> {question.likes}
                    </span>
                    <span className="stat-item">
                      <FaComment className="stat-icon" /> {question.comment_count}
                    </span>
                  </div>
                </div>
                <div className="card-image">
                  <img 
                    src={`https://via.placeholder.com/300x200/28a745/ffffff?text=${encodeURIComponent(question.topic)}`}
                    alt={`${question.topic} question`} 
                  />
                </div>
              </article>
            ))
          )}
        </div>
      </main>

      {/* Fixed Right Sidebar */}
      <aside className="sidebar-right">
        <section className="widget">
          <h3 className="widget-title">Filter by Semester</h3>
          <div className="semester-tags">
            <button 
              className={`semester-tag ${!selectedSemester ? 'semester-tag--active' : ''}`}
              onClick={() => setSelectedSemester('')}
            >
              All
            </button>
            {semesters.map(semester => (
              <button 
                key={semester}
                className={`semester-tag ${selectedSemester === semester ? 'semester-tag--active' : ''}`}
                onClick={() => handleSemesterFilter(semester)}
              >
                {semester}
              </button>
            ))}
          </div>
        </section>

        <section className="widget">
          <h3 className="widget-title">Popular Topics</h3>
          <div className="topic-tags">
            {getUniqueTopics().length > 0 
              ? getUniqueTopics().slice(0, 8).map(topic => (
                  <button 
                    key={topic}
                    className={`topic-tag ${selectedTopic === topic ? 'topic-tag--active' : ''}`}
                    onClick={() => handleTopicFilter(topic)}
                  >
                    {topic}
                  </button>
                ))
              : commonTopics.map(topic => (
                  <button key={topic} className="topic-tag">{topic}</button>
                ))
            }
          </div>
        </section>

        <section className="widget">
          <h3 className="widget-title">Trending Questions</h3>
          <div className="recommended-list">
            {questions
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 4)
              .map((question) => (
                <article key={`trending-${question.id}`} className="recommended-item">
                  <span className="recommended-label">🔥 Hot</span>
                  <h4 className="recommended-title">{question.title}</h4>
                  <p className="recommended-excerpt">
                    {question.content.length > 60 
                      ? `${question.content.substring(0, 60)}...` 
                      : question.content}
                  </p>
                  <span className="recommended-meta">
                    {formatDate(question.created_at)} • {question.semester}/{question.academic_year}
                  </span>
                </article>
              ))}
          </div>
        </section>

        <section className="widget">
          <h3 className="widget-title">Recent Questions</h3>
          <div className="recommended-list">
            {questions
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 3)
              .map((question) => (
                <article key={`recent-${question.id}`} className="recommended-item">
                  <span className="recommended-label">📝 New</span>
                  <h4 className="recommended-title">{question.title}</h4>
                  <p className="recommended-excerpt">
                    Asked by {question.first_name} {question.last_name}
                  </p>
                  <span className="recommended-meta">
                    {formatDate(question.created_at)} • {question.topic}
                  </span>
                </article>
              ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

export default Question;