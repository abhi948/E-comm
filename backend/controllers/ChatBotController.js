const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handleChatbotQuery = async (req, res) => {
  try {
    // Validate input
    if (!req.body.message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("Gemini API key not configured");
      return res.status(500).json({ error: "Service configuration error" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: req.body.chatHistory || [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.5,
      },
    });

    const prompt = `
      You are a helpful customer support assistant for an e-commerce store.
      Be polite, concise, and focus on:
      - Product inquiries
      - Order status
      - Returns and refunds
      - General questions
      
      If you don't know an answer, say "I'll connect you with a human representative."
      
      User query: ${req.body.message}
    `;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    if (!response.text) {
      throw new Error("Empty response from Gemini");
    }

    res.json({
      response: response.text(),
      chatHistory: [
        ...(req.body.chatHistory || []),
        { role: "user", parts: [{ text: req.body.message }] },
        { role: "model", parts: [{ text: response.text() }] }
      ]
    });

  } catch (error) {
    console.error("Chatbot error:", error.message);
    
    // Specific error messages for different cases
    let userMessage = "Sorry, I'm having trouble responding. Please try again later.";
    
    if (error.message.includes("API key not valid")) {
      userMessage = "Service is currently unavailable. Please contact support directly.";
    } else if (error.message.includes("quota")) {
      userMessage = "Our chat service is experiencing high demand. Please try again later.";
    }
    
    res.status(500).json({
      error: userMessage,
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};