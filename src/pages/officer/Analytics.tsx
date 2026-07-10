import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Award, Target, Building2 } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StatCard } from '@/components/shared/StatCard';
import { departmentPerformance, placementTrend } from '@/data/placement';
import { cn } from '@/lib/utils';

const monthlyComparison = [
  { month: 'Jan', placed: 12, target: 15 },
  { month: 'Feb', placed: 18, target: 18 },
  { month: 'Mar', placed: 24, target: 20 },
  { month: 'Apr', placed: 31, target: 25 },
  { month: 'May', placed: 28, target: 28 },
  { month: 'Jun', placed: 42, target: 32 },
  { month: 'Jul', placed: 51, target: 40 },
];

const topRecruiters = [
  { company: 'Google', logo: 'https://logo.clearbit.com/google.com', hires: 8, color: 'bg-primary' },
  { company: 'Razorpay', logo: 'https://logo.clearbit.com/razorpay.com', hires: 6, color: 'bg-secondary' },
  { company: 'Zomato', logo: 'https://logo.clearbit.com/zomato.com', hires: 5, color: 'bg-success' },
  { company: 'Swiggy', logo: 'https://logo.clearbit.com/swiggy.com', hires: 4, color: 'bg-warning' },
  { company: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', hires: 3, color: 'bg-destructive' },
];

export default function OfficerAnalytics() {
  const maxPlaced = Math.max(...monthlyComparison.map((m) => Math.max(m.placed, m.target)));
  const totalPlaced = monthlyComparison.reduce((sum, m) => sum + m.placed, 0);
  const totalTarget = monthlyComparison.reduce((sum, m) => sum + m.target, 0);
  const achievementRate = Math.round((totalPlaced / totalTarget) * 100);

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Analytics</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Placement analytics and performance insights.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Placed" value={totalPlaced} icon={Award} trend={{ value: '+18%', positive: true }} delay={0} />
        <StatCard title="Target Achievement" value={`${achievementRate}%`} icon={Target} trend={{ value: '+5%', positive: true }} delay={0.05} />
        <StatCard title="Avg per Month" value={Math.round(totalPlaced / 7)} icon={TrendingUp} delay={0.1} />
        <StatCard title="Top Recruiter" value="Google" icon={Building2} delay={0.15} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Placement vs Target Chart */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Placements vs Target</h2>
            <Badge variant="success" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              {achievementRate}%
            </Badge>
          </div>
          <div className="flex items-end justify-between gap-3 h-40">
            {monthlyComparison.map((m, i) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center gap-1 h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.placed / maxPlaced) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                    className="w-full max-w-[16px] rounded-t-md bg-gradient-blue"
                    title={`Placed: ${m.placed}`}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.target / maxPlaced) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.1, ease: 'easeOut' }}
                    className="w-full max-w-[16px] rounded-t-md bg-white/10"
                    title={`Target: ${m.target}`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-sm bg-gradient-blue" />
              <span className="text-xs text-muted-foreground">Placed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-sm bg-white/10" />
              <span className="text-xs text-muted-foreground">Target</span>
            </div>
          </div>
        </Card>

        {/* Top Recruiters */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Top Recruiters</h2>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {topRecruiters.map((r, i) => (
              <motion.div
                key={r.company}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-subtle overflow-hidden shrink-0">
                  <img src={r.logo} alt={r.company} className="h-5 w-5 object-contain" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
                </div>
                <span className="flex-1 text-sm font-medium text-foreground">{r.company}</span>
                <span className="text-sm font-bold text-foreground tabular-nums">{r.hires}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Department Performance Detail */}
      <Card className="mt-5 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-semibold text-foreground">Department-wise Performance</h2>
          <Badge variant="outline" className="text-xs">Current Year</Badge>
        </div>
        <div className="space-y-4">
          {departmentPerformance.map((dept, i) => {
            const rate = Math.round((dept.placed / dept.total) * 100);
            return (
              <motion.div
                key={dept.department}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{dept.department}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {dept.placed}/{dept.total} · <span className="text-foreground font-medium">{rate}%</span>
                  </span>
                </div>
                <div className="relative h-2.5 w-full rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rate}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                    className={cn('absolute h-2.5 rounded-full', dept.color)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </PageTransition>
  );
}
