import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("Generating image with prompt:", prompt);

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      return res
        .status(500)
        .json({ error: "No image URL returned from OpenAI" });
    }

    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({
      error: error?.message || "Image generation failed",
    });
  }
});

export default router;
