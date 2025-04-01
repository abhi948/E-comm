const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/ChatBotController');

router.post('/chat', chatbotController.handleChatbotQuery);

module.exports = router;