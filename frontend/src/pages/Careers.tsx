import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Clock, ArrowRight, Heart, Zap, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";

const jobs = [
  { id: "1", title: "Senior Frontend Engineer", department: "Engineering", location: "San Francisco, CA", type: "Full-time" },
  { id: "2", title: "Product Designer", department: "Design", location: "Remote", type: "Full-time" },
  { id: "3", title: "Content Marketing Manager", department: "Marketing", location: "New York, NY", type: "Full-time" },
  { id: "4", title: "Data Scientist", department: "Engineering", location: "Remote", type: "Full-time" },
  { id: "5", title: "Customer Success Manager", department: "Operations", location: "Austin, TX", type: "Full-time" },
  { id: "6", title: "Mobile Developer (iOS)", department: "Engineering", location: "San Francisco, CA", type: "Full-time" },
];

const benefits = [
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health, dental, and vision insurance for you and your family." },
  { icon: Zap, title: "Learning Budget", description: "$2,000 annual budget for courses, books, and professional development." },
  { icon: Users, title: "Flexible Work", description: "Remote-first culture with flexible hours and unlimited PTO." },
  { icon: Globe, title: "Global Team", description: "Work with talented people from around the world in a diverse environment." },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20" style={{ background: "var(--gradient-hero)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">Join Our Mission</h1>
              <p className="text-xl text-white/70 mb-8">Help us transform education and empower millions of learners worldwide. We're looking for passionate people to join our team.</p>
              <Button variant="hero" size="lg" asChild><a href="#openings">View Open Positions <ArrowRight className="h-4 w-4" /></a></Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Why Work With Us</h2>
              <p className="text-muted-foreground">We believe in taking care of our team so they can focus on what matters most.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card variant="elevated" className="p-6 h-full text-center">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4"><benefit.icon className="h-6 w-6 text-primary" /></div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="openings" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Open Positions</h2>
              <p className="text-muted-foreground">Find your next opportunity and help shape the future of education.</p>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-4">
              {jobs.map((job, index) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <Card variant="interactive" className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-heading font-semibold text-lg mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.department}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" asChild><Link to={`/careers/${job.id}`}>Apply <ArrowRight className="h-4 w-4" /></Link></Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
