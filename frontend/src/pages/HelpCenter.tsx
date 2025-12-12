import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Book, MessageCircle, Mail, FileText, Video, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const categories = [
  { icon: Book, title: "Getting Started", description: "Learn the basics of using LearnHub", articles: 12 },
  { icon: Video, title: "Courses & Learning", description: "How to access and complete courses", articles: 18 },
  { icon: FileText, title: "Certificates", description: "Earning and downloading certificates", articles: 8 },
  { icon: MessageCircle, title: "Account & Billing", description: "Manage your subscription and payments", articles: 15 },
];

const faqs = [
  { question: "How do I enroll in a course?", answer: "Simply browse our course catalog, select a course you're interested in, and click 'Enroll Now'. If it's a paid course, you'll be prompted to complete the payment before gaining access." },
  { question: "Can I download courses for offline viewing?", answer: "Yes! Pro and Team subscribers can download course videos for offline viewing using our mobile app. Look for the download icon on any lesson." },
  { question: "How do I get my certificate?", answer: "After completing all lessons and passing the final quiz with at least 70%, you'll be able to download your certificate from the course completion page." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and in some regions, bank transfers and local payment methods." },
  { question: "Can I get a refund?", answer: "Yes, we offer a 30-day money-back guarantee on all our plans. If you're not satisfied, contact our support team within 30 days of purchase for a full refund." },
  { question: "How do I reset my password?", answer: "Click 'Forgot password' on the login page, enter your email address, and we'll send you a password reset link. The link expires after 24 hours." },
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
              <h1 className="font-heading text-4xl font-bold text-foreground mb-4">How can we help?</h1>
              <p className="text-muted-foreground mb-6">Search our knowledge base or browse categories below.</p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="text" placeholder="Search for help..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-12 text-lg" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Browse by Category</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {categories.map((cat, index) => (
                <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Card variant="interactive" className="p-6 h-full">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4"><cat.icon className="h-6 w-6 text-primary" /></div>
                    <h3 className="font-semibold mb-1">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{cat.description}</p>
                    <p className="text-xs text-primary">{cat.articles} articles</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
            <Card variant="elevated" className="max-w-3xl mx-auto p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-6">Our support team is here to help you.</p>
            <Button variant="default" size="lg" asChild><Link to="/contact"><Mail className="h-4 w-4" />Contact Support</Link></Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
