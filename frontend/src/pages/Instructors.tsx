import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Star, Users, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const instructors: Array<{
  id: string;
  name: string;
  title: string;
  specialty: string;
  courses: number;
  students: number;
  rating: number;
  image: string;
}> = [];

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

          {instructors.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No instructors found</p>
            </div>
          ) : (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Instructors;
