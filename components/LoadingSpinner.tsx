
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Initializing AI persona for Rohan Patel...",
  "Consulting with the Elyx expert team...",
  "Generating 8 months of health conversations...",
  "This may take a minute, the AI is crafting a detailed journey...",
  "Analyzing conversation patterns for key episodes...",
  "Identifying friction points and successes...",
  "Constructing the member journey timeline...",
  "Finalizing visualizations...",
];

const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <svg
        className="animate-spin h-12 w-12 text-blue-600 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p className="text-lg font-medium text-gray-700">Generating Journey...</p>
      <p className="text-gray-500 mt-2 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingSpinner;
