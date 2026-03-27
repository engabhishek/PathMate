const express = require("express");
const router = express.Router();

const { generateRoadmapAI } = require("../service/aiService");

router.post("/generate-roadmap", async (req, res) => {
  try {
    const { user } = req.body;

    const aiResponse = await generateRoadmapAI(user);

    console.log("🤖 RAW AI RESPONSE:", aiResponse);

    return res.json({
      roadmap: aiResponse.roadmap || [],
      motivation: aiResponse.motivation || "",
    });
  } catch (err) {
    console.error("❌ Backend Error:", err.message);

    return res.json({
      roadmap: [
        {
          title: "Start Basics",
          duration: "2 weeks",
          substeps: ["Learn basics", "Practice daily"],
        },
      ],
      motivation: "Stay consistent and keep learning 🚀",
    });
  }
});

module.exports = router;
