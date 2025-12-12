import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  Star,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const courses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2024",
    category: "Web Development",
    instructor: "Sarah Johnson",
    students: 45230,
    rating: 4.9,
    price: 89,
    status: "Published",
    createdAt: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=45&fit=crop",
  },
  {
    id: "2",
    title: "Data Science & Machine Learning with Python",
    category: "Data Science",
    instructor: "Dr. Michael Chen",
    students: 32150,
    rating: 4.8,
    price: 129,
    status: "Published",
    createdAt: "2024-02-20",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=45&fit=crop",
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    category: "Design",
    instructor: "Emma Williams",
    students: 28450,
    rating: 4.9,
    price: 79,
    status: "Published",
    createdAt: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=80&h=45&fit=crop",
  },
  {
    id: "4",
    title: "Advanced React & TypeScript",
    category: "Web Development",
    instructor: "Alex Turner",
    students: 18920,
    rating: 4.7,
    price: 99,
    status: "Draft",
    createdAt: "2024-04-05",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=45&fit=crop",
  },
  {
    id: "5",
    title: "Digital Marketing Fundamentals",
    category: "Marketing",
    instructor: "Lisa Martinez",
    students: 21340,
    rating: 4.6,
    price: 69,
    status: "Published",
    createdAt: "2024-04-20",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=45&fit=crop",
  },
];

const statusColors = {
  Published: "success",
  Draft: "secondary",
  Archived: "muted",
} as const;

const AdminCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Link to="/admin" className="hover:text-primary">Dashboard</Link>
                <span>/</span>
                <span>Courses</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                Course Management
              </h1>
            </div>
            <Button asChild>
              <Link to="/admin/courses/new">
                <Plus className="h-4 w-4" />
                Add New Course
              </Link>
            </Button>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
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
              <Button variant="outline">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </div>
          </motion.div>

          {/* Courses Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card variant="elevated" className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden lg:table-cell">Instructor</TableHead>
                    <TableHead className="hidden sm:table-cell">Students</TableHead>
                    <TableHead className="hidden lg:table-cell">Rating</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-16 h-9 object-cover rounded hidden sm:block"
                          />
                          <div>
                            <p className="font-medium text-foreground line-clamp-1 max-w-[200px]">
                              {course.title}
                            </p>
                            <p className="text-xs text-muted-foreground md:hidden">
                              {course.category}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{course.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {course.instructor}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {course.students.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          {course.rating}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${course.price}</TableCell>
                      <TableCell>
                        <Badge variant={statusColors[course.status as keyof typeof statusColors]}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing 1-{filteredCourses.length} of {filteredCourses.length} courses
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">1</Button>
                  <Button variant="ghost" size="sm">2</Button>
                  <Button variant="ghost" size="sm">3</Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminCourses;
