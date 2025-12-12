import { CourseCard, Course } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const featuredCourses: Course[] = [];

export function FeaturedCourses() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Featured Courses</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Explore Our Top-Rated Courses
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover courses taught by industry experts and designed to help you achieve your goals.
          </p>
        </motion.div>

        {/* Course Grid */}
        {featuredCourses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No featured courses available</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/courses">
              View All Courses
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
