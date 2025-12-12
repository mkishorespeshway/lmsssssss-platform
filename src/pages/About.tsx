import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, Users, Award, Globe, Heart, Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Michael Chen", role: "CTO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Emma Williams", role: "Head of Content", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { name: "David Park", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
];

const values = [
  { icon: Target, title: "Mission-Driven", description: "We're committed to democratizing education and making quality learning accessible to everyone, everywhere." },
  { icon: Heart, title: "Learner-First", description: "Every decision we make prioritizes the learning experience and success of our students." },
  { icon: Lightbulb, title: "Innovation", description: "We continuously evolve our platform with cutting-edge technology to enhance the learning journey." },
  { icon: Globe, title: "Global Impact", description: "We believe education has the power to transform lives and communities around the world." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 lg:py-28" style={{ background: "var(--gradient-hero)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6">Empowering Learners Worldwide</h1>
              <p className="text-xl text-white/70 mb-8">LearnHub was founded with a simple mission: to provide world-class education to anyone, anywhere. We believe that learning should be accessible, engaging, and transformative.</p>
              <div className="flex flex-wrap justify-center gap-8 text-white/80">
                <div><p className="text-3xl font-bold text-primary">500+</p><p className="text-sm">Courses</p></div>
                <div><p className="text-3xl font-bold text-primary">50K+</p><p className="text-sm">Students</p></div>
                <div><p className="text-3xl font-bold text-primary">100+</p><p className="text-sm">Instructors</p></div>
                <div><p className="text-3xl font-bold text-primary">95%</p><p className="text-sm">Satisfaction</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">Founded in 2020, LearnHub started as a small team of passionate educators and technologists who believed that quality education shouldn't be limited by geography or economics.</p>
                <p className="text-muted-foreground mb-4">Today, we've grown into a global learning platform serving students from over 150 countries. Our courses are created by industry experts and designed to provide practical, real-world skills that help our learners advance their careers.</p>
                <p className="text-muted-foreground">We're proud to have helped thousands of students land their dream jobs, start successful businesses, and transform their lives through education.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" alt="Team collaboration" className="rounded-2xl object-cover w-full h-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground">The principles that guide everything we do at LearnHub.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card variant="elevated" className="p-6 h-full text-center">
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4"><value.icon className="h-6 w-6 text-primary" /></div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground">The passionate people behind LearnHub's success.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card variant="elevated" className="p-6 text-center">
                    <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="font-heading font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Ready to Start Learning?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Join our community of learners and start your journey today.</p>
            <Button variant="hero" size="lg" asChild><Link to="/courses">Explore Courses <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
