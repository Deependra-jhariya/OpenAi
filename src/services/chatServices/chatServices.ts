import axios from "axios";

const BASE_URL = "https://our-cafe-backend.onrender.com/api/v1/OpenAi";

export const chatService = {
  sendMessage: async (messages: { role: string; content: string }[]) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chat`,
        { messages },
        { headers: { "Content-Type": "application/json" } }
      );
      return (
        response?.data?.data?.choices?.[0]?.message?.content || "No response"
      );
    } catch (error: any) {
      console.error("Chat Service Error:", error.message);
      throw error;
    }
  },
};
