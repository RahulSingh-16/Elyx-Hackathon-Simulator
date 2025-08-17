import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { Message, Episode } from './types';
import { generateAndAnalyzeJourney, getChatbotResponse } from './services/geminiService';
import Header from './components/Header';
import JourneyTimeline from './components/JourneyTimeline';
import LoadingSpinner from './components/LoadingSpinner';
import ConversationView from './components/ConversationView';
import ChatbotModal from './components/ChatbotModal';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [highlightedRange, setHighlightedRange] = useState<{ start: number; end: number } | null>(null);
  
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [currentEpisodeForChat, setCurrentEpisodeForChat] = useState<Episode | null>(null);
  const [chatbotHistory, setChatbotHistory] = useState<Array<{ sender: 'user' | 'ai'; content: string }>>([]);
  const [isChatbotLoading, setIsChatbotLoading] = useState<boolean>(false);

  const highlightTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  const handleGenerateJourney = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMessages(null);
    setEpisodes(null);
    try {
      const result = await generateAndAnalyzeJourney();
      const sortedEpisodes = result.episodes.sort((a, b) => a.episode - b.episode);
      setMessages(result.messages);
      setEpisodes(sortedEpisodes);
    } catch (err) {
      console.error(err);
      setError('Failed to generate the member journey. Please check the API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleViewConversation = useCallback((range: { start: number; end: number }) => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
    
    setHighlightedRange(range);
    
    document.getElementById(`message-${range.start}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    highlightTimeoutRef.current = window.setTimeout(() => {
      setHighlightedRange(null);
    }, 3000);
  }, []);
  
  const handleOpenChatbot = useCallback((episode: Episode) => {
    setCurrentEpisodeForChat(episode);
    setChatbotHistory([{ sender: 'ai', content: `I can answer questions about this episode: "${episode.title}". What would you like to know?` }]);
    setIsChatbotOpen(true);
  }, []);

  const handleCloseChatbot = useCallback(() => {
    setIsChatbotOpen(false);
    setCurrentEpisodeForChat(null);
    setChatbotHistory([]);
  }, []);

  const handleSendChatMessage = useCallback(async (question: string) => {
    if (isChatbotLoading || !currentEpisodeForChat || !messages) return;

    setIsChatbotLoading(true);
    setChatbotHistory(prev => [...prev, { sender: 'user', content: question }]);

    try {
      // Use the entire conversation log for context to give the AI the best possible information.
      const conversationContext = messages;
      
      const response = await getChatbotResponse(question, currentEpisodeForChat, conversationContext);
      
      setChatbotHistory(prev => [...prev, { sender: 'ai', content: response }]);
    } catch (err) {
      console.error(err);
      setChatbotHistory(prev => [...prev, { sender: 'ai', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsChatbotLoading(false);
    }
  }, [isChatbotLoading, currentEpisodeForChat, messages]);


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {!isLoading && !episodes && (
          <div className="text-center bg-white p-12 rounded-xl shadow-md border border-gray-200">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Visualize a Member's Health Journey
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Click the button below to use Gemini AI to generate and analyze an 8-month-long health journey for a sample member. The AI will create a detailed conversation log and then summarize it into key narrative episodes.
            </p>
            <div className="mt-10">
              <button
                onClick={handleGenerateJourney}
                disabled={isLoading}
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generating...' : 'Generate AI-Powered Journey'}
              </button>
            </div>
          </div>
        )}
        
        {isLoading && <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center" role="alert">
            <strong className="font-bold">An error occurred:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}
        
        {episodes && messages && (
          <div className="space-y-16">
             <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2 px-4 md:px-0">Full Conversation Log</h2>
                <p className="text-gray-600 mb-8 px-4 md:px-0">An 8-month AI-generated conversation between Rohan and his health team.</p>
                <ConversationView messages={messages} highlightedRange={highlightedRange} />
            </div>
            <JourneyTimeline episodes={episodes} onViewConversation={handleViewConversation} onOpenChatbot={handleOpenChatbot} />
          </div>
        )}

      </main>
      <ChatbotModal 
        isOpen={isChatbotOpen}
        onClose={handleCloseChatbot}
        episode={currentEpisodeForChat}
        history={chatbotHistory}
        isLoading={isChatbotLoading}
        onSendMessage={handleSendChatMessage}
      />
    </div>
  );
};

export default App;