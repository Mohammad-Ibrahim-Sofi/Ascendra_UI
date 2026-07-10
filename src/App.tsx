import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OfficerLayout } from '@/components/layout/OfficerLayout';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Resume from '@/pages/Resume';
import Opportunities from '@/pages/Opportunities';
import Applications from '@/pages/Applications';
import SkillGap from '@/pages/SkillGap';
import Roadmap from '@/pages/Roadmap';
import Mentor from '@/pages/Mentor';
import Notifications from '@/pages/Notifications';
import OfficerDashboard from '@/pages/officer/Dashboard';
import OfficerStudents from '@/pages/officer/Students';
import OfficerOpportunities from '@/pages/officer/Opportunities';
import OfficerAnalytics from '@/pages/officer/Analytics';
import OfficerReports from '@/pages/officer/Reports';
import OfficerNotifications from '@/pages/officer/Notifications';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/skill-gap" element={<SkillGap />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      {/* Placement Officer */}
      <Route element={<OfficerLayout />}>
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        <Route path="/officer/students" element={<OfficerStudents />} />
        <Route path="/officer/opportunities" element={<OfficerOpportunities />} />
        <Route path="/officer/analytics" element={<OfficerAnalytics />} />
        <Route path="/officer/reports" element={<OfficerReports />} />
        <Route path="/officer/notifications" element={<OfficerNotifications />} />
      </Route>
    </Routes>
  );
}
