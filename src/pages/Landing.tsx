import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  Briefcase,
  Target,
  Map,
  Bot,
  Sparkles,
  TrendingUp,
  Users,
  ShieldCheck,
  Check,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: FileText,
    title: 'Resume Intelligence',
    description: 'AI-powered resume scoring, parsing, and optimization suggestions tailored to your target roles.',
  },
  {
    icon: Briefcase,
    title: 'Opportunity Matching',
    description: 'Discover internships, jobs, hackathons, and scholarships matched to your unique skill profile.',
  },
  {
    icon: Target,
    title: 'Skill Gap Analysis',
    description: 'Identify missing skills between your current profile and your dream career path with actionable insights.',
  },
  {
    icon: Map,
    title: 'Career Roadmap',
    description: 'Get a semester-by-semester personalized roadmap with milestones to guide your placement journey.',
  },
  {
    icon: Bot,
    title: 'AI Career Mentor',
    description: 'Chat with an AI mentor that understands your profile and provides personalized career guidance 24/7.',
  },
  {
    icon: TrendingUp,
    title: 'Readiness Tracking',
    description: 'Monitor your career readiness score in real-time as you build skills and complete milestones.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Upload Your Resume',
    description: 'Our AI parses and analyzes your resume, scoring it across 15+ parameters in seconds.',
  },
  {
    number: '02',
    title: 'Get Your Profile Scored',
    description: 'Receive a comprehensive career readiness score with skill gap analysis and recommendations.',
  },
  {
    number: '03',
    title: 'Follow Your Roadmap',
    description: 'Follow a personalized semester-wise roadmap with milestones, tasks, and progress tracking.',
  },
  {
    number: '04',
    title: 'Land Your Dream Role',
    description: 'Apply to matched opportunities with confidence and get guidance from your AI mentor anytime.',
  },
];

const stats = [
  { value: 15, suffix: 'K+', label: 'Students Placed' },
  { value: 850, suffix: '+', label: 'Partner Companies' },
  { value: 92, suffix: '%', label: 'Placement Rate' },
  { value: 4.9, suffix: '/5', label: 'Student Rating' },
];

const benefits = [
  'AI-powered resume scoring and optimization',
  'Personalized opportunity matching with match scores',
  'Semester-wise career roadmap with progress tracking',
  'Real-time skill gap analysis with recommendations',
  '24/7 AI career mentor for instant guidance',
  'Comprehensive placement readiness dashboard',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-subtle bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" variant="gradient">
                Get Started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 mesh-gradient" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-[0.15]" />
        {/* Floating gradient blobs */}
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[120px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 h-[350px] w-[350px] rounded-full bg-secondary/8 blur-[120px] animate-blob" style={{ animationDelay: '5s' }} />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px] animate-blob" style={{ animationDelay: '10s' }} />
        {/* Fade to background at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-background" />

        <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="default" className="mb-6 gap-1.5 py-1.5 pl-3 pr-3.5">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Placement Intelligence
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Your AI co-pilot for
            <br />
            <span className="text-gradient-blue">campus placements</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Ascendra AI analyzes your resume, identifies skill gaps, matches you with the right opportunities, and guides you through a personalized roadmap to land your dream role.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/register">
              <Button size="lg" variant="gradient" className="w-full sm:w-auto">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Demo Dashboard
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <ShieldCheck className="h-4 w-4 text-success" />
            No payments required — Free for students
          </motion.div>
        </div>

        {/* Hero Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative mx-auto mt-20 max-w-5xl px-4 lg:px-8"
        >
          <div className="rounded-2xl border border-subtle bg-card p-2 shadow-card-hover">
            <div className="rounded-xl border border-subtle bg-surface overflow-hidden">
              <div className="flex items-center gap-2 border-b border-subtle px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-warning/60" />
                  <div className="h-3 w-3 rounded-full bg-success/60" />
                </div>
                <div className="ml-2 flex-1">
                  <div className="h-6 w-40 rounded-md bg-white/5" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 p-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border border-subtle bg-card p-4">
                    <div className="h-3 w-16 rounded bg-white/10 mb-2" />
                    <div className="h-6 w-12 rounded bg-white/5 mb-3" />
                    <div className="h-1.5 w-full rounded-full bg-white/5">
                      <div className="h-1.5 w-2/3 rounded-full bg-gradient-blue" />
                    </div>
                  </div>
                ))}
                <div className="col-span-2 rounded-lg border border-subtle bg-card p-4">
                  <div className="h-3 w-24 rounded bg-white/10 mb-3" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-white/5" />
                        <div className="flex-1 space-y-1">
                          <div className="h-3 w-32 rounded bg-white/5" />
                          <div className="h-2 w-20 rounded bg-white/5" />
                        </div>
                        <div className="h-6 w-12 rounded bg-primary/10" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-subtle bg-card p-4 flex flex-col items-center justify-center">
                  <div className="h-16 w-16 rounded-full border-4 border-white/5 border-t-primary" />
                  <div className="h-3 w-10 rounded bg-white/5 mt-2" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-subtle bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={item} className="text-center">
                <p className="font-heading text-3xl font-bold text-gradient-blue lg:text-4xl tabular-nums">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-2xl text-center"
          >
            <Badge variant="secondary" className="mb-4">AI Modules</Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Everything you need to crack placements
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Six intelligent modules working together to give you a complete placement preparation ecosystem.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={item} whileHover={{ y: -3 }}>
                <Card className="group h-full p-6 hover:border-primary/30 hover:shadow-card-hover">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-subtle bg-surface/20 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-2xl text-center"
          >
            <Badge variant="default" className="mb-4">How It Works</Badge>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              From resume to offer in four steps
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, i) => (
              <motion.div key={step.number} variants={item} className="relative">
                <div className="font-heading text-5xl font-bold text-white/5">{step.number}</div>
                <div className="mt-[-20px] relative z-10">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 right-0 w-12 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="success" className="mb-4">Why Ascendra</Badge>
              <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Built for students, powered by AI
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We combine cutting-edge AI with deep placement expertise to give you an unfair advantage in your career journey.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15">
                      <Check className="h-3 w-3 text-success" />
                    </div>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/register">
                <Button size="lg" variant="gradient" className="mt-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 shadow-glow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Career Readiness</p>
                    <p className="font-heading text-3xl font-bold text-foreground tabular-nums">78<span className="text-lg text-muted-foreground">/100</span></p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Technical Skills', value: 85, color: 'bg-primary' },
                    { label: 'Resume Quality', value: 72, color: 'bg-secondary' },
                    { label: 'Interview Prep', value: 65, color: 'bg-success' },
                    { label: 'Profile Completeness', value: 90, color: 'bg-warning' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-foreground font-medium tabular-nums">{item.value}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-2 rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-subtle bg-card px-4 py-1.5 mb-6">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Join 15,000+ students already placed</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Ready to land your <span className="text-gradient-blue">dream role?</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start your placement journey today with AI-powered guidance every step of the way.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/register">
                <Button size="lg" variant="gradient">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-subtle bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
                AI-powered College Placement Intelligence Platform that helps students land their dream roles with confidence.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a href="#" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-lg border border-subtle text-muted-foreground transition-colors hover:text-foreground hover:border-white/15">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-lg border border-subtle text-muted-foreground transition-colors hover:text-foreground hover:border-white/15">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg border border-subtle text-muted-foreground transition-colors hover:text-foreground hover:border-white/15">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">Product</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a></li>
                <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">Company</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-subtle pt-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">© 2026 Ascendra AI. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Built for the next generation of talent.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
