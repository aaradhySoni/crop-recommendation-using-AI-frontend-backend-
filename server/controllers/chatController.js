import ChatMessage from '../models/ChatMessage.js';

/**
 * Generate AI response based on user message
 * Simple rule-based responses for now (can be enhanced with actual AI later)
 */
const generateAIResponse = (userMessage, sessionHistory = []) => {
  const message = userMessage.toLowerCase().trim();

  // Greeting responses
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! 👋 I'm your AI Farm Assistant. How can I help you today?";
  }

  // Crop recommendation questions
  if (message.includes('recommend') || message.includes('crop') || message.includes('suggest')) {
    return "I can help you get crop recommendations! Please fill out the recommendation form with your soil pH, moisture level, soil type, weather conditions, and previous crop. The system will analyze your data and suggest the best crops for your farm.";
  }

  // Soil questions
  if (message.includes('soil') || message.includes('ph')) {
    return "Soil pH is crucial for crop growth! Most crops prefer a pH between 6.0 and 7.5. Acidic soils (pH < 6) are good for rice and potatoes, while alkaline soils (pH > 8) work well for wheat and barley. You can test your soil pH using a soil test kit.";
  }

  // Weather questions
  if (message.includes('weather') || message.includes('climate') || message.includes('rain')) {
    return "Weather patterns significantly affect crop success. Tropical climates are great for rice and sugarcane, while temperate regions suit wheat and corn. Consider your local rainfall patterns and temperature ranges when choosing crops.";
  }

  // Moisture questions
  if (message.includes('moisture') || message.includes('water') || message.includes('irrigation')) {
    return "Moisture levels vary by crop. Rice needs high moisture (70-100%), while crops like cotton prefer drier conditions (30-70%). Proper irrigation and drainage are essential for optimal crop growth.";
  }

  // Yield questions
  if (message.includes('yield') || message.includes('production') || message.includes('harvest')) {
    return "Expected yields depend on many factors: soil quality, weather, crop variety, and farming practices. Our recommendations include average yield estimates based on similar conditions. Remember, actual yields may vary.";
  }

  // Profit questions
  if (message.includes('profit') || message.includes('money') || message.includes('cost') || message.includes('price')) {
    return "Profit potential considers market prices, production costs, and yield estimates. Our recommendations show estimated profit per acre, but actual profits depend on market conditions, input costs, and your farming efficiency.";
  }

  // Sustainability questions
  if (message.includes('sustainable') || message.includes('organic') || message.includes('environment')) {
    return "Sustainable farming practices help preserve soil health and reduce environmental impact. Crop rotation, organic fertilizers, and water conservation are key. Our recommendations include sustainability ratings to help you make eco-friendly choices.";
  }

  // Help questions
  if (message.includes('help') || message.includes('how') || message.includes('what')) {
    return "I can help with:\n• Crop recommendations based on your soil and weather\n• Soil analysis tips and pH information\n• Weather insights for farming\n• Best practices for sustainable agriculture\n\nJust ask me anything about farming!";
  }

  // Default response
  return "That's an interesting question! I'm here to help with crop recommendations, soil analysis, weather insights, and farming best practices. Could you provide more details about what you'd like to know?";
};

/**
 * Send a chat message and get AI response
 * POST /api/chat
 */
export const sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Generate session ID if not provided
    const chatSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Save user message
    const userMessage = new ChatMessage({
      sessionId: chatSessionId,
      role: 'user',
      message: message.trim()
    });
    await userMessage.save();

    // Get conversation history for context
    const history = await ChatMessage.find({ sessionId: chatSessionId })
      .sort({ timestamp: -1 })
      .limit(10)
      .select('role message');

    // Generate AI response
    const aiResponse = generateAIResponse(message, history);

    // Save AI response
    const assistantMessage = new ChatMessage({
      sessionId: chatSessionId,
      role: 'assistant',
      message: aiResponse
    });
    await assistantMessage.save();

    res.status(200).json({
      success: true,
      data: {
        sessionId: chatSessionId,
        userMessage: userMessage.message,
        aiResponse: aiResponse,
        timestamp: userMessage.timestamp
      }
    });

  } catch (error) {
    console.error('Error sending chat message:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing chat message',
      error: error.message
    });
  }
};

/**
 * Get chat history for a session
 * GET /api/chat/history
 */
export const getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'sessionId is required'
      });
    }

    const messages = await ChatMessage.find({ sessionId })
      .sort({ timestamp: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      data: {
        sessionId,
        messages
      }
    });

  } catch (error) {
    console.error('Error getting chat history:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching chat history',
      error: error.message
    });
  }
};

