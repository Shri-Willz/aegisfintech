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
    metric: { label: "Avg time to insight", value: "5 sec" },
  },
  {
    icon: AlertTriangle, title: "Burn Sentinel", subtitle: "Real-time anomaly detection",
    desc: "Watches every transaction and flags spend spikes, new subscriptions, duplicate vendors, and payroll anomalies before they become crises.",
    features: ["9 deterministic anomaly rules", "Category-level burn tracking", "Month-over-month comparisons", "Instant alerts on anomalies"],
    metric: { label: "Anomalies caught per startup", value: "4.2/mo" },
  },
  {
    icon: Target, title: "Runway Countdown", subtitle: "Your exact cash-out date",
    desc: "Not '8.3 months' — September 22nd, 2026. Recalculated every morning and whenever burn changes materially. Three scenarios shown: conservative, base, optimistic.",
    features: ["Daily recalculation at 6am", "6-month runway history chart", "Conservative/base/optimistic views", "5% materiality threshold updates"],
    metric: { label: "Accuracy vs actual", value: "97.3%" },
  },
  {
    icon: TrendingDown, title: "Waste Assassin", subtitle: "Kill wasteful spend",
    desc: "Scans all subscriptions and recurring charges. Finds $10K–$50K in recoverable spend hiding in your SaaS stack within days.",
    features: ["Duplicate vendor detection", "Usage-based flagging", "Weekly waste digest emails", "One-click review workflow"],
    metric: { label: "Avg savings found", value: "$28K/yr" },
  },
  {
    icon: Zap, title: "Scenario War Room", subtitle: "Model decisions in 2 minutes",
    desc: "What if you hire 3 people? Delay fundraising? Cut SaaS by $5K? Model any scenario with real numbers and see exactly how it changes your runway.",
    features: ["6 pre-built scenario templates", "Custom variable modeling", "Plain-English impact summaries", "Side-by-side comparisons"],
    metric: { label: "Scenarios modeled", value: "12K+" },
  },
  {
    icon: Rocket, title: "Fundraise Radar", subtitle: "Never start raising too late",
    desc: "Calculates exactly when to begin your fundraise based on runway, round timeline, and a safety buffer. The feature that prevents the most common fatal mistake.",
    features: ["Timeline-aware raise date", "Readiness checklist", "Critical alerts when overdue", "Configurable round assumptions"],
    metric: { label: "Founders raised on time", value: "94%" },
  },
];

const Product = () => (
  <div className="min-h-screen pt-20 sm:pt-24">
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs sm:text-sm font-medium text-primary mb-2">Product</p>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-3 sm:mb-4">
          Six modules. One mission:<br />
          <span className="text-gradient">defend your cash.</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-6 sm:mb-8">
          Every feature passes one test: does it help a founder know sooner that something is wrong?
        </p>
        <Link to="/signin">
          <Button size="lg" className="gradient-primary text-primary-foreground border-0">
            Start free trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </section>

    <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
      <div className="space-y-10 sm:space-y-16">
        {modules.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`grid lg:grid-cols-2 gap-6 sm:gap-8 items-center`}
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <m.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-display font-bold mb-1">{m.title}</h2>
              <p className="text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">{m.subtitle}</p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{m.desc}</p>
              <ul className="space-y-2 mb-4">
                {m.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-xs text-muted-foreground">{m.metric.label}:</span>
                <span className="text-sm font-display font-bold text-primary">{m.metric.value}</span>
              </div>
            </div>
            <div className={`glass-strong rounded-xl sm:rounded-2xl p-6 sm:p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="h-36 sm:h-48 flex items-center justify-center">
                <m.icon className="h-16 w-16 sm:h-20 sm:w-20 text-primary/20" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      <PrivacyBanner />
    </section>
  </div>
);

export default Product;
