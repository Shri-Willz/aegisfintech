import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Lock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter", price: "$99", period: "/month", yearly: "$79",
    desc: "For bootstrapped startups. Simple visibility, one warning, one action.",
    features: ["1 bank account connection", "Runway countdown", "Basic burn tracking", "Weekly email digest", "Manual revenue entry", "Email support"],
    cta: "Start free trial", popular: false,
  },
  {
    name: "Growth", price: "$299", period: "/month", yearly: "$249",
    desc: "For funded startups. Full financial defense with AI-powered insights.",
    features: ["Unlimited bank connections", "Full Burn Sentinel", "Waste Assassin", "Scenario War Room", "Fundraise Radar", "Tough Love weekly reports", "Slack integration", "Priority support"],
    cta: "Start free trial", popular: true,
  },
  {
    name: "Scale", price: "$799", period: "/month", yearly: "$649",
    desc: "For Series A+ companies. Multi-entity, team access, and dedicated support.",
    features: ["Everything in Growth", "Multi-entity support", "Team access (up to 10)", "Investor read-only access", "Custom alert rules", "API access", "Dedicated success manager", "Custom integrations"],
    cta: "Contact sales", popular: false,
  },
];

const faqs = [
  { q: "Is my data safe?", a: "Absolutely. We use read-only access and 256-bit AES encryption. Your credentials are never stored. SOC 2 Type II compliant." },
  { q: "Can I cancel anytime?", a: "Yes. No long-term contracts. Cancel from your dashboard with one click." },
  { q: "Do you support international banks?", a: "We support US banks via Plaid and are expanding internationally. Contact us for specific availability." },
  { q: "What happens after the free trial?", a: "You'll be prompted to choose a plan. No automatic charges. Your data stays available for 30 days." },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20">
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-3 sm:mb-4">
            Simple pricing.<br />No surprises.
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-6">
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>
          <div className="inline-flex items-center gap-2 bg-muted/50 rounded-lg p-1">
            <button onClick={() => setAnnual(false)} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${!annual ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${annual ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}`}>Annual <span className="text-[10px] ml-1 opacity-80">Save 20%</span></button>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl sm:rounded-2xl p-5 sm:p-6 ${plan.popular ? "glass-glow ring-1 ring-primary/20" : "glass"}`}
            >
              {plan.popular && (
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium gradient-primary text-primary-foreground mb-3">
                  Most popular
                </span>
              )}
              <h3 className="text-lg sm:text-xl font-display font-bold">{plan.name}</h3>
              <div className="flex items-baseline gap-1 my-2 sm:my-3">
                <span className="text-2xl sm:text-3xl font-display font-bold">{annual ? plan.yearly : plan.price}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{plan.desc}</p>
              <Link to="/signin">
                <Button className={`w-full mb-4 sm:mb-6 text-sm ${plan.popular ? "gradient-primary text-primary-foreground border-0" : ""}`} variant={plan.popular ? "default" : "outline"}>
                  {plan.cta} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
              <ul className="space-y-2 sm:space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs sm:text-sm">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4 sm:px-6 mt-16 sm:mt-20 max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-center mb-6 sm:mb-8">Frequently asked questions</h2>
        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="text-xs sm:text-sm font-medium">{faq.q}</span>
                <HelpCircle className={`h-4 w-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-4 pb-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 mt-8 sm:mt-12 text-center">
        <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          <Lock className="h-3 w-3 text-success" />
          All plans include bank-grade encryption and read-only data access. Your information is never shared.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
