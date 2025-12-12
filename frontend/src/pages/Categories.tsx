import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Code, Palette, BarChart3, Cloud, Smartphone, Brain, Shield, Megaphone, ArrowRight 
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const categories: Array<{
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  courseCount: number;
  color: string;
}> = [];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Browse Categories</h1>
            <p className="text-lg text-muted-foreground">Explore our diverse range of course categories and find the perfect learning path for your goals.</p>
          </motion.div>
          {categories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No categories available</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <Link to={`/courses?category=${category.id}`}>
                    <Card variant="interactive" className="p-6 h-full">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{category.courseCount} courses</span>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </Card>
                  </Link>
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

export default Categories;
