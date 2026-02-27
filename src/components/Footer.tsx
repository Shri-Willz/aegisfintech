import { Shield, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Product: ["Command Center", "Burn Sentinel", "Runway Countdown", "Waste Assassin", "Scenario War Room", "Fundraise Radar"],
  Platform: ["Integrations", "Security", "Privacy", "API"],
  Company: ["About", "Careers", "Blog", "Contact"],
  Legal: ["Terms of Service", "Privacy Policy", "Security Policy"],
};

const Footer = () => (
  <footer className="gradient-dark-section text-muted-foreground">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">Aegis</span>
          </Link>
          <p className="text-sm leading-relaxed mb-4">
            AI-powered financial defense for startups. Your data never leaves your control.
          </p>
          <div className="privacy-badge">
            <Lock className="h-3 w-3" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <Link to="#" className="text-sm hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs">© 2026 Aegis Financial Inc. All rights reserved.</p>
        <p className="text-xs flex items-center gap-1.5">
          <Lock className="h-3 w-3 text-success" />
          Your financial data is read-only — we never write, move, or share it
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
