import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { recentNotifications } from '@/data/placement';
import { cn } from '@/lib/utils';

const officer = {
  name: 'Dr. Rajesh Kumar',
  role: 'Placement Officer',
  avatar: 'https://i.pravatar.cc/100?img=12',
};

interface OfficerNavbarProps {
  onMenuClick: () => void;
}

export function OfficerNavbar({ onMenuClick }: OfficerNavbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = recentNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-subtle bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden md:block w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students, opportunities, drives..."
            className="h-9 w-full rounded-lg border border-subtle bg-white/5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
            )}
          </Button>
          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-subtle bg-popover p-2 shadow-card-hover"
                >
                  <div className="px-3 py-2 border-b border-subtle">
                    <p className="text-sm font-medium text-foreground">Notifications</p>
                    <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto scrollbar-thin">
                    {recentNotifications.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          'flex gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5 cursor-pointer transition-colors',
                          !n.read && 'bg-primary/5'
                        )}
                      >
                        <div
                          className={cn(
                            'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                            n.read ? 'bg-transparent' : 'bg-primary'
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{n.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{n.description}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{new Date(n.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/5 cursor-pointer transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src={officer.avatar} alt={officer.name} />
            <AvatarFallback>{officer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground leading-tight">{officer.name}</p>
            <p className="text-xs text-muted-foreground">{officer.role}</p>
          </div>
          <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
