import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, BarChart3, AlertTriangle, Target, TrendingDown, Zap, Rocket,
  Bell, Settings, LogOut, ChevronRight, ArrowUpRight, ArrowDownRight,
  DollarSign, Calendar, Clock, Lock, Search, User,
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

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border/50 bg-card/50 p-4">
        <div className="flex items-center gap-2 px-3 mb-8">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-lg">Aegis</span>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentPath === link.path
                  ? "gradient-primary text-primary-foreground"
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
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 glass border-b border-border/50 h-14 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="lg:hidden flex items-center gap-2 mr-4">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-display font-bold">Aegis</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
              <Search className="h-3.5 w-3.5" />
              <span>Search...</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive" />
            </Button>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        </header>

        <div className="p-6 max-w-6xl mx-auto">
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
    { label: "Cash Balance", value: "$847,200", change: "-3.2%", down: true, icon: DollarSign },
    { label: "Monthly Burn", value: "$124,500", change: "+8.1%", down: false, icon: TrendingDown },
    { label: "Net Burn", value: "$89,200", change: "+5.4%", down: false, icon: BarChart3 },
    { label: "Next Payroll", value: "12 days", change: "$48,000", down: false, icon: Calendar },
  ];

  const alerts = [
    { level: "critical", msg: "Burn rate increased 23% vs 90-day average", time: "2h ago" },
    { level: "warning", msg: "New recurring charge detected: Notion ($840/mo)", time: "5h ago" },
    { level: "info", msg: "Revenue tracking 12% above last month", time: "1d ago" },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-1">Command Center</h1>
        <p className="text-sm text-muted-foreground">Good morning. Here's your financial status.</p>
      </div>

      {/* Runway hero */}
      <div className="glass-glow rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Cash-out date</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">September 22, 2026</h2>
            <p className="text-sm text-muted-foreground mt-1">208 days of runway remaining</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
              <Clock className="h-3 w-3" /> 3–6 month range
            </span>
            <Link to="/dashboard/scenarios">
              <Button size="sm" variant="outline">Model scenarios</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{c.label}</span>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xl font-display font-bold">{c.value}</p>
            <span className={`text-xs flex items-center gap-0.5 mt-1 ${c.down ? "text-success" : "text-destructive"}`}>
              {c.down ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
              {c.change}
            </span>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Active Alerts</h3>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                a.level === "critical" ? "bg-destructive" : a.level === "warning" ? "bg-warning" : "bg-info"
              }`} />
              <div className="flex-1">
                <p className="text-sm">{a.msg}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* === BURN SENTINEL === */
const BurnSentinel = () => {
  const categories = [
    { name: "Payroll", amount: "$48,000", pct: 38.5 },
    { name: "SaaS/Software", amount: "$18,400", pct: 14.8 },
    { name: "Cloud Infra", amount: "$22,100", pct: 17.7 },
    { name: "Marketing/Ads", amount: "$19,600", pct: 15.7 },
    { name: "Office/Ops", amount: "$8,200", pct: 6.6 },
    { name: "Other", amount: "$8,200", pct: 6.6 },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-1">Burn Sentinel</h1>
        <p className="text-sm text-muted-foreground">Real-time spend monitoring & anomaly detection</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-2">Trailing 30-day Burn</p>
          <p className="text-2xl font-display font-bold">$124,500</p>
          <span className="text-xs text-destructive flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="h-3 w-3" /> +8.1% vs last month
          </span>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-2">90-day Average</p>
          <p className="text-2xl font-display font-bold">$101,200</p>
          <span className="text-xs text-muted-foreground mt-1">Baseline for anomaly detection</span>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-2">Active Anomalies</p>
          <p className="text-2xl font-display font-bold text-destructive">3</p>
          <span className="text-xs text-destructive mt-1">1 critical, 2 warnings</span>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Spend by Category</h3>
        <div className="space-y-4">
          {categories.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{c.name}</span>
                <span className="text-muted-foreground">{c.amount} ({c.pct}%)</span>
              </div>
              <Progress value={c.pct} className="h-2" />
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
    <div className="mb-8">
      <h1 className="text-2xl font-display font-bold mb-1">Runway Countdown</h1>
      <p className="text-sm text-muted-foreground">Your exact cash-out date, updated daily at 6am</p>
    </div>

    <div className="glass-glow rounded-2xl p-8 mb-6 text-center">
      <p className="text-sm text-muted-foreground mb-2">Cash runs out on</p>
      <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">September 22, 2026</h2>
      <p className="text-lg text-muted-foreground">208 days from today</p>
    </div>

    <div className="grid md:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Conservative (burn +20%)", date: "July 14, 2026", days: "138 days" },
        { label: "Base (current)", date: "September 22, 2026", days: "208 days" },
        { label: "Optimistic (burn -10%)", date: "November 8, 2026", days: "255 days" },
      ].map((s) => (
        <div key={s.label} className="glass rounded-xl p-5 text-center">
          <p className="text-xs text-muted-foreground mb-2">{s.label}</p>
          <p className="text-lg font-display font-bold">{s.date}</p>
          <p className="text-sm text-muted-foreground">{s.days}</p>
        </div>
      ))}
    </div>

    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-semibold mb-2">Runway History</h3>
      <p className="text-sm text-muted-foreground mb-4">How your runway date has shifted over the last 6 months</p>
      <div className="h-48 flex items-end justify-between gap-2 px-4">
        {[180, 195, 188, 210, 202, 208].map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">{v}d</span>
            <div className="w-full rounded-t-md gradient-primary" style={{ height: `${(v / 250) * 100}%` }} />
            <span className="text-xs text-muted-foreground">{["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

/* === WASTE ASSASSIN === */
const WasteAssassin = () => {
  const [reviewed, setReviewed] = useState<string[]>([]);
  const items = [
    { vendor: "Figma", cost: "$75/mo", flag: "Duplicate: also paying for Sketch", savings: "$900/yr" },
    { vendor: "Datadog", cost: "$420/mo", flag: "Usage dropped 60% last month", savings: "$3,024/yr" },
    { vendor: "Notion", cost: "$840/mo", flag: "New charge — didn't exist 60 days ago", savings: "Review" },
    { vendor: "AWS Reserved", cost: "$1,200/mo", flag: "Charged 35% more than last month", savings: "$5,040/yr" },
    { vendor: "Zoom", cost: "$200/mo", flag: "Only 3 of 40 licenses active", savings: "$1,850/yr" },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-1">Waste Assassin</h1>
        <p className="text-sm text-muted-foreground">Find and kill wasteful spend hiding in your stack</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="glass-glow rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-2">Potential Annual Savings</p>
          <p className="text-2xl font-display font-bold text-success">$10,814</p>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-2">Subscriptions Tracked</p>
          <p className="text-2xl font-display font-bold">34</p>
        </div>
        <div className="glass rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-2">Flagged for Review</p>
          <p className="text-2xl font-display font-bold text-warning">{items.length - reviewed.length}</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Flagged Subscriptions</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.vendor} className={`flex items-center justify-between p-4 rounded-xl border ${
              reviewed.includes(item.vendor) ? "border-success/30 bg-success/5" : "border-border/50 bg-muted/20"
            }`}>
              <div>
                <p className="text-sm font-semibold">{item.vendor} · <span className="text-muted-foreground font-normal">{item.cost}</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.flag}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-success">{item.savings}</span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={reviewed.includes(item.vendor)}
                  onClick={() => setReviewed([...reviewed, item.vendor])}
                >
                  {reviewed.includes(item.vendor) ? "Reviewed" : "Mark reviewed"}
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
  const newBurn = 124500 + (hires * salary / 12);
  const newRunway = Math.floor(847200 / (newBurn - 35300));

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-1">Scenario War Room</h1>
        <p className="text-sm text-muted-foreground">Model "what if" with real numbers in 2 minutes</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4">Hire X People</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Number of hires</label>
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
            <div>
              <label className="text-sm text-muted-foreground">Average salary ($)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full mt-1 h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="glass-glow rounded-2xl p-6">
          <h3 className="font-display font-semibold mb-4">Impact</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Current runway</span>
              <span className="text-sm font-semibold">208 days (Sep 22)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">New monthly burn</span>
              <span className="text-sm font-semibold">${Math.round(newBurn).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">New runway</span>
              <span className={`text-sm font-semibold ${newRunway < 120 ? "text-destructive" : "text-warning"}`}>
                {newRunway} days
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Days lost</span>
              <span className="text-sm font-semibold text-destructive">-{208 - newRunway} days</span>
            </div>
            <div className="pt-3 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Hiring {hires} people at ${(salary/1000).toFixed(0)}K reduces your runway by {208 - newRunway} days.
                {newRunway < 120 && " Consider delaying or raising first."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {["Delay hiring 3 months", "Cut SaaS by $5K/mo", "Revenue misses by 20%"].map((s) => (
          <div key={s} className="glass rounded-xl p-4 hover-lift cursor-pointer">
            <p className="text-sm font-medium">{s}</p>
            <p className="text-xs text-muted-foreground mt-1">Click to model this scenario</p>
          </div>
        ))}
      </div>
    </>
  );
};

/* === FUNDRAISE RADAR === */
const FundraiseRadar = () => (
  <>
    <div className="mb-8">
      <h1 className="text-2xl font-display font-bold mb-1">Fundraise Radar</h1>
      <p className="text-sm text-muted-foreground">Know exactly when to start raising</p>
    </div>

    <div className="glass-glow rounded-2xl p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Start your raise by</p>
          <h2 className="text-3xl font-display font-bold text-warning">March 22, 2026</h2>
          <p className="text-sm text-muted-foreground mt-1">23 days away · Based on 4-month Seed timeline + 2-month buffer</p>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning h-fit">
          <AlertTriangle className="h-3 w-3" /> Begin outreach now
        </span>
      </div>
    </div>

    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-semibold mb-4">Fundraise Readiness</h3>
      <div className="space-y-3">
        {[
          { item: "Updated pitch deck", done: true },
          { item: "Data room prepared", done: true },
          { item: "12-month financial model", done: false },
          { item: "Top 20 target investors identified", done: false },
          { item: "Warm intro paths mapped", done: false },
          { item: "Reference customers ready", done: true },
        ].map((c) => (
          <label key={c.item} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 cursor-pointer">
            <input type="checkbox" defaultChecked={c.done} className="accent-primary" />
            <span className={`text-sm ${c.done ? "text-foreground" : "text-muted-foreground"}`}>{c.item}</span>
          </label>
        ))}
      </div>
    </div>
  </>
);

/* === ALERTS PAGE === */
const AlertsPage = () => {
  const alerts = [
    { level: "critical", title: "Runway Below 90 Days (Conservative)", msg: "Conservative scenario puts cash-out at July 14, 2026 — 138 days", time: "Today" },
    { level: "critical", title: "Burn Spike Detected", msg: "Current month burn tracking 23% above 90-day average of $101K", time: "2h ago" },
    { level: "warning", title: "New Subscription", msg: "Notion ($840/mo) appeared as a new recurring charge", time: "5h ago" },
    { level: "warning", title: "Duplicate Vendor Suspected", msg: "Both Figma ($75/mo) and Sketch ($65/mo) are active design tools", time: "1d ago" },
    { level: "info", title: "Revenue Up", msg: "Stripe MRR tracking 12% above last month at same point", time: "1d ago" },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold mb-1">Alerts</h1>
        <p className="text-sm text-muted-foreground">All warnings from your AI defense system</p>
      </div>

      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className="glass rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                a.level === "critical" ? "bg-destructive animate-pulse" : a.level === "warning" ? "bg-warning" : "bg-info"
              }`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">{a.title}</h4>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{a.msg}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

/* === SETTINGS === */
const SettingsPage = () => (
  <>
    <div className="mb-8">
      <h1 className="text-2xl font-display font-bold mb-1">Settings</h1>
      <p className="text-sm text-muted-foreground">Manage your account, integrations, and preferences</p>
    </div>

    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Company Profile</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Company Name</label>
            <input defaultValue="Acme Inc" className="w-full mt-1 h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Stage</label>
            <input defaultValue="Seed (VC-Backed)" className="w-full mt-1 h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm" />
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Connected Integrations</h3>
        <div className="space-y-3">
          {[
            { name: "Mercury (Banking)", status: "Connected" },
            { name: "Stripe (Revenue)", status: "Connected" },
            { name: "Gusto (Payroll)", status: "Connected" },
            { name: "QuickBooks (Accounting)", status: "Not connected" },
            { name: "Slack (Notifications)", status: "Not connected" },
          ].map((int) => (
            <div key={int.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
              <span className="text-sm">{int.name}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${int.status === "Connected" ? "text-success" : "text-muted-foreground"}`}>
                  {int.status}
                </span>
                <Button variant="outline" size="sm">
                  {int.status === "Connected" ? "Manage" : "Connect"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-2">Privacy & Security</h3>
        <p className="text-sm text-muted-foreground mb-4">Your data is protected with bank-grade encryption. We never write to your accounts.</p>
        <div className="space-y-2">
          {["Read-only access to all connected accounts", "256-bit AES encryption at rest and in transit", "SOC 2 Type II compliant infrastructure", "Data never sold or shared with third parties"].map((p) => (
            <div key={p} className="flex items-center gap-2 text-sm">
              <Lock className="h-3.5 w-3.5 text-success" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

export default Dashboard;
