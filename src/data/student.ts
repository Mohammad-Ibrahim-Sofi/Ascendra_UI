import type { Student } from '@/types';

export const student: Student = {
  id: 'stu_001',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@university.edu',
  avatar: 'https://images.pexels.com/photos/220817/pexels-photo-220817.jpeg?auto=compress&cs=tinysrgb&w=200',
  university: 'Indian Institute of Technology, Delhi',
  major: 'Computer Science & Engineering',
  year: '3rd Year',
  cgpa: 8.7,
  careerReadiness: 78,
  resumeScore: 72,
  applications: 14,
  upcomingDeadlines: 3,
  skills: [
    { name: 'JavaScript', level: 85, category: 'Programming' },
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'TypeScript', level: 75, category: 'Programming' },
    { name: 'Python', level: 70, category: 'Programming' },
    { name: 'Data Structures', level: 78, category: 'CS Fundamentals' },
    { name: 'System Design', level: 45, category: 'Architecture' },
    { name: 'SQL', level: 65, category: 'Database' },
    { name: 'Machine Learning', level: 40, category: 'AI/ML' },
  ],
  interests: ['Software Engineering', 'Full-Stack Development', 'AI/ML', 'Product Management'],
  resumeStatus: 'uploaded',
};
