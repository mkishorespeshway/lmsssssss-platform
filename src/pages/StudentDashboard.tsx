import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  Bell,
  Play,
  ArrowRight,
  GraduationCap,
  Target,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
    instructor: "Sarah Johnson",
    progress: 65,
    lastLesson: "CSS Grid Mastery",
    nextLesson: "JavaScript Essentials",
    totalLessons: 156,
    completedLessons: 101,
  },
  {
    id: "2",
    title: "Data Science & Machine Learning",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    instructor: "Dr. Michael Chen",
    progress: 32,
    lastLesson: "Data Visualization",
    nextLesson: "Introduction to ML",
    totalLessons: 180,
    completedLessons: 58,
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    instructor: "Emma Williams",
    progress: 100,
    lastLesson: "Final Project",
    nextLesson: null,
    totalLessons: 98,
    completedLessons: 98,
  },
];

// Mock achievements
const achievements = [
  { id: "1", title: "Fast Learner", description: "Complete 10 lessons in one day", icon: TrendingUp, earned: true },
  { id: "2", title: "First Certificate", description: "Earn your first certificate", icon: Award, earned: true },
  { id: "3", title: "Dedicated Student", description: "Log in for 7 consecutive days", icon: Calendar, earned: false },
];

// Mock announcements
const announcements = [
  {
    id: "1",
    title: "New Course: Advanced TypeScript",
    message: "Master advanced TypeScript patterns and techniques.",
    date: "2 hours ago",
  },
  {
    id: "2",
    title: "Weekly Challenge",
    message: "Complete 5 lessons this week to earn bonus points.",
    date: "1 day ago",
  },
];

const StudentDashboard = () => {
  const user = {
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    coursesEnrolled: 5,
    coursesCompleted: 2,
    certificatesEarned: 2,
    totalHoursLearned: 124,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-muted-foreground">
                  Continue where you left off and keep learning.
                </p>
              </div>
              <Button variant="default" asChild>
                <Link to="/courses">
                  Browse Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
          >
            <Card variant="elevated" className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{user.coursesEnrolled}</p>
                  <p className="text-sm text-muted-foreground">Enrolled</p>
                </div>
              </div>
            </Card>
            <Card variant="elevated" className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{user.coursesCompleted}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </Card>
            <Card variant="elevated" className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <Award className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{user.certificatesEarned}</p>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                </div>
              </div>
            </Card>
            <Card variant="elevated" className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{user.totalHoursLearned}h</p>
                  <p className="text-sm text-muted-foreground">Learning Time</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Continue Learning
                  </h2>
                  <Link to="/my-courses" className="text-sm text-primary hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {enrolledCourses.filter((c) => c.progress < 100).map((course) => (
                    <Card key={course.id} variant="interactive" className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-32 h-20 object-cover rounded-lg hidden sm:block"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                                {course.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                By {course.instructor}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Next: {course.nextLesson}
                              </p>
                            </div>
                            <Button variant="default" size="sm" asChild>
                              <Link to={`/courses/${course.id}/learn`}>
                                <Play className="h-4 w-4" />
                                Continue
                              </Link>
                            </Button>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>{course.completedLessons} / {course.totalLessons} lessons</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Completed Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="font-heading text-xl font-bold text-foreground mb-4">
                  Completed Courses
                </h2>

                <div className="space-y-4">
                  {enrolledCourses.filter((c) => c.progress === 100).map((course) => (
                    <Card key={course.id} variant="elevated" className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-32 h-20 object-cover rounded-lg hidden sm:block"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground line-clamp-1">
                                  {course.title}
                                </h3>
                                <Badge variant="success">Completed</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                By {course.instructor}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Award className="h-4 w-4" />
                              Certificate
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Announcements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card variant="elevated" className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="h-5 w-5 text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">
                      Announcements
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                        <h4 className="font-medium text-foreground text-sm mb-1">
                          {announcement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          {announcement.message}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {announcement.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card variant="elevated" className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-heading font-semibold text-foreground">
                      Achievements
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex items-center gap-3 ${
                          !achievement.earned ? "opacity-50" : ""
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            achievement.earned
                              ? "bg-warning/10 text-warning"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <achievement.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">
                            {achievement.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card variant="elevated" className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button variant="secondary" size="sm" className="w-full justify-start" asChild>
                      <Link to="/courses">
                        <BookOpen className="h-4 w-4" />
                        Browse Courses
                      </Link>
                    </Button>
                    <Button variant="secondary" size="sm" className="w-full justify-start" asChild>
                      <Link to="/certificates">
                        <Award className="h-4 w-4" />
                        View Certificates
                      </Link>
                    </Button>
                    <Button variant="secondary" size="sm" className="w-full justify-start" asChild>
                      <Link to="/profile">
                        <GraduationCap className="h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
