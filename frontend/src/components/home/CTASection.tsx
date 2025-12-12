import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Icon */}
          <div className="inline-flex p-4 rounded-2xl bg-primary/20 mb-6">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your Learning Journey Today
          </h2>

          {/* Description */}
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Join over 50,000 learners worldwide. Access premium courses, earn certificates, 
            and transform your career.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/courses">
                Browse Courses
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            <div className="flex items-center gap-2 text-white/80">
              <Award className="h-5 w-5 text-primary" />
              <span>Verified Certificates</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Users className="h-5 w-5 text-primary" />
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>Lifetime Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
