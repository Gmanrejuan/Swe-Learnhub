const express = require('express');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all interviews
router.get('/', async (req, res) => {
    try {
        const { company, position, result, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        
        let query = `
            SELECT i.*, u.first_name, u.last_name, u.profile_image,
                   COUNT(c.id) as comment_count
            FROM interviews i
            JOIN users u ON i.user_id = u.id
            LEFT JOIN comments c ON i.id = c.post_id AND c.post_type = 'interview'
        `;
        
        let params = [];
        let whereConditions = [];
        
        if (company) {
            whereConditions.push('i.company LIKE ?');
            params.push(`%${company}%`);
        }
        
        if (position) {
            whereConditions.push('i.position LIKE ?');
            params.push(`%${position}%`);
        }
        
        if (result) {
            whereConditions.push('i.result = ?');
            params.push(result);
        }
        
        if (whereConditions.length > 0) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }
        
        query += `
            GROUP BY i.id
            ORDER BY i.created_at DESC
            LIMIT ? OFFSET ?
        `;
        
        params.push(parseInt(limit), parseInt(offset));
        
        const [interviews] = await db.execute(query, params);
        
        res.json({
            success: true,
            data: interviews,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: interviews.length
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new interview experience
router.post('/', auth, async (req, res) => {
    try {
        const { 
            title, 
            content, 
            company, 
            position, 
            interviewDate, 
            location, 
            result, 
            tags 
        } = req.body;
        
        const userId = req.user.id;
        
        // Validation
        if (!title || !content || !company || !position || !interviewDate || !location || !result) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }
        
        const [insertResult] = await db.execute(
            `INSERT INTO interviews (
                user_id, title, content, company, position, 
                interview_date, location_type, result, tags
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, title, content, company, position, interviewDate, location, result, tags || '']
        );
        
        // Get the created interview with user info
        const [newInterview] = await db.execute(
            `SELECT i.*, u.first_name, u.last_name
             FROM interviews i
             JOIN users u ON i.user_id = u.id
             WHERE i.id = ?`,
            [insertResult.insertId]
        );
        
        res.status(201).json({
            success: true,
            message: 'Interview experience created successfully',
            data: newInterview[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single interview
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let cleanId = id.substring(1);
        
        // Update view count
        await db.execute('UPDATE interviews SET views = views + 1 WHERE id = ?', [cleanId]);
        
        const [interviews] = await db.execute(
            `SELECT i.*, u.first_name, u.last_name, u.profile_image
             FROM interviews i
             JOIN users u ON i.user_id = u.id
             WHERE i.id = ?`,
            [cleanId]
        );
        
        if (interviews.length === 0) {
            return res.status(404).json({ message: 'Interview experience not found' });
        }
        
        // Get comments
        const [comments] = await db.execute(
            `SELECT c.*, u.first_name, u.last_name, u.profile_image
             FROM comments c
             JOIN users u ON c.user_id = u.id
             WHERE c.post_id = ? AND c.post_type = 'interview'
             ORDER BY c.created_at ASC`,
            [cleanId]
        );
        
        res.json({
            success: true,
            data: {
                interview: interviews[0],
                comments
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single interview (add this if not already present)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Update view count
        await db.execute('UPDATE interviews SET views = views + 1 WHERE id = ?', [id]);
        
        const [interviews] = await db.execute(`
            SELECT i.*, u.first_name, u.last_name, u.profile_image
            FROM interviews i
            JOIN users u ON i.user_id = u.id
            WHERE i.id = ?
        `, [id]);
        
        if (interviews.length === 0) {
            return res.status(404).json({ message: 'Interview experience not found' });
        }
        
        // Get comments
        const [comments] = await db.execute(`
            SELECT c.*, u.first_name, u.last_name, u.profile_image
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ? AND c.post_type = 'interview'
            ORDER BY c.created_at ASC
        `, [id]);
        
        res.json({
            success: true,
            data: {
                interview: interviews[0],
                comments
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;