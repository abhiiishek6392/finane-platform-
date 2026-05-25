import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function parseReceiptImage(base64Image: string, mimeType: string) {
  const prompt = `
    Analyze this receipt screenshot. Extract data structural mappings exactly matching this target schema object:
    {
      "merchantName": "string or unknown",
      "amount": float,
      "date": "YYYY-MM-DD",
      "category": "Food | Utilities | Entertainment | Transport | Shopping | Healthcare | Miscellaneous",
      "confidence": float between 0 and 1
    }
    Return raw valid clean stringified JSON format only without enclosing md formatting blocks.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ inlineData: { data: base64Image, mimeType } }, prompt]
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    throw new Error("Failed to parse structural details from document image.");
  }
}