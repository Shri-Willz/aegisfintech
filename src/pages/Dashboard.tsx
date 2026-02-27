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

const sidebarLinks = [
  { icon: BarChart3, label: "Command Center", path: "/dashboard" },
  { icon: AlertTriangle, label: "Burn Sentinel", path: "/dashboard/burn" },
  { icon: Target, label: "Runway Countdown", path: "/dashboard/runway" },
  { icon: TrendingDown, label: "Waste Assassin", path: "/dashboard/waste" },
  { icon: Zap, label: "Scenario War Room", path: "/dashboard/scenarios" },
  { icon: Rocket, label: "Fundraise Radar", path: "/dashboard/fundraise" },
  { icon: Bell, label: "Alerts", path: "/dashboard/alerts" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getContent = () => {
    if (currentPath === "/dashboard/burn") return <BurnSentinel />;
    if (currentPath === "/dashboard/runway") return <RunwayCountdown />;
    if (currentPath === "/dashboard/waste") return <WasteAssassin />;
    if (currentPath === "/dashboard/scenarios") return <ScenarioWarRoom />;
    if (currentPath === "/dashboard/fundraise") return <FundraiseRadar />;
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
          onClick={() => navigate("/")}
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
  const cards = [
    { label: "Cash Balance", value: "$847,200", change: "-3.2%", down: true, icon: DollarSign, detail: "Across 2 accounts" },
    { label: "Monthly Burn", value: "$124,500", change: "+8.1%", down: false, icon: TrendingDown, detail: "vs $115K last month" },
    { label: "Net Burn", value: "$89,200", change: "+5.4%", down: false, icon: BarChart3, detail: "After $35.3K revenue" },
    { label: "Next Payroll", value: "12 days", change: "$48,000", down: false, icon: Calendar, detail: "March 15, 2026" },
  ];

  const alerts = [
    { level: "critical", msg: "Burn rate increased 23% vs 90-day average", time: "2h ago" },
    { level: "warning", msg: "New recurring charge detected: Notion ($840/mo)", time: "5h ago" },
    { level: "info", msg: "Revenue tracking 12% above last month", time: "1d ago" },
    { level: "warning", msg: "AWS costs up 35% — reserved instances may need review", time: "1d ago" },
  ];

  const recentTxns = [
    { vendor: "AWS", amount: "-$4,200", cat: "Cloud Infra", date: "Today" },
    { vendor: "Stripe Payout", amount: "+$8,420", cat: "Revenue", date: "Today" },
    { vendor: "Gusto Payroll", amount: "-$48,000", cat: "Payroll", date: "Mar 1" },
    { vendor: "Figma", amount: "-$75", cat: "Software", date: "Mar 1" },
    { vendor: "Google Ads", amount: "-$2,100", cat: "Marketing", date: "Feb 28" },
  ];

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Command Center</h1>
        <p className="text-sm text-muted-foreground">Good morning. Here's your financial status.</p>
      </div>

      {/* Runway hero */}
      <div className="glass-glow rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Cash-out date</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">September 22, 2026</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">208 days of runway remaining</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
              <Clock className="h-3 w-3" /> 3–6 month range
            </span>
            <Link to="/dashboard/scenarios">
              <Button size="sm" variant="outline" className="text-xs">Model scenarios</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-xl p-3 sm:p-4 hover-lift cursor-pointer">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[10px] sm:text-xs text-muted-foreground">{c.label}</span>
              <c.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </div>
            <p className="text-lg sm:text-xl font-display font-bold">{c.value}</p>
            <span className={`text-[10px] sm:text-xs flex items-center gap-0.5 mt-0.5 sm:mt-1 ${c.down ? "text-success" : "text-destructive"}`}>
              {c.down ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
              {c.change}
            </span>
            <p className="text-[10px] text-muted-foreground mt-1 hidden sm:block">{c.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Alerts */}
        <div className="lg:col-span-3 glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-sm sm:text-base">Active Alerts</h3>
            <Link to="/dashboard/alerts" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  a.level === "critical" ? "bg-destructive animate-pulse" : a.level === "warning" ? "bg-warning" : "bg-info"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm truncate">{a.msg}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{a.time}</p>
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
            {recentTxns.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium truncate">{t.vendor}</p>
                  <p className="text-[10px] text-muted-foreground">{t.cat} · {t.date}</p>
                </div>
                <span className={`text-xs sm:text-sm font-semibold flex-shrink-0 ml-2 ${t.amount.startsWith("+") ? "text-success" : ""}`}>
                  {t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cash Flow Mini Chart */}
      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6">
        <h3 className="font-display font-semibold text-sm sm:text-base mb-4">Cash Flow — Last 6 Months</h3>
        <div className="grid grid-cols-6 gap-1 sm:gap-2 items-end h-32 sm:h-40">
          {[
            { month: "Sep", inflow: 32, outflow: 98 },
            { month: "Oct", inflow: 35, outflow: 105 },
            { month: "Nov", inflow: 28, outflow: 110 },
            { month: "Dec", inflow: 40, outflow: 115 },
            { month: "Jan", inflow: 38, outflow: 120 },
            { month: "Feb", inflow: 35, outflow: 124 },
          ].map((m) => (
            <div key={m.month} className="flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5 items-end justify-center h-24 sm:h-32">
                <div className="w-2 sm:w-3 rounded-t bg-success/60" style={{ height: `${(m.inflow / 140) * 100}%` }} />
                <div className="w-2 sm:w-3 rounded-t bg-destructive/60" style={{ height: `${(m.outflow / 140) * 100}%` }} />
              </div>
              <span className="text-[9px] sm:text-xs text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 justify-center">
          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-success/60" />Revenue</span>
          <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-destructive/60" />Expenses</span>
        </div>
      </div>
    </>
  );
};

/* === BURN SENTINEL === */
const BurnSentinel = () => {
  const [timeframe, setTimeframe] = useState<"30d" | "60d" | "90d">("30d");
  const categories = [
    { name: "Payroll", amount: "$48,000", pct: 38.5, trend: "+2.1%" },
    { name: "SaaS/Software", amount: "$18,400", pct: 14.8, trend: "+12.4%" },
    { name: "Cloud Infra", amount: "$22,100", pct: 17.7, trend: "+35.2%" },
    { name: "Marketing/Ads", amount: "$19,600", pct: 15.7, trend: "-5.3%" },
    { name: "Office/Ops", amount: "$8,200", pct: 6.6, trend: "+1.0%" },
    { name: "Other", amount: "$8,200", pct: 6.6, trend: "+3.8%" },
  ];

  const anomalies = [
    { type: "critical", vendor: "AWS", msg: "Cloud costs up 35% vs 90-day average", amount: "+$5,700" },
    { type: "warning", vendor: "Notion", msg: "New recurring charge not seen before", amount: "$840/mo" },
    { type: "warning", vendor: "Zoom", msg: "37 of 40 licenses unused", amount: "$185/mo wasted" },
  ];

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
        <div className="glass rounded-xl p-4 sm:p-5">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Trailing {timeframe} Burn</p>
          <p className="text-lg sm:text-2xl font-display font-bold">$124,500</p>
          <span className="text-[10px] sm:text-xs text-destructive flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="h-3 w-3" /> +8.1% vs last
          </span>
        </div>
        <div className="glass rounded-xl p-4 sm:p-5">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">90-day Average</p>
          <p className="text-lg sm:text-2xl font-display font-bold">$101,200</p>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">Baseline</span>
        </div>
        <div className="glass rounded-xl p-4 sm:p-5">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Active Anomalies</p>
          <p className="text-lg sm:text-2xl font-display font-bold text-destructive">3</p>
          <span className="text-[10px] sm:text-xs text-destructive mt-1">1 critical, 2 warnings</span>
        </div>
        <div className="glass rounded-xl p-4 sm:p-5">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Daily Burn Rate</p>
          <p className="text-lg sm:text-2xl font-display font-bold">$4,150</p>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1">$124.5K ÷ 30</span>
        </div>
      </div>

      {/* Anomalies */}
      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h3 className="font-display font-semibold text-sm sm:text-base mb-4">🚨 Detected Anomalies</h3>
        <div className="space-y-2 sm:space-y-3">
          {anomalies.map((a, i) => (
            <div key={i} className="flex items-start sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border border-border/50 bg-muted/20">
              <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.type === "critical" ? "bg-destructive animate-pulse" : "bg-warning"}`} />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold">{a.vendor}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">{a.msg}</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-destructive flex-shrink-0">{a.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="font-display font-semibold text-sm sm:text-base mb-4">Spend by Category</h3>
        <div className="space-y-3 sm:space-y-4">
          {categories.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span>{c.name}</span>
                <span className="text-muted-foreground">
                  {c.amount} ({c.pct}%)
                  <span className={`ml-2 ${c.trend.startsWith("+") ? "text-destructive" : "text-success"}`}>{c.trend}</span>
                </span>
              </div>
              <Progress value={c.pct} className="h-1.5 sm:h-2" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* === RUNWAY COUNTDOWN === */
const RunwayCountdown = () => (
  <>
    <div className="mb-6 sm:mb-8">
      <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Runway Countdown</h1>
      <p className="text-sm text-muted-foreground">Your exact cash-out date, updated daily at 6am</p>
    </div>

    <div className="glass-glow rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-4 sm:mb-6 text-center">
      <p className="text-xs sm:text-sm text-muted-foreground mb-2">Cash runs out on</p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2">September 22, 2026</h2>
      <p className="text-sm sm:text-lg text-muted-foreground">208 days from today</p>
      <div className="mt-4 flex justify-center">
        <Progress value={43} className="w-48 sm:w-64 h-2" />
      </div>
      <p className="text-[10px] sm:text-xs text-muted-foreground mt-2">43% of original runway consumed</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {[
        { label: "Conservative (burn +20%)", date: "July 14, 2026", days: "138 days", color: "text-destructive" },
        { label: "Base (current)", date: "September 22, 2026", days: "208 days", color: "text-warning" },
        { label: "Optimistic (burn -10%)", date: "November 8, 2026", days: "255 days", color: "text-success" },
      ].map((s) => (
        <div key={s.label} className="glass rounded-xl p-4 sm:p-5 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">{s.label}</p>
          <p className={`text-base sm:text-lg font-display font-bold ${s.color}`}>{s.date}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">{s.days}</p>
        </div>
      ))}
    </div>

    <div className="grid sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
      <div className="glass rounded-xl p-4 sm:p-5">
        <p className="text-xs text-muted-foreground mb-1">If revenue grows 15%</p>
        <p className="text-lg font-display font-bold text-success">December 3, 2026</p>
        <p className="text-xs text-muted-foreground">+47 days gained</p>
      </div>
      <div className="glass rounded-xl p-4 sm:p-5">
        <p className="text-xs text-muted-foreground mb-1">If you cut $15K/mo</p>
        <p className="text-lg font-display font-bold text-success">January 18, 2027</p>
        <p className="text-xs text-muted-foreground">+93 days gained</p>
      </div>
    </div>

    <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <h3 className="font-display font-semibold text-sm sm:text-base mb-2">Runway History</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4">How your runway date has shifted over the last 6 months</p>
      <div className="h-36 sm:h-48 flex items-end justify-between gap-1 sm:gap-2 px-2 sm:px-4">
        {[180, 195, 188, 210, 202, 208].map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[9px] sm:text-xs text-muted-foreground">{v}d</span>
            <div className="w-full rounded-t-md gradient-primary transition-all hover:opacity-80" style={{ height: `${(v / 250) * 100}%` }} />
            <span className="text-[9px] sm:text-xs text-muted-foreground">{["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

/* === WASTE ASSASSIN === */
const WasteAssassin = () => {
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | "unreviewed">("all");
  const items = [
    { vendor: "Figma", cost: "$75/mo", flag: "Duplicate: also paying for Sketch", savings: "$900/yr", severity: "medium" },
    { vendor: "Datadog", cost: "$420/mo", flag: "Usage dropped 60% last month", savings: "$3,024/yr", severity: "high" },
    { vendor: "Notion", cost: "$840/mo", flag: "New charge — didn't exist 60 days ago", savings: "Review", severity: "medium" },
    { vendor: "AWS Reserved", cost: "$1,200/mo", flag: "Charged 35% more than last month", savings: "$5,040/yr", severity: "high" },
    { vendor: "Zoom", cost: "$200/mo", flag: "Only 3 of 40 licenses active", savings: "$1,850/yr", severity: "high" },
    { vendor: "Intercom", cost: "$350/mo", flag: "No support tickets in 30 days", savings: "$4,200/yr", severity: "medium" },
  ];

  const filtered = filter === "unreviewed" ? items.filter(i => !reviewed.includes(i.vendor)) : items;

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Waste Assassin</h1>
        <p className="text-sm text-muted-foreground">Find and kill wasteful spend hiding in your stack</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="glass-glow rounded-xl p-4 sm:p-5">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Potential Annual Savings</p>
          <p className="text-lg sm:text-2xl font-display font-bold text-success">$15,014</p>
        </div>
        <div className="glass rounded-xl p-4 sm:p-5">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Subscriptions Tracked</p>
          <p className="text-lg sm:text-2xl font-display font-bold">34</p>
        </div>
        <div className="glass rounded-xl p-4 sm:p-5">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Flagged for Review</p>
          <p className="text-lg sm:text-2xl font-display font-bold text-warning">{items.length - reviewed.length}</p>
        </div>
        <div className="glass rounded-xl p-4 sm:p-5">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Already Reviewed</p>
          <p className="text-lg sm:text-2xl font-display font-bold text-success">{reviewed.length}</p>
        </div>
      </div>

      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-sm sm:text-base">Flagged Subscriptions</h3>
          <div className="flex gap-1.5">
            {(["all", "unreviewed"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-2.5 py-1 rounded-md text-xs transition-all ${filter === f ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                {f === "all" ? "All" : "Unreviewed"}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {filtered.map((item) => (
            <div key={item.vendor} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border transition-all ${
              reviewed.includes(item.vendor) ? "border-success/30 bg-success/5" : "border-border/50 bg-muted/20 hover:bg-muted/30"
            }`}>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm font-semibold">{item.vendor}</p>
                  <span className="text-[10px] text-muted-foreground">{item.cost}</span>
                  {item.severity === "high" && <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-destructive/10 text-destructive">High</span>}
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{item.flag}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-medium text-success">{item.savings}</span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={reviewed.includes(item.vendor)}
                  onClick={() => setReviewed([...reviewed, item.vendor])}
                  className="text-xs h-7 sm:h-8"
                >
                  {reviewed.includes(item.vendor) ? <><CheckCircle2 className="h-3 w-3 mr-1" />Done</> : "Review"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* === SCENARIO WAR ROOM === */
const ScenarioWarRoom = () => {
  const [hires, setHires] = useState(2);
  const [salary, setSalary] = useState(85000);
  const [scenarioType, setScenarioType] = useState<"hire" | "cut" | "revenue">("hire");

  const newBurn = scenarioType === "hire"
    ? 124500 + (hires * salary / 12)
    : scenarioType === "cut"
    ? 124500 - (hires * 1000)
    : 124500;

  const revenue = scenarioType === "revenue" ? 35300 * (1 + hires * 0.05) : 35300;
  const netBurn = newBurn - revenue;
  const newRunway = Math.floor(847200 / netBurn);
  const daysChange = newRunway - 208;

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Scenario War Room</h1>
        <p className="text-sm text-muted-foreground">Model "what if" with real numbers in 2 minutes</p>
      </div>

      <div className="flex gap-1.5 mb-4 sm:mb-6 overflow-x-auto pb-1">
        {([
          { key: "hire" as const, label: "Hire People", icon: "👥" },
          { key: "cut" as const, label: "Cut Spend", icon: "✂️" },
          { key: "revenue" as const, label: "Revenue Change", icon: "📈" },
        ]).map((s) => (
          <button
            key={s.key}
            onClick={() => setScenarioType(s.key)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              scenarioType === s.key ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h3 className="font-display font-semibold text-sm sm:text-base mb-4">
            {scenarioType === "hire" ? "Hire X People" : scenarioType === "cut" ? "Cut Monthly Spend" : "Revenue Growth"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs sm:text-sm text-muted-foreground">
                {scenarioType === "hire" ? "Number of hires" : scenarioType === "cut" ? "Monthly savings ($K)" : "Growth increments (5% each)"}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={hires}
                onChange={(e) => setHires(Number(e.target.value))}
                className="w-full mt-2 accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span><span className="font-semibold text-foreground">{hires}</span><span>10</span>
              </div>
            </div>
            {scenarioType === "hire" && (
              <div>
                <label className="text-xs sm:text-sm text-muted-foreground">Average salary ($)</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full mt-1 h-9 sm:h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        <div className="glass-glow rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h3 className="font-display font-semibold text-sm sm:text-base mb-4">Impact</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Current runway</span>
              <span className="text-xs sm:text-sm font-semibold">208 days (Sep 22)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">New monthly burn</span>
              <span className="text-xs sm:text-sm font-semibold">${Math.round(newBurn).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">New runway</span>
              <span className={`text-xs sm:text-sm font-semibold ${newRunway < 120 ? "text-destructive" : newRunway > 208 ? "text-success" : "text-warning"}`}>
                {newRunway} days
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Days {daysChange > 0 ? "gained" : "lost"}</span>
              <span className={`text-xs sm:text-sm font-semibold ${daysChange > 0 ? "text-success" : "text-destructive"}`}>
                {daysChange > 0 ? "+" : ""}{daysChange} days
              </span>
            </div>
            <div className="pt-3 border-t border-border/50">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {scenarioType === "hire" && `Hiring ${hires} people at $${(salary/1000).toFixed(0)}K reduces runway by ${Math.abs(daysChange)} days.`}
                {scenarioType === "cut" && `Cutting $${hires}K/mo extends runway by ${daysChange} days.`}
                {scenarioType === "revenue" && `${hires * 5}% revenue growth extends runway by ${daysChange} days.`}
                {newRunway < 120 && " ⚠️ Consider delaying or raising first."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
        {["Delay hiring 3 months", "Cut SaaS by $5K/mo", "Revenue misses by 20%"].map((s) => (
          <div key={s} className="glass rounded-xl p-3 sm:p-4 hover-lift cursor-pointer">
            <p className="text-xs sm:text-sm font-medium">{s}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Click to model</p>
          </div>
        ))}
      </div>
    </>
  );
};

/* === FUNDRAISE RADAR === */
const FundraiseRadar = () => {
  const [checklist, setChecklist] = useState({
    deck: true, dataroom: true, model: false, investors: false, intros: false, references: true,
  });

  const done = Object.values(checklist).filter(Boolean).length;
  const total = Object.values(checklist).length;

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">Fundraise Radar</h1>
        <p className="text-sm text-muted-foreground">Know exactly when to start raising</p>
      </div>

      <div className="glass-glow rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Start your raise by</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-warning">March 22, 2026</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">23 days away · 4-month Seed timeline + 2-month buffer</p>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning h-fit self-start">
            <AlertTriangle className="h-3 w-3" /> Begin outreach now
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Readiness Score</p>
          <p className="text-2xl font-display font-bold">{done}/{total}</p>
          <Progress value={(done / total) * 100} className="h-1.5 mt-2" />
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Target Round</p>
          <p className="text-lg font-display font-bold">Seed</p>
          <p className="text-xs text-muted-foreground">$2M–$4M</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Estimated Timeline</p>
          <p className="text-lg font-display font-bold">4 months</p>
          <p className="text-xs text-muted-foreground">Industry median for Seed</p>
        </div>
      </div>

      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="font-display font-semibold text-sm sm:text-base mb-4">Fundraise Readiness Checklist</h3>
        <div className="space-y-2 sm:space-y-3">
          {[
            { key: "deck", item: "Updated pitch deck" },
            { key: "dataroom", item: "Data room prepared" },
            { key: "model", item: "12-month financial model" },
            { key: "investors", item: "Top 20 target investors identified" },
            { key: "intros", item: "Warm intro paths mapped" },
            { key: "references", item: "Reference customers ready" },
          ].map((c) => (
            <label key={c.key} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
              checklist[c.key as keyof typeof checklist] ? "bg-success/5 border border-success/20" : "bg-muted/20 border border-transparent hover:bg-muted/30"
            }`}>
              <input
                type="checkbox"
                checked={checklist[c.key as keyof typeof checklist]}
                onChange={(e) => setChecklist({ ...checklist, [c.key]: e.target.checked })}
                className="accent-primary"
              />
              <span className={`text-xs sm:text-sm ${checklist[c.key as keyof typeof checklist] ? "text-foreground" : "text-muted-foreground"}`}>{c.item}</span>
              {checklist[c.key as keyof typeof checklist] && <CheckCircle2 className="h-3.5 w-3.5 text-success ml-auto" />}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

/* === ALERTS PAGE === */
const AlertsPage = () => {
  const [filterLevel, setFilterLevel] = useState<"all" | "critical" | "warning" | "info">("all");
  const alerts = [
    { level: "critical", title: "Runway Below 90 Days (Conservative)", msg: "Conservative scenario puts cash-out at July 14, 2026 — 138 days", time: "Today", action: "Model scenarios" },
    { level: "critical", title: "Burn Spike Detected", msg: "Current month burn tracking 23% above 90-day average of $101K", time: "2h ago", action: "View burn" },
    { level: "warning", title: "New Subscription", msg: "Notion ($840/mo) appeared as a new recurring charge", time: "5h ago", action: "Review" },
    { level: "warning", title: "Duplicate Vendor Suspected", msg: "Both Figma ($75/mo) and Sketch ($65/mo) are active design tools", time: "1d ago", action: "Review" },
    { level: "info", title: "Revenue Up", msg: "Stripe MRR tracking 12% above last month at same point", time: "1d ago", action: null },
    { level: "info", title: "Weekly Report Ready", msg: "Your Tough Love weekly digest is ready for review", time: "2d ago", action: "View report" },
  ];

  const filtered = filterLevel === "all" ? alerts : alerts.filter(a => a.level === filterLevel);

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
            {l === "all" ? "All" : l.charAt(0).toUpperCase() + l.slice(1)} {l !== "all" && `(${alerts.filter(a => a.level === l).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-2 sm:space-y-3">
        {filtered.map((a, i) => (
          <motion.div
            key={i}
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
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{a.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{a.msg}</p>
                {a.action && (
                  <Button variant="outline" size="sm" className="mt-2 text-xs h-7">
                    {a.action}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

/* === SETTINGS === */
const SettingsPage = () => {
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
                  <label className="text-xs sm:text-sm text-muted-foreground">Company Name</label>
                  <input defaultValue="Acme Inc" className="w-full mt-1 h-9 sm:h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-muted-foreground">Stage</label>
                  <input defaultValue="Seed (VC-Backed)" className="w-full mt-1 h-9 sm:h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-muted-foreground">Team Size</label>
                  <input defaultValue="12" className="w-full mt-1 h-9 sm:h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm" />
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
