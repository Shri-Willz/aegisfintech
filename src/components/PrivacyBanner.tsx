import { Shield, Lock, Eye } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-strong rounded-2xl p-6 md:p-8 my-16"
  >
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="flex-shrink-0 w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
        <Shield className="h-7 w-7 text-primary-foreground" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="font-display text-lg font-semibold mb-1">
          Your numbers stay yours. Always.
        </h3>
        <p className="text-sm text-muted-foreground">
          Aegis uses read-only access to your financial data. We never write, modify, or share your information. 
          Bank-grade encryption protects every byte. SOC 2 Type II compliant.
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-success" />
          <span>256-bit AES</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Eye className="h-3.5 w-3.5 text-success" />
          <span>Read-only</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default PrivacyBanner;
