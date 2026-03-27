const axios = require("axios");

const generateRoadmapAI = async (user) => {
  try {
    const prompt = `
You are an expert career mentor.

Create a VERY SIMPLE and STEP-BY-STEP roadmap for a beginner student.

User Details:
- Age: ${user.age}
- Education: ${user.education}
- Interest: ${user.interest}
- Skills: ${user.skills}
- Passion: ${user.passion}
- Timeline: ${user.timeline}

IMPORTANT RULES:
1. Use VERY EASY English (like teaching a beginner student)
2. Divide roadmap into PHASES (Step 1, Step 2, etc.)
3. Each phase MUST have:
   - title (clear and simple)
   - duration (like "1 week", "2 weeks")
   - substeps (5-7 small actionable tasks)
4. Substeps should be:
   - practical
   - easy to follow
   - beginner friendly
5. Keep roadmap realistic for given timeline

Return ONLY JSON in this format:

{
  "roadmap": [
    {
      "title": "Step 1: ...",
      "duration": "...",
      "substeps": [
        "Do this",
        "Practice this",
        "Learn this"
      ]
    }
  ],
  "motivation": "Short encouraging message"
}
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
          "Content-Type": "application/json",
        },
      },
    );

    const text = response.data.choices[0].message.content;

    console.log("🤖 RAW:", text);

    // ✅ SAFE PARSING
    let cleaned = text;

    if (text.includes("```")) {
      cleaned = text.replace(/```json|```/g, "").trim();
    }

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Invalid JSON format from AI");
    }

    const jsonString = cleaned.substring(start, end + 1);

    const parsed = JSON.parse(jsonString);

    console.log("✅ PARSED:", parsed);

    return parsed;
  } catch (error) {
    console.error("❌ FINAL ERROR:", error.response?.data || error.message);

    // ❗ DO NOT THROW → return fallback instead
    return {
      roadmap: [
        {
          title: "Start Basics",
          duration: "2 weeks",
          substeps: ["Learn basics", "Practice daily"],
        },
      ],
      motivation: "Stay consistent and keep learning 🚀",
    };
  }
};

module.exports = { generateRoadmapAI };
