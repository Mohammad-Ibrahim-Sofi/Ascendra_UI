import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Calendar, Clock, Target } from 'lucide-react';
import type { Application } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { statusConfig } from '@/components/shared/ApplicationCard';
import { cn } from '@/lib/utils';

function formatDate(date: string): string {
  if (!date || date === '—') return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

interface ApplicationDetailsDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationDetailsDialog({ application, open, onOpenChange }: ApplicationDetailsDialogProps) {
  if (!application) return null;

  const config = statusConfig[application.status];
  const matchColor =
    application.matchPercent >= 80
      ? 'text-success'
      : application.matchPercent >= 60
      ? 'text-warning'
      : 'text-destructive';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-background border-subtle">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 border border-subtle overflow-hidden shrink-0">
              <img
                src={application.logo}
                alt={application.company}
                className="h-8 w-8 object-contain"
                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
              />
            </div>
            <div className="flex-1">
              <DialogTitle className="font-heading text-lg font-bold text-foreground">
                {application.role}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {application.company}
              </DialogDescription>
            </div>
            <Badge variant={config.variant} className="text-xs">{config.label}</Badge>
          </div>
        </DialogHeader>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-subtle bg-card p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Target className="h-3.5 w-3.5" />
              Match
            </div>
            <p className={cn('font-heading text-lg font-bold tabular-nums', matchColor)}>
              {application.matchPercent}%
            </p>
          </div>
          <div className="rounded-lg border border-subtle bg-card p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Calendar className="h-3.5 w-3.5" />
              Applied
            </div>
            <p className="text-sm font-medium text-foreground">{formatDate(application.appliedDate)}</p>
          </div>
          <div className="rounded-lg border border-subtle bg-card p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Clock className="h-3.5 w-3.5" />
              Deadline
            </div>
            <p className="text-sm font-medium text-foreground">{formatDate(application.deadline)}</p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="text-sm font-medium text-foreground mb-4">Application Timeline</p>
          <div className="relative">
            {application.timeline.map((event, index) => {
              const isLast = index === application.timeline.length - 1;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  className="relative flex gap-4 pb-5 last:pb-0"
                >
                  {!isLast && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-px bg-white/10" />
                  )}
                  <div
                    className={cn(
                      'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-background',
                      event.done ? 'bg-primary' : 'bg-white/5'
                    )}
                  >
                    {event.done ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="pt-0.5">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        event.done ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {event.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
