import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    desc: "For bootstrapped startups. Simple visibility, one warning, one action.",
    features: [
      "1 bank account connection", "Runway countdown", "Basic burn tracking",
      "Weekly email digest", "Manual revenue entry", "Email support",
    ],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Growth",
    price: "$299",
    period: "/month",
    desc: "For funded startups. Full financial defense with AI-powered insights.",
    features: [
      "Unlimited bank connections", "Full Burn Sentinel", "Waste Assassin",
      "Scenario War Room", "Fundraise Radar", "Tough Love weekly reports",
      "Slack integration", "Priority support",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Scale",
    price: "$799",
    period: "/month",
    desc: "For Series A+ companies. Multi-entity, team access, and dedicated support.",
    features: [
      "Everything in Growth", "Multi-entity support", "Team access (up to 10)",
      "Investor read-only access", "Custom alert rules", "API access",
      "Dedicated success manager", "Custom integrations",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

const Pricing = () => (
  <div className="min-h-screen pt-24 pb-20">
    <section className="container mx-auto px-6 py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Simple pricing.<br />No surprises.
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Start free for 14 days. No credit card required. Cancel anytime.
        </p>
      </motion.div>
    </section>

    <section className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 ${plan.popular ? "glass-glow" : "glass"}`}
          >
            {plan.popular && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium gradient-primary text-primary-foreground mb-3">
                Most popular
              </span>
            )}
            <h3 className="text-xl font-display font-bold">{plan.name}</h3>
            <div className="flex items-baseline gap-1 my-3">
              <span className="text-3xl font-display font-bold">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
            <Link to="/signin">
              <Button className={`w-full mb-6 ${plan.popular ? "gradient-primary text-primary-foreground border-0" : ""}`} variant={plan.popular ? "default" : "outline"}>
                {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <ul className="space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>

    <div className="container mx-auto px-6 mt-12 text-center">
      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
        <Lock className="h-3 w-3 text-success" />
        All plans include bank-grade encryption and read-only data access. Your information is never shared.
      </p>
    </div>
  </div>
);

export default Pricing;
