import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, FileText, MessageSquare, HelpCircle, ArrowRight, Lock } from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    title: "Documentation",
    desc: "Complete guides for setup, integrations, and every feature module.",
    link: "#",
  },
  {
    icon: FileText,
    title: "Blog",
    desc: "Insights on startup finance, burn management, and fundraise timing.",
    link: "#",
  },
  {
    icon: MessageSquare,
    title: "Community",
    desc: "Connect with 2,400+ founders using Aegis to defend their finances.",
    link: "#",
  },
  {
    icon: HelpCircle,
    title: "Help Center",
    desc: "FAQs, troubleshooting, and guides to get the most from Aegis.",
    link: "#",
  },
];

const Resources = () => (
  <div className="min-h-screen pt-24 pb-20">
    <section className="container mx-auto px-6 py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Resources</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Everything you need to get the most out of Aegis.
        </p>
      </motion.div>
    </section>

    <section className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {resources.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={r.link} className="block glass hover-lift rounded-2xl p-6 h-full group">
              <r.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-lg mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{r.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>

    <div className="container mx-auto px-6 mt-12 text-center">
      <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
        <Lock className="h-3 w-3 text-success" />
        All resources are free. We believe in transparency.
      </p>
    </div>
  </div>
);

export default Resources;
