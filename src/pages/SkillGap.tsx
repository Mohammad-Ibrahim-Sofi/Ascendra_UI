import { motion } from 'framer-motion';
import { Target, TrendingUp, Lightbulb, ArrowRight, CheckCircle2, Flame } from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { skillGaps } from '@/data/skillGap';
import { student } from '@/data/student';

const demandLevels: Record<string, { label: string; variant: 'destructive' | 'warning' | 'success'; percent: number }> = {
  'System Design': { label: 'Very High', variant: 'destructive', percent: 95 },
  'Machine Learning': { label: 'Very High', variant: 'destructive', percent: 92 },
  'Node.js': { label: 'High', variant: 'warning', percent: 78 },
  'Java': { label: 'High', variant: 'warning', percent: 75 },
  'Cloud (AWS)': { label: 'Medium', variant: 'success', percent: 60 },
};

export default function SkillGap() {
  const totalGap = skillGaps.reduce((sum, s) => sum + (s.required - s.current), 0);
  const avgCurrent = Math.round(
    skillGaps.reduce((sum, s) => sum + s.current, 0) / skillGaps.length
  );
  const avgRequired = Math.round(
    skillGaps.reduce((sum, s) => sum + s.required, 0) / skillGaps.length
  );

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Skill Gap Analysis</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Identify and close the gap between your current skills and career requirements
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Skills Analyzed</p>
              <p className="font-heading text-2xl font-bold text-foreground">{skillGaps.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Gap Points</p>
              <p className="font-heading text-2xl font-bold text-foreground">{totalGap}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Proficiency</p>
              <p className="font-heading text-2xl font-bold text-foreground">
                {avgCurrent}<span className="text-base text-muted-foreground">/{avgRequired}</span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Skills */}
      <Card className="mt-4 p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Current Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {student.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-foreground font-medium">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress
                value={skill.level}
                indicatorClassName={
                  skill.level >= 75 ? 'bg-success' : skill.level >= 50 ? 'bg-primary' : 'bg-warning'
                }
              />
              <p className="mt-1 text-xs text-muted-foreground">{skill.category}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Skill Gap Details */}
      <div className="mt-4 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-foreground">Required vs. Current</h2>
        {skillGaps.map((gap, i) => (
          <motion.div
            key={gap.skill}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="p-5 hover:border-white/15 hover:shadow-card-hover transition-all">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-foreground">{gap.skill}</h3>
                    <Badge variant="outline" className="text-xs">{gap.category}</Badge>
                    {demandLevels[gap.skill] && (
                      <Badge variant={demandLevels[gap.skill].variant} className="text-xs gap-1">
                        <Flame className="h-3 w-3" />
                        {demandLevels[gap.skill].label} demand
                      </Badge>
                    )}
                  </div>
                  <div className="mt-3 space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Current Level</span>
                        <span className="text-foreground font-medium">{gap.current}%</span>
                      </div>
                      <Progress value={gap.current} indicatorClassName="bg-primary" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Required Level</span>
                        <span className="text-foreground font-medium">{gap.required}%</span>
                      </div>
                      <div className="relative h-2 w-full rounded-full bg-white/5">
                        <div
                          className="absolute h-2 rounded-full bg-destructive/30"
                          style={{ width: `${gap.required}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="destructive" className="tabular-nums">
                    -{gap.required - gap.current}%
                  </Badge>
                  {demandLevels[gap.skill] && (
                    <div className="w-20">
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                        <span>Demand</span>
                        <span className="tabular-nums">{demandLevels[gap.skill].percent}%</span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/5">
                        <div className="h-1 rounded-full bg-gradient-blue" style={{ width: `${demandLevels[gap.skill].percent}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-subtle bg-surface/50 p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground mb-1">Recommendation</p>
                  <p className="text-sm text-muted-foreground">{gap.recommendation}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <Card className="mt-4 border-primary/20 p-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">Ready to close the gap?</h3>
            <p className="text-sm text-muted-foreground">Generate a personalized learning plan for your target skills</p>
          </div>
          <Button variant="gradient" size="lg">
            Generate Learning Plan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </PageTransition>
  );
}
