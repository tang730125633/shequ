
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { getAIResponse } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好！我是你的智慧社区小助手“小We”。有什么我可以帮你的吗？不管是社区琐事、活动查询还是邻里矛盾建议，我都在这里哦！', sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botText = await getAIResponse(input);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: botText || '对不起，我暂时走神了。',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar bg-gray-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-white text-teal-600 shadow-sm border border-gray-100'}`}>
              {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[75%] p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
              {msg.text}
              <div className={`text-[10px] mt-1.5 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
              <Bot size={16} className="text-teal-600" />
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 sticky bottom-0">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-teal-400 focus-within:bg-white transition-all">
          <input 
            type="text" 
            placeholder="问问小We任何事..." 
            className="flex-1 bg-transparent border-none outline-none text-[14px] py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-1.5 rounded-full transition-all ${input.trim() ? 'bg-teal-600 text-white scale-110 shadow-md' : 'text-gray-300'}`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
          <Sparkles size={10} /> 由 Gemini 3 Pro 提供智能支持
        </p>
      </div>
    </div>
  );
};

export default AIChat;
