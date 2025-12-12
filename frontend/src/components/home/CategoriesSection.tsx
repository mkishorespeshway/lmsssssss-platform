import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Code, 
  Palette, 
  BarChart3, 
  Cloud, 
  Smartphone, 
  Brain, 
  Shield, 
  Megaphone,
  ArrowRight 
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

export function CategoriesSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose from a variety of topics and start your learning journey today.
          </p>
        </motion.div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No categories available</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link to={`/categories/${category.id}`}>
                  <Card variant="interactive" className="group p-6 h-full">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.courseCount} courses
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
