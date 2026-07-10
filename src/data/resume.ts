import type { ResumeData } from '@/types';

export const resumeData: ResumeData = {
  currentScore: 72,
  uploadedAt: '2026-06-28T10:30:00Z',
  fileName: 'Aarav_Sharma_Resume_v3.pdf',
  fileSize: '284 KB',
  insights: [
    {
      type: 'strength',
      title: 'Strong technical skills section',
      description: 'Your skills section effectively highlights 8 relevant technologies with clear proficiency indicators.',
    },
    {
      type: 'strength',
      title: 'Quantified project achievements',
      description: '3 out of 4 projects include measurable outcomes, which recruiters value highly.',
    },
    {
      type: 'improvement',
      title: 'Missing professional summary',
      description: 'Add a 2-3 line summary at the top to quickly communicate your career goals and key strengths.',
    },
    {
      type: 'improvement',
      title: 'Limited internship experience',
      description: 'Consider adding relevant coursework or personal projects to compensate for limited work experience.',
    },
    {
      type: 'improvement',
      title: 'Action verbs need strengthening',
      description: 'Replace passive phrases with strong action verbs like "Developed", "Architected", "Optimized".',
    },
  ],
  suggestions: [
    'Add a professional summary highlighting your target role and top 3 skills',
    'Include GitHub and LinkedIn profile links in the header',
    'Quantify at least one more project outcome with metrics',
    'Add a "Relevant Coursework" section to showcase academic foundation',
    'Use bullet points consistently for all experience entries',
    'Optimize for ATS by including keywords from target job descriptions',
  ],
  history: [
    {
      id: 'r3',
      date: 'Jun 28, 2026',
      version: 'v3',
      score: 72,
      changes: 'Added quantified project metrics, improved formatting',
    },
    {
      id: 'r2',
      date: 'May 15, 2026',
      version: 'v2',
      score: 58,
      changes: 'Added skills section, restructured experience',
    },
    {
      id: 'r1',
      date: 'Apr 02, 2026',
      version: 'v1',
      score: 45,
      changes: 'Initial upload, basic template',
    },
  ],
};
