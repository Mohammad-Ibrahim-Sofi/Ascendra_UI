import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  className?: string;
  delay?: number;
}

function AnimatedValue({ value }: { value: string | number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState<string>('0');

  useEffect(() => {
    if (!inView) return;
    const str = String(value);
    const num = parseInt(str.replace(/[^0-9]/g, ''), 10);
    if (isNaN(num)) {
      setDisplay(str);
      return;
    }
    const suffix = str.replace(/[0-9]/g, '');
    const duration = 800;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(num * eased) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export function StatCard({ title, value, icon: Icon, trend, className, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
    >
      <Card className={cn('p-5 hover:border-white/15 hover:shadow-card-hover', className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="font-heading text-2xl font-bold text-foreground tabular-nums">
              <AnimatedValue value={value} />
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {trend && (
          <div className="mt-3 flex items-center gap-1.5">
            <span
              className={cn(
                'text-xs font-medium tabular-nums',
                trend.positive ? 'text-success' : 'text-destructive'
              )}
            >
              {trend.positive ? '+' : ''}
              {trend.value}
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
