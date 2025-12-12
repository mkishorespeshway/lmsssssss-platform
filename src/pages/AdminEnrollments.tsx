import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  ArrowLeft,
  MoreVertical,
  Eye,
  Mail,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const enrollments = [
  {
    id: "1",
    student: { name: "John Smith", email: "john@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    course: "Complete Web Development Bootcamp",
    enrolledDate: "2024-01-15",
    progress: 75,
    status: "active",
    amount: 89,
  },
  {
    id: "2",
    student: { name: "Emma Wilson", email: "emma@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" },
    course: "Data Science & Machine Learning",
    enrolledDate: "2024-01-14",
    progress: 45,
    status: "active",
    amount: 129,
  },
  {
    id: "3",
    student: { name: "Michael Brown", email: "michael@example.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    course: "UI/UX Design Masterclass",
    enrolledDate: "2024-01-13",
    progress: 100,
    status: "completed",
    amount: 79,
  },
  {
    id: "4",
    student: { name: "Sarah Davis", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
    course: "Advanced React & TypeScript",
    enrolledDate: "2024-01-12",
    progress: 20,
    status: "active",
    amount: 99,
  },
  {
    id: "5",
    student: { name: "David Lee", email: "david@example.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
    course: "Python for Beginners",
    enrolledDate: "2024-01-11",
    progress: 60,
    status: "active",
    amount: 59,
  },
  {
    id: "6",
    student: { name: "Lisa Johnson", email: "lisa@example.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" },
    course: "Complete Web Development Bootcamp",
    enrolledDate: "2024-01-10",
    progress: 90,
    status: "active",
    amount: 89,
  },
  {
    id: "7",
    student: { name: "James Wilson", email: "james@example.com", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face" },
    course: "Digital Marketing Fundamentals",
    enrolledDate: "2024-01-09",
    progress: 0,
    status: "expired",
    amount: 69,
  },
  {
    id: "8",
    student: { name: "Anna Martinez", email: "anna@example.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" },
    course: "UI/UX Design Masterclass",
    enrolledDate: "2024-01-08",
    progress: 35,
    status: "active",
    amount: 79,
  },
];

const stats = [
  { label: "Total Enrollments", value: "28,340", icon: Users, change: "+15.7%", positive: true },
  { label: "This Month", value: "2,456", icon: Calendar, change: "+8.2%", positive: true },
  { label: "Total Revenue", value: "$245,680", icon: DollarSign, change: "+18.3%", positive: true },
  { label: "Completion Rate", value: "68%", icon: TrendingUp, change: "+5.4%", positive: true },
];

const AdminEnrollments = () => {
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
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/admin">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  Enrollments
                </h1>
                <p className="text-muted-foreground">
                  Manage and track all student enrollments
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat) => (
              <Card key={stat.label} variant="elevated" className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant={stat.positive ? "success" : "destructive"} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by student or course..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="web">Web Development</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
                <SelectItem value="design">UI/UX Design</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </motion.div>

          {/* Enrollments Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card variant="elevated">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Enrolled Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={enrollment.student.avatar}
                            alt={enrollment.student.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">
                              {enrollment.student.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {enrollment.student.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-foreground max-w-[200px] truncate">
                          {enrollment.course}
                        </p>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(enrollment.enrolledDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${enrollment.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {enrollment.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            enrollment.status === "completed"
                              ? "success"
                              : enrollment.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        ${enrollment.amount}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </motion.div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-between mt-6"
          >
            <p className="text-sm text-muted-foreground">
              Showing 1-8 of 28,340 enrollments
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminEnrollments;
