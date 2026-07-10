import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Building2, Users, Calendar, TrendingUp } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/shared/StatCard';

interface Opportunity {
  id: string;
  role: string;
  company: string;
  logo: string;
  type: 'Full-time' | 'Internship' | 'Hackathon';
  location: string;
  deadline: string;
  applicants: number;
  postedDate: string;
  status: 'active' | 'closed';
}

const mockOpportunities: Opportunity[] = [
  { id: 'o1', role: 'Frontend Engineer', company: 'Zomato', logo: 'https://logo.clearbit.com/zomato.com', type: 'Full-time', location: 'Gurgaon', deadline: 'Jul 20', applicants: 48, postedDate: 'Jul 10', status: 'active' },
  { id: 'o2', role: 'Full-Stack Engineer', company: 'Razorpay', logo: 'https://logo.clearbit.com/razorpay.com', type: 'Full-time', location: 'Bangalore', deadline: 'Jul 22', applicants: 62, postedDate: 'Jul 09', status: 'active' },
  { id: 'o3', role: 'SWE Intern', company: 'Google', logo: 'https://logo.clearbit.com/google.com', type: 'Internship', location: 'Hyderabad', deadline: 'Jul 20', applicants: 120, postedDate: 'Jul 05', status: 'active' },
  { id: 'o4', role: 'Backend Engineer', company: 'Swiggy', logo: 'https://logo.clearbit.com/swiggy.com', type: 'Full-time', location: 'Bangalore', deadline: 'Jul 18', applicants: 35, postedDate: 'Jul 08', status: 'active' },
  { id: 'o5', role: 'Data Analyst', company: 'Flipkart', logo: 'https://logo.clearbit.com/flipkart.com', type: 'Internship', location: 'Bangalore', deadline: 'Jul 12', applicants: 28, postedDate: 'Jul 01', status: 'closed' },
  { id: 'o6', role: 'AI Hackathon', company: 'MLH', logo: 'https://logo.clearbit.com/mlh.io', type: 'Hackathon', location: 'Remote', deadline: 'Jul 15', applicants: 54, postedDate: 'Jul 03', status: 'active' },
];

export default function OfficerOpportunities() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const types = useMemo(() => ['all', ...Array.from(new Set(mockOpportunities.map((o) => o.type)))], []);

  const filtered = useMemo(() => {
    return mockOpportunities.filter((o) => {
      const matchesSearch = o.role.toLowerCase().includes(search.toLowerCase()) || o.company.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || o.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const active = mockOpportunities.filter((o) => o.status === 'active').length;
  const totalApplicants = mockOpportunities.reduce((sum, o) => sum + o.applicants, 0);

  return (
    <PageTransition>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Opportunities</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Manage job postings, internships, and hackathon listings.</p>
        </div>
        <Button variant="gradient" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Post Opportunity
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Posted" value={mockOpportunities.length} icon={Building2} delay={0} />
        <StatCard title="Active" value={active} icon={TrendingUp} delay={0.05} />
        <StatCard title="Total Applicants" value={totalApplicants} icon={Users} delay={0.1} />
        <StatCard title="Closing Soon" value={2} icon={Calendar} delay={0.15} />
      </div>

      <Card className="mt-6 p-6">
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by role or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-subtle bg-white/5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-9 rounded-lg border border-subtle bg-white/5 px-3 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {types.map((t) => (
              <option key={t} value={t} className="bg-surface">
                {t === 'all' ? 'All Types' : t}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2.5">
          {filtered.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-lg border border-subtle p-3 hover:border-white/15 hover:bg-white/[0.02] transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-subtle overflow-hidden shrink-0">
                <img src={opp.logo} alt={opp.company} className="h-6 w-6 object-contain" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{opp.role}</p>
                <p className="text-xs text-muted-foreground">{opp.company} · {opp.location}</p>
              </div>
              <Badge variant="outline" className="hidden sm:inline-flex">{opp.type}</Badge>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-foreground tabular-nums">{opp.applicants}</p>
                <p className="text-xs text-muted-foreground">applicants</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">Deadline</p>
                <p className={`text-sm font-medium tabular-nums ${opp.status === 'closed' ? 'text-destructive' : 'text-foreground'}`}>{opp.deadline}</p>
              </div>
              <Badge variant={opp.status === 'active' ? 'success' : 'destructive'} className="shrink-0">
                {opp.status === 'active' ? 'Active' : 'Closed'}
              </Badge>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">No opportunities found matching your filters.</p>
            </div>
          )}
        </div>
      </Card>
    </PageTransition>
  );
}
