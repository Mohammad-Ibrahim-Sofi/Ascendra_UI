import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Download,
  Eye,
  TrendingUp,
  History,
  Sparkles,
} from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { ScoreRing } from '@/components/shared/ScoreRing';
import { UploadCard } from '@/components/shared/UploadCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { resumeData } from '@/data/resume';

export default function Resume() {
  const [uploaded, setUploaded] = useState(true);

  return (
    <PageTransition>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Resume Intelligence</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          AI-powered analysis, scoring, and optimization for your resume
        </p>
      </div>

      {/* Upload + Score */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Upload Resume</h2>
          <UploadCard
            uploaded={uploaded}
            fileName={uploaded ? resumeData.fileName : undefined}
            fileSize={uploaded ? resumeData.fileSize : undefined}
            onUpload={() => setUploaded(true)}
          />
          {uploaded && (
            <div className="mt-4 flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-3.5 w-3.5" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-3.5 w-3.5" />
                Download
              </Button>
              <Button variant="gradient" size="sm">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Re-analyze
              </Button>
            </div>
          )}
        </Card>

        <Card className="flex flex-col items-center justify-center p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Resume Score</h2>
          <ScoreRing value={resumeData.currentScore} size={130} label="out of 100" />
          <div className="mt-4 flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm text-success font-medium">+14 points</span>
            <span className="text-xs text-muted-foreground">since last upload</span>
          </div>
        </Card>
      </div>

      {/* Insights */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Resume Insights</h2>
          <div className="space-y-3">
            {resumeData.insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex gap-3 rounded-lg border border-subtle p-3"
              >
                <div className="shrink-0">
                  {insight.type === 'strength' ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-warning" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{insight.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{insight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Lightbulb className="h-4 w-4" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Improvement Suggestions</h2>
          </div>
          <div className="space-y-3">
            {resumeData.suggestions.map((suggestion, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-foreground">{suggestion}</p>
              </motion.div>
            ))}
          </div>
          <Button variant="gradient" className="mt-5 w-full" size="lg">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Optimized Resume
          </Button>
        </Card>
      </div>

      {/* History Timeline */}
      <Card className="mt-4 p-6">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <History className="h-4 w-4" />
          </div>
          <h2 className="font-heading text-lg font-semibold text-foreground">Resume History</h2>
        </div>
        <div className="relative">
          {resumeData.history.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {i < resumeData.history.length - 1 && (
                <div className="absolute left-[15px] top-8 bottom-0 w-px bg-white/10" />
              )}
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary/10">
                <FileText className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="flex-1 rounded-lg border border-subtle p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-foreground">{entry.version}</span>
                    <Badge variant="outline" className="text-xs">{entry.date}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Score:</span>
                    <span className={`font-heading font-bold ${entry.score >= 70 ? 'text-success' : entry.score >= 50 ? 'text-warning' : 'text-destructive'}`}>
                      {entry.score}/100
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{entry.changes}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </PageTransition>
  );
}
