import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, AlertTriangle, Target, TrendingDown, Zap, Rocket, ArrowRight, Lock, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrivacyBanner from "@/components/PrivacyBanner";

const modules = [
  {
    icon: BarChart3, title: "Command Center", subtitle: "Your financial cockpit",
    desc: "See cash balance, runway, burn rate, revenue, and active alerts — all in one glance. Answers three questions in 5 seconds: How much cash? When does it run out? Is anything wrong?",
    features: ["Real-time cash balance across all accounts", "Color-coded runway status", "Live alert feed from AI engine", "Payroll warning system"],
  },
  {
    icon: AlertTriangle, title: "Burn Sentinel", subtitle: "Real-time anomaly detection",
    desc: "Watches every transaction and flags spend spikes, new subscriptions, duplicate vendors, and payroll anomalies before they become crises.",
    features: ["9 deterministic anomaly rules", "Category-level burn tracking", "Month-over-month comparisons", "Instant alerts on anomalies"],
  },
  {
    icon: Target, title: "Runway Countdown", subtitle: "Your exact cash-out date",
    desc: "Not '8.3 months' — September 22nd, 2026. Recalculated every morning and whenever burn changes materially. Three scenarios shown: conservative, base, optimistic.",
    features: ["Daily recalculation at 6am", "6-month runway history chart", "Conservative/base/optimistic views", "5% materiality threshold updates"],
  },
  {
    icon: TrendingDown, title: "Waste Assassin", subtitle: "Kill wasteful spend",
    desc: "Scans all subscriptions and recurring charges. Finds $10K–$50K in recoverable spend hiding in your SaaS stack within days.",
    features: ["Duplicate vendor detection", "Usage-based flagging", "Weekly waste digest emails", "One-click review workflow"],
  },
  {
    icon: Zap, title: "Scenario War Room", subtitle: "Model decisions in 2 minutes",
    desc: "What if you hire 3 people? Delay fundraising? Cut SaaS by $5K? Model any scenario with real numbers and see exactly how it changes your runway.",
    features: ["6 pre-built scenario templates", "Custom variable modeling", "Plain-English impact summaries", "Side-by-side comparisons"],
  },
  {
    icon: Rocket, title: "Fundraise Radar", subtitle: "Never start raising too late",
    desc: "Calculates exactly when to begin your fundraise based on runway, round timeline, and a safety buffer. The feature that prevents the most common fatal mistake.",
    features: ["Timeline-aware raise date", "Readiness checklist", "Critical alerts when overdue", "Configurable round assumptions"],
  },
];

const Product = () => (
  <div className="min-h-screen pt-24">
    <section className="container mx-auto px-6 py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm font-medium text-primary mb-2">Product</p>
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Six modules. One mission:<br />
          <span className="text-gradient">defend your cash.</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8">
          Every feature passes one test: does it help a founder know sooner that something is wrong?
        </p>
        <Link to="/signin">
          <Button size="lg" className="gradient-primary text-primary-foreground border-0">
            Start free trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </section>

    <section className="container mx-auto px-6 pb-20">
      <div className="space-y-16">
        {modules.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <m.icon className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl font-display font-bold mb-1">{m.title}</h2>
              <p className="text-sm text-primary font-medium mb-3">{m.subtitle}</p>
              <p className="text-muted-foreground mb-6">{m.desc}</p>
              <ul className="space-y-2">
                {m.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`glass-strong rounded-2xl p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="h-48 flex items-center justify-center">
                <m.icon className="h-20 w-20 text-primary/20" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="container mx-auto px-6 pb-16">
      <PrivacyBanner />
    </section>
  </div>
);

export default Product;
