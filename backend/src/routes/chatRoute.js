const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;

    res.json({ reply: response.text() });

  } catch (err) {
    console.error("❌ Chat Error:", err.message);

    res.json({
      reply: "Something went wrong. Try again."
    });
  }
});

module.exports = router;