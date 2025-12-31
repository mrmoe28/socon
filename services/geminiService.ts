import { GoogleGenAI } from "@google/genai";

// Lazy initialization - only create client when needed
let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

/**
 * Edits an image based on a text prompt using Gemini 2.5 Flash Image.
 * 
 * @param base64Image - The original image in base64 format (without data URI prefix ideally, but we handle it).
 * @param prompt - The user's instruction (e.g., "Add a retro filter").
 * @returns The edited image as a base64 data URI string.
 */
export const editImageWithGemini = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const aiClient = getAI();
    
    // Clean base64 string if it contains headers
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg', // Standardizing on jpeg for transmission
            },
          },
          {
            text: `Edit this image: ${prompt}. Return the edited image only.`,
          },
        ],
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data returned from Gemini.");

  } catch (error) {
    console.error("Gemini Image Editing Error:", error);
    throw error;
  }
};