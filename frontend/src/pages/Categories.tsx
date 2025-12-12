import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Code, Palette, BarChart3, Cloud, Smartphone, Brain, Shield, Megaphone, ArrowRight 
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "web-development", name: "Web Development", description: "Build modern websites and web applications with HTML, CSS, JavaScript, React, and more.", icon: Code, courseCount: 156, color: "from-blue-500 to-cyan-500" },
  { id: "design", name: "UI/UX Design", description: "Create beautiful user experiences with Figma, Adobe XD, and design thinking principles.", icon: Palette, courseCount: 89, color: "from-pink-500 to-rose-500" },
  { id: "data-science", name: "Data Science", description: "Analyze data and build ML models with Python, R, TensorFlow, and real-world datasets.", icon: BarChart3, courseCount: 124, color: "from-violet-500 to-purple-500" },
  { id: "cloud-computing", name: "Cloud Computing", description: "Master AWS, Azure, and GCP to build scalable cloud infrastructure.", icon: Cloud, courseCount: 78, color: "from-amber-500 to-orange-500" },
  { id: "mobile-development", name: "Mobile Development", description: "Build iOS and Android apps with Swift, Kotlin, React Native, and Flutter.", icon: Smartphone, courseCount: 67, color: "from-green-500 to-emerald-500" },
  { id: "ai-ml", name: "AI & Machine Learning", description: "Deep learning, neural networks, NLP, and computer vision with TensorFlow and PyTorch.", icon: Brain, courseCount: 92, color: "from-red-500 to-pink-500" },
  { id: "cybersecurity", name: "Cybersecurity", description: "Protect systems and data with ethical hacking, penetration testing, and security analysis.", icon: Shield, courseCount: 54, color: "from-slate-500 to-gray-600" },
  { id: "marketing", name: "Digital Marketing", description: "Grow businesses online with SEO, social media, content marketing, and analytics.", icon: Megaphone, courseCount: 112, color: "from-teal-500 to-cyan-500" },
];

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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
