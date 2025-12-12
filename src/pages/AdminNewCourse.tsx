import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Plus, Trash2, GripVertical, Save, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminNewCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: "",
  });
  const [sections, setSections] = useState([
    { id: "1", title: "Getting Started", lessons: [{ id: "1-1", title: "", duration: "" }] },
  ]);

  const addSection = () => {
    const newId = (sections.length + 1).toString();
    setSections([...sections, { id: newId, title: "", lessons: [{ id: `${newId}-1`, title: "", duration: "" }] }]);
  };

  const addLesson = (sectionId: string) => {
    setSections(sections.map((s) => {
      if (s.id === sectionId) {
        const newLessonId = `${sectionId}-${s.lessons.length + 1}`;
        return { ...s, lessons: [...s.lessons, { id: newLessonId, title: "", duration: "" }] };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Course created!", description: "Your new course has been saved as a draft." });
    navigate("/admin/courses");
  };

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
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={courseData.category} onValueChange={(value) => setCourseData({ ...courseData, category: value })}>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="mobile">Mobile Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Level</Label>
                      <Select value={courseData.level} onValueChange={(value) => setCourseData({ ...courseData, level: value })}>
                        <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" type="number" placeholder="0 for free" value={courseData.price} onChange={(e) => setCourseData({ ...courseData, price: e.target.value })} />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Thumbnail */}
              <Card variant="elevated" className="p-6">
                <h2 className="font-heading text-lg font-semibold mb-4">Course Thumbnail</h2>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB (Recommended: 1280x720)</p>
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
                        <Input placeholder="Section title" value={section.title} onChange={(e) => {
                          const updated = [...sections];
                          updated[sIndex].title = e.target.value;
                          setSections(updated);
                        }} className="flex-1" />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeSection(section.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>

                      <div className="space-y-2 ml-8">
                        {section.lessons.map((lesson, lIndex) => (
                          <div key={lesson.id} className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            <Input placeholder="Lesson title" value={lesson.title} onChange={(e) => {
                              const updated = [...sections];
                              updated[sIndex].lessons[lIndex].title = e.target.value;
                              setSections(updated);
                            }} className="flex-1" />
                            <Input placeholder="Duration" value={lesson.duration} onChange={(e) => {
                              const updated = [...sections];
                              updated[sIndex].lessons[lIndex].duration = e.target.value;
                              setSections(updated);
                            }} className="w-24" />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeLesson(section.id, lesson.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </div>
                        ))}
                        <Button type="button" variant="ghost" size="sm" onClick={() => addLesson(section.id)} className="ml-6"><Plus className="h-4 w-4" />Add Lesson</Button>
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
