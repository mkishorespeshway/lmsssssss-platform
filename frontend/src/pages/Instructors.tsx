import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Star, Users, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const instructors = [
  { id: "1", name: "Sarah Johnson", title: "Senior Software Engineer", specialty: "Web Development", courses: 12, students: 125000, rating: 4.9, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { id: "2", name: "Dr. Michael Chen", title: "Data Scientist", specialty: "Data Science & ML", courses: 8, students: 89000, rating: 4.8, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { id: "3", name: "Emma Williams", title: "UX Design Lead", specialty: "UI/UX Design", courses: 6, students: 67000, rating: 4.9, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { id: "4", name: "Alex Turner", title: "Full Stack Developer", specialty: "React & TypeScript", courses: 5, students: 45000, rating: 4.7, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { id: "5", name: "Lisa Martinez", title: "Marketing Director", specialty: "Digital Marketing", courses: 9, students: 78000, rating: 4.6, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
  { id: "6", name: "James Anderson", title: "Cloud Architect", specialty: "AWS & Cloud", courses: 7, students: 56000, rating: 4.8, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { id: "7", name: "David Park", title: "iOS Developer", specialty: "Mobile Development", courses: 4, students: 34000, rating: 4.7, image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face" },
  { id: "8", name: "Robert Kim", title: "Security Engineer", specialty: "Cybersecurity", courses: 5, students: 28000, rating: 4.8, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face" },
];

const Instructors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Our Instructors</h1>
            <p className="text-lg text-muted-foreground">Learn from industry experts with real-world experience and a passion for teaching.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {instructors.map((instructor, index) => (
              <motion.div key={instructor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card variant="interactive" className="p-6 text-center h-full">
                  <img src={instructor.image} alt={instructor.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="font-heading font-semibold text-lg mb-1">{instructor.name}</h3>
                  <p className="text-sm text-primary mb-2">{instructor.title}</p>
                  <Badge variant="secondary" className="mb-4">{instructor.specialty}</Badge>
                  <div className="flex justify-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{instructor.courses}</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" />{(instructor.students / 1000).toFixed(0)}k</span>
                    <span className="flex items-center gap-1"><Star className="h-4 w-4 text-warning" />{instructor.rating}</span>
                  </div>
                  <Link to={`/courses?instructor=${instructor.id}`} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    View Courses <ArrowRight className="h-3 w-3" />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Instructors;
