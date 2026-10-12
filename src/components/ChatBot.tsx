import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Shield, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { SERVICES, BRAND_NAME, MOTO, CONTACT_INFO } from '../constants';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function ChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: `Hello! I'm the ${BRAND_NAME} Virtual Assistant. How can I help you today? I can tell you about our AI SOC, Managed Services, or help you with security consulting.` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const servicesContext = SERVICES.map(s => `${s.title}: ${s.description}`).join('\n');
      const systemInstruction = `
        You are the ${BRAND_NAME} AI assistant. ${BRAND_NAME}'s moto is "${MOTO}".
        Provide helpful information about our services based on the following:
        ${servicesContext}
        
        Keep responses concise, professional, and technical but accessible.
        Always suggest contacting ${CONTACT_INFO.email} for expert consultation.
      `;

      // Initialize AI instance right before the call to ensure the key is captured correctly
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest", // Switching to stable alias to resolve 403 permissions issues
        contents: [{ parts: [{ text: [...messages.map(m => m.content).slice(-4), userMessage].join('\n') }] }],
        config: { systemInstruction }
      });

      const botResponse = response.text || `I'm sorry, I couldn't process that. Please contact our support team at ${CONTACT_INFO.email}.`;
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: `Our AI is currently undergoing security updates. Please reach out to ${CONTACT_INFO.email} directly.` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-24 right-8 z-[60] w-full max-w-[400px] h-[600px] bg-dark-bg/40 backdrop-blur-3xl rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white border border-white/10"
    >
      {/* Header */}
      <div className="chat-bubble-gradient p-6 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight">{BRAND_NAME} Virtual Assistant</h3>
            <p className="text-[10px] opacity-70 flex items-center gap-1 uppercase tracking-widest">
              <Zap className="w-2 h-2 fill-current" /> System Online
            </p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-gradient-to-b from-dark-bg/50 to-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-secondary' : 'bg-primary'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className={`p-4 rounded-2xl text-xs leading-relaxed font-light ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-none border border-white/10' : 'bg-white/5 text-gray-300 rounded-tl-none border border-white/5'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                 <Bot className="w-4 h-4 text-white" />
               </div>
               <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                 <div className="flex gap-1">
                   <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-white/40 rounded-full"></motion.div>
                   <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-white/40 rounded-full"></motion.div>
                   <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-white/40 rounded-full"></motion.div>
                 </div>
               </div>
             </div>
           </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/5 bg-black/40">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="How can I help you today?"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-5 pr-14 py-4 text-xs font-light focus:outline-none focus:border-primary transition-all text-white"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center rounded-lg transition-all ${input.trim() ? 'bg-primary text-white' : 'bg-white/5 text-gray-500'}`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

