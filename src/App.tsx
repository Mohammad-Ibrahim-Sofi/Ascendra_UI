import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Resume from '@/pages/Resume';
import Opportunities from '@/pages/Opportunities';
import SkillGap from '@/pages/SkillGap';
import Roadmap from '@/pages/Roadmap';
import Mentor from '@/pages/Mentor';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/skill-gap" element={<SkillGap />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/mentor" element={<Mentor />} />
      </Route>
    </Routes>
  );
}
