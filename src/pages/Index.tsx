import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Lock, Eye, Zap, Target, TrendingDown, AlertTriangle, BarChart3, Rocket, ChevronRight, Check, Star, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrivacyBanner from "@/components/PrivacyBanner";
import heroDashboard from "@/assets/hero-dashboard.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const features = [
  { icon: BarChart3, title: "Command Center", desc: "Your financial cockpit. Cash, runway, burn — answered in 5 seconds flat.", link: "/product", color: "text-primary" },
  { icon: AlertTriangle, title: "Burn Sentinel", desc: "Real-time anomaly detection catches spend spikes before they become crises.", link: "/product", color: "text-warning" },
  { icon: Target, title: "Runway Countdown", desc: "Not '8 months.' September 22nd, 2026. The exact date, updated daily.", link: "/product", color: "text-destructive" },
  { icon: TrendingDown, title: "Waste Assassin", desc: "Find $10K–$50K in recoverable spend hiding in your subscriptions.", link: "/product", color: "text-success" },
  { icon: Zap, title: "Scenario War Room", desc: "What if you hire 3 people? Delay fundraising? Model it in 2 minutes.", link: "/product", color: "text-info" },
  { icon: Rocket, title: "Fundraise Radar", desc: "Know exactly when to start raising based on your real numbers, not guesses.", link: "/product", color: "text-primary" },
];

const stats = [
  { value: "2,400+", label: "Startups protected" },
  { value: "$180M+", label: "Wasteful spend found" },
  { value: "10 min", label: "Setup time" },
  { value: "99.9%", label: "Uptime guarantee" },
];

const testimonials = [
  { quote: "Aegis told us we had 67 days of runway — not the 5 months we thought. We cut burn in time. It literally saved the company.", name: "Sarah Chen", role: "CEO, Buildstack", rating: 5 },
  { quote: "Our CFO costs $18K/month. Aegis gives us 80% of what she does for $299. We kept her for strategy, Aegis handles the watching.", name: "Marcus Rivera", role: "Founder, Cloudlane", rating: 5 },
  { quote: "The Waste Assassin found $42K in duplicate SaaS subscriptions our team didn't even know we had. Paid for itself in a day.", name: "Priya Patel", role: "COO, NexaHealth", rating: 5 },
];

const Index = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="privacy-badge mb-4 sm:mb-6">
                <Lock className="h-3 w-3" />
                <span>Your data stays yours — always read-only</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 sm:mb-6">
                Don't run out<br />of cash.{" "}
                <span className="text-gradient">Ever.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg">
                AI-powered financial defense for startups. Know your runway date, catch burn anomalies, and kill wasteful spend — all in one secure dashboard.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
                <input
                  type="email"
                  placeholder="What's your work email?"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-11 sm:h-12 px-4 rounded-lg bg-surface-elevated border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Link to="/signin">
                  <Button size="lg" className="gradient-primary text-primary-foreground border-0 h-11 sm:h-12 px-6 whitespace-nowrap w-full sm:w-auto">
                    Get started free
                  </Button>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <Link to="/product" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  Explore product <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Check className="h-3 w-3 text-success" /> No credit card required
                </span>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative hidden sm:block">
              <div className="glass-glow rounded-2xl overflow-hidden">
                <img src={heroDashboard} alt="Aegis financial dashboard showing runway, burn rate, and cash analytics" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 glass rounded-xl p-3 sm:p-4 shadow-lg">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Runway</p>
                <p className="text-sm sm:text-lg font-display font-bold">208 days</p>
                <span className="text-[10px] text-success flex items-center gap-0.5">● Safe</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logos / Social proof */}
      <section className="py-8 sm:py-12 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-xs text-center text-muted-foreground mb-6 sm:mb-8">Trusted by startups backed by</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12">
            <p className="text-xs sm:text-sm font-medium text-primary mb-2">Aegis Product Suite</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">Your financial defense system.</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg">
              Replace spreadsheets, gut feelings, and late-night cash anxiety with an AI that watches your numbers 24/7.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={f.link}>
                  <div className="glass hover-lift rounded-xl sm:rounded-2xl p-5 sm:p-6 h-full group cursor-pointer">
                    <f.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${f.color} mb-3 sm:mb-4`} />
                    <h3 className="font-display font-semibold text-base sm:text-lg mb-2">{f.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{f.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Learn more <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Banner */}
      <section className="container mx-auto px-4 sm:px-6">
        <PrivacyBanner />
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-12">
            <p className="text-xs sm:text-sm font-medium text-primary mb-2">What founders say</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">They didn't believe it until they saw it.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="text-xs sm:text-sm font-semibold">{t.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs sm:text-sm font-medium text-primary mb-2">10-minute setup. No complexity.</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
              Here's what you get done<br className="hidden sm:block" /> with Aegis on day one.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            {[
              { title: "Connect in minutes.", items: ["Link your bank via Plaid", "Connect Stripe or PayPal", "Add payroll in 2 clicks"], icon: "🔗" },
              { title: "See everything.", items: ["Real-time runway date", "Burn rate tracking", "AI anomaly alerts active"], icon: "👁️" },
              { title: "Sleep better.", items: ["Weekly tough love reports", "Fundraise timing alerts", "Zero data shared externally"], icon: "😴" },
            ].map((step, i) => (
              <motion.div key={step.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 text-left">
                <span className="text-2xl mb-3 block">{step.icon}</span>
                <h3 className="font-display font-semibold text-sm sm:text-base mb-3 sm:mb-4">{step.title}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-dark-section py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3 sm:mb-4">
              Stop guessing. Start defending.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
              Join 2,400+ founders who know their exact runway date every morning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="What's your work email?"
                className="flex-1 h-11 sm:h-12 px-4 rounded-lg bg-surface-elevated/10 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Link to="/signin">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 h-11 sm:h-12 px-6 whitespace-nowrap w-full sm:w-auto">
                  Get started free
                </Button>
              </Link>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
              <Lock className="h-3 w-3" /> We never access, store, or share your credentials
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
