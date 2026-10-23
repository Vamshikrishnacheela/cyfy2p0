import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { SERVICES, BRAND_NAME, MOTO, CONTACT_INFO, enquiryHref } from '../constants';

// The key is inlined at build time (vite.config.ts), so it is visible to anyone who loads the site.
// Production should call Gemini through a server-side proxy instead; without a key the assistant runs in offline mode.
const AI_ENABLED = Boolean(process.env.GEMINI_API_KEY);

const QUICK_LINKS = [
  { label: 'Talk to a Security Expert', to: '/#contact' },
  { label: 'Managed SOC', to: '/service/ai-soc' },
  { label: 'Request a Security Assessment', to: enquiryHref('assessment') },
  { label: 'All services', to: '/#services' },
];

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function ChatBot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: AI_ENABLED
      ? `Hello! I'm the ${BRAND_NAME} Virtual Assistant. How can I help you today? I can tell you about our Managed SOC, managed security services, or help you with security consulting.`
      : `Hello! The ${BRAND_NAME} assistant is not available right now. Choose a link below, or email ${CONTACT_INFO.email} and our team will get back to you.` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || !AI_ENABLED) return;

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
      setMessages(prev => [...prev, { role: 'bot', content: `Sorry, I couldn't get an answer just now. Please use the contact form or email ${CONTACT_INFO.email}.` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      role="dialog"
      aria-label={`${BRAND_NAME} virtual assistant`}
      className="fixed bottom-24 inset-x-4 sm:inset-x-auto sm:right-8 sm:w-[400px] z-[115] h-[min(600px,calc(100dvh-8rem))] bg-[#0b0f13]/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white border border-white/10"
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
              <Zap className="w-2 h-2 fill-current" aria-hidden="true" /> {AI_ENABLED ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close chat" className="hover:bg-white/10 p-2 rounded-full transition-colors">
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
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-none border border-white/10' : 'bg-white/5 text-gray-300 rounded-tl-none border border-white/5'}`}>
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
        {!AI_ENABLED && (
          <ul className="flex flex-wrap gap-2" aria-label="Quick links">
            {QUICK_LINKS.map(l => (
              <li key={l.label}>
                <Link to={l.to} onClick={onClose} className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white hover:border-primary hover:bg-primary/20 transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/5 bg-black/40">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={!AI_ENABLED}
            aria-label="Message the assistant"
            placeholder={AI_ENABLED ? 'How can I help you today?' : 'Assistant offline'}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-5 pr-14 py-4 text-sm focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50"
          />
          <button 
            type="button"
            aria-label="Send message"
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

