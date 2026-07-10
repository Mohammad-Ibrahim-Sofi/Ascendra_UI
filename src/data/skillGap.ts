import type { SkillGap } from '@/types';

export const skillGaps: SkillGap[] = [
  {
    skill: 'System Design',
    current: 45,
    required: 80,
    category: 'Architecture',
    recommendation:
      'Study scalable system architecture, load balancing, and database sharding. Recommended: "Designing Data-Intensive Applications" + System Design Primer (GitHub).',
  },
  {
    skill: 'Machine Learning',
    current: 40,
    required: 70,
    category: 'AI/ML',
    recommendation:
      'Start with Andrew Ng\'s ML specialization, then build 2-3 hands-on projects using scikit-learn and TensorFlow.',
  },
  {
    skill: 'Node.js',
    current: 35,
    required: 75,
    category: 'Backend',
    recommendation:
      'Build REST APIs with Express, learn async patterns, and deploy a full-stack project. Target: 2 backend projects in 6 weeks.',
  },
  {
    skill: 'Java',
    current: 30,
    required: 65,
    category: 'Programming',
    recommendation:
      'Java is required for many enterprise roles. Learn core Java, OOP, collections, and Spring Boot basics.',
  },
  {
    skill: 'Cloud (AWS)',
    current: 25,
    required: 60,
    category: 'DevOps',
    recommendation:
      'Get AWS Cloud Practitioner certified. Learn EC2, S3, Lambda, and deploy a project to AWS Free Tier.',
  },
];
