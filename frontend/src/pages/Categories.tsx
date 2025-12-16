import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Code, Palette, BarChart3, Cloud, Smartphone, Brain, Shield, Megaphone, ArrowRight 
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const iconMap: { [key: string]: LucideIcon } = {
  Code,
  Palette,
  BarChart3,
  Cloud,
  Smartphone,
  Brain,
  Shield,
  Megaphone,
};

interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string; // Assuming icon will be a string (e.g., Lucide icon name) from API
  courseCount: number;
  color: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories"); // Assuming your API endpoint for categories is /api/categories
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error: unknown) {
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading categories...</p>
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
              {categories.map((category, index) => {
                const IconComponent = iconMap[category.icon];
                return (
                  <motion.div key={category._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <Link to={`/courses?category=${category._id}`}>
                      <Card variant="interactive" className="p-6 h-full">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                          {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
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
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
