import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CourseCard, Course } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid3X3, List, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const allCourses: Course[] = [
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
  {
    id: "7",
    title: "iOS App Development with Swift",
    description: "Build professional iOS apps from scratch. Learn Swift, UIKit, SwiftUI, and App Store deployment.",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    category: "Mobile Development",
    instructor: "David Park",
    duration: "44 hours",
    lessons: 132,
    students: 12450,
    rating: 4.7,
    level: "Intermediate",
    price: 119,
  },
  {
    id: "8",
    title: "Cybersecurity Essentials",
    description: "Learn ethical hacking, penetration testing, and security best practices to protect systems.",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop",
    category: "Cybersecurity",
    instructor: "Robert Kim",
    duration: "32 hours",
    lessons: 94,
    students: 9870,
    rating: 4.8,
    level: "Intermediate",
    price: 109,
  },
  {
    id: "9",
    title: "Python for Beginners",
    description: "Start your programming journey with Python. Learn fundamentals and build your first projects.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop",
    category: "Programming",
    instructor: "Anna Silva",
    duration: "20 hours",
    lessons: 65,
    students: 56780,
    rating: 4.9,
    level: "Beginner",
    price: 0,
  },
];

const categories = [
  "All",
  "Web Development",
  "Data Science",
  "Design",
  "Marketing",
  "Cloud Computing",
  "Mobile Development",
  "Cybersecurity",
  "Programming",
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Explore Courses
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover courses designed to help you master new skills and advance your career.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredCourses.length}</span> courses
            </p>
          </motion.div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No courses found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
