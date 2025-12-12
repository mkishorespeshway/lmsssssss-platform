import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 12, 2024</p>
            
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using LearnHub ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Description of Service</h2>
                <p>LearnHub is an online learning platform that provides educational content, including video courses, quizzes, and certificates. We reserve the right to modify, suspend, or discontinue any part of the Service at any time.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. User Accounts</h2>
                <p>You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Payment and Subscriptions</h2>
                <p>Some features require payment. By subscribing to a paid plan, you agree to pay all applicable fees. Subscriptions automatically renew unless cancelled before the renewal date. We offer a 30-day money-back guarantee on all plans.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Intellectual Property</h2>
                <p>All content on LearnHub, including courses, videos, text, graphics, and logos, is the property of LearnHub or its content creators. You may not reproduce, distribute, or create derivative works without written permission.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. User Conduct</h2>
                <p>You agree not to: share account credentials, use the Service for illegal purposes, attempt to access unauthorized areas, harass other users, or upload malicious content.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Limitation of Liability</h2>
                <p>LearnHub is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Changes to Terms</h2>
                <p>We may update these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Contact</h2>
                <p>For questions about these Terms, contact us at legal@learnhub.com.</p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
