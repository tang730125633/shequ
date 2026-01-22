
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "你是一个社区助手，名叫‘小We’。你的任务是帮助居民解答社区生活问题、总结长篇讨论、并提供和谐友善的交流建议。请使用中文回答，语气亲切幽默。",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，我现在遇到了一点小麻烦，请稍后再试。";
  }
};

export const summarizePost = async (postContent: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `请简洁地总结以下社区动态的主要内容（不超过30字）：\n\n${postContent}`,
    });
    return response.text;
  } catch (error) {
    return null;
  }
};
