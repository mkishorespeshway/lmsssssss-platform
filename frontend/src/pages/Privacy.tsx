import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 12, 2024</p>
            
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
                <p>We collect information you provide directly, including: name, email address, payment information, profile data, and course progress. We also collect usage data such as pages visited, features used, and device information.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
                <p>We use your information to: provide and improve the Service, process payments, send communications, personalize your experience, and ensure security. We may also use aggregated data for analytics and research.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Information Sharing</h2>
                <p>We do not sell your personal information. We may share data with: service providers (payment processors, hosting), when required by law, or in connection with a business transfer. Course instructors may see student progress for courses they teach.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Data Security</h2>
                <p>We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Your Rights</h2>
                <p>You have the right to: access your data, correct inaccurate data, delete your account, export your data, and opt-out of marketing communications. Contact us to exercise these rights.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Cookies</h2>
                <p>We use cookies and similar technologies to improve functionality, analyze usage, and personalize content. You can manage cookie preferences through your browser settings.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Children's Privacy</h2>
                <p>LearnHub is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Changes to This Policy</h2>
                <p>We may update this policy periodically. We will notify you of significant changes via email or through the Service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Contact Us</h2>
                <p>For privacy-related questions, contact our Data Protection Officer at privacy@learnhub.com.</p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
