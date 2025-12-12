import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  List,
  X,
  Lock,
  Clock,
  FileText,
  MessageSquare,
  Download,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

// Mock lesson data
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp 2024",
  sections: [
    {
      id: "1",
      title: "Getting Started",
      lessons: [
        { id: "1-1", title: "Welcome to the Course", duration: "5:30", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
        { id: "1-2", title: "Setting Up Your Environment", duration: "12:45", completed: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
        { id: "1-3", title: "Understanding Web Development", duration: "8:20", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
      ],
    },
    {
      id: "2",
      title: "HTML Fundamentals",
      lessons: [
        { id: "2-1", title: "Introduction to HTML", duration: "10:15", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
        { id: "2-2", title: "HTML Document Structure", duration: "15:30", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
        { id: "2-3", title: "Working with Text Elements", duration: "12:00", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
      ],
    },
    {
      id: "3",
      title: "CSS Styling",
      lessons: [
        { id: "3-1", title: "Introduction to CSS", duration: "11:30", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
        { id: "3-2", title: "Selectors and Properties", duration: "16:15", completed: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
      ],
    },
  ],
};

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [bookmarks, setBookmarks] = useState<{ time: number; label: string }[]>([]);
  const [showBookmarkInput, setShowBookmarkInput] = useState(false);
  const [bookmarkLabel, setBookmarkLabel] = useState("");

  // Find current lesson
  const allLessons = courseData.sections.flatMap((section) =>
    section.lessons.map((lesson) => ({ ...lesson, sectionTitle: section.title }))
  );
  const currentLessonIndex = allLessons.findIndex((l) => l.id === (lessonId || "1-1"));
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const completedCount = allLessons.filter((l) => l.completed).length;
  const progressPercent = (completedCount / allLessons.length) * 100;

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const addBookmark = () => {
    if (bookmarkLabel.trim()) {
      setBookmarks([...bookmarks, { time: currentTime, label: bookmarkLabel }]);
      setBookmarkLabel("");
      setShowBookmarkInput(false);
      toast({
        title: "Bookmark added",
        description: `Bookmark "${bookmarkLabel}" added at ${formatTime(currentTime)}`,
      });
    }
  };

  const goToBookmark = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const markAsComplete = () => {
    toast({
      title: "Lesson completed!",
      description: "Great job! Moving to the next lesson.",
    });
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <div className="flex">
          {/* Main Content */}
          <div className={`flex-1 ${showSidebar ? "lg:mr-80" : ""}`}>
            {/* Video Player */}
            <div className="relative bg-black aspect-video">
              <video
                ref={videoRef}
                src={currentLesson.videoUrl}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />

              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div className="relative mb-3">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  {/* Bookmark markers */}
                  {bookmarks.map((bookmark, index) => (
                    <div
                      key={index}
                      className="absolute top-0 w-2 h-2 bg-warning rounded-full cursor-pointer transform -translate-y-1/2"
                      style={{ left: `${(bookmark.time / duration) * 100}%` }}
                      onClick={() => goToBookmark(bookmark.time)}
                      title={bookmark.label}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => skip(-10)} className="text-white hover:bg-white/20">
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20 h-12 w-12">
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => skip(10)} className="text-white hover:bg-white/20">
                      <SkipForward className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    <span className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowBookmarkInput(true)}
                      className="text-white hover:bg-white/20"
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bookmark Input Modal */}
              <AnimatePresence>
                {showBookmarkInput && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card p-4 rounded-lg shadow-xl border border-border"
                  >
                    <h3 className="font-semibold mb-2">Add Bookmark</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      At {formatTime(currentTime)}
                    </p>
                    <input
                      type="text"
                      placeholder="Bookmark label..."
                      value={bookmarkLabel}
                      onChange={(e) => setBookmarkLabel(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md mb-3 bg-background"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={addBookmark}>Add</Button>
                      <Button size="sm" variant="outline" onClick={() => setShowBookmarkInput(false)}>Cancel</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Lesson Info */}
            <div className="p-6">
              <div className="max-w-4xl">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-primary mb-1">{currentLesson.sectionTitle}</p>
                    <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
                      {currentLesson.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {currentLesson.duration}
                      </span>
                    </div>
                  </div>
                  <Button variant="success" onClick={markAsComplete}>
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Complete
                  </Button>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-6">
                  {prevLesson ? (
                    <Button variant="ghost" asChild>
                      <Link to={`/courses/${courseId}/learn/${prevLesson.id}`}>
                        <ChevronLeft className="h-4 w-4" />
                        Previous: {prevLesson.title}
                      </Link>
                    </Button>
                  ) : (
                    <div />
                  )}
                  {nextLesson ? (
                    <Button variant="default" asChild>
                      <Link to={`/courses/${courseId}/learn/${nextLesson.id}`}>
                        Next: {nextLesson.title}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="default" asChild>
                      <Link to={`/courses/${courseId}/quiz`}>
                        Take Quiz
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Bookmarks */}
                {bookmarks.length > 0 && (
                  <Card variant="outline" className="p-4 mb-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <BookmarkCheck className="h-4 w-4 text-warning" />
                      Your Bookmarks
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {bookmarks.map((bookmark, index) => (
                        <Button
                          key={index}
                          variant="secondary"
                          size="sm"
                          onClick={() => goToBookmark(bookmark.time)}
                        >
                          {formatTime(bookmark.time)} - {bookmark.label}
                        </Button>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Tabs */}
                <div className="flex gap-4 border-b border-border mb-6">
                  <button className="pb-3 border-b-2 border-primary text-primary font-medium">
                    Overview
                  </button>
                  <button className="pb-3 text-muted-foreground hover:text-foreground">
                    Resources
                  </button>
                  <button className="pb-3 text-muted-foreground hover:text-foreground">
                    Q&A
                  </button>
                  <button className="pb-3 text-muted-foreground hover:text-foreground">
                    Notes
                  </button>
                </div>

                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p>
                    In this lesson, you'll learn about {currentLesson.title.toLowerCase()}. 
                    This is a fundamental concept that will help you build a strong foundation 
                    for your web development journey.
                  </p>
                  <p>
                    Make sure to follow along with the code examples and practice on your own. 
                    Don't hesitate to add bookmarks to important sections so you can easily 
                    revisit them later.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <AnimatePresence>
            {showSidebar && (
              <motion.aside
                initial={{ x: 320 }}
                animate={{ x: 0 }}
                exit={{ x: 320 }}
                transition={{ duration: 0.3 }}
                className="fixed right-0 top-16 bottom-0 w-80 bg-card border-l border-border overflow-y-auto z-40 hidden lg:block"
              >
                {/* Course Progress */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {completedCount}/{allLessons.length}
                    </span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>

                {/* Lessons List */}
                <div className="p-4">
                  <h3 className="font-semibold mb-4">Course Content</h3>
                  {courseData.sections.map((section) => (
                    <div key={section.id} className="mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        {section.title}
                      </h4>
                      <div className="space-y-1">
                        {section.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/courses/${courseId}/learn/${lesson.id}`}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                              lesson.id === currentLesson.id
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted"
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{lesson.title}</p>
                              <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Toggle Sidebar Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSidebar(!showSidebar)}
            className="fixed right-4 bottom-4 z-50 lg:hidden"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default LessonPlayer;
