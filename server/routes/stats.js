const express = require('express');
const db = require('../config/database');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Get questions count
        const [questionsCount] = await db.execute('SELECT COUNT(*) as count FROM questions');
        
        // Get interviews count
        const [interviewsCount] = await db.execute('SELECT COUNT(*) as count FROM interviews');
        
        // Get comments count
        const [commentsCount] = await db.execute('SELECT COUNT(*) as count FROM comments');
        
        // Get users count
        const [usersCount] = await db.execute('SELECT COUNT(*) as count FROM users');
        
        res.json({
            success: true,
            data: {
                questions: questionsCount[0].count,
                interviews: interviewsCount[0].count,
                comments: commentsCount[0].count,
                users: usersCount[0].count
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;