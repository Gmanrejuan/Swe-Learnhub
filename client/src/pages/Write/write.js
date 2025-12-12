import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './write.css';
import { FaHome, FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaLink, FaImage } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { HiBriefcase } from 'react-icons/hi';
import SideBar from '../../components/SideBar/sideBar';
import { useNavigate } from 'react-router-dom';
import { questionsAPI, interviewsAPI } from '../../services/api';


const Write = () => {
  const [postType, setPostType] = useState('question'); // 'question' or 'interview'
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    // Question specific
    semester: '',
    year: '',
    topic: '',
    // Interview specific
    company: '',
    position: '',
    interviewDate: '',
    location: '',
    result: '',
    tags: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Validate required fields
        if (!formData.title || !formData.content) {
            alert('Please fill in all required fields');
            return;
        }

        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to post content');
            return;
        }

        let result;

        if (postType === 'question') {
            // Validate question-specific fields
            if (!formData.semester || !formData.year || !formData.topic) {
                alert('Please fill in all required fields for question');
                return;
            }

            const questionData = {
                title: formData.title,
                content: formData.content,
                semester: formData.semester,
                year: formData.year,
                topic: formData.topic
            };

            result = await questionsAPI.createQuestion(questionData, token);
        } else {
            // Validate interview-specific fields
            if (!formData.company || !formData.position || !formData.interviewDate || !formData.location || !formData.result) {
                alert('Please fill in all required fields for interview experience');
                return;
            }

            const interviewData = {
                title: formData.title,
                content: formData.content,
                company: formData.company,
                position: formData.position,
                interviewDate: formData.interviewDate,
                location: formData.location,
                result: formData.result,
                tags: formData.tags
            };

            result = await interviewsAPI.createInterview(interviewData, token);
        }

        if (result.success) {
            alert(`${postType === 'question' ? 'Question' : 'Interview experience'} submitted successfully!`);
            
            // Reset form
            setFormData({
                title: '',
                content: '',
                semester: '',
                year: '',
                topic: '',
                company: '',
                position: '',
                interviewDate: '',
                location: '',
                result: '',
                tags: ''
            });
            
            // Optionally redirect to home or the new post
            // navigate('/');
        } else {
            alert(result.message || 'Failed to submit post');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit post. Please try again.');
    }
};

  const insertFormatting = (format) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = '';
    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'ul':
        formattedText = `\n- ${selectedText}\n`;
        break;
      case 'ol':
        formattedText = `\n1. ${selectedText}\n`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      default:
        formattedText = selectedText;
    }

    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    setFormData({ ...formData, content: newValue });
  };

  return (
    <div className="write-layout">
      
      <SideBar/>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="write-container">
          <header className="write-header">
            <h1>Share Your Knowledge</h1>
            <p>Help fellow students by sharing questions or interview experiences</p>
          </header>

          {/* Post Type Selector */}
          <div className="post-type-selector">
            <button 
              className={`type-btn ${postType === 'question' ? 'type-btn--active' : ''}`}
              onClick={() => setPostType('question')}
            >
              <MdOutlineQuestionMark /> Ask a Question
            </button>
            <button 
              className={`type-btn ${postType === 'interview' ? 'type-btn--active' : ''}`}
              onClick={() => setPostType('interview')}
            >
              <HiBriefcase /> Share Interview Experience
            </button>
          </div>

          <form onSubmit={handleSubmit} className="write-form">
            {/* Title Field */}
            <div className="form-group">
              <label htmlFor="title">
                {postType === 'question' ? 'Question Title' : 'Interview Experience Title'}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={postType === 'question' ? 
                  "e.g., How to implement binary search in Java?" : 
                  "e.g., My Google Software Engineer Interview Experience"
                }
                required
              />
            </div>

            {/* Conditional Fields based on Post Type */}
            {postType === 'question' ? (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="semester">Semester</label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Semester</option>
                    <option value="1/1">1st Year, 1st Semester</option>
                    <option value="1/2">1st Year, 2nd Semester</option>
                    <option value="2/1">2nd Year, 1st Semester</option>
                    <option value="2/2">2nd Year, 2nd Semester</option>
                    <option value="3/1">3rd Year, 1st Semester</option>
                    <option value="3/2">3rd Year, 2nd Semester</option>
                    <option value="4/1">4th Year, 1st Semester</option>
                    <option value="4/2">4th Year, 2nd Semester</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="year">Academic Year</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                    <option value="2022-23">2022-23</option>
                    <option value="2021-22">2021-22</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="topic">Subject/Topic</label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Topic</option>
                    <option value="Data Structures">Data Structures</option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="Database">Database</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Operating Systems">Operating Systems</option>
                    <option value="Networking">Networking</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g., Google, Microsoft, Amazon"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position">Position Applied</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer, Frontend Developer"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="interviewDate">Interview Date</label>
                  <input
                    type="date"
                    id="interviewDate"
                    name="interviewDate"
                    value={formData.interviewDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {postType === 'interview' && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Interview Location/Type</label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Remote">Remote (Online)</option>
                    <option value="On-site">On-site</option>
                    <option value="Phone">Phone Interview</option>
                    <option value="Video Call">Video Call</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="result">Interview Result</label>
                  <select
                    id="result"
                    name="result"
                    value={formData.result}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Result</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Waiting">Waiting for Result</option>
                    <option value="Withdrew">Withdrew Application</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="e.g., coding, system-design, behavioral"
                  />
                </div>
              </div>
            )}

            {/* Rich Text Editor */}
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <div className="editor-toolbar">
                <button type="button" onClick={() => insertFormatting('bold')} className="toolbar-btn">
                  <FaBold />
                </button>
                <button type="button" onClick={() => insertFormatting('italic')} className="toolbar-btn">
                  <FaItalic />
                </button>
                <button type="button" onClick={() => insertFormatting('underline')} className="toolbar-btn">
                  <FaUnderline />
                </button>
                <button type="button" onClick={() => insertFormatting('ul')} className="toolbar-btn">
                  <FaListUl />
                </button>
                <button type="button" onClick={() => insertFormatting('ol')} className="toolbar-btn">
                  <FaListOl />
                </button>
                <button type="button" onClick={() => insertFormatting('link')} className="toolbar-btn">
                  <FaLink />
                </button>
                <button type="button" onClick={() => insertFormatting('code')} className="toolbar-btn">
                  {'</>'}
                </button>
              </div>
              <textarea
                id="content-editor"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder={postType === 'question' ? 
                  "Describe your question in detail. Include what you've tried, expected vs actual results, and any relevant code or examples..." :
                  "Share your complete interview experience. Include interview rounds, questions asked, preparation tips, and advice for future candidates..."
                }
                rows="15"
                required
              />
              <div className="editor-help">
                <small>
                  Use **bold**, *italic*, `code`, and other markdown formatting. 
                  Select text and use toolbar buttons for quick formatting.
                </small>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="form-actions">
              <button type="button" className="btn-secondary">Save as Draft</button>
              <button type="submit" className="btn-primary">
                {postType === 'question' ? 'Post Question' : 'Share Experience'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Write;