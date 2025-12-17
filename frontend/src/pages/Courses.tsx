import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CourseCard, Course } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid3X3, List, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchCoursesAndCategories = async () => {
      try {
        const response = await fetch("/api/instructors");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const instructorsData = await response.json();

        const allCourses: Course[] = [];
        const uniqueCategories = new Set<string>();
        const groupedCoursesMap = new Map<string, Course>();

        instructorsData.forEach((instructor: any) => {
          if (instructor.category) {
            uniqueCategories.add(instructor.category);
          }

          const instructorTotalCourses = Object.values(instructor.levelVideos || {}).reduce(
            (sum: number, level: { videos?: any[] }) => sum + (level.videos ? level.videos.length : 0),
            0
          );

          for (const levelKey in instructor.levelVideos) {
            if (Object.prototype.hasOwnProperty.call(instructor.levelVideos, levelKey)) {
              const levelData = instructor.levelVideos[levelKey];
              if (levelData && levelData.videos && levelData.videos.length > 0) {
                const courseKey = `${instructor._id}-${levelKey}`;
                if (groupedCoursesMap.has(courseKey)) {
                  // If course already exists, just update video count
                  const existingCourse = groupedCoursesMap.get(courseKey)!;
                  existingCourse.videoCount! += levelData.videos.length;
                } else {
                  // Create a new course entry for this level and instructor
                  groupedCoursesMap.set(courseKey, {
                    _id: levelData.videos[0]._id, // Use the first video's ID as a placeholder for the course ID
                    title: `${instructor.name}'s ${levelKey} Course`, // Generate a title
                    description: `A ${levelKey} level course by ${instructor.name} covering various topics.`, // Generate a description
                    thumbnail: instructor.image || "https://via.placeholder.com/150",
                    category: instructor.category,
                    instructor: instructor.name,
                    instructorTitle: instructor.title,
                    instructorImage: instructor.image || "https://via.placeholder.com/40",
                    instructorCourses: instructorTotalCourses as number,
                    duration: levelData.videoDuration || "N/A",
                    students: instructor.students || 0,
                    rating: instructor.rating || 0,
                    level: levelKey as "Beginner" | "Intermediate" | "Advanced",
                    price: 0,
                    isFeatured: false,
                    videoCount: levelData.videos.length,
                  });
                }
              }
            }
          }
        });

        setCourses(Array.from(groupedCoursesMap.values()));
        setCategories(["All", ...Array.from(uniqueCategories)]);
      } catch (err: unknown) {
        let errorMessage = "An unknown error occurred while fetching data";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">Error: {error}</p>
      </div>
    );
  }

  const filteredCourses = courses.filter((course) => {
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
                <CourseCard key={course._id} course={course} index={index} />
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
