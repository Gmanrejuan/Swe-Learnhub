const db = require('../config/database');

// Get all questions
exports.getQuestions = async (req, res) => {
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
};

// Create new question
exports.createQuestion = async (req, res) => {
    try {
        const { title, content, semester, year, topic } = req.body;
        const userId = req.user.id;
        
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
            data: newQuestion[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single question
exports.getQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Update view count
        await db.execute('UPDATE questions SET views = views + 1 WHERE id = ?', [id]);
        
        const [questions] = await db.execute(
            `SELECT q.*, u.first_name, u.last_name, u.profile_image
             FROM questions q
             JOIN users u ON q.user_id = u.id
             WHERE q.id = ?`,
            [id]
        );
        
        if (questions.length === 0) {
            return res.status(404).json({ message: 'Question not found' });
        }
        
        // Get comments
        const [comments] = await db.execute(
            `SELECT c.*, u.first_name, u.last_name, u.profile_image
             FROM comments c
             JOIN users u ON c.user_id = u.id
             WHERE c.post_id = ? AND c.post_type = 'question'
             ORDER BY c.created_at ASC`,
            [id]
        );
        
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
};

// Like/Unlike question
exports.toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        const [existingLike] = await db.execute(
            'SELECT id FROM likes WHERE user_id = ? AND post_id = ? AND post_type = "question"',
            [userId, id]
        );
        
        if (existingLike.length > 0) {
            // Unlike
            await db.execute(
                'DELETE FROM likes WHERE user_id = ? AND post_id = ? AND post_type = "question"',
                [userId, id]
            );
            await db.execute('UPDATE questions SET likes = likes - 1 WHERE id = ?', [id]);
        } else {
            // Like
            await db.execute(
                'INSERT INTO likes (user_id, post_id, post_type) VALUES (?, ?, "question")',
                [userId, id]
            );
            await db.execute('UPDATE questions SET likes = likes + 1 WHERE id = ?', [id]);
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};