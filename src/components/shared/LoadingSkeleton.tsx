import { cn } from '@/lib/utils';

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'shimmer animate-pulse rounded-lg bg-white/5',
        className
      )}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-subtle bg-card p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-7 w-16" />
        </div>
        <LoadingSkeleton className="h-10 w-10 rounded-lg" />
      </div>
      <LoadingSkeleton className="mt-4 h-3 w-20" />
    </div>
  );
}

export function OpportunityCardSkeleton() {
  return (
    <div className="rounded-xl border border-subtle bg-card p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <LoadingSkeleton className="h-11 w-11 rounded-lg" />
          <div className="space-y-2">
            <LoadingSkeleton className="h-4 w-32" />
            <LoadingSkeleton className="h-3 w-20" />
          </div>
        </div>
        <LoadingSkeleton className="h-12 w-14 rounded-lg" />
      </div>
      <div className="mt-4 space-y-2">
        <LoadingSkeleton className="h-3 w-40" />
        <LoadingSkeleton className="h-3 w-28" />
      </div>
      <div className="mt-4 flex gap-1.5">
        <LoadingSkeleton className="h-5 w-16 rounded-full" />
        <LoadingSkeleton className="h-5 w-20 rounded-full" />
        <LoadingSkeleton className="h-5 w-14 rounded-full" />
      </div>
      <div className="mt-5 flex gap-2">
        <LoadingSkeleton className="h-9 flex-1" />
        <LoadingSkeleton className="h-9 w-9" />
      </div>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-subtle p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-muted-foreground mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
