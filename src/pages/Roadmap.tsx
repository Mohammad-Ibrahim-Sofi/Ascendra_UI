import { motion } from 'framer-motion';
import { Map, CheckCircle2, Clock, Circle, TrendingUp } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { Timeline } from '@/components/shared/Timeline';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { roadmap } from '@/data/roadmap';

export default function Roadmap() {
  const completed = roadmap.filter((m) => m.status === 'completed').length;
  const inProgress = roadmap.filter((m) => m.status === 'in-progress').length;
  const totalTasks = roadmap.reduce((sum, m) => sum + m.tasks.length, 0);
  const completedTasks = roadmap.reduce(
    (sum, m) => sum + m.tasks.filter((t) => t.done).length,
    0
  );
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Career Roadmap</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your semester-wise guide to placement success
        </p>
      </div>

      {/* Progress Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="font-heading text-2xl font-bold text-foreground">{completed} Semesters</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="font-heading text-2xl font-bold text-foreground">{inProgress} Semester</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Circle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming</p>
              <p className="font-heading text-2xl font-bold text-foreground">
                {roadmap.length - completed - inProgress} Semesters
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tasks Done</p>
              <p className="font-heading text-2xl font-bold text-foreground">
                {completedTasks}<span className="text-base text-muted-foreground">/{totalTasks}</span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Overall Progress Bar */}
      <Card className="mt-4 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-lg font-semibold text-foreground">Overall Progress</h2>
          <Badge variant="default">{progress}%</Badge>
        </div>
        <div className="h-3 w-full rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-3 rounded-full bg-gradient-blue"
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {completedTasks} of {totalTasks} milestones completed across {roadmap.length} semesters
        </p>
      </Card>

      {/* Timeline */}
      <div className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-xl font-semibold text-foreground">Semester Timeline</h2>
        </div>
        <Timeline milestones={roadmap} />
      </div>
    </PageTransition>
  );
}
