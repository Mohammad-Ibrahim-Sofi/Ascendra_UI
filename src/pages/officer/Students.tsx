import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, GraduationCap, CheckCircle2, Clock, Download } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/shared/StatCard';

interface Student {
  id: string;
  name: string;
  rollNo: string;
  department: string;
  year: string;
  readiness: number;
  status: 'placed' | 'in-process' | 'not-ready';
  avatar: string;
}

const mockStudents: Student[] = [
  { id: 's1', name: 'Priya Sharma', rollNo: 'CS21B001', department: 'Computer Science', year: '4th Year', readiness: 92, status: 'placed', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 's2', name: 'Arjun Mehta', rollNo: 'CS21B012', department: 'Computer Science', year: '4th Year', readiness: 88, status: 'placed', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: 's3', name: 'Sneha Reddy', rollNo: 'EC21B045', department: 'Electronics', year: '4th Year', readiness: 76, status: 'in-process', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: 's4', name: 'Karthik Nair', rollNo: 'ME21B023', department: 'Mechanical', year: '4th Year', readiness: 65, status: 'in-process', avatar: 'https://i.pravatar.cc/100?img=4' },
  { id: 's5', name: 'Ananya Gupta', rollNo: 'CS21B007', department: 'Computer Science', year: '4th Year', readiness: 94, status: 'placed', avatar: 'https://i.pravatar.cc/100?img=5' },
  { id: 's6', name: 'Rohit Verma', rollNo: 'IT21B031', department: 'Information Tech', year: '4th Year', readiness: 58, status: 'not-ready', avatar: 'https://i.pravatar.cc/100?img=6' },
  { id: 's7', name: 'Divya Iyer', rollNo: 'CV21B009', department: 'Civil', year: '4th Year', readiness: 71, status: 'in-process', avatar: 'https://i.pravatar.cc/100?img=7' },
  { id: 's8', name: 'Vikram Singh', rollNo: 'EC21B018', department: 'Electronics', year: '4th Year', readiness: 82, status: 'placed', avatar: 'https://i.pravatar.cc/100?img=8' },
];

const statusConfig = {
  placed: { label: 'Placed', variant: 'success' as const, icon: CheckCircle2 },
  'in-process': { label: 'In Process', variant: 'warning' as const, icon: Clock },
  'not-ready': { label: 'Not Ready', variant: 'destructive' as const, icon: GraduationCap },
};

export default function OfficerStudents() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('all');

  const departments = useMemo(() => ['all', ...Array.from(new Set(mockStudents.map((s) => s.department)))], []);

  const filtered = useMemo(() => {
    return mockStudents.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
      const matchesDept = deptFilter === 'all' || s.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [search, deptFilter]);

  const placed = mockStudents.filter((s) => s.status === 'placed').length;
  const inProcess = mockStudents.filter((s) => s.status === 'in-process').length;
  const notReady = mockStudents.filter((s) => s.status === 'not-ready').length;

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Students</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Manage and track all placement-eligible students.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={mockStudents.length} icon={GraduationCap} delay={0} />
        <StatCard title="Placed" value={placed} icon={CheckCircle2} delay={0.05} />
        <StatCard title="In Process" value={inProcess} icon={Clock} delay={0.1} />
        <StatCard title="Not Ready" value={notReady} icon={GraduationCap} delay={0.15} />
      </div>

      <Card className="mt-6 p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-semibold text-foreground">Student Directory</h2>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-subtle bg-white/5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="h-9 rounded-lg border border-subtle bg-white/5 px-3 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {departments.map((d) => (
                <option key={d} value={d} className="bg-surface">
                  {d === 'all' ? 'All Departments' : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2.5">
          {filtered.map((student, i) => {
            const config = statusConfig[student.status];
            const StatusIcon = config.icon;
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-lg border border-subtle p-3 hover:border-white/15 hover:bg-white/[0.02] transition-all"
              >
                <img src={student.avatar} alt={student.name} className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.rollNo} · {student.department} · {student.year}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold text-foreground tabular-nums">{student.readiness}%</p>
                  <p className="text-xs text-muted-foreground">readiness</p>
                </div>
                <Badge variant={config.variant} className="gap-1">
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </Badge>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">No students found matching your filters.</p>
            </div>
          )}
        </div>
      </Card>
    </PageTransition>
  );
}
