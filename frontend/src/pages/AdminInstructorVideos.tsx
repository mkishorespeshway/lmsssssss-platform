import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

const AdminInstructorVideos = () => {
  const { id } = useParams<{ id: string }>();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newVideo, setNewVideo] = useState({
    url: '',
    title: '',
    description: '',
    duration: '',
  });

  const [videoDuration, setVideoDuration] = useState<string>('');
  const [editingVideoIndex, setEditingVideoIndex] = useState<number | null>(null);
  const [editedVideoData, setEditedVideoData] = useState<Video | null>(null);

  useEffect(() => {
    fetchInstructorDetails();
  }, [id]);

  const fetchInstructorDetails = async () => {
    try {
      const response = await fetch(`/api/instructors/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched instructor data:", data);
      setInstructor(data);
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      toast({ title: "Error fetching instructor details", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async () => {
    if (!instructor || !newVideo.url || !newVideo.title || !newVideo.description || !newVideo.duration) {
      toast({ title: "Please fill all video fields", variant: "destructive" });
      return;
    }

    const currentLevel = instructor.level;
    const currentInstructorLevelVideos = instructor.levelVideos || {
      Beginner: { videos: [], videoDuration: "" },
      Intermediate: { videos: [], videoDuration: "" },
      Advanced: { videos: [], videoDuration: "" },
    };
    const currentLevelVideos = currentInstructorLevelVideos[currentLevel]?.videos || [];
    const currentLevelVideoDuration = currentInstructorLevelVideos[currentLevel]?.videoDuration || "";

    const updatedVideos = [...currentLevelVideos, { url: newVideo.url, title: newVideo.title, description: newVideo.description }];

    const updatedLevelVideos = {
      ...currentInstructorLevelVideos,
      [currentLevel]: {
        videos: updatedVideos,
        videoDuration: newVideo.duration || currentLevelVideoDuration, // Use new duration if provided, else keep existing
      },
    };

    console.log("Sending updated level videos:", updatedLevelVideos);
    try {
      const response = await fetch(`/api/instructors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ levelVideos: updatedLevelVideos }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({ title: "Video added successfully" });
      setNewVideo({ url: '', title: '', description: '', duration: '' });
      fetchInstructorDetails();
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({ title: "Error adding video", description: errorMessage, variant: "destructive" });
    }
  };

  const handleDeleteVideo = async (videoIndex: number) => {
    if (!instructor || !window.confirm("Are you sure you want to delete this video?")) return;

    const currentLevel = instructor.level;
    const currentInstructorLevelVideos = instructor.levelVideos || {
      Beginner: { videos: [], videoDuration: "" },
      Intermediate: { videos: [], videoDuration: "" },
      Advanced: { videos: [], videoDuration: "" },
    };
    const currentLevelVideos = currentInstructorLevelVideos[currentLevel]?.videos || [];
    const currentLevelVideoDuration = currentInstructorLevelVideos[currentLevel]?.videoDuration || "";

    const updatedVideos = currentLevelVideos.filter((_, i) => i !== videoIndex);

    const updatedLevelVideos = {
      ...currentInstructorLevelVideos,
      [currentLevel]: {
        videos: updatedVideos,
        videoDuration: currentLevelVideoDuration,
      },
    };

    try {
      const response = await fetch(`/api/instructors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ levelVideos: updatedLevelVideos }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({ title: "Video deleted successfully" });
      fetchInstructorDetails();
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({ title: "Error deleting video", description: errorMessage, variant: "destructive" });
    }
  };

  const handleEditVideo = (video: Video, index: number) => {
    setEditingVideoIndex(index);
    setEditedVideoData({ ...video });
  };

  const handleSaveVideo = async (videoIndex: number) => {
    if (!instructor || !editedVideoData) {
      toast({ title: "No video data to save", variant: "destructive" });
      return;
    }

    const currentLevel = instructor.level;
    const currentInstructorLevelVideos = instructor.levelVideos || {
      Beginner: { videos: [], videoDuration: "" },
      Intermediate: { videos: [], videoDuration: "" },
      Advanced: { videos: [], videoDuration: "" },
    };
    const currentLevelVideos = currentInstructorLevelVideos[currentLevel]?.videos || [];
    const currentLevelVideoDuration = currentInstructorLevelVideos[currentLevel]?.videoDuration || "";

    const updatedVideos = currentLevelVideos.map((video, i) =>
      i === videoIndex ? editedVideoData : video
    );

    const updatedLevelVideos = {
      ...currentInstructorLevelVideos,
      [currentLevel]: {
        videos: updatedVideos,
        videoDuration: currentLevelVideoDuration,
      },
    };

    try {
      const response = await fetch(`/api/instructors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ levelVideos: updatedLevelVideos }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({ title: "Video updated successfully" });
      setEditingVideoIndex(null);
      setEditedVideoData(null);
      fetchInstructorDetails();
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({ title: "Error updating video", description: errorMessage, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading instructor details...</p>
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

  if (!instructor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Instructor not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Manage Videos for {instructor.name} ({instructor.level})
          </h1>

          <Card variant="elevated" className="p-6 mb-8">
            <h2 className="font-heading text-xl font-semibold mb-4">Add New Video</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  value={newVideo.url}
                  onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                  placeholder="Enter video URL"
                />
              </div>
              <div>
                <Label htmlFor="videoTitle">Video Title</Label>
                <Input
                  id="videoTitle"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  placeholder="Enter video title"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="videoDescription">Video Description</Label>
                <Input
                  id="videoDescription"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  placeholder="Enter video description"
                />
              </div>
              <div>
                <Label htmlFor="videoDuration">Video Duration</Label>
                <Input
                  id="videoDuration"
                  value={newVideo.duration}
                  onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                  placeholder="Enter video duration (e.g., 1h 30m)"
                />
              </div>
            </div>
            <Button onClick={handleAddVideo}>
              <Plus className="h-4 w-4 mr-2" /> Add Video
            </Button>
          </Card>

          <Card variant="elevated" className="p-6">
            <h2 className="font-heading text-xl font-semibold mb-4">Existing Videos ({instructor.level})</h2>
            {instructor.levelVideos && instructor.levelVideos[instructor.level] && instructor.levelVideos[instructor.level].videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructor.levelVideos[instructor.level].videos.map((video, index) => (
                  <Card key={index} className="p-4 flex flex-col space-y-3">
                    {editingVideoIndex === index ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`edit-title-${index}`}>Title</Label>
                          <Input
                            id={`edit-title-${index}`}
                            value={editedVideoData?.title || ''}
                            onChange={(e) => setEditedVideoData(prev => prev ? { ...prev, title: e.target.value } : null)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edit-description-${index}`}>Description</Label>
                          <Input
                            id={`edit-description-${index}`}
                            value={editedVideoData?.description || ''}
                            onChange={(e) => setEditedVideoData(prev => prev ? { ...prev, description: e.target.value } : null)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edit-url-${index}`}>URL</Label>
                          <Input
                            id={`edit-url-${index}`}
                            value={editedVideoData?.url || ''}
                            onChange={(e) => setEditedVideoData(prev => prev ? { ...prev, url: e.target.value } : null)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingVideoIndex(null);
                            setEditedVideoData(null);
                          }}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={() => handleSaveVideo(index)}>
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Video className="h-12 w-12 text-primary" />
                        <h3 className="font-semibold text-lg">Lesson {index + 1}: {video.title}</h3>
                        <p className="text-sm text-muted-foreground flex-1">{video.description}</p>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditVideo(video, index)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteVideo(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No videos found for this level.</p>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminInstructorVideos;
