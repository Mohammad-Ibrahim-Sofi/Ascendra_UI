import { cn } from '@/lib/utils';

export function Logo({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
  };
  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className={cn('relative flex items-center justify-center rounded-xl bg-gradient-blue', sizes[size])}>
        <svg viewBox="0 0 32 32" fill="none" className="h-3/5 w-3/5">
          <path d="M16 5L27 27H21.5L16 14.5L10.5 27H5L16 5Z" fill="white" />
        </svg>
      </div>
      <span className={cn('font-heading font-bold tracking-tight text-foreground', textSizes[size])}>
        Ascendra
        <span className="text-primary"> AI</span>
      </span>
    </div>
  );
}
