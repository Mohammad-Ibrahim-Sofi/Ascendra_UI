import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ClipboardList, SlidersHorizontal } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { ApplicationCard, statusConfig } from '@/components/shared/ApplicationCard';
import { ApplicationDetailsDialog } from '@/components/shared/ApplicationDetailsDialog';
import { LoadingSkeleton, EmptyState } from '@/components/shared/LoadingSkeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { applications } from '@/data/applications';
import type { Application, ApplicationStatus } from '@/types';
import { cn } from '@/lib/utils';

const tabs: { id: ApplicationStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'saved', label: 'Saved' },
  { id: 'applied', label: 'Applied' },
  { id: 'under-review', label: 'Under Review' },
  { id: 'interview', label: 'Interview' },
  { id: 'selected', label: 'Selected' },
  { id: 'rejected', label: 'Rejected' },
];

const sortOptions = [
  { id: 'recent', label: 'Most Recent' },
  { id: 'match', label: 'Best Match' },
  { id: 'deadline', label: 'Deadline' },
];

function ApplicationCardSkeleton() {
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
      <div className="mt-4 flex gap-2">
        <LoadingSkeleton className="h-5 w-16 rounded-full" />
        <LoadingSkeleton className="h-5 w-24 rounded-full" />
      </div>
      <div className="mt-3">
        <LoadingSkeleton className="h-3 w-28" />
      </div>
      <div className="mt-4">
        <LoadingSkeleton className="h-3 w-16 mb-2" />
        <div className="flex gap-1">
          <LoadingSkeleton className="h-1.5 flex-1" />
          <LoadingSkeleton className="h-1.5 flex-1" />
          <LoadingSkeleton className="h-1.5 flex-1" />
          <LoadingSkeleton className="h-1.5 flex-1" />
          <LoadingSkeleton className="h-1.5 flex-1" />
        </div>
      </div>
      <LoadingSkeleton className="mt-5 h-9 w-full" />
    </div>
  );
}

export default function Applications() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<ApplicationStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showSort, setShowSort] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let result = [...applications];

    if (activeTab !== 'all') {
      result = result.filter((a) => a.status === activeTab);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.role.toLowerCase().includes(q) ||
          a.company.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'match') {
      result.sort((a, b) => b.matchPercent - a.matchPercent);
    } else if (sortBy === 'deadline') {
      result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else {
      result.sort((a, b) => new Date(b.appliedDate || b.deadline).getTime() - new Date(a.appliedDate || a.deadline).getTime());
    }

    return result;
  }, [search, activeTab, sortBy]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: applications.length };
    for (const app of applications) {
      counts[app.status] = (counts[app.status] || 0) + 1;
    }
    return counts;
  }, []);

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
    setDialogOpen(true);
  };

  const clearFilters = () => {
    setSearch('');
    setActiveTab('all');
    setSortBy('recent');
  };

  return (
    <PageTransition>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">
          Application Tracker
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track and manage all your job and internship applications in one place.
        </p>
      </div>

      {/* Search & Sort */}
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by role or company..."
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
          onClick={() => setShowSort(!showSort)}
          className={cn(showSort && 'border-primary/50')}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </div>

      {/* Sort Options */}
      {showSort && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4"
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

      {/* Status Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-subtle text-muted-foreground hover:border-white/20 hover:text-foreground'
            )}
          >
            {tab.label}
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary'
                  : 'bg-white/5 text-muted-foreground'
              )}
            >
              {tabCounts[tab.id] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ApplicationCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No applications found"
          description="Try adjusting your search or filters. Save opportunities from the Opportunities page to start tracking them here."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app, i) => (
            <ApplicationCard
              key={app.id}
              application={app}
              delay={i * 0.05}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Details Dialog */}
      <ApplicationDetailsDialog
        application={selectedApp}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </PageTransition>
  );
}
