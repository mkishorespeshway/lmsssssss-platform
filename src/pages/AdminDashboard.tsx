import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  BarChart3,
  Plus,
  Settings,
  Bell,
  Search,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit,
  Trash2,
  GraduationCap,
  Calendar,
  FileText,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

// Mock analytics data
const analyticsData = {
  totalStudents: 12450,
  studentGrowth: 12.5,
  totalCourses: 156,
  courseGrowth: 8.2,
  totalRevenue: 245680,
  revenueGrowth: 18.3,
  totalEnrollments: 28340,
  enrollmentGrowth: 15.7,
};

// Mock recent enrollments
const recentEnrollments = [
  {
    id: "1",
    student: { name: "John Smith", email: "john@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    course: "Complete Web Development Bootcamp",
    date: "2 hours ago",
    amount: 89,
  },
  {
    id: "2",
    student: { name: "Emma Wilson", email: "emma@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" },
    course: "Data Science & Machine Learning",
    date: "4 hours ago",
    amount: 129,
  },
  {
    id: "3",
    student: { name: "Michael Brown", email: "michael@example.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    course: "UI/UX Design Masterclass",
    date: "6 hours ago",
    amount: 79,
  },
  {
    id: "4",
    student: { name: "Sarah Davis", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
    course: "Advanced React & TypeScript",
    date: "8 hours ago",
    amount: 99,
  },
];

// Mock top courses
const topCourses = [
  { id: "1", title: "Complete Web Development Bootcamp", enrollments: 4523, revenue: 402547, rating: 4.9 },
  { id: "2", title: "Data Science & Machine Learning", enrollments: 3215, revenue: 414735, rating: 4.8 },
  { id: "3", title: "UI/UX Design Masterclass", enrollments: 2845, revenue: 224755, rating: 4.9 },
  { id: "4", title: "Advanced React & TypeScript", enrollments: 1892, revenue: 187308, rating: 4.7 },
];

// Chart data (simplified)
const weeklyEnrollments = [
  { day: "Mon", count: 120 },
  { day: "Tue", count: 145 },
  { day: "Wed", count: 132 },
  { day: "Thu", count: 178 },
  { day: "Fri", count: 156 },
  { day: "Sat", count: 89 },
  { day: "Sun", count: 76 },
];

const AdminDashboard = () => {
  const maxEnrollment = Math.max(...weeklyEnrollments.map((d) => d.count));

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
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-1">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Overview of your learning platform
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button asChild>
                <Link to="/admin/courses/new">
                  <Plus className="h-4 w-4" />
                  Add Course
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <Button variant="secondary" size="sm" asChild>
              <Link to="/admin/courses">
                <BookOpen className="h-4 w-4" />
                Manage Courses
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/admin/users">
                <Users className="h-4 w-4" />
                Manage Users
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/admin/enrollments">
                <GraduationCap className="h-4 w-4" />
                Enrollments
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/admin/quizzes">
                <FileText className="h-4 w-4" />
                Quizzes
              </Link>
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
          >
            <Card variant="elevated" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <Badge variant={analyticsData.studentGrowth > 0 ? "success" : "destructive"} className="text-xs">
                  {analyticsData.studentGrowth > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {analyticsData.studentGrowth}%
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.totalStudents.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </Card>

            <Card variant="elevated" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <Badge variant="success" className="text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {analyticsData.courseGrowth}%
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.totalCourses}</p>
              <p className="text-sm text-muted-foreground">Active Courses</p>
            </Card>

            <Card variant="elevated" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <DollarSign className="h-5 w-5 text-success" />
                </div>
                <Badge variant="success" className="text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {analyticsData.revenueGrowth}%
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">${analyticsData.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </Card>

            <Card variant="elevated" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <Badge variant="success" className="text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {analyticsData.enrollmentGrowth}%
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.totalEnrollments.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Enrollments</p>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Weekly Enrollments Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card variant="elevated" className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-lg font-semibold text-foreground">
                      Weekly Enrollments
                    </h2>
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Report
                    </Button>
                  </div>
                  
                  {/* Simple Bar Chart */}
                  <div className="flex items-end justify-between h-48 gap-2">
                    {weeklyEnrollments.map((data, index) => (
                      <div key={data.day} className="flex flex-col items-center flex-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(data.count / maxEnrollment) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          className="w-full bg-primary/80 rounded-t-md min-h-[20px] relative group cursor-pointer hover:bg-primary transition-colors"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {data.count} enrollments
                          </div>
                        </motion.div>
                        <span className="text-xs text-muted-foreground mt-2">{data.day}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Recent Enrollments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card variant="elevated" className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-lg font-semibold text-foreground">
                      Recent Enrollments
                    </h2>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/admin/enrollments">View All</Link>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {recentEnrollments.map((enrollment) => (
                      <div
                        key={enrollment.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={enrollment.student.avatar}
                            alt={enrollment.student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {enrollment.student.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {enrollment.course}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground text-sm">
                            ${enrollment.amount}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {enrollment.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card variant="elevated" className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-semibold text-foreground">
                      Top Courses
                    </h3>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/admin/courses">View All</Link>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {topCourses.map((course, index) => (
                      <div key={course.id} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground line-clamp-1">
                            {course.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{course.enrollments.toLocaleString()} enrolled</span>
                            <span>•</span>
                            <span>${course.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card variant="elevated" className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-warning" />
                        <span className="text-sm text-muted-foreground">Certificates Issued</span>
                      </div>
                      <span className="font-semibold text-foreground">8,432</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Quizzes Completed</span>
                      </div>
                      <span className="font-semibold text-foreground">24,156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">Active Today</span>
                      </div>
                      <span className="font-semibold text-foreground">1,234</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card variant="elevated" className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-success mt-1.5" />
                      <div>
                        <p className="text-foreground">New course published</p>
                        <p className="text-xs text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                      <div>
                        <p className="text-foreground">25 new enrollments</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-warning mt-1.5" />
                      <div>
                        <p className="text-foreground">Quiz graded automatically</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
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

export default AdminDashboard;
