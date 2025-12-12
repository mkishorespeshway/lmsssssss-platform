import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Jennifer Roberts",
    role: "Software Engineer at Google",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "LearnHub completely transformed my career. The web development bootcamp gave me the skills I needed to land my dream job at Google. The instructors are world-class.",
    rating: 5,
    course: "Complete Web Development Bootcamp",
  },
  {
    id: 2,
    name: "Marcus Thompson",
    role: "Data Scientist at Netflix",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "The Data Science course was incredibly comprehensive. I went from knowing nothing about machine learning to building production models. Highly recommended!",
    rating: 5,
    course: "Data Science & Machine Learning",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "UX Designer at Airbnb",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "The UI/UX masterclass helped me transition from graphic design to product design. The practical projects and feedback from instructors were invaluable.",
    rating: 5,
    course: "UI/UX Design Masterclass",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
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
            What Our Learners Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of successful learners who have transformed their careers.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated" className="h-full p-6 lg:p-8 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-primary/10">
                  <Quote className="h-12 w-12" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Course Badge */}
                <p className="text-sm text-primary font-medium mb-6">
                  {testimonial.course}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
