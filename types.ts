
export interface Message {
  id: number;
  timestamp: string;
  sender: string;
  role?: string;
  content: string;
}

export interface Episode {
  episode: number;
  title: string;
  dateRange: string;
  primaryGoalTrigger: string;
  triggeredBy: string;
  frictionPoints: string[];
  finalOutcome: string;
  personaAnalysis: {
    before: string;
    after: string;
  };
  metrics: {
    doctorConsults: string;
    coachHours: string;
    timeToResolution: string;
    elyxResponseTime: string;
  };
  messageIndexRange: {
    start: number;
    end: number;
  };
}