import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const ai = new GoogleGenAI({});
app.use(cors());
app.use(express.json());

app.post("/getRecipes", async (req, res) => {

    const { ingredients, time, dish, health } = req.body;

   const prompt = `
Suggest 5 recipes based on:

Ingredients: ${ingredients.join(", ")}
Time: ${time}
Dish Type: ${dish}
Health Condition: ${health}

Return response ONLY in this JSON format:

[
  {
    "title": "",
    "time": "",
    "ingredients": [
      "ingredient 1",
      "ingredient 2"
    ],
    "steps": [
      "Step 1 instruction",
      "Step 2 instruction",
      "Step 3 instruction"
    ],
    "videoLink": ""
  }
]

Rules:
- Do NOT include description
- Do NOT include healthBenefit
- steps must be clear step-by-step instructions
- videoLink must be real YouTube search link like:
  https://www.youtube.com/results?search_query=RECIPE_NAME
`;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        res.json({
            reply: response.text
        });

    } catch (err) {
        console.error("Gemini Error:", err);
        res.status(500).json({ reply: "AI failed. Check API key / quota." });
    }

});
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));