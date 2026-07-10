export const placementStats = {
  totalStudents: 248,
  placementReady: 186,
  totalApplications: 1240,
  activeOpportunities: 37,
};

export const departmentPerformance = [
  { department: 'Computer Science', placed: 78, total: 92, color: 'bg-primary' },
  { department: 'Electronics', placed: 54, total: 68, color: 'bg-secondary' },
  { department: 'Mechanical', placed: 32, total: 48, color: 'bg-success' },
  { department: 'Civil', placed: 14, total: 24, color: 'bg-warning' },
  { department: 'Information Tech', placed: 8, total: 16, color: 'bg-destructive' },
];

export const placementTrend = [
  { month: 'Jan', value: 12 },
  { month: 'Feb', value: 18 },
  { month: 'Mar', value: 24 },
  { month: 'Apr', value: 31 },
  { month: 'May', value: 28 },
  { month: 'Jun', value: 42 },
  { month: 'Jul', value: 51 },
];

export const quickActions = [
  { id: 'qa1', label: 'Post Opportunity', icon: 'Briefcase', description: 'Add a new job or internship' },
  { id: 'qa2', label: 'Schedule Drive', icon: 'CalendarPlus', description: 'Plan a campus placement drive' },
  { id: 'qa3', label: 'Send Announcement', icon: 'Megaphone', description: 'Notify students instantly' },
  { id: 'qa4', label: 'Generate Report', icon: 'FileBarChart', description: 'Export placement statistics' },
];

export const recentActivities = [
  {
    id: 'ra1',
    text: 'Priya Sharma placed at Google as SWE Intern',
    timestamp: '2026-07-10T09:30:00',
    type: 'placed',
  },
  {
    id: 'ra2',
    text: 'New opportunity posted: Razorpay Full-Stack Engineer',
    timestamp: '2026-07-10T08:15:00',
    type: 'opportunity',
  },
  {
    id: 'ra3',
    text: 'Microsoft campus drive scheduled for July 18',
    timestamp: '2026-07-10T07:00:00',
    type: 'drive',
  },
  {
    id: 'ra4',
    text: '12 students shortlisted for Swiggy backend interview',
    timestamp: '2026-07-09T16:45:00',
    type: 'shortlist',
  },
  {
    id: 'ra5',
    text: 'Resume analysis batch completed for 24 students',
    timestamp: '2026-07-09T14:20:00',
    type: 'resume',
  },
  {
    id: 'ra6',
    text: 'Arjun Mehta placed at Razorpay as Full-Stack Engineer',
    timestamp: '2026-07-09T11:10:00',
    type: 'placed',
  },
];

export const recentNotifications = [
  {
    id: 'rn1',
    title: 'Deadline approaching',
    description: 'Google SWE Intern application closes in 10 days',
    timestamp: '2026-07-10T08:00:00',
    type: 'deadline',
    read: false,
  },
  {
    id: 'rn2',
    title: 'Placement announcement',
    description: 'Microsoft visiting campus on July 18 — register students now',
    timestamp: '2026-07-10T06:30:00',
    type: 'announcement',
    read: false,
  },
  {
    id: 'rn3',
    title: 'New opportunity match',
    description: 'Zomato Frontend Engineer — 15 students matched above 80%',
    timestamp: '2026-07-09T15:00:00',
    type: 'opportunity',
    read: true,
  },
  {
    id: 'rn4',
    title: 'AI Recommendation',
    description: '8 students need resume improvements before placement season',
    timestamp: '2026-07-09T10:45:00',
    type: 'ai',
    read: true,
  },
];
