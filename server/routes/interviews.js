const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', interviewController.getAllInterviews);
router.get('/:id', interviewController.getInterviewById);

// Protected routes (require authentication)
router.post('/', auth, interviewController.createInterview);
router.put('/:id', auth, interviewController.updateInterview);
router.delete('/:id', auth, interviewController.deleteInterview);
router.post('/:id/like', auth, interviewController.toggleLike);

module.exports = router;