const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');

class AIService {
  constructor() {
    this.openai = null;
    this.anthropic = null;
    this.model = process.env.AI_MODEL || 'gpt-4o-mini';
    this.temperature = parseFloat(process.env.AI_TEMPERATURE) || 0.7;
    this.maxTokens = parseInt(process.env.AI_MAX_TOKENS) || 1000;
    this.initializeClients();
  }

  initializeClients() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }

    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
      });
    }
  }

  async generateResponse(prompt, knowledgeBase = '') {
    if (!this.openai && !this.anthropic) {
      throw new Error('No AI API key configured. Please set OPENAI_API_KEY or ANTHROPIC_API_KEY');
    }

    const systemPrompt = knowledgeBase ? 
      `
You are a helpful hotel assistant chatbot. Use the following knowledge base to answer questions:

${knowledgeBase}

If the answer is not in the knowledge base, say you don't know and offer to help with other questions.
      ` :
      `
You are a helpful hotel assistant chatbot. Answer questions about hotels, bookings, services, and travel.
      `;

    if (this.openai) {
      try {
        const response = await this.openai.chat.completions.create({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt.trim() },
            { role: 'user', content: prompt }
          ],
          temperature: this.temperature,
          max_tokens: this.maxTokens
        });
        return response.choices[0].message.content.trim();
      } catch (error) {
        console.error('OpenAI API error:', error);
        throw new Error('Failed to get response from OpenAI');
      }
    }

    if (this.anthropic) {
      try {
        const response = await this.anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: this.maxTokens,
          temperature: this.temperature,
          system: systemPrompt.trim(),
          messages: [{ role: 'user', content: prompt }]
        });
        return response.content[0].text.trim();
      } catch (error) {
        console.error('Anthropic API error:', error);
        throw new Error('Failed to get response from Claude');
      }
    }

    throw new Error('No AI provider available');
  }
}

module.exports = new AIService();