
import React, { useState, useRef, useEffect } from 'react';
import type { Episode } from '../types';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  episode: Episode | null;
  history: Array<{ sender: 'user' | 'ai'; content: string }>;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose, episode, history, isLoading, onSendMessage }) => {
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);
  
  if (!isOpen || !episode) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chatbot-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col transform transition-all duration-300 ease-out"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 id="chatbot-title" className="text-lg font-bold text-gray-800">Ask AI About:</h2>
            <p className="text-sm text-blue-600 truncate">{episode.title}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-800" aria-label="Close chatbot">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
          {history.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md lg:max-w-lg rounded-xl p-3 shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-md lg:max-w-lg rounded-xl p-3 shadow-sm bg-gray-200 text-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="p-4 border-t border-gray-200 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default ChatbotModal;
