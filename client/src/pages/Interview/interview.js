import React, { useState, useEffect } from "react";
import "./interview.css"
import { Link } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaBuilding } from "react-icons/fa";
import SideBar from '../../components/SideBar/sideBar';
import { interviewsAPI } from '../../services/api';

function Interview() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedResult, setSelectedResult] = useState('');

  // Fetch data when component mounts
  useEffect(() => {
    fetchInterviews();
  }, [selectedCompany, selectedResult]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      
      const filters = {};
      if (selectedCompany) filters.company = selectedCompany;
      if (selectedResult) filters.result = selectedResult;

      const response = await interviewsAPI.getInterviews(filters);

      if (response.success) {
        setInterviews(response.data);
      } else {
        setError('Failed to fetch interviews');
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
      setError('Failed to load interview experiences. Please try again.');
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

  // Get unique companies for filter
  const getUniqueCompanies = () => {
    const companies = interviews.map(interview => interview.company);
    return [...new Set(companies)];
  };

  // Handle company filter
  const handleCompanyFilter = (company) => {
    setSelectedCompany(company === selectedCompany ? '' : company);
  };

  // Get result badge style
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
      <div className="interview-layout">
        <SideBar/>
        <main className="main-content">
          <div className="content-feed">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2>Loading interview experiences...</h2>
              <p>Please wait while we fetch the latest content</p>
            </div>
          </div>
        </main>
        <aside className="sidebar-right"></aside>
      </div>
    );
  }

  if (error) {
    return (
      <div className="interview-layout">
        <SideBar/>
        <main className="main-content">
          <div className="content-feed">
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h2>Error</h2>
              <p style={{ color: 'red' }}>{error}</p>
              <button 
                onClick={fetchInterviews}
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
    <div className="interview-layout">
      <SideBar/>
      
      {/* Scrollable Main Content */}
      <main className="main-content">
        <div className="content-feed">
          <div className="filter-bar" style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3>Filter by Result:</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {['Selected', 'Rejected', 'Waiting', 'Withdrew'].map(result => (
                <button
                  key={result}
                  onClick={() => setSelectedResult(result === selectedResult ? '' : result)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    backgroundColor: result === selectedResult ? '#1877f2' : 'white',
                    color: result === selectedResult ? 'white' : '#333',
                    cursor: 'pointer'
                  }}
                >
                  {result}
                </button>
              ))}
              {selectedResult && (
                <button
                  onClick={() => setSelectedResult('')}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    backgroundColor: '#f8f9fa',
                    color: '#666',
                    cursor: 'pointer'
                  }}
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {interviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h3>No interview experiences found</h3>
              <p>Be the first to share your interview experience!</p>
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
                Share Your Experience
              </Link>
            </div>
          ) : (
            // Replace the interviews.map section with this
              interviews.map((interview) => (
                <article key={interview.id} className="interview-card">
                  <div className="card-content">
                    <div className="card-meta">
                      <Link to="#" className="meta-category">Interview Experience</Link> 
                      <span className="meta-separator">by</span> 
                      <Link to="#" className="meta-author">
                        {interview.first_name} {interview.last_name}
                      </Link>
                      <span 
                        className="result-badge"
                        style={{
                          ...getResultBadgeStyle(interview.result),
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          marginLeft: '10px'
                        }}
                      >
                        {interview.result}
                      </span>
                    </div>
                    <Link to={`/:interview/:${interview.id}`} className="card-title-link">
                      <h2 className="card-title">{interview.title}</h2>
                    </Link>
                    <p className="card-excerpt">
                      {interview.content.length > 200 
                        ? `${interview.content.substring(0, 200)}...` 
                        : interview.content}
                    </p>

                    <div className="interview-details" style={{ margin: '10px 0', fontSize: '14px', color: '#666' }}>
                      <span><strong>Position:</strong> {interview.position}</span>
                      <span style={{ margin: '0 10px' }}>|</span>
                      <span><strong>Location:</strong> {interview.location_type}</span>
                      {interview.tags && (
                        <>
                          <span style={{ margin: '0 10px' }}>|</span>
                          <span><strong>Tags:</strong> {interview.tags}</span>
                        </>
                      )}
                    </div>
                    
                    <Link to={`/:interview/:${interview.id}`} className="read-more-btn">
                      Read Full Experience →
                    </Link>

                    <div className="card-stats">
                      <span className="stat-item">
                        <BsCalendarDate className="stat-icon" /> {formatDate(interview.created_at)}
                      </span>
                      <span className="stat-item">
                        <FaBuilding className="stat-icon" /> {interview.company}
                      </span>
                      <span className="stat-item">
                        <AiFillLike className="stat-icon" /> {interview.likes}
                      </span>
                      <span className="stat-item">
                        <FaComment className="stat-icon" /> {interview.comment_count}
                      </span>
                    </div>
                  </div>
                  <div className="card-image">
                    <Link to={`/interview/${interview.id}`}>
                      <img 
                        src={`https://via.placeholder.com/300x200/1877f2/ffffff?text=${encodeURIComponent(interview.company)}`}
                        alt={`${interview.company} interview experience`} 
                      />
                    </Link>
                  </div>
                </article>
              ))
          )}
        </div>
      </main>

      {/* Fixed Right Sidebar */}
      <aside className="sidebar-right">
        <section className="widget">
          <h3 className="widget-title">Popular Companies</h3>
          <div className="company-tags">
            {getUniqueCompanies().slice(0, 10).map((company) => (
              <button 
                key={company}
                className="company-tag"
                onClick={() => handleCompanyFilter(company)}
                style={{
                  backgroundColor: company === selectedCompany ? '#1877f2' : '#f1f3f4',
                  color: company === selectedCompany ? 'white' : '#333',
                  border: '1px solid #ddd',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  margin: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {company}
              </button>
            ))}
          </div>
        </section>

        <section className="widget">
          <h3 className="widget-title">Recent Interviews</h3>
          <div className="trending-list">
            {interviews.slice(0, 5).map((interview) => (
              <article key={`recent-${interview.id}`} className="trending-item">
                <span 
                  className="trending-label"
                  style={getResultBadgeStyle(interview.result)}
                >
                  {interview.result}
                </span>
                <h4 className="trending-title">{interview.title}</h4>
                <p className="trending-excerpt">
                  {interview.position} at {interview.company}
                </p>
                <span className="trending-meta">
                  {formatDate(interview.created_at)} • {interview.company}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="widget">
          <h3 className="widget-title">Success Stories</h3>
          <div className="trending-list">
            {interviews
              .filter(interview => interview.result === 'Selected')
              .slice(0, 3)
              .map((interview) => (
                <article key={`success-${interview.id}`} className="trending-item">
                  <span className="trending-label" style={{ backgroundColor: '#10B981', color: 'white' }}>
                    Success
                  </span>
                  <h4 className="trending-title">{interview.title}</h4>
                  <p className="trending-excerpt">
                    Successfully landed {interview.position} role
                  </p>
                  <span className="trending-meta">
                    {formatDate(interview.created_at)} • {interview.company}
                  </span>
                </article>
              ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

export default Interview;