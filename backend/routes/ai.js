const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// genAI ko function ke andar initialize karenge taaki env value mil sake
router.post('/ask-rufa', async (req, res) => {
  try {
    const { message, history } = req.body;

    // 1. Fetch API Key inside the request
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ API Key is missing! Check your .env file location and variable name.");
      return res.status(500).json({ ok: false, message: "Server Configuration Error: API Key Missing" });
    }

    // 2. Initialize Google AI with the key
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. History validation (First message must be 'user')
    let validHistory = [];
    if (history && history.length > 0) {
      // Gemini strict rule: First content should be with role 'user'
      validHistory = history[0].role === 'model' ? history.slice(1) : history;
    }

    // 4. Start Chat
    const chat = model.startChat({
      history: validHistory,
    });

    const systemPrompt = "You are RuFa, a professional AI Health Assistant for RuFa Cure Hospital. Keep answers concise. Always include medical disclaimer. Emergency: 1066.";

    const result = await chat.sendMessage(systemPrompt + " User query: " + message);
    const response = await result.response;
    const text = response.text();

    res.json({ ok: true, text });

  } catch (error) {
    console.error("🔴 GEMINI BACKEND ERROR:", error.message);
    res.status(500).json({ ok: false, message: "AI Assistant is currently offline." });
  }
});

module.exports = router;