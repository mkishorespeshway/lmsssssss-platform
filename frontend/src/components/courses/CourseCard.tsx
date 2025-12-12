import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  instructor: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  isFeatured?: boolean;
}

interface CourseCardProps {
  course: Course;
  index?: number;
}

const levelColors = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "destructive",
} as const;

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card variant="interactive" className="group overflow-hidden h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
              {course.category}
            </Badge>
          </div>

          {/* Featured Badge */}
          {course.isFeatured && (
            <div className="absolute top-3 right-3">
              <Badge variant="accent">Featured</Badge>
            </div>
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="glass" size="lg" className="rounded-full">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Level & Duration */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant={levelColors[course.level]}>{course.level}</Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {course.description}
          </p>

          {/* Instructor */}
          <p className="text-sm text-muted-foreground mb-4">
            By <span className="text-foreground font-medium">{course.instructor}</span>
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-warning">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-foreground font-medium">{course.rating}</span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              {course.price === 0 ? (
                <span className="text-lg font-bold text-success">Free</span>
              ) : (
                <span className="text-lg font-bold text-foreground">${course.price}</span>
              )}
            </div>
            <Button variant="default" size="sm" asChild>
              <Link to={`/courses/${course.id}`}>
                Enroll Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
