
import React from 'react';
import type { Episode } from '../types';
import EpisodeCard from './EpisodeCard';

interface JourneyTimelineProps {
  episodes: Episode[];
  onViewConversation: (range: { start: number; end: number }) => void;
  onOpenChatbot: (episode: Episode) => void;
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ episodes, onViewConversation, onOpenChatbot }) => {
  if (!episodes || episodes.length === 0) {
    return <p>No journey episodes available.</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 px-4 md:px-0">Member Journey Timeline</h2>
      <p className="text-gray-600 mb-8 px-4 md:px-0">An AI-generated summary of key moments in Rohan's 8-month journey.</p>
      <div className="relative pl-8 md:pl-12">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-6 top-2 bottom-2 w-0.5 bg-blue-200"></div>

        <div className="space-y-12">
          {episodes.map((episode) => (
            <div key={episode.episode} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-1.5 md:-left-3.5 top-1.5 h-6 w-6 rounded-full bg-blue-500 border-4 border-white"></div>
              <div className="pl-4">
                <EpisodeCard episode={episode} onViewConversation={onViewConversation} onOpenChatbot={onOpenChatbot} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;
