import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "react-router-dom";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  Play,
  CheckCircle2,
  Lock,
  Globe,
  Calendar,
  BarChart,
  FileText,
  Download,
  Share2,
  Heart,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Mock course data
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp 2024",
  description:
    "Learn web development from scratch and become a full-stack developer. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, MongoDB, and more. You'll build 25+ real-world projects and be job-ready by the end.",
  thumbnail:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
  category: "Web Development",
  instructor: {
    name: "Sarah Johnson",
    title: "Senior Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    bio: "10+ years of experience in web development. Former lead engineer at Google and Facebook.",
    students: 125000,
    courses: 12,
    rating: 4.9,
  },
  duration: "48 hours",
  lessons: 156,
  students: 45230,
  rating: 4.9,
  reviews: 8920,
  level: "Beginner",
  language: "English",
  lastUpdated: "December 2024",
  price: 89,
  originalPrice: 199,
  features: [
    "48 hours of on-demand video",
    "156 lessons across 12 sections",
    "25+ real-world projects",
    "Downloadable resources",
    "Certificate of completion",
    "Lifetime access",
    "Mobile and TV access",
    "30-day money-back guarantee",
  ],
  learnings: [
    "Build modern, responsive websites using HTML5 and CSS3",
    "Master JavaScript ES6+ and modern programming concepts",
    "Create dynamic web applications with React.js",
    "Build backend servers with Node.js and Express",
    "Work with databases using MongoDB and PostgreSQL",
    "Deploy applications to the cloud",
    "Implement authentication and security best practices",
    "Write clean, maintainable, and scalable code",
  ],
  sections: [
    {
      id: "1",
      title: "Getting Started",
      lessons: [
        { id: "1-1", title: "Welcome to the Course", duration: "5:30", free: true },
        { id: "1-2", title: "Setting Up Your Development Environment", duration: "12:45", free: true },
        { id: "1-3", title: "Understanding Web Development", duration: "8:20", free: false },
      ],
    },
    {
      id: "2",
      title: "HTML Fundamentals",
      lessons: [
        { id: "2-1", title: "Introduction to HTML", duration: "10:15", free: false },
        { id: "2-2", title: "HTML Document Structure", duration: "15:30", free: false },
        { id: "2-3", title: "Working with Text Elements", duration: "12:00", free: false },
        { id: "2-4", title: "Links and Images", duration: "14:20", free: false },
        { id: "2-5", title: "Forms and Input Elements", duration: "18:45", free: false },
      ],
    },
    {
      id: "3",
      title: "CSS Styling",
      lessons: [
        { id: "3-1", title: "Introduction to CSS", duration: "11:30", free: false },
        { id: "3-2", title: "Selectors and Properties", duration: "16:15", free: false },
        { id: "3-3", title: "Box Model and Layout", duration: "20:00", free: false },
        { id: "3-4", title: "Flexbox Deep Dive", duration: "25:30", free: false },
        { id: "3-5", title: "CSS Grid Mastery", duration: "28:00", free: false },
        { id: "3-6", title: "Responsive Design", duration: "22:15", free: false },
      ],
    },
    {
      id: "4",
      title: "JavaScript Essentials",
      lessons: [
        { id: "4-1", title: "Variables and Data Types", duration: "14:00", free: false },
        { id: "4-2", title: "Functions and Scope", duration: "18:30", free: false },
        { id: "4-3", title: "Arrays and Objects", duration: "22:45", free: false },
        { id: "4-4", title: "DOM Manipulation", duration: "26:00", free: false },
        { id: "4-5", title: "Events and Event Handling", duration: "20:15", free: false },
      ],
    },
  ],
};

const CourseDetail = () => {
  const { id } = useParams();
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalLessons = courseData.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section
          className="relative py-12 lg:py-20"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Course Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{courseData.category}</Badge>
                  <Badge variant="success">{courseData.level}</Badge>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {courseData.title}
                </h1>

                <p className="text-lg text-white/70 mb-6 max-w-2xl">
                  {courseData.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-white/80">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-warning text-warning" />
                    <span className="font-semibold text-white">
                      {courseData.rating}
                    </span>
                    <span>({courseData.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5" />
                    <span>{courseData.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-5 w-5" />
                    <span>{courseData.language}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-5 w-5" />
                    <span>Updated {courseData.lastUpdated}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4">
                  <img
                    src={courseData.instructor.avatar}
                    alt={courseData.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-medium">
                      {courseData.instructor.name}
                    </p>
                    <p className="text-white/60 text-sm">
                      {courseData.instructor.title}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Enrollment Card - Sticky on Desktop */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:relative"
              >
                <Card
                  variant="elevated"
                  className="lg:absolute lg:-top-20 lg:right-0 lg:w-full overflow-hidden"
                >
                  {/* Course Preview */}
                  <div className="relative aspect-video">
                    <img
                      src={courseData.thumbnail}
                      alt={courseData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                      <Button
                        variant="glass"
                        size="lg"
                        className="rounded-full h-16 w-16"
                      >
                        <Play className="h-6 w-6 fill-current" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-foreground">
                        ${courseData.price}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        ${courseData.originalPrice}
                      </span>
                      <Badge variant="accent">
                        {Math.round(
                          ((courseData.originalPrice - courseData.price) /
                            courseData.originalPrice) *
                            100
                        )}
                        % off
                      </Badge>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 mb-6">
                      <Button variant="hero" size="lg" className="w-full">
                        Enroll Now
                      </Button>
                      <Button variant="outline" size="lg" className="w-full">
                        <Heart className="h-4 w-4" />
                        Add to Wishlist
                      </Button>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {courseData.features.slice(0, 5).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Share */}
                    <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:max-w-2xl">
              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  What You'll Learn
                </h2>
                <Card variant="outline" className="p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {courseData.learnings.map((learning, index) => (
                      <div key={index} className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {learning}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Course Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Course Content
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {courseData.sections.length} sections • {totalLessons} lessons •{" "}
                    {courseData.duration}
                  </div>
                </div>

                <div className="space-y-3">
                  {courseData.sections.map((section) => (
                    <Card key={section.id} variant="outline" className="overflow-hidden">
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedSections.includes(section.id) ? (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className="font-medium text-foreground">
                            {section.title}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {section.lessons.length} lessons
                        </span>
                      </button>

                      {/* Section Lessons */}
                      {expandedSections.includes(section.id) && (
                        <div className="border-t border-border">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.free ? (
                                  <Play className="h-4 w-4 text-primary" />
                                ) : (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="text-sm text-muted-foreground">
                                  {lesson.title}
                                </span>
                                {lesson.free && (
                                  <Badge variant="outline" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Instructor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Your Instructor
                </h2>
                <Card variant="elevated" className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <img
                      src={courseData.instructor.avatar}
                      alt={courseData.instructor.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                        {courseData.instructor.name}
                      </h3>
                      <p className="text-primary mb-3">
                        {courseData.instructor.title}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning" />
                          {courseData.instructor.rating} Rating
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {courseData.instructor.students.toLocaleString()} Students
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {courseData.instructor.courses} Courses
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {courseData.instructor.bio}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
