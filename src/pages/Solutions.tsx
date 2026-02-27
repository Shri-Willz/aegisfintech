import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Users, Briefcase, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrivacyBanner from "@/components/PrivacyBanner";

const solutions = [
  {
    icon: Building2, title: "VC-Backed Startups",
    desc: "Pre-seed to Series A. Know your exact runway, get warned before it's too late, and time your fundraise perfectly.",
    details: [
      "Raised $250K–$5M, burning $15K–$200K/month",
      "Board meetings every 8 weeks, no CFO yet",
      "Need scenario modeling and fundraise timing",
      "Integrations: Mercury, Brex, Ramp, Stripe, Gusto",
    ],
  },
  {
    icon: Users, title: "Bootstrapped Startups",
    desc: "Revenue-generating, self-funded. Simple runway view, payroll warnings, expense anomaly alerts. No complexity.",
    details: [
      "$100K–$3M ARR, cash-flow positive but volatile",
      "Seasonal spikes, large customer payments",
      "Need one number, one warning, one action",
      "Integrations: Chase, Stripe/PayPal, QuickBooks",
    ],
  },
  {
    icon: Briefcase, title: "Finance Teams",
    desc: "Give your CFO or finance lead superpowers. Automate the watching so they can focus on strategy.",
    details: [
      "Replace manual spreadsheet burn tracking",
      "AI-generated weekly reports for leadership",
      "Anomaly detection catches what humans miss",
      "Team access with role-based permissions",
    ],
  },
];

const Solutions = () => (
  <div className="min-h-screen pt-24 pb-20">
    <section className="container mx-auto px-6 py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Built for founders who<br />
          <span className="text-gradient">refuse to fly blind.</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Whether you're burning VC cash or bootstrapping to profitability, Aegis adapts to how you work.
        </p>
      </motion.div>
    </section>

    <section className="container mx-auto px-6">
      <div className="space-y-8 max-w-4xl mx-auto">
        {solutions.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold mb-2">{s.title}</h2>
                <p className="text-muted-foreground mb-4">{s.desc}</p>
                <ul className="space-y-2 mb-4">
                  {s.details.map((d) => (
                    <li key={d} className="text-sm text-muted-foreground">• {d}</li>
                  ))}
                </ul>
                <Link to="/signin">
                  <Button variant="outline" size="sm">
                    Get started <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="container mx-auto px-6">
      <PrivacyBanner />
    </section>
  </div>
);

export default Solutions;
