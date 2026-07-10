import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bookmark, ArrowRight, Clock, Wifi } from 'lucide-react';
import type { Opportunity } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const typeBadge: Record<Opportunity['type'], { label: string; variant: 'default' | 'secondary' | 'warning' | 'success' }> = {
  internship: { label: 'Internship', variant: 'default' },
  job: { label: 'Full-time', variant: 'secondary' },
  hackathon: { label: 'Hackathon', variant: 'warning' },
  scholarship: { label: 'Scholarship', variant: 'success' },
};

function getDaysLeft(deadline: string): number {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function OpportunityCard({ opportunity, delay = 0 }: { opportunity: Opportunity; delay?: number }) {
  const [saved, setSaved] = useState(false);
  const daysLeft = getDaysLeft(opportunity.deadline);
  const isRemote = opportunity.location.toLowerCase() === 'remote';
  const badge = typeBadge[opportunity.type];

  const matchColor =
    opportunity.matchPercent >= 80
      ? 'text-success'
      : opportunity.matchPercent >= 60
      ? 'text-warning'
      : 'text-destructive';

  const matchBg =
    opportunity.matchPercent >= 80
      ? 'bg-success/10'
      : opportunity.matchPercent >= 60
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
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 border border-subtle overflow-hidden shrink-0">
              <img
                src={opportunity.logo}
                alt={opportunity.company}
                className="h-7 w-7 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-heading font-semibold text-foreground leading-tight truncate">{opportunity.role}</h3>
              <p className="text-sm text-muted-foreground truncate">{opportunity.company}</p>
            </div>
          </div>
          <div className={cn('flex flex-col items-center rounded-lg px-2.5 py-1.5 shrink-0', matchBg)}>
            <span className={cn('font-heading text-lg font-bold leading-none tabular-nums', matchColor)}>
              {opportunity.matchPercent}%
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5">match</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant={badge.variant} className="text-xs">{badge.label}</Badge>
          {isRemote && (
            <Badge variant="outline" className="text-xs gap-1">
              <Wifi className="h-3 w-3" />
              Remote
            </Badge>
          )}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {opportunity.location}
          </span>
          {opportunity.salary && (
            <span className="text-xs text-foreground font-medium">{opportunity.salary}</span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <Clock className={cn('h-3.5 w-3.5', daysLeft <= 7 ? 'text-destructive' : 'text-muted-foreground')} />
          <span className={cn(daysLeft <= 7 ? 'text-destructive font-medium' : 'text-muted-foreground')}>
            {daysLeft === 0 ? 'Closes today' : daysLeft === 1 ? '1 day left' : `${daysLeft} days left`}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">Required Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {opportunity.requiredSkills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {opportunity.missingSkills.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">Missing Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.missingSkills.map((skill) => (
                <Badge key={skill} variant="destructive" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center gap-2">
          <Button size="sm" className="flex-1 group-hover:shadow-glow">
            Quick Apply
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            aria-label={saved ? 'Unsave opportunity' : 'Save opportunity'}
            onClick={() => setSaved(!saved)}
            className={cn(saved && 'text-primary border-primary/30 bg-primary/5')}
          >
            <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
