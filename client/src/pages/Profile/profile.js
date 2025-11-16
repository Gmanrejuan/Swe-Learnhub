import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import { FaHome, FaEdit, FaCamera, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaSave, FaTimes } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { HiBriefcase } from 'react-icons/hi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    bio: 'Computer Science student passionate about software engineering and web development. Always eager to learn new technologies and collaborate on interesting projects.',
    university: 'ABC University',
    degree: 'Bachelor of Technology',
    major: 'Computer Science',
    currentSemester: '3/2',
    graduationYear: '2025',
    location: 'New York, USA',
    dateOfBirth: '1998-05-15',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL'],
    interests: ['Web Development', 'Machine Learning', 'Open Source', 'Competitive Programming']
  });

  const [editData, setEditData] = useState({...profileData});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setEditData({
      ...editData,
      skills: skills
    });
  };

  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(',').map(interest => interest.trim());
    setEditData({
      ...editData,
      interests: interests
    });
  };

  const handleSave = () => {
    setProfileData({...editData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({...profileData});
    setIsEditing(false);
  };

  const calculateProgress = () => {
    const semester = profileData.currentSemester;
    if (semester) {
      const [year, sem] = semester.split('/');
      const totalSemesters = 8; // 4 years * 2 semesters
      const completedSemesters = (parseInt(year) - 1) * 2 + parseInt(sem);
      return Math.round((completedSemesters / totalSemesters) * 100);
    }
    return 0;
  };

  const getStudentStatus = () => {
    const semester = profileData.currentSemester;
    if (semester) {
      const [year] = semester.split('/');
      const yearNames = {
        '1': 'Freshman',
        '2': 'Sophomore', 
        '3': 'Junior',
        '4': 'Senior'
      };
      return yearNames[year] || 'Student';
    }
    return 'Student';
  };

  return (
    <div className="profile-layout">
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
              <Link to="/profile" className="nav-link nav-link--active">
                <CgProfile className="nav-icon" /> Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="profile-container">
          
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-cover">
              <div className="profile-avatar">
                <img src="https://via.placeholder.com/150" alt="Profile" />
                <button className="avatar-upload">
                  <FaCamera />
                </button>
              </div>
            </div>
            
            <div className="profile-info">
              <div className="profile-basic">
                <h1>{profileData.firstName} {profileData.lastName}</h1>
                <p className="profile-status">{getStudentStatus()} • {profileData.major}</p>
                <p className="profile-university">{profileData.university}</p>
                <div className="profile-location">
                  <FaMapMarkerAlt /> {profileData.location}
                </div>
              </div>
              
              <div className="profile-actions">
                <button 
                  className="btn-edit"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FaEdit /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Academic Progress */}
            <div className="academic-progress">
              <h3>Academic Progress</h3>
              <div className="progress-info">
                <span>Current: {profileData.currentSemester}</span>
                <span>Graduation: {profileData.graduationYear}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${calculateProgress()}%`}}
                ></div>
              </div>
              <span className="progress-text">{calculateProgress()}% Complete</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'about' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button 
              className={`tab-btn ${activeTab === 'academic' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('academic')}
            >
              Academic Info
            </button>
            <button 
              className={`tab-btn ${activeTab === 'contact' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact & Social
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="tab-pane">
                <div className="info-section">
                  <h3>Bio</h3>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={editData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p>{profileData.bio}</p>
                  )}
                </div>

                <div className="info-section">
                  <h3>Skills</h3>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.skills.join(', ')}
                      onChange={handleSkillsChange}
                      placeholder="JavaScript, React, Python..."
                    />
                  ) : (
                    <div className="skills-list">
                      {profileData.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="info-section">
                  <h3>Interests</h3>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.interests.join(', ')}
                      onChange={handleInterestsChange}
                      placeholder="Web Development, Machine Learning..."
                    />
                  ) : (
                    <div className="interests-list">
                      {profileData.interests.map((interest, index) => (
                        <span key={index} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Academic Tab */}
            {activeTab === 'academic' && (
              <div className="tab-pane">
                <div className="form-grid">
                  <div className="info-section">
                    <h3>University Information</h3>
                    <div className="info-field">
                      <label>University</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="university"
                          value={editData.university}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{profileData.university}</span>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Degree</label>
                      {isEditing ? (
                        <select
                          name="degree"
                          value={editData.degree}
                          onChange={handleInputChange}
                        >
                          <option value="Bachelor of Technology">Bachelor of Technology</option>
                          <option value="Bachelor of Science">Bachelor of Science</option>
                          <option value="Bachelor of Engineering">Bachelor of Engineering</option>
                          <option value="Master of Technology">Master of Technology</option>
                          <option value="Master of Science">Master of Science</option>
                        </select>
                      ) : (
                        <span>{profileData.degree}</span>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Major</label>
                      {isEditing ? (
                        <select
                          name="major"
                          value={editData.major}
                          onChange={handleInputChange}
                        >
                          <option value="Computer Science">Computer Science</option>
                          <option value="Information Technology">Information Technology</option>
                          <option value="Software Engineering">Software Engineering</option>
                          <option value="Electrical Engineering">Electrical Engineering</option>
                          <option value="Mechanical Engineering">Mechanical Engineering</option>
                        </select>
                      ) : (
                        <span>{profileData.major}</span>
                      )}
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Current Status</h3>
                    <div className="info-field">
                      <label>Current Semester</label>
                      {isEditing ? (
                        <select
                          name="currentSemester"
                          value={editData.currentSemester}
                          onChange={handleInputChange}
                        >
                          <option value="1/1">1st Year, 1st Semester</option>
                          <option value="1/2">1st Year, 2nd Semester</option>
                          <option value="2/1">2nd Year, 1st Semester</option>
                          <option value="2/2">2nd Year, 2nd Semester</option>
                          <option value="3/1">3rd Year, 1st Semester</option>
                          <option value="3/2">3rd Year, 2nd Semester</option>
                          <option value="4/1">4th Year, 1st Semester</option>
                          <option value="4/2">4th Year, 2nd Semester</option>
                        </select>
                      ) : (
                        <span>{profileData.currentSemester}</span>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Expected Graduation</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="graduationYear"
                          value={editData.graduationYear}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{profileData.graduationYear}</span>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Student Status</label>
                      <span>{getStudentStatus()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="tab-pane">
                <div className="form-grid">
                  <div className="info-section">
                    <h3>Personal Information</h3>
                    <div className="info-field">
                      <label>First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={editData.firstName}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{profileData.firstName}</span>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={editData.lastName}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{profileData.lastName}</span>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={editData.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="info-field">
                      <label>Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={editData.location}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{profileData.location}</span>
                      )}
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Contact & Social</h3>
                    <div className="info-field">
                      <label><FaEnvelope /> Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editData.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{profileData.email}</span>
                      )}
                    </div>
                    <div className="info-field">
                      <label><FaPhone /> Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span>{profileData.phone}</span>
                      )}
                    </div>
                    <div className="info-field">
                      <label><FaLinkedin /> LinkedIn</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="linkedin"
                          value={editData.linkedin}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer">
                          {profileData.linkedin}
                        </a>
                      )}
                    </div>
                    <div className="info-field">
                      <label><FaGithub /> GitHub</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="github"
                          value={editData.github}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <a href={`https://${profileData.github}`} target="_blank" rel="noopener noreferrer">
                          {profileData.github}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save/Cancel buttons when editing */}
          {isEditing && (
            <div className="edit-actions">
              <button className="btn-save" onClick={handleSave}>
                <FaSave /> Save Changes
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;