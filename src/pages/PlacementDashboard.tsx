import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  GraduationCap,
  Briefcase,
  Building2,
  ArrowRight,
  CalendarPlus,
  Megaphone,
  FileBarChart,
  CheckCircle2,
  Clock,
  Bell,
  TrendingUp,
  Sparkles,
  Award,
  UserCheck,
} from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { StatCardSkeleton } from '@/components/shared/LoadingSkeleton';
import { PageTransition } from '@/components/shared/PageTransition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  placementStats,
  departmentPerformance,
  placementTrend,
  quickActions,
  recentActivities,
  recentNotifications,
} from '@/data/placement';
import { notificationConfig } from '@/components/shared/NotificationCard';
import { cn } from '@/lib/utils';

const actionIcons: Record<string, typeof Briefcase> = {
  Briefcase,
  CalendarPlus,
  Megaphone,
  FileBarChart,
};

const activityConfig: Record<string, { icon: typeof Briefcase; color: string; bg: string }> = {
  placed: { icon: Award, color: 'text-success', bg: 'bg-success/10' },
  opportunity: { icon: Briefcase, color: 'text-primary', bg: 'bg-primary/10' },
  drive: { icon: CalendarPlus, color: 'text-secondary', bg: 'bg-secondary/10' },
  shortlist: { icon: UserCheck, color: 'text-warning', bg: 'bg-warning/10' },
  resume: { icon: FileBarChart, color: 'text-primary', bg: 'bg-primary/10' },
};

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date('2026-07-10T12:00:00');
  const diffH = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  if (diffH < 1) return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

export default function PlacementDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const placementRate = Math.round((placementStats.placementReady / placementStats.totalStudents) * 100);
  const maxTrend = Math.max(...placementTrend.map((t) => t.value));
  const unreadCount = useMemo(() => recentNotifications.filter((n) => !n.read).length, []);

  return (
    <PageTransition>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="mb-2 gap-1">
            <Building2 className="h-3 w-3" />
            Placement Officer
          </Badge>
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
          Placement Overview
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Monitor student placements, opportunities, and campus drives in real time.
        </p>
      </div>

      {/* Stat Cards */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value={placementStats.totalStudents}
            icon={Users}
            trend={{ value: '+12', positive: true }}
            delay={0}
          />
          <StatCard
            title="Placement Ready"
            value={placementStats.placementReady}
            icon={GraduationCap}
            trend={{ value: '+8%', positive: true }}
            delay={0.05}
          />
          <StatCard
            title="Applications"
            value={placementStats.totalApplications}
            icon={Briefcase}
            trend={{ value: '+124', positive: true }}
            delay={0.1}
          />
          <StatCard
            title="Active Opportunities"
            value={placementStats.activeOpportunities}
            icon={Building2}
            trend={{ value: '+5', positive: true }}
            delay={0.15}
          />
        </div>
      )}

      {/* Main Grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Department Performance */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Department Performance</h2>
            <Badge variant="outline" className="text-xs">Placement Rate</Badge>
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

        {/* Placement Trend Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Placement Trend</h2>
            <Badge variant="success" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +18%
            </Badge>
          </div>
          <div className="flex items-end justify-between gap-2 h-36">
            {placementTrend.map((m, i) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.value / maxTrend) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                    className={cn(
                      'w-full max-w-[24px] rounded-t-md',
                      m.value >= 40 ? 'bg-gradient-blue' : 'bg-white/10'
                    )}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-subtle p-3">
            <div>
              <p className="text-xs text-muted-foreground">Overall Placement Rate</p>
              <p className="font-heading text-xl font-bold text-foreground tabular-nums">{placementRate}%</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions + Recent Activities */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Quick Actions</h2>
            <Sparkles className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => {
              const Icon = actionIcons[action.icon];
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileHover={{ y: -2 }}
                  className="group flex flex-col items-start gap-2 rounded-lg border border-subtle bg-card p-4 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Recent Activities</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="space-y-1">
            {recentActivities.map((activity, i) => {
              const config = activityConfig[activity.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', config.bg)}>
                    <Icon className={cn('h-4 w-4', config.color)} />
                  </div>
                  <p className="flex-1 text-sm text-foreground">{activity.text}</p>
                  <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                    {formatTime(activity.timestamp)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent Notifications */}
      <div className="mt-5">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-lg font-semibold text-foreground">Recent Notifications</h2>
              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground tabular-nums">
                  {unreadCount}
                </span>
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="space-y-2.5">
            {recentNotifications.map((n, i) => {
              const config = notificationConfig[n.type as keyof typeof notificationConfig];
              const Icon = config.icon;
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border p-3.5 transition-colors',
                    n.read
                      ? 'border-subtle bg-card'
                      : 'border-primary/20 bg-primary/5'
                  )}
                >
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', config.bg)}>
                    <Icon className={cn('h-4 w-4', config.color)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                        {formatTime(n.timestamp)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{n.description}</p>
                  </div>
                  {!n.read && <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
