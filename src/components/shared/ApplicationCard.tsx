import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Application, ApplicationStatus } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const statusConfig: Record<
  ApplicationStatus,
  { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' }
> = {
  saved: { label: 'Saved', variant: 'outline' },
  applied: { label: 'Applied', variant: 'default' },
  'under-review': { label: 'Under Review', variant: 'secondary' },
  interview: { label: 'Interview', variant: 'warning' },
  selected: { label: 'Selected', variant: 'success' },
  rejected: { label: 'Rejected', variant: 'destructive' },
};

function formatDate(date: string): string {
  if (!date) return 'Not applied';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDaysLeft(deadline: string): number {
  return Math.max(0, Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

interface ApplicationCardProps {
  application: Application;
  delay?: number;
  onViewDetails: (app: Application) => void;
}

export function ApplicationCard({ application, delay = 0, onViewDetails }: ApplicationCardProps) {
  const config = statusConfig[application.status];
  const daysLeft = getDaysLeft(application.deadline);
  const completedSteps = application.timeline.filter((t) => t.done).length;
  const totalSteps = application.timeline.length;
  const matchColor =
    application.matchPercent >= 80
      ? 'text-success'
      : application.matchPercent >= 60
      ? 'text-warning'
      : 'text-destructive';
  const matchBg =
    application.matchPercent >= 80
      ? 'bg-success/10'
      : application.matchPercent >= 60
      ? 'bg-warning/10'
      : 'bg-destructive/10';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -3 }}
    >
      <Card className="group flex flex-col p-5 hover:border-white/15 hover:shadow-card-hover">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 border border-subtle overflow-hidden shrink-0">
              <img
                src={application.logo}
                alt={application.company}
                className="h-7 w-7 object-contain"
                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading font-semibold text-foreground leading-tight truncate">
                {application.role}
              </h3>
              <p className="text-sm text-muted-foreground truncate">{application.company}</p>
            </div>
          </div>
          <div className={cn('flex flex-col items-center rounded-lg px-2.5 py-1.5 shrink-0', matchBg)}>
            <span className={cn('font-heading text-lg font-bold leading-none tabular-nums', matchColor)}>
              {application.matchPercent}%
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5">match</span>
          </div>
        </div>

        {/* Status + Dates */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant={config.variant} className="text-xs">{config.label}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {application.appliedDate ? `Applied ${formatDate(application.appliedDate)}` : 'Not yet applied'}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <Clock className={cn('h-3.5 w-3.5', daysLeft <= 7 ? 'text-destructive' : 'text-muted-foreground')} />
          <span className={cn(daysLeft <= 7 ? 'text-destructive font-medium' : 'text-muted-foreground')}>
            {daysLeft === 0 ? 'Deadline today' : daysLeft === 1 ? '1 day left' : `${daysLeft} days left`}
          </span>
        </div>

        {/* Mini Timeline */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium tabular-nums">{completedSteps}/{totalSteps}</span>
          </div>
          <div className="flex gap-1">
            {application.timeline.map((event) => (
              <div
                key={event.id}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  event.done ? 'bg-primary' : 'bg-white/5'
                )}
              />
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="mt-5">
          <Button
            size="sm"
            variant="outline"
            className="w-full group-hover:border-primary/40"
            onClick={() => onViewDetails(application)}
          >
            View Details
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
