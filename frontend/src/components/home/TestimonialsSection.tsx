import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials: Array<{
  id: string | number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  course: string;
}> = [];

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
        {testimonials.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No testimonials available</p>
          </div>
        ) : (
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
                  <div className="absolute top-6 right-6 text-primary/10">
                    <Quote className="h-12 w-12" />
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <p className="text-sm text-primary font-medium mb-6">
                    {testimonial.course}
                  </p>
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
        )}
      </div>
    </section>
  );
}
