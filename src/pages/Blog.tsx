import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Search, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const posts = [
  { id: "1", title: "10 Tips to Maximize Your Online Learning Experience", excerpt: "Discover proven strategies to stay focused, motivated, and get the most out of your online courses.", category: "Learning Tips", author: "Sarah Johnson", date: "Dec 10, 2024", readTime: "5 min", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop" },
  { id: "2", title: "The Future of AI in Education", excerpt: "How artificial intelligence is transforming the way we learn and teach in the digital age.", category: "Technology", author: "Michael Chen", date: "Dec 8, 2024", readTime: "8 min", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop" },
  { id: "3", title: "Building a Career in Web Development", excerpt: "A comprehensive guide to launching your career as a web developer in 2024.", category: "Career", author: "Alex Turner", date: "Dec 5, 2024", readTime: "10 min", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop" },
  { id: "4", title: "The Importance of Soft Skills in Tech", excerpt: "Why communication and teamwork are just as important as technical abilities.", category: "Career", author: "Emma Williams", date: "Dec 3, 2024", readTime: "6 min", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" },
  { id: "5", title: "Data Science: A Beginner's Roadmap", excerpt: "Your step-by-step guide to becoming a data scientist from scratch.", category: "Learning Tips", author: "Dr. Michael Chen", date: "Dec 1, 2024", readTime: "12 min", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
  { id: "6", title: "Remote Learning Best Practices", excerpt: "How to create an effective learning environment at home.", category: "Learning Tips", author: "Lisa Martinez", date: "Nov 28, 2024", readTime: "7 min", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop" },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground mb-6">Insights, tips, and news about online learning and career development.</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card variant="interactive" className="overflow-hidden h-full flex flex-col">
                  <img src={post.image} alt={post.title} className="aspect-video object-cover" />
                  <div className="p-6 flex-1 flex flex-col">
                    <Badge variant="secondary" className="w-fit mb-3">{post.category}</Badge>
                    <h2 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2"><User className="h-4 w-4" />{post.author}</div>
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{post.readTime}</div>
                    </div>
                  </div>
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

export default Blog;
