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
import { useEffect, useState } from "react";
import axios from "axios";

interface AnalyticsData {
  totalStudents: number;
  studentGrowth: number;
  totalCourses: number;
  courseGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  totalEnrollments: number;
  enrollmentGrowth: number;
  totalInstructors: number;
  instructorGrowth: number;
  categories: string[];
}

const initialAnalyticsData: AnalyticsData = {
  totalStudents: 0,
  studentGrowth: 0,
  totalCourses: 0,
  courseGrowth: 0,
  totalRevenue: 0,
  revenueGrowth: 0,
  totalEnrollments: 0,
  enrollmentGrowth: 0,
  totalInstructors: 0,
  instructorGrowth: 0,
  categories: []
};

const recentEnrollments: Array<{
  id: string;
  student: { name: string; email: string; avatar: string };
  course: string;
  date: string;
  amount: number;
}> = [];

const topCourses: Array<{
  id: string;
  title: string;
  enrollments: number;
  revenue: number;
  rating: number;
}> = [];

const weeklyEnrollments: Array<{ day: string; count: number }> = [];
const recentActivity: Array<{ id: string; title: string; time: string; tone?: "success" | "primary" | "warning" }> = [];

const AdminDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(initialAnalyticsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/analytics/overview");
        setAnalyticsData(response.data);
      } catch (err) {
        setError("Failed to fetch analytics data.");
        console.error("Error fetching analytics data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const maxEnrollment = weeklyEnrollments.length ? Math.max(...weeklyEnrollments.map((d) => d.count)) : 0;

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
              <Link to="/admin/enrollments">
                <Users className="h-4 w-4" />
                Enrollments
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/admin/instructors">
                <GraduationCap className="h-4 w-4" />
                Manage Instructors
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
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.categories.length}</p>
              <p className="text-sm text-muted-foreground">Total Categories</p>
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

            <Card variant="elevated" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <GraduationCap className="h-5 w-5 text-info" />
                </div>
                <Badge variant="success" className="text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {analyticsData.instructorGrowth}%
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{analyticsData.totalInstructors.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Instructors</p>
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
                  
                  {weeklyEnrollments.length === 0 ? (
                    <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                      No enrollment data
                    </div>
                  ) : (
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
                  )}
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
                    {recentEnrollments.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No recent enrollments</p>
                    ) : (
                      recentEnrollments.map((enrollment) => (
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
                      ))
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Categories List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Card variant="elevated" className="p-5">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {analyticsData.categories.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No categories found.</p>
                    ) : (
                      analyticsData.categories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {category}
                        </Badge>
                      ))
                    )}
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
                    {topCourses.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No top courses</p>
                    ) : (
                      topCourses.map((course, index) => (
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
                      ))
                    )}
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
                      <span className="font-semibold text-foreground">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Quizzes Completed</span>
                      </div>
                      <span className="font-semibold text-foreground">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">Active Today</span>
                      </div>
                      <span className="font-semibold text-foreground">0</span>
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
                    {recentActivity.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No recent activity</p>
                    ) : (
                      recentActivity.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${
                            item.tone === "success" ? "bg-success" : item.tone === "warning" ? "bg-warning" : "bg-primary"
                          }`} />
                          <div>
                            <p className="text-foreground">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                        </div>
                      ))
                    )}
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
