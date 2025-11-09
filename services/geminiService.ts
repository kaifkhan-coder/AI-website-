
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are an expert web developer specializing in creating single-file, production-ready websites. Your task is to generate a complete HTML document based on the user's request. The entire website, including all CSS and JavaScript, must be contained within this single HTML file. The output must be ONLY the raw HTML code, without any markdown formatting, backticks, or explanatory text. Do not start your response with \`\`\`html.`;

export const generateWebsiteCode = async (userPrompt: string): Promise<string> => {
    try {
        const fullPrompt = `
            Create a website that matches the following description: "${userPrompt}".

            IMPORTANT CONSTRAINTS:
            1. All CSS must be inside a single <style> tag in the <head>. Use modern CSS practices for a visually appealing and responsive design. Use a common, web-safe font.
            2. All JavaScript must be inside a single <script> tag right before the closing </body> tag. Ensure the JavaScript is clean and functional for any interactive elements.
            3. Use placeholder images from https://picsum.photos if images are needed (e.g., https://picsum.photos/800/600).
            4. The HTML should be well-structured and semantic.
            5. The final output should be the full HTML source code and nothing else.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: fullPrompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
                topP: 0.95,
                topK: 40,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate code from AI. Please check your API key and network connection.");
    }
};
