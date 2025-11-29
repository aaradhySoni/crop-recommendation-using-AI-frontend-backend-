import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import chatbotAvatar from "@/assets/ai-chatbot.png";

interface ChatMessage {
  sender: "user" | "ai";
  message: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const toggleChat = () => setIsOpen(!isOpen);

  // Load chat history from backend
  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:5000/api/chat/history")
        .then((res) => res.json())
        .then((data) => {
          setChatHistory(data);
        })
        .catch((err) => console.error("Chat history error:", err));
    }
  }, [isOpen]);

  // Send message to backend
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      sender: "user",
      message,
    };

    // Add user message to UI immediately
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      const aiMessage: ChatMessage = {
        sender: "ai",
        message: data.reply, // backend returns { reply: "..." }
      };

      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    }

    setMessage("");
  };

  return (
    <>
      {/* Chatbot Floating Button */}
      {!isOpen && (
        <Button
          variant="hero"
          size="icon"
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl hover:scale-110 z-50"
          onClick={toggleChat}
        >
          <MessageCircle className="w-7 h-7" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col animate-fade-in glass-card">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-hero rounded-t-xl">
            <div className="flex items-center gap-3">
              <img src={chatbotAvatar} alt="AI Assistant" className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold text-white">Farm Assistant</h3>
                <p className="text-xs text-white/80">Always here to help</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleChat}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {/* Initial greeting (only show if no history) */}
            {chatHistory.length === 0 && (
              <>
                <div className="flex gap-3">
                  <img src={chatbotAvatar} alt="AI" className="w-8 h-8 rounded-full" />
                  <div className="glass-card p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                    <p className="text-sm">Hello! 👋 I'm your AI Farm Assistant. How can I help you today?</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <img src={chatbotAvatar} alt="AI" className="w-8 h-8 rounded-full" />
                  <div className="glass-card p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                    <p className="text-sm">
                      I can help with:
                      <br />• Crop recommendations
                      <br />• Soil analysis tips
                      <br />• Weather insights
                      <br />• Farming best practices
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Render backend chat history */}
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}
              >
                {msg.sender === "ai" && (
                  <img src={chatbotAvatar} alt="AI" className="w-8 h-8 rounded-full" />
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "glass-card rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <Button variant="hero" size="icon" onClick={sendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
