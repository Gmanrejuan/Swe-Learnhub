const db = require('../config/database');

// Get all interviews
exports.getAllInterviews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { company, position, result } = req.query;

        let query = 'SELECT i.*, u.first_name, u.last_name, u.profile_image FROM interviews i JOIN users u ON i.user_id = u.id';
        let params = [];

        if (company) {
            query += ' WHERE i.company LIKE ?';
            params.push(`%${company}%`);
        }
        if (position) {
            query += params.length > 0 ? ' AND i.position LIKE ?' : ' WHERE i.position LIKE ?';
            params.push(`%${position}%`);
        }
        if (result) {
            query += params.length > 0 ? ' AND i.result = ?' : ' WHERE i.result = ?';
            params.push(result);
        }

        query += ' ORDER BY i.created_at DESC LIMIT ' + limit + ' OFFSET ' + offset;

        const [interviews] = await db.execute(query, params);

        res.json({
            success: true,
            data: interviews,
            pagination: { page, limit, total: interviews.length }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error fetching interviews' });
    }
};

// Get single interview
exports.getInterviewById = async (req, res) => {
    try {
        const { id } = req.params;

        await db.execute('UPDATE interviews SET views = views + 1 WHERE id = ?', [id]);

        const [interviews] = await db.execute(
            'SELECT i.*, u.first_name, u.last_name FROM interviews i JOIN users u ON i.user_id = u.id WHERE i.id = ?',
            [id]
        );

        if (interviews.length === 0) {
            return res.status(404).json({ success: false, message: 'Interview not found' });
        }

        const [comments] = await db.execute(
            'SELECT c.*, u.first_name, u.last_name FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = ? AND c.post_type = ? ORDER BY c.created_at DESC',
            [id, 'interview']
        );

        res.json({
            success: true,
            data: {
                interview: interviews[0],
                comments
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error fetching interview' });
    }
};

// Create interview
exports.createInterview = async (req, res) => {
    try {
        const { title, content, company, position, interviewDate, location, result, tags } = req.body;
        const userId = req.user.id;

        console.log('Request body:', req.body);

        // Default to today's date if not provided
        const finalDate = interviewDate || new Date().toISOString().split('T')[0];

        const [result_insert] = await db.execute(
            'INSERT INTO interviews (user_id, title, content, company, position, interview_date, location_type, result, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                userId, 
                title ?? null, 
                content ?? null, 
                company ?? null, 
                position ?? null, 
                finalDate, 
                location ?? null, 
                result ?? null, 
                tags ?? null
            ]
        );

        const [newInterview] = await db.execute(
            'SELECT * FROM interviews WHERE id = ?',
            [result_insert.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Interview created',
            data: newInterview[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update interview
exports.updateInterview = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, position, result } = req.body;
        const userId = req.user.id;

        await db.execute(
            'UPDATE interviews SET title = ?, content = ?, position = ?, result = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
            [title, content, position, result, id, userId]
        );

        const [updatedInterview] = await db.execute(
            'SELECT i.*, u.first_name, u.last_name FROM interviews i JOIN users u ON i.user_id = u.id WHERE i.id = ?',
            [id]
        );

        res.json({
            success: true,
            message: 'Interview updated',
            data: updatedInterview[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error updating interview' });
    }
};

// Delete interview
exports.deleteInterview = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        await db.execute('DELETE FROM comments WHERE post_id = ? AND post_type = ?', [id, 'interview']);
        await db.execute('DELETE FROM likes WHERE post_id = ? AND post_type = ?', [id, 'interview']);
        await db.execute('DELETE FROM interviews WHERE id = ? AND user_id = ?', [id, userId]);

        res.json({
            success: true,
            message: 'Interview deleted'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error deleting interview' });
    }
};

// Toggle like
exports.toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const [existingLike] = await db.execute(
            'SELECT id FROM likes WHERE user_id = ? AND post_id = ? AND post_type = ?',
            [userId, id, 'interview']
        );

        if (existingLike.length > 0) {
            await db.execute('DELETE FROM likes WHERE user_id = ? AND post_id = ? AND post_type = ?', [userId, id, 'interview']);
            await db.execute('UPDATE interviews SET likes = likes - 1 WHERE id = ?', [id]);
        } else {
            await db.execute('INSERT INTO likes (user_id, post_id, post_type) VALUES (?, ?, ?)', [userId, id, 'interview']);
            await db.execute('UPDATE interviews SET likes = likes + 1 WHERE id = ?', [id]);
        }

        res.json({ success: true, message: 'Like toggled' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error toggling like' });
    }
};
