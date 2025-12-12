import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Cookie, Settings, BarChart, Target, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const Cookies = () => {
  const [preferences, setPreferences] = useState({ essential: true, analytics: true, marketing: false, personalization: true });

  const handleSave = () => {
    toast({ title: "Preferences saved", description: "Your cookie preferences have been updated." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Cookie Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 12, 2024</p>
            
            <div className="prose prose-sm max-w-none text-muted-foreground mb-12">
              <p>We use cookies and similar technologies to enhance your experience on LearnHub. This policy explains what cookies are, how we use them, and how you can manage your preferences.</p>
            </div>

            <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">Manage Cookie Preferences</h2>
            
            <div className="space-y-4 mb-8">
              <Card variant="outline" className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10"><Shield className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold mb-1">Essential Cookies</h3>
                      <p className="text-sm text-muted-foreground">Required for the website to function. Cannot be disabled.</p>
                    </div>
                  </div>
                  <Switch checked={true} disabled />
                </div>
              </Card>

              <Card variant="outline" className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10"><BarChart className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold mb-1">Analytics Cookies</h3>
                      <p className="text-sm text-muted-foreground">Help us understand how visitors interact with our website.</p>
                    </div>
                  </div>
                  <Switch checked={preferences.analytics} onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })} />
                </div>
              </Card>

              <Card variant="outline" className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10"><Target className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold mb-1">Marketing Cookies</h3>
                      <p className="text-sm text-muted-foreground">Used to deliver personalized advertisements.</p>
                    </div>
                  </div>
                  <Switch checked={preferences.marketing} onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })} />
                </div>
              </Card>

              <Card variant="outline" className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10"><Settings className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold mb-1">Personalization Cookies</h3>
                      <p className="text-sm text-muted-foreground">Remember your preferences and customize your experience.</p>
                    </div>
                  </div>
                  <Switch checked={preferences.personalization} onCheckedChange={(checked) => setPreferences({ ...preferences, personalization: checked })} />
                </div>
              </Card>
            </div>

            <Button onClick={handleSave} variant="hero">Save Preferences</Button>

            <div className="prose prose-sm max-w-none text-muted-foreground mt-12 space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">What Are Cookies?</h2>
                <p>Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit, making your next visit easier and the site more useful to you.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">How Long Do Cookies Last?</h2>
                <p>Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period or until you delete them manually.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
                <p>For questions about our cookie policy, contact us at privacy@learnhub.com.</p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
