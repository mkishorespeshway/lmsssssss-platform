import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Plus, Trash2, GripVertical, Save, Eye, Video, Image, User } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



interface Video {
  url: string;
  title: string;
  description: string;
}

interface LevelVideoData {
  videos: Video[];
  videoDuration: string;
}

interface LevelVideos {
  Beginner: LevelVideoData;
  Intermediate: LevelVideoData;
  Advanced: LevelVideoData;
}

interface Instructor {
  _id: string;
  name: string;
  title: string;
  category: string;
  image: string;
  levelVideos: LevelVideos;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface Lesson {
  id: string;
  videoTitle: string;
  duration: string;
  videoUrl: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

const AdminNewCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnailUrl: "",
    instructorId: "",
    videoDuration: "",
    videoTitles: [],
    videoDescriptions: [],
    videoUrls: [],
  });
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const category = courseData.category;
        const url = category ? `/api/instructors?category=${category}` : "/api/instructors";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInstructors(data);
      } catch (err: unknown) {
        let errorMessage = "An unknown error occurred";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        toast({
          title: "Error fetching instructors",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, [courseData.category]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/analytics/overview");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (err: unknown) {
        let errorMessage = "An unknown error occurred";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        toast({
          title: "Error fetching categories",
          description: errorMessage,
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, []);
  
  const [sections, setSections] = useState<Section[]>([
    { id: "1", title: "Getting Started", lessons: [{ id: "1-1", videoTitle: "", duration: "", videoUrl: "" }] },
  ]);

  const addSection = () => {
    const newId = (sections.length + 1).toString();
    setSections([...sections, { id: newId, title: "", lessons: [{ id: `${newId}-1`, videoTitle: "", duration: "", videoUrl: "" }] }]);
  };

  const addLesson = (sectionId: string) => {
    setSections(sections.map((s) => {
      if (s.id === sectionId) {
        const newLessonId = `${sectionId}-${s.lessons.length + 1}`;
        return { ...s, lessons: [...s.lessons, { id: newLessonId, videoTitle: "", duration: "", videoUrl: "" }] };
      }
      return s;
    }));
  };

  const removeSection = (sectionId: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== sectionId));
    }
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    setSections(sections.map((s) => {
      if (s.id === sectionId && s.lessons.length > 1) {
        return { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) };
      }
      return s;
    }));
  };

  const updateLesson = (sectionIndex: number, lessonIndex: number, field: "videoTitle" | "duration" | "videoUrl", value: string) => {
    const updated = [...sections];
    updated[sectionIndex].lessons[lessonIndex] = {
      ...updated[sectionIndex].lessons[lessonIndex],
      [field]: value,
    };
    setSections(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseData.instructorId) {
      toast({ title: "Please select an instructor", variant: "destructive" });
      return;
    }
    toast({ title: "Course created!", description: "Your new course has been saved as a draft." });
    navigate("/admin/courses");
  };

  const selectedInstructor = instructors.find((i) => i._id === courseData.instructorId);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading instructors...</p>
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <Button variant="ghost" size="sm" asChild className="mb-2">
                  <Link to="/admin/courses"><ArrowLeft className="h-4 w-4" />Back to Courses</Link>
                </Button>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">Create New Course</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="outline"><Eye className="h-4 w-4" />Preview</Button>
                <Button onClick={handleSubmit}><Save className="h-4 w-4" />Save Course</Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <Card variant="elevated" className="p-6">
                <h2 className="font-heading text-lg font-semibold mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" placeholder="e.g., Complete Web Development Bootcamp" value={courseData.title} onChange={(e) => setCourseData({ ...courseData, title: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe what students will learn..." rows={4} value={courseData.description} onChange={(e) => setCourseData({ ...courseData, description: e.target.value })} required />
                  </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={courseData.category} onValueChange={(value) => setCourseData({ ...courseData, category: value })}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select value={courseData.level} onValueChange={(value) => setCourseData({ ...courseData, level: value })}>
                      <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                      <SelectContent>
                        {selectedInstructor ? (
                          Object.entries(selectedInstructor.levelVideos).map(([level, data]) => (
                            data.videos.length > 0 && (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            )
                          ))
                        ) : (
                          <>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" placeholder="e.g., $99.99" value={courseData.price} onChange={(e) => setCourseData({ ...courseData, price: e.target.value })} />
                  </div>
                </div>
                </div>
              </Card>

              {/* Instructor Selection */}
              <Card variant="elevated" className="p-6">
                <h2 className="font-heading text-lg font-semibold mb-4">Course Instructor</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Instructor</Label>
                    <Select value={courseData.instructorId} onValueChange={(value) => {
                      const selected = instructors.find(i => i._id === value);
                      if (selected) {
                        const selectedLevelVideos = selected.levelVideos[selected.level];
                        setCourseData({
                          ...courseData,
                          instructorId: value,
                          level: selected.level,
                          title: selected.title,
                          description: selectedLevelVideos?.videos[0]?.description || "",
                          videoDuration: selectedLevelVideos?.videoDuration || "",
                          videoTitles: selectedLevelVideos?.videos.map(video => video.title) || [],
                          videoDescriptions: selectedLevelVideos?.videos.map(video => video.description) || [],
                          videoUrls: selectedLevelVideos?.videos.map(video => video.url) || [],
                        });

                        if (selectedLevelVideos && selectedLevelVideos.videos.length > 0) {
                          const updatedSections = sections.map((section, sIndex) => {
                            return {
                              ...section,
                              lessons: section.lessons.map((lesson, lIndex) => {
                                const videoIndex = sIndex * section.lessons.length + lIndex;
                                return {
                                  ...lesson,
                                  videoTitle: selectedLevelVideos.videos[videoIndex]?.title || "",
                                  duration: selectedLevelVideos.videoDuration || "",
                                  videoUrl: selectedLevelVideos.videos[videoIndex]?.url || "",
                                };
                              }),
                            };
                          });
                          setSections(updatedSections);
                        }
                      }
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {instructors.map((instructor) => (
                          <SelectItem key={instructor._id} value={instructor._id}>
                            <div className="flex items-center gap-2">
                              <img src={instructor.image} alt={instructor.name} className="w-6 h-6 rounded-full object-cover" />
                              <span>{instructor.name}</span>
                              <span className="text-muted-foreground">- {instructor.category}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedInstructor && (
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <img src={selectedInstructor.image} alt={selectedInstructor.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-foreground">{selectedInstructor.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedInstructor.category}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Thumbnail */}
              <Card variant="elevated" className="p-6">
                <h2 className="font-heading text-lg font-semibold mb-4">Course Thumbnail</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="thumbnailUrl" 
                        placeholder="https://example.com/image.jpg" 
                        value={courseData.thumbnailUrl} 
                        onChange={(e) => setCourseData({ ...courseData, thumbnailUrl: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended size: 1280x720 pixels</p>
                  </div>
                  
                  {courseData.thumbnailUrl && (
                    <div className="relative aspect-video max-w-md rounded-lg overflow-hidden border border-border">
                      <img 
                        src={courseData.thumbnailUrl} 
                        alt="Course thumbnail preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1280&h=720&fit=crop";
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Or drag and drop an image file</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </Card>

              {/* Course Content */}
              <Card variant="elevated" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-lg font-semibold">Course Content</h2>
                  <Button type="button" variant="outline" size="sm" onClick={addSection}><Plus className="h-4 w-4" />Add Section</Button>
                </div>

                <div className="space-y-6">
                  {sections.map((section, sIndex) => (
                    <div key={section.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                        <Input 
                          placeholder="Section title (e.g., Getting Started)" 
                          value={section.title} 
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[sIndex].title = e.target.value;
                            setSections(updated);
                          }} 
                          className="flex-1 font-medium" 
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeSection(section.id)}
                          disabled={sections.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="space-y-3 ml-8">
                        {section.lessons.map((lesson, lIndex) => (
                          <div key={lesson.id} className="space-y-2 p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                              <span className="text-xs font-medium text-muted-foreground w-16">Lesson {lIndex + 1}</span>
                              <Input 
                                placeholder="Video title" 
                                value={lesson.videoTitle} 
                                onChange={(e) => updateLesson(sIndex, lIndex, "videoTitle", e.target.value)} 
                                className="flex-1" 
                              />
                              <Input 
                                placeholder="Duration (e.g., 15:00)" 
                                value={lesson.duration} 
                                onChange={(e) => updateLesson(sIndex, lIndex, "duration", e.target.value)} 
                                className="w-28" 
                              />
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeLesson(section.id, lesson.id)}
                                disabled={section.lessons.length === 1}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 ml-6">
                              <Video className="h-4 w-4 text-muted-foreground" />
                              <Input 
                                placeholder="Video URL (e.g., https://youtube.com/watch?v=...)" 
                                value={lesson.videoUrl} 
                                onChange={(e) => updateLesson(sIndex, lIndex, "videoUrl", e.target.value)} 
                                className="flex-1" 
                              />
                            </div>
                          </div>
                        ))}
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => addLesson(section.id)} 
                          className="ml-6"
                        >
                          <Plus className="h-4 w-4" />
                          Add Lesson
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Submit */}
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" asChild><Link to="/admin/courses">Cancel</Link></Button>
                <Button type="submit" variant="hero"><Save className="h-4 w-4" />Create Course</Button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminNewCourse;