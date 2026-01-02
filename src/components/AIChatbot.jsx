import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, RotateCcw } from 'lucide-react';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello Bhai! Nayi API key setup ho gayi hai. Ab main ready hoon. Kuch bhi puchiye!', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // YAHAN APNI NAYI KEY PASTE KAREIN
      const API_KEY = "AIzaSyDnYkQAdd4aewfaZdfzna3Y4oX_wp0YCRk"; 
      
      // Ye URL sabse stable hai fresh keys ke liye
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      if (data.candidates && data.candidates[0].content) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { id: Date.now() + 1, text: aiResponse, sender: 'bot' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: `Error: ${error.message}. Please check if you updated the key in the code.`, 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col h-[80vh] border border-gray-100">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center rounded-t-3xl">
          <div className="flex items-center gap-3">
            <Bot className="text-blue-400" size={30} />
            <h1 className="text-xl font-bold tracking-tight">MedClock AI</h1>
          </div>
          <RotateCcw className="cursor-pointer hover:rotate-180 transition-all duration-500 text-gray-400" onClick={() => setMessages([{id:1, text: 'Restarted!', sender:'bot'}])} />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && <div className="flex gap-2 p-2"><div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div></div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-5 bg-white border-t border-gray-100 flex gap-2 rounded-b-3xl">
          <input 
            className="flex-1 p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            value={input} 
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type 'Hello'..."
          />
          <button onClick={handleSendMessage} className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;