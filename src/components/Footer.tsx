import { Shield, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Command Center", href: "/product" },
    { label: "Burn Sentinel", href: "/product" },
    { label: "Runway Countdown", href: "/product" },
    { label: "Waste Assassin", href: "/product" },
    { label: "Scenario War Room", href: "/product" },
    { label: "Fundraise Radar", href: "/product" },
  ],
  Platform: [
    { label: "Integrations", href: "/product" },
    { label: "Security", href: "/resources" },
    { label: "Privacy", href: "/resources" },
    { label: "API", href: "/resources" },
  ],
  Company: [
    { label: "About", href: "/resources" },
    { label: "Careers", href: "/resources" },
    { label: "Blog", href: "/resources" },
    { label: "Contact", href: "/resources" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/resources" },
    { label: "Privacy Policy", href: "/resources" },
    { label: "Security Policy", href: "/resources" },
  ],
};

const Footer = () => (
  <footer className="gradient-dark-section text-muted-foreground">
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="font-display text-base sm:text-lg font-bold text-foreground">Aegis</span>
          </Link>
          <p className="text-xs sm:text-sm leading-relaxed mb-4">
            AI-powered financial defense for startups. Your data never leaves your control.
          </p>
          <div className="privacy-badge">
            <Lock className="h-3 w-3" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-display text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">{title}</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-xs sm:text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <p className="text-[10px] sm:text-xs">© 2026 Aegis Financial Inc. All rights reserved.</p>
        <p className="text-[10px] sm:text-xs flex items-center gap-1.5">
          <Lock className="h-3 w-3 text-success" />
          Your financial data is read-only — we never write, move, or share it
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
