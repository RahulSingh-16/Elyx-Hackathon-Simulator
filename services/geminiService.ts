import { GoogleGenAI, Type } from "@google/genai";
import type { Episode, Message } from '../types';
import { MEMBER_PROFILE, ELYX_TEAM, HIGH_LEVEL_PLAN, TASK_DESCRIPTION ,conversation_domain_to_cover, quaterly_test,HARD_CONSTRAINTS, GUARD_RAILS} from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const conversationGenerationPrompt = `
You are a simulation engine for communications between a high-end health concierge service (Elyx) and its new member (Rohan Patel).There should be an average of 100-150 whatsapp messages every month and a total of around 800-1000 messages
Your task is to generate a realistic 8-month WhatsApp conversation comprising of nearly 800 messages between a single member (Rohan Patel) and a fixed Elyx concierge team. Produce human-plausible messages that reflect member goals, wearable and biomarker feedback, plan iterations, adherence variance, travel logistics, and periodic diagnostics. The simulation must be consistent, traceable (every decision has a “why”), and constrained by the rules below.

 
**Member Profile:**
${MEMBER_PROFILE}

**Elyx Team:**
${ELYX_TEAM}

**High-Level Plan & Constraints:**
${HIGH_LEVEL_PLAN}

**TASK DESCRIPTION**
${TASK_DESCRIPTION}

**Conversation Domain To Cover**
${conversation_domain_to_cover}

** Diagonostics: full test Panel (Mandatory every 3 months)**
${quaterly_test}

**Hard Constraints**
${HARD_CONSTRAINTS}

** Decision Traceability**
For every significant recommendation, change, or escalation:
- Add a compact WHY: cause → data → action → expected outcome.
- If it references labs or wearable trends, cite the date/value and the threshold logic in plain language.
- Keep pointers lightweight (e.g., why_id: W-2025-05-14-A1).
- Monthly and quarterly reviews must summarize the top WHYs and their outcomes.


**Output Format(Strict):**
The format for each message MUST be: [MM/DD/25, HH:MM AM/PM] Sender Name (Role if Elyx): Message content.
Example: [01/15/25, 2:15 PM] Rohan Patel: Ruby. My Garmin is logging consistently high intensity minutes...
        [2/1/25, 4:30 PM] Rohan Patel: The seated stretch on the plane was useless. The couch stretch I just did now helped a bit more.
        [2/1/25, 4:35 PM] Rachel (Elyx PT): Good. That's a useful datapoint for Pillar 4. The seated version is a compromise for when you're stuck; the standing version is the real therapeutic one. It suggests a muscular component we can definitely work on.

** Guard Rails**
${GUARD_RAILS}

Generate a long and comprehensive conversation log that covers the full 8 months according to the details and constraints given above. The conversation should show the evolution of the relationship, challenges, and successes.

`;

const episodeAnalysisSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            episode: { type: Type.INTEGER, description: "The episode number, starting from 1." },
            title: { type: Type.STRING, description: "A concise, descriptive title for the episode." },
            dateRange: { type: Type.STRING, description: "The approximate date range this episode covers, e.g., 'January 15-28'." },
            primaryGoalTrigger: { type: Type.STRING, description: "Summary of the main goal or trigger for this episode." },
            triggeredBy: { type: Type.STRING, description: "Who initiated this phase (e.g., 'Member', 'Elyx Concierge')." },
            frictionPoints: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "A list of challenges or friction points encountered during the episode." 
            },
            finalOutcome: { type: Type.STRING, description: "Summary of how the episode concluded and what was achieved." },
            personaAnalysis: {
                type: Type.OBJECT,
                properties: {
                    before: { type: Type.STRING, description: "Description of the member's state/mindset before the episode." },
                    after: { type: Type.STRING, description: "Description of the member's state/mindset after the episode." },
                },
                required: ["before", "after"]
            },
            metrics: {
                type: Type.OBJECT,
                properties: {
                    doctorConsults: { type: Type.STRING, description: "Number of consults or significant interactions with Dr. Warren (e.g., '1 consult', '2 brief check-ins')." },
                    coachHours: { type: Type.STRING, description: "Estimated hours spent by coaches (PT, Nutritionist) during this episode (e.g., '2.5 hours')." },
                    timeToResolution: { type: Type.STRING, description: "An estimated time to resolution for the episode's main goal (e.g., '3 days', '2 weeks')." },
                    elyxResponseTime: { type: Type.STRING, description: "Average Elyx team response time to member queries during this episode (e.g., 'Under 4 hours')." },
                },
                required: ["doctorConsults", "coachHours", "timeToResolution", "elyxResponseTime"]
            },
            messageIndexRange: {
                type: Type.OBJECT,
                description: "The start and end index (inclusive) of messages in the conversation log that this episode covers. The first message has index 1.",
                properties: {
                    start: { type: Type.INTEGER, description: "The starting message index for this episode." },
                    end: { type: Type.INTEGER, description: "The ending message index for this episode." },
                },
                required: ["start", "end"]
            }
            
        },
        required: ["episode", "title", "dateRange", "primaryGoalTrigger", "triggeredBy", "frictionPoints", "finalOutcome", "personaAnalysis", "messageIndexRange", "metrics"]
    }
};


function parseConversation(text: string): Message[] {
    const messages: Message[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const regex = /\[(.*?)\] (.*?)(?:\s\((.*?)\))?:\s(.*)/;

    lines.forEach((line, index) => {
        const match = line.match(regex);
        if (match) {
            messages.push({
                id: index + 1,
                timestamp: match[1],
                sender: match[2].trim(),
                role: match[3] ? match[3].trim() : undefined,
                content: match[4].trim(),
            });
        }
    });
    return messages;
}


export const generateAndAnalyzeJourney = async (): Promise<{ messages: Message[]; episodes: Episode[] }> => {
    // Step 1: Generate the conversation
    const conversationResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: conversationGenerationPrompt,
    });
    const conversationText = conversationResponse.text;
    const messages = parseConversation(conversationText);

    // Step 2: Analyze the conversation to create episodes
    const analysisPrompt = `
        Based on the following conversation log between a member (Rohan) and a health service (Elyx), analyze the entire text and identify key "episodes" or distinct phases in the member's journey. Extract and summarize the information for each episode according to the provided JSON schema. For the 'metrics' object in the schema, you MUST generate plausible, estimated values for each field based on the interactions in the conversation. This includes estimating consults, coaching hours, and resolution times. Create 15-20 episodes covering the entire 8-month period.

        For the 'messageIndexRange', identify the starting and ending index of the messages in the log that are most relevant to this episode. The message indices are 1-based.

        CONVERSATION LOG:
        ---
        ${conversationText}
        ---
    `;

    const analysisResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: analysisPrompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: episodeAnalysisSchema,
        }
    });

    const episodes = JSON.parse(analysisResponse.text);

    return { messages, episodes };
};

export const getChatbotResponse = async (
    question: string,
    episode: Episode,
    conversationContext: Message[]
): Promise<string> => {
    const contextText = conversationContext.map(msg => `[${msg.timestamp}] ${msg.sender}: ${msg.content}`).join('\n');

    const prompt = `
        You are an AI assistant for Elyx, a premium health service. Your task is to answer questions about a member's journey.
        The user is asking about a specific episode, but you have access to the entire conversation history for full context.
        You must only use the information given below. Do not invent details. Be helpful, concise, and professional.

        **MEMBER PROFILE:**
        ${MEMBER_PROFILE}

        **FOCUSED EPISODE SUMMARY:**
        The user's question is specifically about the episode titled "${episode.title}" which occurred around ${episode.dateRange}.
        - Trigger: ${episode.primaryGoalTrigger}
        - Friction Points: ${episode.frictionPoints.join(', ') || 'None'}
        - Outcome: ${episode.finalOutcome}
        - Persona Shift: From "${episode.personaAnalysis.before}" to "${episode.personaAnalysis.after}".

        **USER'S QUESTION:**
        "${question}"

        To answer the question, use the following full conversation log. While the question is about the episode above, the full log provides the necessary context to find the correct answer.

        **FULL CONVERSATION LOG:**
        ---
        ${contextText}
        ---

        Based on the focused episode summary and the full conversation log, answer the user's question.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting chatbot response from Gemini:", error);
        return "Sorry, I encountered an error trying to process that question. Please try again.";
    }
};