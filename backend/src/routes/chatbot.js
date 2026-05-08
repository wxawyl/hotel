const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const { getKnowledgeBaseText } = require('../services/knowledgeBase');

router.post('/chat', async (req, res) => {
  try {
    const { message, language = 'en' } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const knowledgeBase = getKnowledgeBaseText(language);
    const response = await aiService.generateResponse(message, knowledgeBase);

    res.json({
      success: true,
      response: response
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get response from AI service'
    });
  }
});

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Chatbot service is running',
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    hasAnthropic: !!process.env.ANTHROPIC_API_KEY
  });
});

module.exports = router;