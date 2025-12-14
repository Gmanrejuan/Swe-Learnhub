const db = require('../config/database');

// Get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { semester, topic } = req.query;

        let query = 'SELECT q.*, u.first_name, u.last_name, u.profile_image FROM questions q JOIN users u ON q.user_id = u.id';
        let params = [];

        if (semester) {
            query += ' WHERE q.semester = ?';
            params.push(semester);
        }
        if (topic) {
            query += params.length > 0 ? ' AND q.topic = ?' : ' WHERE q.topic = ?';
            params.push(topic);
        }

        query += ' ORDER BY q.created_at DESC LIMIT ' + limit + ' OFFSET ' + offset;

        const [questions] = await db.execute(query, params);

        res.json({
            success: true,
            data: questions,
            pagination: { page, limit, total: questions.length }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error fetching questions' });
    }
};

// Get single question
exports.getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;

        // Update views
        await db.execute('UPDATE questions SET views = views + 1 WHERE id = ?', [id]);

        // Get question
        const [questions] = await db.execute(
            'SELECT q.*, u.first_name, u.last_name, u.profile_image FROM questions q JOIN users u ON q.user_id = u.id WHERE q.id = ?',
            [id]
        );

        if (questions.length === 0) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }

        // Get comments
        const [comments] = await db.execute(
            'SELECT c.*, u.first_name, u.last_name FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = ? AND c.post_type = ? ORDER BY c.created_at DESC',
            [id, 'question']
        );

        res.json({
            success: true,
            data: {
                question: questions[0],
                comments
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error fetching question' });
    }
};

// Create question
exports.createQuestion = async (req, res) => {
    try {
        const { title, content, semester, academic_year, topic } = req.body;
        const userId = req.user.id;

        const [result] = await db.execute(
            'INSERT INTO questions (user_id, title, content, semester, academic_year, topic, likes, views) VALUES (?, ?, ?, ?, ?, ?, 0, 0)',
            [userId, title, content, semester, academic_year, topic]
        );

        const [newQuestion] = await db.execute(
            'SELECT q.*, u.first_name, u.last_name FROM questions q JOIN users u ON q.user_id = u.id WHERE q.id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Question created',
            data: newQuestion[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error creating question' });
    }
};

// Update question
exports.updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, topic } = req.body;
        const userId = req.user.id;

        await db.execute(
            'UPDATE questions SET title = ?, content = ?, topic = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
            [title, content, topic, id, userId]
        );

        const [updatedQuestion] = await db.execute(
            'SELECT q.*, u.first_name, u.last_name FROM questions q JOIN users u ON q.user_id = u.id WHERE q.id = ?',
            [id]
        );

        res.json({
            success: true,
            message: 'Question updated',
            data: updatedQuestion[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error updating question' });
    }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        await db.execute('DELETE FROM comments WHERE post_id = ? AND post_type = ?', [id, 'question']);
        await db.execute('DELETE FROM likes WHERE post_id = ? AND post_type = ?', [id, 'question']);
        await db.execute('DELETE FROM questions WHERE id = ? AND user_id = ?', [id, userId]);

        res.json({
            success: true,
            message: 'Question deleted'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error deleting question' });
    }
};

// Toggle like
exports.toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const [existingLike] = await db.execute(
            'SELECT id FROM likes WHERE user_id = ? AND post_id = ? AND post_type = ?',
            [userId, id, 'question']
        );

        if (existingLike.length > 0) {
            await db.execute('DELETE FROM likes WHERE user_id = ? AND post_id = ? AND post_type = ?', [userId, id, 'question']);
            await db.execute('UPDATE questions SET likes = likes - 1 WHERE id = ?', [id]);
        } else {
            await db.execute('INSERT INTO likes (user_id, post_id, post_type) VALUES (?, ?, ?)', [userId, id, 'question']);
            await db.execute('UPDATE questions SET likes = likes + 1 WHERE id = ?', [id]);
        }

        res.json({ success: true, message: 'Like toggled' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error toggling like' });
    }
};