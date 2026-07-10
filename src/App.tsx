import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
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
import PlacementDashboard from '@/pages/PlacementDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/placement-dashboard" element={<PlacementDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/skill-gap" element={<SkillGap />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}
