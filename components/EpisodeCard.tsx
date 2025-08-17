
import React from 'react';
import type { Episode } from '../types';

interface EpisodeCardProps {
  episode: Episode;
  onViewConversation: (range: { start: number; end: number }) => void;
  onOpenChatbot: (episode: Episode) => void;
}

const InfoBlock: React.FC<{ title: string; children: React.ReactNode, icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="mt-4">
        <div className="flex items-center">
            <span className="text-blue-500 mr-2">{icon}</span>
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{title}</h4>
        </div>
        <div className="text-sm text-gray-700 mt-1 pl-6">{children}</div>
    </div>
);

const FrictionPointList: React.FC<{ points: string[] }> = ({ points }) => (
    <ul className="list-disc list-inside mt-1">
        {points.map((point, index) => (
            <li key={index} className="text-sm text-gray-700">{point}</li>
        ))}
    </ul>
);

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onViewConversation, onOpenChatbot }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 w-full">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow">
          <p className="text-sm font-medium text-blue-600">{episode.dateRange}</p>
          <h3 className="text-xl font-bold text-gray-800 mt-1">{episode.title}</h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
            <button 
                onClick={() => onOpenChatbot(episode)}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors py-2 px-3 rounded-full bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center gap-2"
                aria-label={`Ask AI about ${episode.title}`}
            >
                <ChatbotIcon />
                Ask AI
            </button>
            <button 
                onClick={() => onViewConversation(episode.messageIndexRange)}
                className="text-sm font-semibold text-gray-700 hover:text-black transition-colors py-2 px-3 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                aria-label={`View conversation for ${episode.title}`}
            >
                View Chat
            </button>
            <div className="bg-blue-100 text-blue-700 font-bold text-lg rounded-full h-12 w-12 flex items-center justify-center">
                {episode.episode}
            </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <InfoBlock title="Primary Trigger" icon={<TriggerIcon />}>
            <p>{episode.primaryGoalTrigger} (Triggered by: <strong>{episode.triggeredBy}</strong>)</p>
        </InfoBlock>
        
        {episode.frictionPoints && episode.frictionPoints.length > 0 && (
            <InfoBlock title="Friction Points" icon={<FrictionIcon />}>
                <FrictionPointList points={episode.frictionPoints} />
            </InfoBlock>
        )}
        
        <InfoBlock title="Final Outcome" icon={<OutcomeIcon />}>
            <p>{episode.finalOutcome}</p>
        </InfoBlock>
        
        <InfoBlock title="Persona Analysis" icon={<PersonaIcon />}>
            <p><strong className="font-semibold text-gray-800">Before:</strong> {episode.personaAnalysis.before}</p>
            <p className="mt-1"><strong className="font-semibold text-gray-800">After:</strong> {episode.personaAnalysis.after}</p>
        </InfoBlock>

        <InfoBlock title="Key Metrics" icon={<MetricsIcon />}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                    <p className="font-semibold text-gray-600">Doctor Consults</p>
                    <p className="text-gray-800 font-medium">{episode.metrics.doctorConsults}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Coach Hours</p>
                    <p className="text-gray-800 font-medium">{episode.metrics.coachHours}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Time to Resolution</p>
                    <p className="text-gray-800 font-medium">{episode.metrics.timeToResolution}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Avg. Response Time</p>
                    <p className="text-gray-800 font-medium">{episode.metrics.elyxResponseTime}</p>
                </div>
            </div>
        </InfoBlock>

      </div>
    </div>
  );
};

const TriggerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const FrictionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>;
const OutcomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PersonaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const ChatbotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const MetricsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


export default EpisodeCard;