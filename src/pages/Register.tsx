import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, GraduationCap, Briefcase, User } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Personal', icon: User },
  { id: 2, label: 'Academic', icon: GraduationCap },
  { id: 3, label: 'Career', icon: Briefcase },
];

const careerInterests = [
  'Software Engineering',
  'Full-Stack Development',
  'Data Science',
  'AI/ML',
  'Product Management',
  'DevOps',
  'Cybersecurity',
  'UI/UX Design',
];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20" />
      <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link to="/" className="mb-8">
          <Logo size="lg" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card className="glass-strong p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                          step >= s.id
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-subtle text-muted-foreground'
                        )}
                      >
                        {step > s.id ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <s.icon className="h-4 w-4" />
                        )}
                      </div>
                      <span className={cn(
                        'mt-1.5 text-xs',
                        step >= s.id ? 'text-foreground' : 'text-muted-foreground'
                      )}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={cn(
                        'mx-2 h-0.5 flex-1 rounded-full transition-colors',
                        step > s.id ? 'bg-primary' : 'bg-white/5'
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="font-heading text-2xl font-bold text-foreground">Personal Info</h1>
                  <p className="mt-1 text-sm text-muted-foreground">Tell us about yourself</p>

                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Aarav Sharma" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@university.edu" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Create a strong password" required />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    variant="gradient"
                    className="mt-6 w-full"
                    size="lg"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="font-heading text-2xl font-bold text-foreground">Academic Info</h1>
                  <p className="mt-1 text-sm text-muted-foreground">Your education details</p>

                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input id="university" placeholder="Indian Institute of Technology" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">Major</Label>
                      <Input id="major" placeholder="Computer Science & Engineering" required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" placeholder="3rd Year" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cgpa">CGPA</Label>
                        <Input id="cgpa" type="number" step="0.1" placeholder="8.5" required />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} variant="gradient" size="lg" className="flex-1">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="font-heading text-2xl font-bold text-foreground">Career Interests</h1>
                  <p className="mt-1 text-sm text-muted-foreground">Select areas you're interested in</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {careerInterests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={cn(
                          'rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors',
                          selectedInterests.includes(interest)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-subtle text-muted-foreground hover:border-white/20 hover:text-foreground'
                        )}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={() => navigate('/dashboard')}
                      variant="gradient"
                      size="lg"
                      className="flex-1"
                    >
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
