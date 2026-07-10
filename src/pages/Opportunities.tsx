import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Briefcase } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { OpportunityCard } from '@/components/shared/OpportunityCard';
import { EmptyState } from '@/components/shared/LoadingSkeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { opportunities } from '@/data/opportunities';
import type { Opportunity } from '@/types';
import { cn } from '@/lib/utils';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'internship', label: 'Internships' },
  { id: 'job', label: 'Jobs' },
  { id: 'hackathon', label: 'Hackathons' },
  { id: 'scholarship', label: 'Scholarships' },
];

const sortOptions = [
  { id: 'match', label: 'Best Match' },
  { id: 'deadline', label: 'Deadline' },
  { id: 'recent', label: 'Most Recent' },
];

export default function Opportunities() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...opportunities];

    if (activeFilter !== 'all') {
      result = result.filter((o) => o.type === activeFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.role.toLowerCase().includes(q) ||
          o.company.toLowerCase().includes(q) ||
          o.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'match') {
      result.sort((a, b) => b.matchPercent - a.matchPercent);
    } else if (sortBy === 'deadline') {
      result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else {
      result.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }

    return result;
  }, [search, activeFilter, sortBy]);

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Opportunities</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length} opportunities matched to your profile
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by role, company, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && 'border-primary/50')}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                'rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors',
                activeFilter === f.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-subtle text-muted-foreground hover:border-white/20 hover:text-foreground'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="p-4">
              <p className="text-sm font-medium text-foreground mb-3">Sort by</p>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id)}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-sm transition-colors',
                      sortBy === opt.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-subtle text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No opportunities matched your profile yet"
          description="Try adjusting your search or filters. New opportunities are added daily — check back soon."
          actionLabel="Clear filters"
          onAction={() => { setSearch(''); setActiveFilter('all'); }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((opp: Opportunity, i) => (
            <OpportunityCard key={opp.id} opportunity={opp} delay={i * 0.05} />
          ))}
        </div>
      )}
    </PageTransition>
  );
}
