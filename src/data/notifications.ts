import type { Notification } from '@/types';

export const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'New opportunity match',
    description: 'Zomato Frontend Engineer — 91% match with your skills',
    time: '2h ago',
    type: 'opportunity',
    read: false,
  },
  {
    id: 'n2',
    title: 'Deadline approaching',
    description: 'MLH Global Hack Week — AI Edition closes in 6 days',
    time: '5h ago',
    type: 'deadline',
    read: false,
  },
  {
    id: 'n3',
    title: 'Resume score improved',
    description: 'Your resume score increased from 58 to 72 points',
    time: '1d ago',
    type: 'achievement',
    read: false,
  },
  {
    id: 'n4',
    title: 'Mentor suggestion',
    description: 'New learning resources available for System Design',
    time: '2d ago',
    type: 'mentor',
    read: true,
  },
  {
    id: 'n5',
    title: 'Application status update',
    description: 'Razorpay reviewed your application — shortlisted',
    time: '3d ago',
    type: 'opportunity',
    read: true,
  },
];
