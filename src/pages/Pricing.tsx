import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started with online learning.",
    features: ["Access to free courses", "Basic progress tracking", "Community forum access", "Mobile app access", "Email support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "Ideal for serious learners who want full access.",
    features: ["All free features", "Unlimited course access", "Certificate downloads", "Offline viewing", "Priority support", "Progress analytics", "1-on-1 mentorship sessions"],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Team",
    price: 99,
    description: "Best for organizations and teams.",
    features: ["All Pro features", "Up to 25 team members", "Admin dashboard", "Team analytics", "Custom learning paths", "Dedicated success manager", "SSO integration", "API access"],
    cta: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4"><Sparkles className="h-3 w-3 mr-1" />Simple Pricing</Badge>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Choose Your Plan</h1>
            <p className="text-lg text-muted-foreground">Start learning for free, upgrade when you're ready. Cancel anytime.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card variant={plan.popular ? "elevated" : "outline"} className={`p-6 h-full flex flex-col ${plan.popular ? "border-primary shadow-lg shadow-primary/10 relative" : ""}`}>
                  {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                  <div className="mb-6">
                    <h3 className="font-heading text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.popular ? "hero" : "outline"} className="w-full" asChild>
                    <Link to="/register">{plan.cta} <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center mt-12">
            <p className="text-muted-foreground">All plans include a 30-day money-back guarantee. No questions asked.</p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
