const express = require("express");
const router = express.Router();
const axios = require("axios");

// 🧠 Store chat history (per server for now)
let chatHistory = [];

router.post("/chat", async (req, res) => {
  try {
    const { message, user } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    // 🧠 System prompt (makes it behave like REAL assistant)
    const systemPrompt = `
You are PathMate AI — a smart, friendly career assistant.

RESPONSE STYLE RULES:
- Keep answers SHORT (max 4-6 lines)
- Use POINTS (bullet format)
- Use simple English
- Be clear and practical
- Avoid long paragraphs
- If needed, ask 1 follow-up question

FORMAT:
👉 Use bullet points like:
- Point 1
- Point 2
- Point 3

DO NOT:
- Write long paragraphs
- Give unnecessary explanation

User Details:
Name: ${user?.name}
Interest: ${user?.interestField}
Skills: ${user?.skills}
`;

    // 🧠 Add user message to history
    chatHistory.push({
      role: "user",
      content: message,
    });

    // 🚀 Call OpenRouter
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct", // best free-quality balance
        messages: [{ role: "system", content: systemPrompt }, ...chatHistory],
        temperature: 0.7, // more human-like
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "PathMate",
        },
      },
    );

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't respond.";

    // 🧠 Save bot reply
    chatHistory.push({
      role: "assistant",
      content: reply,
    });

    res.json({ reply });
  } catch (err) {
    console.error("❌ Chat Error:", err.response?.data || err.message);

    res.status(500).json({
      reply: "AI is busy right now. Try again.",
    });
  }
});

module.exports = router;
