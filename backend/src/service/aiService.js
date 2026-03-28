const axios = require("axios");

const generateRoadmapAI = async (user) => {
  try {
    const prompt = `
You are an expert career mentor.

Create a VERY SIMPLE and STEP-BY-STEP roadmap for a beginner student.

User Details:
- Age: ${user?.age}
- Education: ${user?.educationLevel || user?.education}
- Interest: ${user?.interestField || user?.interest}
- Skills: ${user?.skills}
- Passion: ${user?.passion}
- Timeline: ${user?.timeline}

IMPORTANT RULES:
1. Use VERY EASY English
2. Divide roadmap into PHASES (Step 1, Step 2...)
3. Each phase MUST include:
   - title
   - duration
   - substeps (5-7)
4. Substeps must be practical and beginner-friendly
5. Keep roadmap realistic

⚠️ VERY IMPORTANT:
- Return ONLY pure JSON
- NO explanation
- NO markdown
- NO code block

Format:
{
  "roadmap": [
    {
      "title": "Step 1: ...",
      "duration": "...",
      "substeps": ["...", "..."]
    }
  ],
  "motivation": "..."
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        temperature: 0.5, // 🔥 makes output more structured
        messages: [
          {
            role: "system",
            content: "You only return valid JSON. No extra text.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let text = response.data.choices[0].message.content;

    console.log("🤖 RAW:", text);

    // 🔥 SUPER CLEAN PARSING
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("Invalid JSON structure");
    }

    const jsonString = text.slice(firstBrace, lastBrace + 1);

    const parsed = JSON.parse(jsonString);

    // ✅ SAFETY CHECK
    if (!parsed.roadmap || !Array.isArray(parsed.roadmap)) {
      throw new Error("Invalid roadmap format");
    }

    return parsed;

  } catch (error) {
    console.error("❌ FINAL ERROR:", error.response?.data || error.message);

    // 🔥 SMART FALLBACK (better than before)
    return {
      roadmap: [
        {
          title: "Step 1: Understand Basics",
          duration: "1 week",
          substeps: [
            "Search about your field on YouTube",
            "Watch beginner tutorials",
            "Read simple articles",
            "Write notes",
            "Explore tools used in this field",
          ],
        },
        {
          title: "Step 2: Start Practice",
          duration: "2 weeks",
          substeps: [
            "Do small exercises daily",
            "Try beginner projects",
            "Repeat concepts",
            "Fix mistakes",
            "Stay consistent",
          ],
        },
      ],
      motivation:
        "Start small, stay consistent, and you will achieve your goal 🚀",
    };
  }
};

module.exports = { generateRoadmapAI };