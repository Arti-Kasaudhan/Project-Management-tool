
import { GoogleGenAI, Type } from "@google/genai";

// Ensure the API key is available. In a real app, this should be handled more securely.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a list of sub-tasks for a given task title and description.
 * @param title The title of the main task.
 * @param description The description of the main task.
 * @returns A promise that resolves to an array of sub-task strings.
 */
export const generateSubtasks = async (title: string, description: string): Promise<string[]> => {
  const prompt = `
    Based on the following project task, break it down into a short list of actionable sub-tasks.
    Provide only the list of sub-tasks in your response.
    Each sub-task should be a concise action item. Do not add any introductory text or explanation.

    Task Title: "${title}"
    Task Description: "${description}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subtasks: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: "An actionable sub-task."
              }
            }
          },
        },
      },
    });
    
    const jsonString = response.text;
    const parsed = JSON.parse(jsonString);

    if (parsed && Array.isArray(parsed.subtasks)) {
      return parsed.subtasks;
    } else {
      console.warn("Gemini API returned an unexpected format:", parsed);
      return [];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate sub-tasks from Gemini API.");
  }
};
