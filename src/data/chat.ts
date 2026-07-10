import type { ChatMessage } from '@/types';

export const suggestedPrompts = [
  'What skills should I focus on for a software engineering internship?',
  'How can I improve my resume score?',
  'Suggest a learning roadmap for system design.',
  'Which opportunities match my profile best?',
];

export const initialMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    role: 'mentor',
    content:
      "Hi Aarav! I'm your AI career mentor. I've analyzed your profile — you have strong frontend skills and solid DSA fundamentals. How can I help you today?",
    timestamp: '2026-07-09T09:00:00Z',
  },
];

export const mockResponses: Record<string, string> = {
  default:
    "Based on your profile, I'd recommend focusing on strengthening your system design knowledge and exploring backend technologies. Your frontend skills are strong, so broadening your full-stack capabilities will open up more opportunities. Would you like me to suggest specific resources?",
  skills:
    "For a software engineering internship, prioritize: 1) Data Structures & Algorithms (you're at 78% — push to 90%), 2) System Design (currently 45% — this is your biggest gap), 3) One backend language like Java or Go. Your React and TypeScript skills are already competitive.",
  resume:
    "Your resume score is 72/100. To improve: add a professional summary at the top, quantify more project outcomes with metrics, and include GitHub/LinkedIn links. I can generate an optimized summary for you if you'd like.",
  roadmap:
    "Here's a system design learning path: 1) Start with 'Designing Data-Intensive Applications', 2) Practice with system design primer on GitHub, 3) Study scalability, load balancing, and caching, 4) Complete 10 mock system design interviews. Target: reach 75% proficiency in 8 weeks.",
  opportunities:
    "Based on your skills, your top matches are: Zomato Frontend Engineer (91% match), Razorpay Full-Stack Engineer (88% match), and Google SWE Intern (82% match). I'd recommend applying to all three — your missing skills are minimal for these roles.",
  interview:
    "For technical interviews, focus on: 1) Solving 2-3 medium/hard LeetCode problems daily, 2) Practicing behavioral questions using the STAR method, 3) Mock interviews with peers, 4) Reviewing your projects deeply. You're on track — keep the momentum going!",
};
