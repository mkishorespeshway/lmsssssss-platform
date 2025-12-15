import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  User,
  Search,
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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

interface Instructor {
  _id: string;
  name: string;
  title: string;
  category: string;
  image: string;
  videoUrls: string[];
  videoTitles: string[];
  videoDescriptions: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  videoDuration: string;
}

const AdminInstructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState<Instructor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await fetch("/api/instructors");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInstructors(data);
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      toast({ title: "Error fetching instructors", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddInstructor = () => {
    setCurrentInstructor(null);
    setIsModalOpen(true);
  };

  const handleEditInstructor = (instructor: Instructor) => {
    setCurrentInstructor(instructor);
    setIsModalOpen(true);
  };

  const handleDeleteInstructor = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this instructor?")) return;
    try {
      const response = await fetch(`/api/instructors/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast({ title: "Instructor deleted successfully" });
      fetchInstructors();
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({ title: "Error deleting instructor", description: errorMessage, variant: "destructive" });
    }
  };

  const handleSaveInstructor = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const instructorData = {
      name: formData.get("name") as string,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      image: formData.get("image") as string,
      videoUrls: (formData.get("videoUrls") as string)?.split(',').map(url => url.trim()).filter(url => url !== '') || [],
      videoTitles: (formData.get("videoTitles") as string)?.split(',').map(title => title.trim()).filter(title => title !== '') || [],
      videoDescriptions: (formData.get("videoDescriptions") as string)?.split(',').map(desc => desc.trim()).filter(desc => desc !== '') || [],
      level: formData.get("level") as "Beginner" | "Intermediate" | "Advanced",
      videoDuration: formData.get("videoDuration") as string,
    };

    try {
      const method = currentInstructor ? "PUT" : "POST";
      const url = currentInstructor ? `/api/instructors/${currentInstructor._id}` : "/api/instructors";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(instructorData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({ title: `Instructor ${currentInstructor ? "updated" : "added"} successfully` });
      setIsModalOpen(false);
      fetchInstructors();
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({ title: `Error ${currentInstructor ? "updating" : "adding"} instructor`, description: errorMessage, variant: "destructive" });
    }
  };

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  Instructor Management
                </h1>
                <p className="text-muted-foreground">
                  Manage your platform's instructors
                </p>
              </div>
              <Button onClick={handleAddInstructor}>
                <Plus className="h-4 w-4 mr-2" />
                Add Instructor
              </Button>
            </div>

            <Card variant="elevated" className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search instructors..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInstructors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No instructors found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInstructors.map((instructor) => (
                      <TableRow key={instructor._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={instructor.image || "https://via.placeholder.com/40"}
                              alt={instructor.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <p className="font-medium text-foreground">
                              {instructor.name}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{instructor.title}</TableCell>
                        <TableCell>{instructor.category}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditInstructor(instructor)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteInstructor(instructor._id)} className="text-destructive focus:text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentInstructor ? "Edit Instructor" : "Add New Instructor"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveInstructor} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={currentInstructor?.name || ""}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="courseTitle" className="text-right">
                Course title
              </Label>
              <Input
                id="courseTitle"
                name="title"
                defaultValue={currentInstructor?.title || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                defaultValue={currentInstructor?.category || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Level
              </Label>
              <Select
                name="level"
                defaultValue={currentInstructor?.level || "Beginner"}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                defaultValue={currentInstructor?.image || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoDuration" className="text-right">
                Video Duration
              </Label>
              <Input
                id="videoDuration"
                name="videoDuration"
                defaultValue={currentInstructor?.videoDuration || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoUrls" className="text-right">
                Video URLs (comma-separated)
              </Label>
              <Input
                id="videoUrls"
                name="videoUrls"
                defaultValue={currentInstructor?.videoUrls.join(", ") || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoTitles" className="text-right">
                Video Titles (comma-separated)
              </Label>
              <Input
                id="videoTitles"
                name="videoTitles"
                defaultValue={currentInstructor?.videoTitles.join(", ") || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoDescriptions" className="text-right">
                Video Descriptions (comma-separated)
              </Label>
              <Input
                id="videoDescriptions"
                name="videoDescriptions"
                defaultValue={currentInstructor?.videoDescriptions.join(", ") || ""}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInstructors;
