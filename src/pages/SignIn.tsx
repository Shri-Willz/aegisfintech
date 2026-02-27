import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignIn = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "", company: "", stage: "funded" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-strong rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold">Aegis</span>
          </div>

          <h1 className="text-2xl font-display font-bold mb-1">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {isSignUp ? "Set up your financial defense in 10 minutes" : "Sign in to your command center"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <Label htmlFor="name" className="text-sm">Full name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Founder"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm">Company name</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Inc"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">Company stage</Label>
                  <div className="flex gap-2 mt-1">
                    {["funded", "bootstrapped"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, stage: s })}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          form.stage === s
                            ? "gradient-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {s === "funded" ? "VC-Backed" : "Bootstrapped"}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email" className="text-sm">Work email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary text-primary-foreground border-0 h-11"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  {isSignUp ? "Create account" : "Sign in"} <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-success" /> Encrypted</span>
            <span className="flex items-center gap-1"><Eye className="h-3 w-3 text-success" /> Read-only access</span>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Your financial data is never stored on our servers unencrypted. We respect your privacy completely.
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
