import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, BarChart3, AlertTriangle, Target, TrendingDown, Zap, Rocket,
  Bell, Settings, LogOut, ChevronRight, ArrowUpRight, ArrowDownRight,
  DollarSign, Calendar, Clock, Lock, Search, User, Menu, X,
  TrendingUp, CreditCard, PieChart, Activity, Wallet, CircleDollarSign,
  CheckCircle2, XCircle, Info, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthProvider";
import {
  useDashboardSummary,
  useRecentTransactions,
  useBurnOverview,
  useRunwayData,
  useAlerts,
  useDismissAlert,
} from "@/hooks/useDashboard";
import type { AlertLevel } from "@/types/database.types";

const sidebarLinks = [
  { icon: BarChart3, label: "Command Center", path: "/dashboard" },
  { icon: AlertTriangle, label: "Burn Sentinel", path: "/dashboard/burn" },
  { icon: Target, label: "Runway Countdown", path: "/dashboard/runway" },
  { icon: Bell, label: "Alerts", path: "/dashboard/alerts" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

/* ── Helper: format currency ── */
const fmtCurrency = (n: number, compact = false) => {
  if (compact && Math.abs(n) >= 1000) {
    return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  }
  return `$${Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

/* ── Loading skeleton ── */
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-muted/50 ${className}`} />
);

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const currentPath = location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getContent = () => {
    if (currentPath === "/dashboard/burn") return <BurnSentinel />;
    if (currentPath === "/dashboard/runway") return <RunwayCountdown />;
    if (currentPath === "/dashboard/alerts") return <AlertsPage />;
    if (currentPath === "/dashboard/settings") return <SettingsPage />;
    return <CommandCenter />;
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between px-3 mb-8">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-lg">Aegis</span>
        </Link>
        <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentPath === link.path
                ? "gradient-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-border/50">
        <div className="flex items-center gap-1.5 px-3 py-1 text-xs text-muted-foreground mb-3">
          <Lock className="h-3 w-3 text-success" />
          <span>Data encrypted & private</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border/50 bg-card/50 p-4 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-card border-r border-border/50 p-4 z-50 flex flex-col lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 overflow-auto min-w-0">
        <header className="sticky top-0 z-30 glass border-b border-border/50 h-14 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 -ml-1 rounded-lg hover:bg-muted/50 transition-colors" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="lg:hidden flex items-center gap-2 mr-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-sm">Aegis</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors">
              <Search className="h-3.5 w-3.5" />
              <span>Search...</span>
              <kbd className="hidden md:inline text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground/70 ml-4">⌘K</kbd>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </Button>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {getContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/* === COMMAND CENTER === */
const CommandCenter = () => {
  const { data: summary, isLoading: summaryLoading, error: summaryError } = useDashboardSummary();
  const { data: recentTxns, isLoading: txnLoading, error: txnError } = useRecentTransactions(5);
  const { data: alerts, error: alertsError } = useAlerts();

  const queryError = summaryError || txnError || alertsError;

  const cards = summary
    ? [
        { label: "Cash Balance", value: fmtCurrency(summary.cashBalance), change: "", down: true, icon: DollarSign, detail: "Latest closing balance" },
        { label: "Monthly Burn", value: fmtCurrency(summary.monthlyBurn), change: "", down: false, icon: TrendingDown, detail: `Gross burn rate` },
        { label: "Net Burn", value: fmtCurrency(summary.netBurn), change: "", down: false, icon: BarChart3, detail: `After ${fmtCurrency(summary.revenue)} revenue` },
        { label: "Runway", value: `${summary.runwayDays} days`, change: "", down: true, icon: Calendar, detail: fmtDate(summary.cashOutDate) },
      ]
    : [];

  const displayAlerts = (alerts || []).slice(0, 4);

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Command Center</h1>
        <p className="text-sm text-muted-foreground">Good morning. Here's your financial status.</p>
      </div>

      {queryError && (
        <div className="mb-4 sm:mb-6 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <div className="flex items-start gap-3">
            <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-destructive">Failed to load dashboard data</p>
              <p className="text-xs text-muted-foreground mt-1">
                {(queryError as Error)?.message || "Unknown error. Check your Supabase connection and ensure the database schema & seed data have been applied."}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Make sure you have run <code className="px-1 py-0.5 rounded bg-muted text-[10px]">001_initial_schema.sql</code> and <code className="px-1 py-0.5 rounded bg-muted text-[10px]">002_seed_data.sql</code> in your Supabase SQL Editor.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Runway hero */}
      <div className="glass-glow rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Cash-out date</p>
            {summaryLoading ? <Skeleton className="h-10 w-64" /> : (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">
                {summary ? fmtDate(summary.cashOutDate) : "—"}
              </h2>
            )}
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {summary ? `${summary.runwayDays} days of runway remaining` : "Loading..."}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
              <Clock className="h-3 w-3" /> {summary && summary.runwayDays < 180 ? "Under 6 months" : "6+ months"}
            </span>
            <Link to="/dashboard/scenarios">
              <Button size="sm" variant="outline" className="text-xs">Model scenarios</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {summaryLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
          : cards.map((c) => (
              <div key={c.label} className="glass rounded-xl p-3 sm:p-4 hover-lift cursor-pointer">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{c.label}</span>
                  <c.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                </div>
                <p className="text-lg sm:text-xl font-display font-bold">{c.value}</p>
                <p className="text-[10px] text-muted-foreground mt-1 hidden sm:block">{c.detail}</p>
              </div>
            ))
        }
      </div>

      <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Alerts */}
        <div className="lg:col-span-3 glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm sm:text-base">Active Alerts</h3>
            <Link to="/dashboard/alerts" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {displayAlerts.length === 0 && !summaryLoading && (
              <p className="text-sm text-muted-foreground py-4 text-center">No active alerts 🎉</p>
            )}
            {displayAlerts.map((a) => (
              <div key={a.id} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  a.level === "critical" ? "bg-destructive animate-pulse" : a.level === "warning" ? "bg-warning" : "bg-info"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm truncate">{a.title}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{timeAgo(a.created_at)}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              </div>
            ))}
           </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm sm:text-base">Recent Transactions</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            {txnLoading
              ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)
              : (recentTxns || []).map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{t.vendor || t.description}</p>
                      <p className="text-[10px] text-muted-foreground">{t.category} · {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold flex-shrink-0 ml-2 ${t.type === "credit" ? "text-success" : ""}`}>
                      {t.type === "credit" ? "+" : "-"}{fmtCurrency(Math.abs(t.amount))}
                    </span>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

/* === BURN SENTINEL === */
const BurnSentinel = () => {
  const [timeframe, setTimeframe] = useState<"30d" | "60d" | "90d">("30d");
  const months = timeframe === "30d" ? 1 : timeframe === "60d" ? 2 : 3;
  const { data, isLoading } = useBurnOverview(months);

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Burn Sentinel</h1>
        <p className="text-sm text-muted-foreground">Real-time spend monitoring & anomaly detection</p>
      </div>

      <div className="flex gap-1.5 mb-4">
        {(["30d", "60d", "90d"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              timeframe === t ? "gradient-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
        ) : (
          <>
            <div className="glass rounded-xl p-4 sm:p-5">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Trailing {timeframe} Burn</p>
              <p className="text-lg sm:text-2xl font-display font-bold">{fmtCurrency(data?.burnMetrics.grossBurn || 0)}</p>
            </div>
            <div className="glass rounded-xl p-4 sm:p-5">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">90-day Average</p>
              <p className="text-lg sm:text-2xl font-display font-bold">{fmtCurrency(data?.avg90Day.grossBurn || 0)}</p>
              <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">Baseline</span>
            </div>
            <div className="glass rounded-xl p-4 sm:p-5">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Net Burn</p>
              <p className="text-lg sm:text-2xl font-display font-bold">{fmtCurrency(data?.burnMetrics.netBurn || 0)}</p>
            </div>
            <div className="glass rounded-xl p-4 sm:p-5">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Daily Burn Rate</p>
              <p className="text-lg sm:text-2xl font-display font-bold">{fmtCurrency(data?.burnMetrics.dailyBurn || 0)}</p>
              <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">{fmtCurrency(data?.burnMetrics.netBurn || 0)} ÷ 30</span>
            </div>
          </>
        )}
      </div>

      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="font-display font-semibold text-sm sm:text-base mb-4">Spend by Category</h3>
        <div className="space-y-3 sm:space-y-4">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8" />)
            : (data?.categories || []).map((c) => (
                <div key={c.category}>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span>{c.category}</span>
                    <span className="text-muted-foreground">
                      {fmtCurrency(c.amount)} ({c.percentage.toFixed(1)}%)
                      <span className={`ml-2 ${c.trend > 0 ? "text-destructive" : "text-success"}`}>
                        {c.trend > 0 ? "+" : ""}{c.trend.toFixed(1)}%
                      </span>
                    </span>
                  </div>
                  <Progress value={c.percentage} className="h-1.5 sm:h-2" />
                </div>
              ))
          }
        </div>
      </div>
    </>
  );
};

/* === RUNWAY COUNTDOWN === */
const RunwayCountdown = () => {
  const { data, isLoading } = useRunwayData();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 rounded-2xl" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      </div>
    );
  }

  const baseDays = data ? Math.round(data.base.months * 30) : 0;
  const consumedPct = data ? Math.min(100, Math.round((1 - data.base.months / (data.base.months + 6)) * 100)) : 0;

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Runway Countdown</h1>
        <p className="text-sm text-muted-foreground">Your exact cash-out date, updated in real-time</p>
      </div>

      <div className="glass-glow rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-4 sm:mb-6 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Cash runs out on</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2">
          {data ? fmtDate(data.base.date) : "—"}
        </h2>
        <p className="text-sm sm:text-lg text-muted-foreground">{baseDays} days from today</p>
        <div className="mt-4 flex justify-center">
          <Progress value={consumedPct} className="w-48 sm:w-64 h-2" />
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-2">{consumedPct}% of estimated runway consumed</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {data && [
          { label: "Conservative (burn +20%)", scenario: data.conservative, color: "text-destructive" },
          { label: "Base (current)", scenario: data.base, color: "text-warning" },
          { label: "Optimistic (burn -10%)", scenario: data.optimistic, color: "text-success" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl p-4 sm:p-5 text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">{s.label}</p>
            <p className={`text-base sm:text-lg font-display font-bold ${s.color}`}>{fmtDate(s.scenario.date)}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{Math.round(s.scenario.months * 30)} days</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="font-display font-semibold text-sm sm:text-base mb-2">Key Metrics</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4 sm:p-5">
            <p className="text-xs text-muted-foreground mb-1">Cash Balance</p>
            <p className="text-lg font-display font-bold">{fmtCurrency(data?.cashBalance || 0)}</p>
          </div>
          <div className="glass rounded-xl p-4 sm:p-5">
            <p className="text-xs text-muted-foreground mb-1">Net Monthly Burn</p>
            <p className="text-lg font-display font-bold">{fmtCurrency(data?.netBurn || 0)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

/* === ALERTS PAGE === */
const AlertsPage = () => {
  const [filterLevel, setFilterLevel] = useState<"all" | "critical" | "warning" | "info">("all");
  const level = filterLevel === "all" ? undefined : filterLevel as AlertLevel;
  const { data: alerts, isLoading } = useAlerts(level);
  const dismissMutation = useDismissAlert();

  const allAlerts = alerts || [];

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Alerts</h1>
        <p className="text-sm text-muted-foreground">All warnings from your AI defense system</p>
      </div>

      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {(["all", "critical", "warning", "info"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setFilterLevel(l)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              filterLevel === l ? "gradient-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {l === "all" ? "All" : l.charAt(0).toUpperCase() + l.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2 sm:space-y-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
          : allAlerts.length === 0
          ? <p className="text-sm text-muted-foreground py-8 text-center">No alerts to show 🎉</p>
          : allAlerts.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-4 sm:p-5"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                    a.level === "critical" ? "bg-destructive animate-pulse" : a.level === "warning" ? "bg-warning" : "bg-info"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-semibold">{a.title}</h4>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">{timeAgo(a.created_at)}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{a.message}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs h-7"
                      onClick={() => dismissMutation.mutate(a.id)}
                      disabled={dismissMutation.isPending}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
        }
      </div>
    </>
  );
};

/* === SETTINGS === */
const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "integrations" | "privacy">("profile");

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account, integrations, and preferences</p>
      </div>

      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
        {([
          { key: "profile" as const, label: "Profile" },
          { key: "integrations" as const, label: "Integrations" },
          { key: "privacy" as const, label: "Privacy & Security" },
        ]).map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === t.key ? "gradient-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === "profile" && (
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="font-display font-semibold text-sm sm:text-base mb-4">Company Profile</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs sm:text-sm text-muted-foreground">Email</label>
                  <input defaultValue={user?.email || ""} disabled className="w-full mt-1 h-9 sm:h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm opacity-60" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-muted-foreground">Company Name</label>
                  <input defaultValue="Acme Inc" className="w-full mt-1 h-9 sm:h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-muted-foreground">Stage</label>
                  <input defaultValue="Seed (VC-Backed)" className="w-full mt-1 h-9 sm:h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-muted-foreground">Timezone</label>
                  <input defaultValue="PST (UTC-8)" className="w-full mt-1 h-9 sm:h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm" />
                </div>
              </div>
              <Button className="mt-4 gradient-primary text-primary-foreground border-0 text-sm h-9">Save changes</Button>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="font-display font-semibold text-sm sm:text-base mb-4">Connected Integrations</h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: "Mercury (Banking)", status: "Connected", since: "Jan 15, 2026" },
                  { name: "Stripe (Revenue)", status: "Connected", since: "Jan 15, 2026" },
                  { name: "Gusto (Payroll)", status: "Connected", since: "Jan 16, 2026" },
                  { name: "QuickBooks (Accounting)", status: "Not connected", since: null },
                  { name: "Slack (Notifications)", status: "Not connected", since: null },
                ].map((int) => (
                  <div key={int.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-muted/20">
                    <div>
                      <span className="text-xs sm:text-sm font-medium">{int.name}</span>
                      {int.since && <p className="text-[10px] text-muted-foreground">Since {int.since}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${int.status === "Connected" ? "text-success" : "text-muted-foreground"}`}>
                        {int.status === "Connected" ? "● " : "○ "}{int.status}
                      </span>
                      <Button variant="outline" size="sm" className="text-xs h-7 sm:h-8">
                        {int.status === "Connected" ? "Manage" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="font-display font-semibold text-sm sm:text-base mb-2">Privacy & Security</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">Your data is protected with bank-grade encryption. We never write to your accounts.</p>
              <div className="space-y-2">
                {[
                  "Read-only access to all connected accounts",
                  "256-bit AES encryption at rest and in transit",
                  "SOC 2 Type II compliant infrastructure",
                  "Data never sold or shared with third parties",
                  "GDPR & CCPA compliant",
                  "Daily security audits & penetration testing",
                ].map((p) => (
                  <div key={p} className="flex items-center gap-2 text-xs sm:text-sm p-2 rounded-lg bg-success/5">
                    <Lock className="h-3.5 w-3.5 text-success flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
                <p className="text-xs text-muted-foreground flex items-start gap-2">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  Your credentials are never stored. We use OAuth tokens with read-only permissions that you can revoke at any time.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
