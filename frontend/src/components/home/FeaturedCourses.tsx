import { CourseCard, Course } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const featuredCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2024",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
    category: "Web Development",
    instructor: "Sarah Johnson",
    duration: "48 hours",
    lessons: 156,
    students: 45230,
    rating: 4.9,
    level: "Beginner",
    price: 89,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Data Science & Machine Learning with Python",
    description: "Master data analysis, visualization, and machine learning algorithms using Python and real datasets.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    category: "Data Science",
    instructor: "Dr. Michael Chen",
    duration: "52 hours",
    lessons: 180,
    students: 32150,
    rating: 4.8,
    level: "Intermediate",
    price: 129,
    isFeatured: true,
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    description: "Learn user interface and user experience design from scratch. Create stunning designs with Figma.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    category: "Design",
    instructor: "Emma Williams",
    duration: "36 hours",
    lessons: 98,
    students: 28450,
    rating: 4.9,
    level: "Beginner",
    price: 79,
  },
  {
    id: "4",
    title: "Advanced React & TypeScript",
    description: "Take your React skills to the next level with TypeScript, testing, and advanced patterns.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    category: "Web Development",
    instructor: "Alex Turner",
    duration: "28 hours",
    lessons: 86,
    students: 18920,
    rating: 4.7,
    level: "Advanced",
    price: 99,
  },
  {
    id: "5",
    title: "Digital Marketing Fundamentals",
    description: "Learn SEO, social media marketing, email campaigns, and analytics to grow any business online.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    category: "Marketing",
    instructor: "Lisa Martinez",
    duration: "24 hours",
    lessons: 72,
    students: 21340,
    rating: 4.6,
    level: "Beginner",
    price: 69,
  },
  {
    id: "6",
    title: "Cloud Architecture with AWS",
    description: "Master Amazon Web Services and become a certified cloud solutions architect.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    category: "Cloud Computing",
    instructor: "James Anderson",
    duration: "40 hours",
    lessons: 124,
    students: 15680,
    rating: 4.8,
    level: "Intermediate",
    price: 149,
  },
];

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

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
