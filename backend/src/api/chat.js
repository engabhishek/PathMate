const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/chat", async (req, res) => {
  try {
    const { message, user } = req.body;

    const prompt = `
You are a smart career assistant.

User Details:
Interest: ${user?.interestField}
Skills: ${user?.skills}
Goal Timeline: ${user?.timeline}

User Question:
${message}

Give clear, helpful, practical answer.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "PathMate",
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });

  } catch (err) {
    console.error("❌ Chat Error:", err.response?.data || err.message);
    res.json({ reply: "Something went wrong. Try again." });
  }
});

module.exports = router;