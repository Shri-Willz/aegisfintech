import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, FileText, MessageSquare, HelpCircle, ArrowRight, Lock, PlayCircle, Download } from "lucide-react";

const resources = [
  { icon: BookOpen, title: "Documentation", desc: "Complete guides for setup, integrations, and every feature module.", link: "#", tag: "Guides" },
  { icon: FileText, title: "Blog", desc: "Insights on startup finance, burn management, and fundraise timing.", link: "#", tag: "Insights" },
  { icon: MessageSquare, title: "Community", desc: "Connect with 2,400+ founders using Aegis to defend their finances.", link: "#", tag: "Network" },
  { icon: HelpCircle, title: "Help Center", desc: "FAQs, troubleshooting, and guides to get the most from Aegis.", link: "#", tag: "Support" },
  { icon: PlayCircle, title: "Video Tutorials", desc: "Step-by-step walkthroughs of every Aegis module and feature.", link: "#", tag: "Learn" },
  { icon: Download, title: "Templates", desc: "Financial model templates, board deck outlines, and burn calculators.", link: "#", tag: "Free" },
];

const Resources = () => (
  <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20">
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-3 sm:mb-4">Resources</h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          Everything you need to get the most out of Aegis.
        </p>
      </motion.div>
    </section>

    <section className="container mx-auto px-4 sm:px-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {resources.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={r.link} className="block glass hover-lift rounded-xl sm:rounded-2xl p-5 sm:p-6 h-full group">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <r.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{r.tag}</span>
              </div>
              <h3 className="font-display font-semibold text-sm sm:text-lg mb-1.5 sm:mb-2">{r.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">{r.desc}</p>
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>

    <div className="container mx-auto px-4 sm:px-6 mt-8 sm:mt-12 text-center">
      <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center justify-center gap-1.5">
        <Lock className="h-3 w-3 text-success" />
        All resources are free. We believe in transparency.
      </p>
    </div>
  </div>
);

export default Resources;
