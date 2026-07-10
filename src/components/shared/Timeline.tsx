import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';
import type { RoadmapMilestone } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: 'text-success',
    bg: 'bg-success/10',
    badge: 'success' as const,
    label: 'Completed',
  },
  'in-progress': {
    icon: Clock,
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: 'default' as const,
    label: 'In Progress',
  },
  upcoming: {
    icon: Circle,
    color: 'text-muted-foreground',
    bg: 'bg-white/5',
    badge: 'outline' as const,
    label: 'Upcoming',
  },
};

export function Timeline({ milestones }: { milestones: RoadmapMilestone[] }) {
  return (
    <div className="relative">
      {milestones.map((milestone, index) => {
        const config = statusConfig[milestone.status];
        const Icon = config.icon;
        const isLast = index === milestones.length - 1;
        const isCurrent = milestone.status === 'in-progress';

        return (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative flex gap-5 pb-8 last:pb-0"
          >
            {!isLast && (
              <div className="absolute left-[19px] top-12 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
            )}
            <div
              className={cn(
                'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background',
                config.bg,
                isCurrent && 'ring-2 ring-primary/30 ring-offset-2 ring-offset-background'
              )}
            >
              <Icon className={cn('h-5 w-5', config.color)} />
              {isCurrent && (
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-primary/20"
                />
              )}
            </div>
            <Card className={cn(
              'flex-1 p-5 hover:border-white/15 transition-all',
              isCurrent && 'border-primary/30 shadow-glow'
            )}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-primary">{milestone.semester}</span>
                    <Badge variant={config.badge} className="text-[10px]">
                      {isCurrent && <Sparkles className="mr-1 h-2.5 w-2.5" />}
                      {config.label}
                    </Badge>
                  </div>
                  <h3 className="mt-1.5 font-heading text-lg font-semibold text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{milestone.date}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {milestone.tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2.5 text-sm">
                    {task.done ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className={task.done ? 'text-muted-foreground line-through' : 'text-foreground'}>
                      {task.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
