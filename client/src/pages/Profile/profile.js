import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import { FaHome, FaEdit, FaCamera, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaSave, FaTimes } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { HiBriefcase } from 'react-icons/hi';
import SideBar from '../../components/SideBar/sideBar';
import { userAPI } from '../../services/api';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    university: '',
    degree: '',
    major: '',
    currentSemester: '',
    graduationYear: '',
    location: '',
    dateOfBirth: '',
    linkedin: '',
    github: '',
    skills: [],
    interests: []
  });

  const [editData, setEditData] = useState({...profileData});

  // Fetch user profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await userAPI.getProfile();
      
      if (response.success) {
        const userData = response.data;
        
        // Map database fields to component state
        const profileInfo = {
          firstName: userData.first_name || '',
          lastName: userData.last_name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          bio: userData.bio || '',
          university: userData.university || '',
          degree: userData.degree || '',
          major: userData.major || '',
          currentSemester: userData.current_semester || '',
          graduationYear: userData.graduation_year || '',
          location: userData.location || '',
          dateOfBirth: userData.date_of_birth || '',
          linkedin: userData.linkedin || '',
          github: userData.github || '',
          skills: userData.skills || [],
          interests: userData.interests || []
        };
        
        setProfileData(profileInfo);
        setEditData(profileInfo);
      } else {
        setError('Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.message === 'No token found') {
        navigate('/signin');
      } else {
        setError('Failed to load profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setEditData({
      ...editData,
      skills: skills
    });
  };

  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(',').map(interest => interest.trim()).filter(interest => interest);
    setEditData({
      ...editData,
      interests: interests
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      // Prepare data for API
      const updateData = {
        firstName: editData.firstName,
        lastName: editData.lastName,
        phone: editData.phone,
        bio: editData.bio,
        university: editData.university,
        degree: editData.degree,
        major: editData.major,
        currentSemester: editData.currentSemester,
        graduationYear: editData.graduationYear,
        location: editData.location,
        dateOfBirth: editData.dateOfBirth,
        linkedin: editData.linkedin,
        github: editData.github,
        skills: editData.skills,
        interests: editData.interests
      };
      
      const response = await userAPI.updateProfile(updateData);
      
      if (response.success) {
        setProfileData({...editData});
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({...profileData});
    setIsEditing(false);
    setError('');
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

  if (loading) {
    return (
      <div className="profile-layout">
        <SideBar/>
        <main className="main-content">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Loading profile...</h2>
            <p>Please wait while we fetch your information</p>
          </div>
        </main>
      </div>
    );
  }

  if (error && !profileData.email) {
    return (
      <div className="profile-layout">
        <SideBar/>
        <main className="main-content">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Error</h2>
            <p style={{ color: 'red' }}>{error}</p>
            <button onClick={fetchProfile} style={{ padding: '10px 20px', marginTop: '20px' }}>
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-layout">
      <SideBar/>

      {/* Main Content */}
      <main className="main-content">
        <div className="profile-container">
          
          {/* Error message */}
          {error && (
            <div style={{ 
              backgroundColor: '#fee', 
              color: '#c33', 
              padding: '10px', 
              borderRadius: '5px', 
              marginBottom: '20px' 
            }}>
              {error}
            </div>
          )}
          
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
                  <FaMapMarkerAlt /> {profileData.location || 'Location not set'}
                </div>
              </div>
              
              <div className="profile-actions">
                <button 
                  className="btn-edit"
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={saving}
                >
                  <FaEdit /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Academic Progress */}
            <div className="academic-progress">
              <h3>Academic Progress</h3>
              <div className="progress-info">
                <span>Current: {profileData.currentSemester || 'Not set'}</span>
                <span>Graduation: {profileData.graduationYear || 'Not set'}</span>
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
                    <p>{profileData.bio || 'No bio added yet. Click "Edit Profile" to add one!'}</p>
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
                      {profileData.skills && profileData.skills.length > 0 
                        ? profileData.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))
                        : <p>No skills added yet. Click "Edit Profile" to add them!</p>
                      }
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
                      {profileData.interests && profileData.interests.length > 0
                        ? profileData.interests.map((interest, index) => (
                            <span key={index} className="interest-tag">{interest}</span>
                          ))
                        : <p>No interests added yet. Click "Edit Profile" to add them!</p>
                      }
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
                        <span>{profileData.university || 'Not set'}</span>
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
                          <option value="">Select degree</option>
                          <option value="Bachelor of Technology">Bachelor of Technology</option>
                          <option value="Bachelor of Science">Bachelor of Science</option>
                          <option value="Bachelor of Engineering">Bachelor of Engineering</option>
                          <option value="Master of Technology">Master of Technology</option>
                          <option value="Master of Science">Master of Science</option>
                        </select>
                      ) : (
                        <span>{profileData.degree || 'Not set'}</span>
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
                          <option value="">Select major</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Information Technology">Information Technology</option>
                          <option value="Software Engineering">Software Engineering</option>
                          <option value="Electrical Engineering">Electrical Engineering</option>
                          <option value="Mechanical Engineering">Mechanical Engineering</option>
                        </select>
                      ) : (
                        <span>{profileData.major || 'Not set'}</span>
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
                          <option value="">Select semester</option>
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
                        <span>{profileData.currentSemester || 'Not set'}</span>
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
                          placeholder="e.g., 2025"
                        />
                      ) : (
                        <span>{profileData.graduationYear || 'Not set'}</span>
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
                        <span>{profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : 'Not set'}</span>
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
                          placeholder="City, Country"
                        />
                      ) : (
                        <span>{profileData.location || 'Not set'}</span>
                      )}
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Contact & Social</h3>
                    <div className="info-field">
                      <label><FaEnvelope /> Email</label>
                      <span>{profileData.email}</span>
                      <small style={{ color: '#666', display: 'block' }}>Email cannot be changed</small>
                    </div>
                    <div className="info-field">
                      <label><FaPhone /> Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      ) : (
                        <span>{profileData.phone || 'Not set'}</span>
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
                          placeholder="linkedin.com/in/yourprofile"
                        />
                      ) : (
                        profileData.linkedin ? (
                          <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer">
                            {profileData.linkedin}
                          </a>
                        ) : (
                          <span>Not set</span>
                        )
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
                          placeholder="github.com/yourprofile"
                        />
                      ) : (
                        profileData.github ? (
                          <a href={`https://${profileData.github}`} target="_blank" rel="noopener noreferrer">
                            {profileData.github}
                          </a>
                        ) : (
                          <span>Not set</span>
                        )
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
              <button 
                className="btn-save" 
                onClick={handleSave}
                disabled={saving}
              >
                <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="btn-cancel" 
                onClick={handleCancel}
                disabled={saving}
              >
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