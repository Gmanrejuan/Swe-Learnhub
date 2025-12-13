const express = require('express');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
    try {
        const { semester, topic, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        
        let query = `
            SELECT q.*, u.first_name, u.last_name, u.profile_image,
                   COUNT(c.id) as comment_count
            FROM questions q
            JOIN users u ON q.user_id = u.id
            LEFT JOIN comments c ON q.id = c.post_id AND c.post_type = 'question'
        `;

        let params = [];
        let whereConditions = [];
        
        if (semester) {
            whereConditions.push('q.semester = ?');
            params.push(semester);
        }
        
        if (topic) {
            whereConditions.push('q.topic = ?');
            params.push(topic);
        }
        
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }
        
        query += `
            GROUP BY q.id
            ORDER BY q.created_at DESC
            LIMIT ? OFFSET ?
        `;
        
        params.push(parseInt(limit), parseInt(offset));
        
        const [questions] = await db.execute(query, params);
        
        res.json({
            success: true,
            data: questions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: questions.length
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add this new route at the top of your questions.js file
router.get('/feed', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        
        // Get questions
        const [questions] = await db.execute(`
            SELECT 'question' as type, q.id, q.title, q.content, q.semester, 
                   q.academic_year, q.topic, q.likes, q.views, q.created_at,
                   u.first_name, u.last_name, u.profile_image,
                   COUNT(c.id) as comment_count
            FROM questions q
            JOIN users u ON q.user_id = u.id
            LEFT JOIN comments c ON q.id = c.post_id AND c.post_type = 'question'
            GROUP BY q.id
            ORDER BY q.created_at DESC
            LIMIT ?
        `, [Math.ceil(limit/2)]);
        
        // Get interviews
        const [interviews] = await db.execute(`
            SELECT 'interview' as type, i.id, i.title, i.content, i.company, 
                   i.position, i.result, i.likes, i.views, i.created_at,
                   u.first_name, u.last_name, u.profile_image,
                   COUNT(c.id) as comment_count
            FROM interviews i
            JOIN users u ON i.user_id = u.id
            LEFT JOIN comments c ON i.id = c.post_id AND c.post_type = 'interview'
            GROUP BY i.id
            ORDER BY i.created_at DESC
            LIMIT ?
        `, [Math.ceil(limit/2)]);
        
        // Combine and sort by date
        const combinedFeed = [...questions, ...interviews]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, limit);
        
        res.json({
            success: true,
            data: combinedFeed,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: combinedFeed.length
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new question
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, semester, year, topic } = req.body;
        const userId = req.user.id;
        
        // Validation
        if (!title || !content || !semester || !year || !topic) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const [result] = await db.execute(
            `INSERT INTO questions (user_id, title, content, semester, academic_year, topic)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, title, content, semester, year, topic]
        );
        
        const [newQuestion] = await db.execute(
            `SELECT q.*, u.first_name, u.last_name
             FROM questions q
             JOIN users u ON q.user_id = u.id
             WHERE q.id = ?`,
            [result.insertId]
        );
        
        res.status(201).json({
            success: true,
            message: 'Question created successfully',
            data: newQuestion[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add this route to get single question
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        let cleanId = id.substring(1);
        
        // Update view count
        await db.execute('UPDATE questions SET views = views + 1 WHERE id = ?', [cleanId]);
        
        const [questions] = await db.execute(`
            SELECT q.*, u.first_name, u.last_name, u.profile_image
            FROM questions q
            JOIN users u ON q.user_id = u.id
            WHERE q.id = ?
        `, [cleanId]);
        
        if (questions.length === 0) {
            return res.status(404).json({ message: 'Question not found' });
        }
        
        // Get comments
        const [comments] = await db.execute(`
            SELECT c.*, u.first_name, u.last_name, u.profile_image
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ? AND c.post_type = 'question'
            ORDER BY c.created_at ASC
        `, [cleanId]);
        
        res.json({
            success: true,
            data: {
                question: questions[0],
                comments
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;