
import React from 'react';
import type { Message } from '../types';

interface ConversationViewProps {
  messages: Message[];
  highlightedRange: { start: number; end: number } | null;
}

const MessageBubble: React.FC<{ message: Message; isHighlighted: boolean }> = ({ message, isHighlighted }) => {
  const isMember = message.sender === 'Rohan Patel';

  const alignment = isMember ? 'justify-end' : 'justify-start';
  const bubbleColor = isMember ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800';
  const highlightClass = isHighlighted ? 'bg-yellow-200' : 'bg-transparent';

  return (
    <div
      id={`message-${message.id}`}
      className={`flex ${alignment} my-1 transition-colors duration-1000 rounded-lg ${highlightClass}`}
      role="log"
      aria-live="polite"
    >
      <div className={`max-w-xs md:max-w-md lg:max-w-xl rounded-lg p-3 shadow-sm ${bubbleColor}`}>
        <div className="font-bold text-sm">
          {message.sender}
          {message.role && <span className="font-normal text-xs opacity-80 ml-2">({message.role})</span>}
        </div>
        <p className="text-sm mt-1">{message.content}</p>
        <div className="text-xs opacity-70 mt-2 text-right">{message.timestamp}</div>
      </div>
    </div>
  );
};

const ConversationView: React.FC<ConversationViewProps> = ({ messages, highlightedRange }) => {
  const isMessageHighlighted = (messageId: number) => {
    if (!highlightedRange) return false;
    return messageId >= highlightedRange.start && messageId <= highlightedRange.end;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="bg-gray-100 p-4 rounded-t-xl border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">Conversation with Rohan</h3>
      </div>
      <div className="p-4 h-[600px] overflow-y-auto bg-gray-50 flex flex-col space-y-2">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} isHighlighted={isMessageHighlighted(message.id)} />
        ))}
      </div>
    </div>
  );
};

export default ConversationView;
