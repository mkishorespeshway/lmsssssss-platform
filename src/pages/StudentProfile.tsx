import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Clock,
  Edit,
  Camera,
  Save,
  Download,
  Eye,
  CheckCircle2,
  Play,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const mockUser = {
  id: "1",
  name: "Alex Thompson",
  email: "alex.thompson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate learner focused on web development and data science. Always eager to learn new technologies and improve my skills.",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  joinDate: "January 2024",
  coursesEnrolled: 5,
  coursesCompleted: 2,
  certificatesEarned: 2,
  totalHoursLearned: 124,
};

// Mock certificates
const certificates = [
  {
    id: "1",
    courseName: "UI/UX Design Masterclass",
    instructor: "Emma Williams",
    completedDate: "March 15, 2024",
    certificateId: "CERT-UX-2024-001",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
  },
  {
    id: "2",
    courseName: "Introduction to Python",
    instructor: "Dr. Michael Chen",
    completedDate: "February 28, 2024",
    certificateId: "CERT-PY-2024-002",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop",
  },
];

// Mock learning history
const learningHistory = [
  {
    id: "1",
    action: "Completed Lesson",
    courseName: "Complete Web Development Bootcamp",
    lessonName: "CSS Grid Mastery",
    date: "Today, 2:30 PM",
    duration: "45 min",
  },
  {
    id: "2",
    action: "Started Quiz",
    courseName: "Data Science & Machine Learning",
    lessonName: "Module 3 Quiz",
    date: "Today, 11:00 AM",
    duration: "20 min",
  },
  {
    id: "3",
    action: "Watched Video",
    courseName: "Complete Web Development Bootcamp",
    lessonName: "JavaScript ES6 Features",
    date: "Yesterday, 4:15 PM",
    duration: "32 min",
  },
  {
    id: "4",
    action: "Earned Certificate",
    courseName: "UI/UX Design Masterclass",
    lessonName: "",
    date: "March 15, 2024",
    duration: "",
  },
  {
    id: "5",
    action: "Completed Course",
    courseName: "Introduction to Python",
    lessonName: "",
    date: "February 28, 2024",
    duration: "",
  },
];

// Mock enrolled courses
const enrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
    instructor: "Sarah Johnson",
    progress: 65,
    totalLessons: 156,
    completedLessons: 101,
    lastAccessed: "2 hours ago",
  },
  {
    id: "2",
    title: "Data Science & Machine Learning",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    instructor: "Dr. Michael Chen",
    progress: 32,
    totalLessons: 180,
    completedLessons: 58,
    lastAccessed: "1 day ago",
  },
  {
    id: "3",
    title: "UI/UX Design Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    instructor: "Emma Williams",
    progress: 100,
    totalLessons: 98,
    completedLessons: 98,
    lastAccessed: "March 15, 2024",
  },
];

const StudentProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    location: mockUser.location,
    bio: mockUser.bio,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card variant="elevated" className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-1">
                        {formData.name}
                      </h1>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Member since {mockUser.joinDate}
                      </p>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{mockUser.coursesEnrolled}</p>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{mockUser.coursesCompleted}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{mockUser.certificatesEarned}</p>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{mockUser.totalHoursLearned}h</p>
                  <p className="text-sm text-muted-foreground">Learning Time</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card variant="elevated" className="p-6">
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
                    Personal Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Certificates Tab */}
              <TabsContent value="certificates" className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {certificates.map((cert) => (
                    <Card key={cert.id} variant="elevated" className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={cert.thumbnail}
                          alt={cert.courseName}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <Badge className="absolute top-3 right-3" variant="success">
                          <Award className="h-3 w-3 mr-1" />
                          Certified
                        </Badge>
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading font-semibold text-foreground mb-1">
                          {cert.courseName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Instructor: {cert.instructor}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Completed: {cert.completedDate}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Certificate ID: {cert.certificateId}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" asChild>
                            <Link to={`/courses/${cert.id}/certificate`}>
                              <Eye className="h-4 w-4" />
                              View
                            </Link>
                          </Button>
                          <Button variant="default" size="sm" className="flex-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                {certificates.length === 0 && (
                  <Card variant="elevated" className="p-12 text-center">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      No Certificates Yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Complete a course to earn your first certificate!
                    </p>
                    <Button asChild>
                      <Link to="/courses">Browse Courses</Link>
                    </Button>
                  </Card>
                )}
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses" className="space-y-6">
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} variant="elevated" className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full sm:w-40 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground line-clamp-1">
                                  {course.title}
                                </h3>
                                {course.progress === 100 && (
                                  <Badge variant="success">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                By {course.instructor}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Last accessed: {course.lastAccessed}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              {course.progress === 100 ? (
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/courses/${course.id}/certificate`}>
                                    <Award className="h-4 w-4" />
                                    Certificate
                                  </Link>
                                </Button>
                              ) : (
                                <Button variant="default" size="sm" asChild>
                                  <Link to={`/courses/${course.id}/learn`}>
                                    <Play className="h-4 w-4" />
                                    Continue
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>
                                {course.completedLessons} / {course.totalLessons} lessons
                              </span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-6">
                <Card variant="elevated" className="p-6">
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
                    Learning Activity
                  </h2>
                  <div className="space-y-4">
                    {learningHistory.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                      >
                        <div
                          className={`p-2 rounded-lg h-fit ${
                            item.action === "Earned Certificate"
                              ? "bg-warning/10 text-warning"
                              : item.action === "Completed Course"
                              ? "bg-success/10 text-success"
                              : item.action === "Completed Lesson"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.action === "Earned Certificate" ? (
                            <Award className="h-4 w-4" />
                          ) : item.action === "Completed Course" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : item.action === "Completed Lesson" ? (
                            <BookOpen className="h-4 w-4" />
                          ) : item.action === "Started Quiz" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm">
                            {item.action}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {item.courseName}
                            {item.lessonName && ` - ${item.lessonName}`}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span>{item.date}</span>
                            {item.duration && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.duration}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentProfile;
