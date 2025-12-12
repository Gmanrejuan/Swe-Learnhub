const express = require('express');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {

        const userId = req.user.id;
        
        const [users] = await db.execute(`
            SELECT id, first_name, last_name, email, university, 
                   degree, major, current_semester, graduation_year, profile_image, bio, 
                   created_at, updated_at
            FROM users 
            WHERE id = ?
        `, [userId]);
        
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = users[0];
        
        // Parse skills and interests from JSON strings
        user.skills = user.skills ? JSON.parse(user.skills) : [];
        user.interests = user.interests ? JSON.parse(user.interests) : [];
        
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            firstName, lastName, phone, bio, university, degree, major,
            currentSemester, graduationYear
        } = req.body;
        
        // Convert arrays to JSON strings
        const skillsJson = Array.isArray(skills) ? JSON.stringify(skills) : skills;
        const interestsJson = Array.isArray(interests) ? JSON.stringify(interests) : interests;
        
        const [result] = await db.execute(`
            UPDATE users SET 
                first_name = ?, last_name = ?,  bio = ?, 
                university = ?, degree = ?, major = ?, current_semester = ?,
                graduation_year = ?, 
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [
            firstName, lastName,  bio, university, degree, major,
            currentSemester, graduationYear, userId
        ]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            success: true,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user's posts (questions and interviews)
router.get('/posts', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Get questions
        const [questions] = await db.execute(`
            SELECT 'question' as type, id, title, content, semester, academic_year, 
                   topic, likes, views, created_at
            FROM questions 
            WHERE user_id = ?
            ORDER BY created_at DESC
        `, [userId]);
        
        // Get interviews
        const [interviews] = await db.execute(`
            SELECT 'interview' as type, id, title, content, company, position, 
                   result, likes, views, created_at
            FROM interviews 
            WHERE user_id = ?
            ORDER BY created_at DESC
        `, [userId]);
        
        // Combine and sort
        const posts = [...questions, ...interviews]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;