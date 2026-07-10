export type Skill = {
  name: string;
  level: number; // 0-100
  category: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university: string;
  major: string;
  year: string;
  cgpa: number;
  careerReadiness: number;
  resumeScore: number;
  applications: number;
  upcomingDeadlines: number;
  skills: Skill[];
  interests: string[];
  resumeStatus: 'uploaded' | 'pending' | 'optimized';
};

export type ResumeInsight = {
  type: 'strength' | 'improvement';
  title: string;
  description: string;
};

export type ResumeHistory = {
  id: string;
  date: string;
  version: string;
  score: number;
  changes: string;
};

export type ResumeData = {
  currentScore: number;
  uploadedAt: string;
  fileName: string;
  fileSize: string;
  insights: ResumeInsight[];
  suggestions: string[];
  history: ResumeHistory[];
};

export type Opportunity = {
  id: string;
  type: 'internship' | 'job' | 'hackathon' | 'scholarship';
  company: string;
  role: string;
  location: string;
  deadline: string;
  requiredSkills: string[];
  matchPercent: number;
  missingSkills: string[];
  postedDate: string;
  salary?: string;
  logo: string;
};

export type RoadmapMilestone = {
  id: string;
  semester: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  tasks: { id: string; label: string; done: boolean }[];
  date: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'mentor';
  content: string;
  timestamp: string;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'opportunity' | 'deadline' | 'achievement' | 'mentor';
  read: boolean;
};

export type SkillGap = {
  skill: string;
  current: number;
  required: number;
  category: string;
  recommendation: string;
};

export type ApplicationStatus =
  | 'saved'
  | 'applied'
  | 'under-review'
  | 'interview'
  | 'selected'
  | 'rejected';

export type ApplicationTimelineEvent = {
  id: string;
  label: string;
  date: string;
  done: boolean;
};

export type Application = {
  id: string;
  company: string;
  role: string;
  logo: string;
  status: ApplicationStatus;
  appliedDate: string;
  deadline: string;
  matchPercent: number;
  timeline: ApplicationTimelineEvent[];
};
