import { useState } from 'react';
import {axiosi} from '../../config/axios.js'; // Import the configured axios instance

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async (message) => {
    setIsLoading(true);
    const userMessage = { text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Fixed API endpoint URL
      const response = await axiosi.post('/api/chatbot/chat', {
        message,
        chatHistory
      });
      
      const botMessage = { text: response.data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      setChatHistory(response.data.chatHistory);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = { 
        text: "Sorry, I'm having trouble responding. Please try again later.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
};