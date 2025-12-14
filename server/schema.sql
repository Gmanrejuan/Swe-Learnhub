-- Create database
CREATE DATABASE learnhub_db;
USE learnhub_db;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    university VARCHAR(100),
    degree VARCHAR(100),
    major VARCHAR(100),
    current_semester VARCHAR(10),
    graduation_year VARCHAR(10),
    bio TEXT,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    semester VARCHAR(10) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    likes INT DEFAULT 0,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Interview experiences table
CREATE TABLE interviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    company VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    interview_date DATE NOT NULL,
    location_type ENUM('Remote', 'On-site', 'Phone', 'Video Call') NOT NULL,
    result ENUM('Selected', 'Rejected', 'Waiting', 'Withdrew') NOT NULL,
    tags VARCHAR(255),
    image VARCHAR(255),
    likes INT DEFAULT 0,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Comments table
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    post_type ENUM('question', 'interview') NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Likes table
CREATE TABLE likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    post_type ENUM('question', 'interview') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (user_id, post_id, post_type)
);