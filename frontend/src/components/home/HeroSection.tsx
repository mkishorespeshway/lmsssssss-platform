import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Users, BookOpen, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-6"
            >
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                New courses added weekly
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Unlock Your{" "}
              <span className="gradient-text">
                Learning Potential
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Master new skills with expert-led courses. Track your progress, earn certificates, 
              and accelerate your career with our comprehensive learning platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/courses">
                  Explore Courses
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/about">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-6 lg:gap-10"
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary mb-1">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-2xl sm:text-3xl font-bold text-white">500+</span>
                </div>
                <p className="text-sm text-white/60">Courses Available</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary mb-1">
                  <Users className="h-5 w-5" />
                  <span className="text-2xl sm:text-3xl font-bold text-white">50K+</span>
                </div>
                <p className="text-sm text-white/60">Active Learners</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-primary mb-1">
                  <Award className="h-5 w-5" />
                  <span className="text-2xl sm:text-3xl font-bold text-white">10K+</span>
                </div>
                <p className="text-sm text-white/60">Certificates Issued</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Card Stack */}
            <div className="relative">
              {/* Background Card */}
              <div className="absolute -top-4 -left-4 right-8 bottom-8 bg-primary/10 rounded-2xl border border-primary/20" />
              
              {/* Main Image Container */}
              <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-2xl">
                {/* Course Preview */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/20 backdrop-blur rounded-full flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary fill-primary" />
                  </div>
                </div>
                
                {/* Course Info */}
                <div className="space-y-3">
                  <Badge variant="secondary">Web Development</Badge>
                  <h3 className="font-heading font-semibold text-lg text-foreground">
                    Complete Full-Stack Development Course
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      48 lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      12.5k enrolled
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-primary">65%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-primary rounded-full progress-animate" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Certificate */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-card rounded-xl border border-border shadow-lg p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Certificate Earned!</p>
                  <p className="text-xs text-muted-foreground">React Fundamentals</p>
                </div>
              </motion.div>

              {/* Floating Badge - Students */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 }}
                className="absolute -top-6 -right-6 bg-card rounded-xl border border-border shadow-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-card"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">+2.5k</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
