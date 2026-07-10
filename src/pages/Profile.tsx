import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  GraduationCap,
  Award,
  Target,
  FileText,
  Pencil,
  Save,
  X,
  MapPin,
  Calendar,
  Trophy,
  Star,
  TrendingUp,
} from 'lucide-react';
import { PageTransition } from '@/components/shared/PageTransition';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { student } from '@/data/student';

const achievements = [
  { icon: Trophy, title: 'Hackathon Winner', description: '1st place at Smart India Hackathon 2025', color: 'text-warning' },
  { icon: Star, title: 'Top Performer', description: 'Ranked top 5% in DSA course', color: 'text-primary' },
  { icon: TrendingUp, title: 'Most Improved', description: 'Resume score up 27 points this semester', color: 'text-success' },
];

const educationTimeline = [
  { period: '2024 — Present', title: 'B.Tech, Computer Science', institution: student.university, current: true },
  { period: '2022 — 2024', title: 'Higher Secondary (PCM)', institution: 'Delhi Public School', current: false },
  { period: '2020 — 2022', title: 'Secondary Education', institution: 'Delhi Public School', current: false },
];

export default function Profile() {
  const [editing, setEditing] = useState(false);

  return (
    <PageTransition>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground lg:text-3xl">Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your personal and academic information</p>
        </div>
        {!editing ? (
          <Button onClick={() => setEditing(true)} variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => setEditing(false)} variant="outline">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={() => setEditing(false)} variant="gradient">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Profile Header */}
        <Card className="p-6 lg:col-span-3 hover:shadow-card-hover transition-all">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="text-2xl font-heading font-bold">
                {student.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-heading text-xl font-bold text-foreground">{student.name}</h2>
              <p className="text-sm text-muted-foreground">{student.email}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="default">{student.major}</Badge>
                <Badge variant="secondary">{student.year}</Badge>
                <Badge variant="success">CGPA: {student.cgpa}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground tabular-nums">{student.careerReadiness}%</p>
                <p className="text-xs text-muted-foreground">Readiness</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground tabular-nums">{student.resumeScore}</p>
                <p className="text-xs text-muted-foreground">Resume Score</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail className="h-4 w-4" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Personal Information</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={student.name} disabled={!editing} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={student.email} disabled={!editing} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue="+91 98765 43210" disabled={!editing} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input defaultValue="New Delhi, India" disabled={!editing} />
            </div>
          </div>
        </Card>

        {/* Academic Information */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <GraduationCap className="h-4 w-4" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Academic</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">University</Label>
              <p className="text-sm text-foreground mt-1">{student.university}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Major</Label>
              <p className="text-sm text-foreground mt-1">{student.major}</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs text-muted-foreground">Year</Label>
                <p className="text-sm text-foreground mt-1">{student.year}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">CGPA</Label>
                <p className="text-sm text-foreground mt-1 font-medium">{student.cgpa}/10</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success">
              <Award className="h-4 w-4" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">Skills</h2>
          </div>
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

        {/* Interests, Resume Status & Achievements */}
        <div className="space-y-5">
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10 text-warning">
                <Target className="h-4 w-4" />
              </div>
              <h2 className="font-heading text-lg font-semibold text-foreground">Interests</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {student.interests.map((interest) => (
                <Badge key={interest} variant="outline">{interest}</Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <h2 className="font-heading text-lg font-semibold text-foreground">Resume Status</h2>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-subtle p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Resume Uploaded</p>
                <p className="text-xs text-muted-foreground">Score: {student.resumeScore}/100</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Last updated: Jun 28, 2026
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {student.university}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <Trophy className="h-4 w-4" />
              </div>
              <h2 className="font-heading text-lg font-semibold text-foreground">Achievements</h2>
            </div>
            <div className="space-y-3">
              {achievements.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-lg border border-subtle p-3 hover:border-white/15 transition-colors"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 ${a.color}`}>
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Education Timeline */}
      <Card className="mt-5 p-6">
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <GraduationCap className="h-4 w-4" />
          </div>
          <h2 className="font-heading text-lg font-semibold text-foreground">Education Timeline</h2>
        </div>
        <div className="relative">
          {educationTimeline.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              {i < educationTimeline.length - 1 && (
                <div className="absolute left-[7px] top-5 bottom-0 w-px bg-white/10" />
              )}
              <div className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-background ${edu.current ? 'bg-primary' : 'bg-white/10'}`} />
              <div>
                <p className="text-xs text-muted-foreground">{edu.period}</p>
                <p className="text-sm font-medium text-foreground">{edu.title}</p>
                <p className="text-xs text-muted-foreground">{edu.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </PageTransition>
  );
}
