import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Users, Briefcase, ArrowRight, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrivacyBanner from "@/components/PrivacyBanner";

const solutions = [
  {
    icon: Building2, title: "VC-Backed Startups",
    desc: "Pre-seed to Series A. Know your exact runway, get warned before it's too late, and time your fundraise perfectly.",
    details: ["Raised $250K–$5M, burning $15K–$200K/month", "Board meetings every 8 weeks, no CFO yet", "Need scenario modeling and fundraise timing", "Integrations: Mercury, Brex, Ramp, Stripe, Gusto"],
    result: "Average founder saves 42 days of runway in first quarter",
  },
  {
    icon: Users, title: "Bootstrapped Startups",
    desc: "Revenue-generating, self-funded. Simple runway view, payroll warnings, expense anomaly alerts. No complexity.",
    details: ["$100K–$3M ARR, cash-flow positive but volatile", "Seasonal spikes, large customer payments", "Need one number, one warning, one action", "Integrations: Chase, Stripe/PayPal, QuickBooks"],
    result: "85% of bootstrapped users find hidden waste in week one",
  },
  {
    icon: Briefcase, title: "Finance Teams",
    desc: "Give your CFO or finance lead superpowers. Automate the watching so they can focus on strategy.",
    details: ["Replace manual spreadsheet burn tracking", "AI-generated weekly reports for leadership", "Anomaly detection catches what humans miss", "Team access with role-based permissions"],
    result: "Finance teams save 12+ hours per week on reporting",
  },
];

const Solutions = () => (
  <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20">
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-3 sm:mb-4">
          Built for founders who<br />
          <span className="text-gradient">refuse to fly blind.</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          Whether you're burning VC cash or bootstrapping to profitability, Aegis adapts to how you work.
        </p>
      </motion.div>
    </section>

    <section className="container mx-auto px-4 sm:px-6">
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {solutions.map((s) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl sm:rounded-2xl p-5 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <s.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-display font-bold mb-2">{s.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                <ul className="space-y-2 mb-4">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-success flex-shrink-0 mt-0.5" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <Link to="/signin">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                      Get started <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <span className="text-xs text-primary font-medium">✦ {s.result}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="container mx-auto px-4 sm:px-6 mt-8">
      <PrivacyBanner />
    </section>
  </div>
);

export default Solutions;
