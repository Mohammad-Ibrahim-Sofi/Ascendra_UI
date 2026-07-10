import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  FileText,
  Briefcase,
  CalendarClock,
  ArrowRight,
  Bot,
  Target,
  Award,
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  Eye,
} from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { ScoreRing } from '@/components/shared/ScoreRing';
import { PageTransition } from '@/components/shared/PageTransition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { student } from '@/data/student';
import { opportunities } from '@/data/opportunities';
import { notifications } from '@/data/notifications';
import { skillGaps } from '@/data/skillGap';

const upcomingDeadlines = [
  { id: 'd1', title: 'MLH Global Hack Week', date: 'Jul 15', type: 'Hackathon', daysLeft: 6 },
  { id: 'd2', title: 'Google SWE Intern', date: 'Jul 20', type: 'Internship', daysLeft: 11 },
  { id: 'd3', title: 'Devpost Hackathon', date: 'Jul 22', type: 'Hackathon', daysLeft: 13 },
];

const weeklyActivity = [
  { day: 'Mon', value: 3 },
  { day: 'Tue', value: 5 },
  { day: 'Wed', value: 2 },
  { day: 'Thu', value: 7 },
  { day: 'Fri', value: 4 },
  { day: 'Sat', value: 6 },
  { day: 'Sun', value: 3 },
];

const aiInsights = [
  { icon: TrendingUp, text: 'Your career readiness improved by 8% this week', color: 'text-success' },
  { icon: Target, text: 'Focus on System Design — your biggest skill gap', color: 'text-warning' },
  { icon: Briefcase, text: '3 new high-match opportunities available', color: 'text-primary' },
];

const applicationStages = [
  { label: 'Applied', count: 14, color: 'bg-primary' },
  { label: 'Reviewed', count: 8, color: 'bg-secondary' },
  { label: 'Interview', count: 4, color: 'bg-warning' },
  { label: 'Offer', count: 1, color: 'bg-success' },
];

export default function Dashboard() {
  const topOpportunities = opportunities.slice(0, 4);
  const topSkillGaps = skillGaps.slice(0, 3);
  const maxActivity = Math.max(...weeklyActivity.map((a) => a.value));

  return (
    <PageTransition>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
          Welcome back, {student.name.split(' ')[0]}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Here's your placement progress overview for today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Career Readiness"
          value={`${student.careerReadiness}%`}
          icon={TrendingUp}
          trend={{ value: '+8%', positive: true }}
          delay={0}
        />
        <StatCard
          title="Resume Score"
          value={`${student.resumeScore}/100`}
          icon={FileText}
          trend={{ value: '+14%', positive: true }}
          delay={0.05}
        />
        <StatCard
          title="Applications"
          value={student.applications}
          icon={Briefcase}
          trend={{ value: '+3', positive: true }}
          delay={0.1}
        />
        <StatCard
          title="Upcoming Deadlines"
          value={student.upcomingDeadlines}
          icon={CalendarClock}
          delay={0.15}
        />
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Career Readiness Score */}
        <Card className="p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Readiness Score</h2>
            <Badge variant="success" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              Improving
            </Badge>
          </div>
          <div className="flex flex-col items-center">
            <ScoreRing value={student.careerReadiness} size={140} label="out of 100" />
            <div className="mt-6 w-full space-y-3">
              {[
                { label: 'Technical Skills', value: 85, color: 'bg-primary' },
                { label: 'Resume Quality', value: 72, color: 'bg-secondary' },
                { label: 'Interview Prep', value: 65, color: 'bg-success' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-foreground font-medium tabular-nums">{item.value}%</span>
                  </div>
                  <Progress value={item.value} indicatorClassName={item.color} />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Opportunities */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Recent Opportunities</h2>
            <Link to="/opportunities">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <div className="space-y-2.5">
            {topOpportunities.map((opp, i) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-lg border border-subtle p-3 hover:border-white/15 hover:bg-white/[0.02] transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-subtle overflow-hidden shrink-0">
                  <img
                    src={opp.logo}
                    alt={opp.company}
                    className="h-6 w-6 object-contain"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{opp.role}</p>
                  <p className="text-xs text-muted-foreground">{opp.company} · {opp.location}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold tabular-nums ${opp.matchPercent >= 80 ? 'text-success' : opp.matchPercent >= 60 ? 'text-warning' : 'text-destructive'}`}>
                    {opp.matchPercent}%
                  </p>
                  <p className="text-xs text-muted-foreground">match</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Insights + Weekly Activity */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* AI Insights */}
        <Card className="p-6 lg:col-span-2 border-primary/15">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-blue">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">AI Insights</h2>
            <Badge variant="default" className="ml-auto text-xs">Updated 2h ago</Badge>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-start gap-3 rounded-lg border border-subtle p-3.5 hover:border-white/15 transition-colors"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 ${insight.color}`}>
                  <insight.icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-foreground pt-1">{insight.text}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Weekly Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Weekly Activity</h2>
            <Badge variant="outline" className="text-xs">This week</Badge>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyActivity.map((day, i) => (
              <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.value / maxActivity) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                    className={`w-full max-w-[24px] rounded-t-md ${day.value >= 5 ? 'bg-gradient-blue' : 'bg-white/10'}`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Upcoming Deadlines */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Deadlines</h2>
            <CalendarClock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((d) => (
              <div key={d.id} className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <span className="text-[10px] leading-none">{d.date.split(' ')[0]}</span>
                  <span className="font-heading text-sm font-bold leading-none">{d.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.type}</p>
                </div>
                <span className={`text-xs font-medium tabular-nums ${d.daysLeft <= 7 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {d.daysLeft}d
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Application Progress */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Applications</h2>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {applicationStages.map((stage, i) => (
              <div key={stage.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                    <span className="text-muted-foreground">{stage.label}</span>
                  </div>
                  <span className="text-foreground font-medium tabular-nums">{stage.count}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stage.count / 14) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                    className={`h-1.5 rounded-full ${stage.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Skill Progress */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Skill Progress</h2>
            <Link to="/skill-gap">
              <Button variant="ghost" size="sm" className="text-primary">
                Details
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {topSkillGaps.map((skill) => (
              <div key={skill.skill}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-foreground font-medium">{skill.skill}</span>
                  <span className="text-muted-foreground tabular-nums">{skill.current}/{skill.required}%</span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-white/5">
                  <div
                    className="absolute h-2 rounded-full bg-destructive/40"
                    style={{ width: `${skill.required}%` }}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.current}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute h-2 rounded-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Mentor CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-5"
      >
        <Card className="relative overflow-hidden border-primary/20 p-6">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-[60px]" />
          <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-blue">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">Ask your AI Mentor</h3>
                <p className="text-sm text-muted-foreground">Get personalized career guidance instantly</p>
              </div>
            </div>
            <Link to="/mentor">
              <Button variant="gradient" size="lg">
                Start Chat
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </PageTransition>
  );
}
