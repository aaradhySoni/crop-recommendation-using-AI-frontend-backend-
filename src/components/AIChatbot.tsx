import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import chatbotAvatar from "@/assets/ai-chatbot.png";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Chatbot Widget */}
      {!isOpen && (
        <Button
          variant="hero"
          size="icon"
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl hover:scale-110 z-50"
          onClick={toggleChat}
          aria-label="Open AI Assistant"
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
            <div className="flex gap-3">
              <img src={chatbotAvatar} alt="AI" className="w-8 h-8 rounded-full" />
              <div className="glass-card p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                <p className="text-sm">
                  Hello! 👋 I'm your AI Farm Assistant. How can I help you today?
                </p>
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
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && message.trim()) {
                    // Handle send message
                    setMessage("");
                  }
                }}
              />
              <Button 
                variant="hero" 
                size="icon"
                onClick={() => {
                  if (message.trim()) {
                    // Handle send message
                    setMessage("");
                  }
                }}
              >
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
