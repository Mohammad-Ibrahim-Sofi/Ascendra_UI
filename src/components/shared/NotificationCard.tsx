import { motion } from 'framer-motion';
import {
  Briefcase,
  Clock,
  FileText,
  Sparkles,
  Megaphone,
  Check,
} from 'lucide-react';
import type { Notification, NotificationType } from '@/types';
import { cn } from '@/lib/utils';

export const notificationConfig: Record<
  NotificationType,
  { icon: typeof Briefcase; color: string; bg: string; label: string }
> = {
  opportunity: { icon: Briefcase, color: 'text-primary', bg: 'bg-primary/10', label: 'New Opportunity' },
  deadline: { icon: Clock, color: 'text-warning', bg: 'bg-warning/10', label: 'Deadline Reminder' },
  resume: { icon: FileText, color: 'text-secondary', bg: 'bg-secondary/10', label: 'Resume Analysis' },
  ai: { icon: Sparkles, color: 'text-success', bg: 'bg-success/10', label: 'AI Recommendation' },
  announcement: { icon: Megaphone, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Placement Announcement' },
};

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date('2026-07-10T12:00:00');
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return 'Yesterday';
  if (diffD < 7) return `${diffD}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface NotificationCardProps {
  notification: Notification;
  delay?: number;
  onMarkAsRead: (id: string) => void;
}

export function NotificationCard({ notification, delay = 0, onMarkAsRead }: NotificationCardProps) {
  const config = notificationConfig[notification.type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay }}
      whileHover={{ x: 2 }}
      className={cn(
        'group relative flex gap-3 rounded-xl border p-4 transition-colors',
        notification.read
          ? 'border-subtle bg-card'
          : 'border-primary/20 bg-primary/5 hover:border-primary/30'
      )}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
      )}

      {/* Icon */}
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', config.bg)}>
        <Icon className={cn('h-5 w-5', config.color)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className={cn('text-sm font-medium', notification.read ? 'text-foreground' : 'text-foreground')}>
              {notification.title}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {formatTime(notification.timestamp)}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <span className={cn('text-xs font-medium', config.color)}>{config.label}</span>
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Check className="h-3.5 w-3.5" />
              Mark as read
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
