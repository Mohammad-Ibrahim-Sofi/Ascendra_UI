import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, X } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { NotificationCard } from '@/components/shared/NotificationCard';
import { LoadingSkeleton, EmptyState } from '@/components/shared/LoadingSkeleton';
import { Button } from '@/components/ui/button';
import { notifications as allNotifications } from '@/data/notifications';
import type { Notification } from '@/types';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'unread';
type GroupKey = 'today' | 'yesterday' | 'earlier';

const groupLabels: Record<GroupKey, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  earlier: 'Earlier',
};

function getGroupKey(timestamp: string): GroupKey {
  const date = new Date(timestamp);
  const now = new Date('2026-07-10T12:00:00');
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  if (date >= startOfToday) return 'today';
  if (date >= startOfYesterday) return 'yesterday';
  return 'earlier';
}

function NotificationCardSkeleton() {
  return (
    <div className="flex gap-3 rounded-xl border border-subtle bg-card p-4">
      <LoadingSkeleton className="h-10 w-10 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <LoadingSkeleton className="h-4 w-48" />
          <LoadingSkeleton className="h-3 w-12" />
        </div>
        <LoadingSkeleton className="h-3 w-full" />
        <LoadingSkeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const filtered = useMemo(() => {
    if (filter === 'unread') return notifications.filter((n) => !n.read);
    return notifications;
  }, [notifications, filter]);

  const grouped = useMemo(() => {
    const groups: Record<GroupKey, Notification[]> = { today: [], yesterday: [], earlier: [] };
    for (const n of filtered) {
      groups[getGroupKey(n.timestamp)].push(n);
    }
    return groups;
  }, [filtered]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const hasAnyUnread = unreadCount > 0;
  const groupOrder: GroupKey[] = ['today', 'yesterday', 'earlier'];

  return (
    <PageTransition>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {hasAnyUnread ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You\'re all caught up'}
          </p>
        </div>
        {hasAnyUnread && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {(['all', 'unread'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors',
              filter === f
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-subtle text-muted-foreground hover:border-white/20 hover:text-foreground'
            )}
          >
            {f === 'all' ? 'All' : 'Unread'}
            {f === 'unread' && unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground tabular-nums">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <NotificationCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title={filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          description={
            filter === 'unread'
              ? 'You\'ve read everything. New notifications about opportunities, deadlines, and announcements will appear here.'
              : 'When you get new opportunity matches, deadline reminders, or placement announcements, they\'ll show up here.'
          }
          actionLabel={filter === 'unread' ? 'View all' : undefined}
          onAction={filter === 'unread' ? () => setFilter('all') : undefined}
        />
      ) : (
        <div className="space-y-8">
          {groupOrder.map((group) => {
            const items = grouped[group];
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <div className="mb-3 flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-foreground">{groupLabels[group]}</h2>
                  <span className="text-xs text-muted-foreground tabular-nums">({items.length})</span>
                  <div className="ml-2 h-px flex-1 bg-subtle" />
                </div>
                <div className="space-y-3">
                  {items.map((n, i) => (
                    <NotificationCard
                      key={n.id}
                      notification={n}
                      delay={i * 0.04}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageTransition>
  );
}
