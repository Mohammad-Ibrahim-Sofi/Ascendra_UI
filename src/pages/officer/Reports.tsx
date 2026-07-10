import { motion } from 'framer-motion';
import { FileBarChart, Download, Calendar, FileText, TrendingUp, Award } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/shared/StatCard';
import { placementStats } from '@/data/placement';

interface Report {
  id: string;
  title: string;
  type: 'Monthly' | 'Quarterly' | 'Department' | 'Recruiter';
  period: string;
  date: string;
  status: 'ready' | 'generating';
}

const mockReports: Report[] = [
  { id: 'r1', title: 'July 2026 Placement Report', type: 'Monthly', period: 'Jul 2026', date: 'Jul 10, 2026', status: 'ready' },
  { id: 'r2', title: 'Q2 2026 Performance Summary', type: 'Quarterly', period: 'Apr-Jun 2026', date: 'Jul 05, 2026', status: 'ready' },
  { id: 'r3', title: 'Computer Science Department Report', type: 'Department', period: 'Jan-Jul 2026', date: 'Jul 01, 2026', status: 'ready' },
  { id: 'r4', title: 'Top Recruiters Analysis', type: 'Recruiter', period: '2026', date: 'Jun 28, 2026', status: 'ready' },
  { id: 'r5', title: 'June 2026 Placement Report', type: 'Monthly', period: 'Jun 2026', date: 'Jul 01, 2026', status: 'ready' },
  { id: 'r6', title: 'August 2026 Placement Report', type: 'Monthly', period: 'Aug 2026', date: '—', status: 'generating' },
];

const reportTypeConfig: Record<string, { icon: typeof FileText; color: string; bg: string }> = {
  Monthly: { icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
  Quarterly: { icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10' },
  Department: { icon: FileText, color: 'text-success', bg: 'bg-success/10' },
  Recruiter: { icon: Award, color: 'text-warning', bg: 'bg-warning/10' },
};

export default function OfficerReports() {
  const ready = mockReports.filter((r) => r.status === 'ready').length;
  const placementRate = Math.round((placementStats.placementReady / placementStats.totalStudents) * 100);

  return (
    <PageTransition>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Reports</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Generate and download placement reports.</p>
        </div>
        <Button variant="gradient" size="sm">
          <FileBarChart className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Reports" value={mockReports.length} icon={FileText} delay={0} />
        <StatCard title="Ready to Download" value={ready} icon={Download} delay={0.05} />
        <StatCard title="Placement Rate" value={`${placementRate}%`} icon={TrendingUp} delay={0.1} />
        <StatCard title="This Quarter" value={3} icon={Calendar} delay={0.15} />
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-lg font-semibold text-foreground">Available Reports</h2>
          <Badge variant="outline" className="text-xs">{ready} ready</Badge>
        </div>
        <div className="space-y-2.5">
          {mockReports.map((report, i) => {
            const config = reportTypeConfig[report.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-lg border border-subtle p-3 hover:border-white/15 hover:bg-white/[0.02] transition-all"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.bg} shrink-0`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{report.title}</p>
                  <p className="text-xs text-muted-foreground">{report.type} · {report.period}</p>
                </div>
                <span className="hidden sm:block text-xs text-muted-foreground">{report.date}</span>
                {report.status === 'ready' ? (
                  <Button variant="outline" size="sm" className="shrink-0">
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download
                  </Button>
                ) : (
                  <Badge variant="warning" className="shrink-0 gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning-foreground" />
                    Generating
                  </Badge>
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>
    </PageTransition>
  );
}
