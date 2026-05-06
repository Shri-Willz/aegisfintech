/* ────────────────────────────────────────────────────────
   Aegis – Supabase Database Type Definitions
   ──────────────────────────────────────────────────────── */

// ── Enums ──────────────────────────────────────────────
export type AlertLevel = 'critical' | 'warning' | 'info';
export type UploadStatus = 'processing' | 'completed' | 'failed';
export type TransactionType = 'debit' | 'credit';
export type CompanyStage = 'funded' | 'bootstrapped';
export type Severity = 'high' | 'medium' | 'low';

// ── Row types (what you get back from select) ──────────
export interface Profile {
  id: string;
  email: string;
  name: string;
  company: string | null;
  stage: CompanyStage | null;
  created_at: string;
}

export interface Upload {
  id: string;
  user_id: string;
  filename: string;
  file_path: string;
  bank_name: string | null;
  period_start: string | null;
  period_end: string | null;
  opening_bal: number | null;
  closing_bal: number | null;
  status: UploadStatus;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  upload_id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string | null;
  vendor: string | null;
  is_recurring: boolean;
  created_at: string;
}

export interface Alert {
  id: string;
  user_id: string;
  level: AlertLevel;
  title: string;
  message: string;
  is_dismissed: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  vendor: string;
  monthly_cost: number;
  first_seen: string | null;
  last_seen: string | null;
  flag: string | null;
  severity: Severity | null;
  is_reviewed: boolean;
  created_at: string;
}

// ── Insert types (what you pass to insert) ─────────────
export type ProfileInsert = Omit<Profile, 'created_at'>;
export type UploadInsert = Omit<Upload, 'id' | 'created_at'>;
export type TransactionInsert = Omit<Transaction, 'id' | 'created_at'>;
export type AlertInsert = Omit<Alert, 'id' | 'created_at' | 'is_dismissed'>;
export type SubscriptionInsert = Omit<Subscription, 'id' | 'created_at' | 'is_reviewed'>;

// ── Supabase Database type map ─────────────────────────
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: Partial<ProfileInsert>;
        Relationships: [];
      };
      uploads: {
        Row: Upload;
        Insert: UploadInsert;
        Update: Partial<UploadInsert>;
        Relationships: [];
      };
      transactions: {
        Row: Transaction;
        Insert: TransactionInsert;
        Update: Partial<TransactionInsert>;
        Relationships: [];
      };
      alerts: {
        Row: Alert;
        Insert: AlertInsert;
        Update: Partial<Omit<Alert, 'id' | 'created_at'>>;
        Relationships: [];
      };
      subscriptions: {
        Row: Subscription;
        Insert: SubscriptionInsert;
        Update: Partial<Omit<Subscription, 'id' | 'created_at'>>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// ── Derived / Computed types used by services ──────────
export interface BurnMetrics {
  grossBurn: number;
  revenue: number;
  netBurn: number;
  dailyBurn: number;
}

export interface CategorySpend {
  category: string;
  amount: number;
  percentage: number;
  trend: number; // % change vs previous period
}

export interface RunwayScenario {
  months: number;
  date: Date;
}

export interface RunwayData {
  base: RunwayScenario;
  conservative: RunwayScenario;
  optimistic: RunwayScenario;
  cashBalance: number;
  netBurn: number;
}

export interface DashboardSummary {
  cashBalance: number;
  monthlyBurn: number;
  netBurn: number;
  revenue: number;
  runwayDays: number;
  cashOutDate: Date;
  alertCount: number;
}
