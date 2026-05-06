-- ============================================================
-- Aegis FinTech — Initial Schema
-- Run this in your Supabase SQL Editor (or via supabase db push)
-- ============================================================

-- 1. Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email      VARCHAR(255) NOT NULL,
    name       VARCHAR(255) NOT NULL,
    company    VARCHAR(255),
    stage      VARCHAR(50) CHECK (stage IN ('funded', 'bootstrapped')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Uploads
CREATE TABLE IF NOT EXISTS uploads (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    filename     VARCHAR(255) NOT NULL,
    file_path    VARCHAR(500) NOT NULL,
    bank_name    VARCHAR(255),
    period_start DATE,
    period_end   DATE,
    opening_bal  DECIMAL(15,2),
    closing_bal  DECIMAL(15,2),
    status       VARCHAR(50) DEFAULT 'processing' CHECK (status IN ('processing','completed','failed')),
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Transactions
CREATE TABLE IF NOT EXISTS transactions (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    upload_id    UUID NOT NULL REFERENCES uploads(id) ON DELETE CASCADE,
    date         DATE NOT NULL,
    description  VARCHAR(500) NOT NULL,
    amount       DECIMAL(15,2) NOT NULL,
    type         VARCHAR(10) NOT NULL CHECK (type IN ('debit','credit')),
    category     VARCHAR(100),
    vendor       VARCHAR(255),
    is_recurring BOOLEAN DEFAULT FALSE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Alerts
CREATE TABLE IF NOT EXISTS alerts (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    level        VARCHAR(20) NOT NULL CHECK (level IN ('critical','warning','info')),
    title        VARCHAR(255) NOT NULL,
    message      TEXT NOT NULL,
    is_dismissed BOOLEAN DEFAULT FALSE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    vendor       VARCHAR(255) NOT NULL,
    monthly_cost DECIMAL(15,2) NOT NULL,
    first_seen   DATE,
    last_seen    DATE,
    flag         VARCHAR(500),
    severity     VARCHAR(20) CHECK (severity IN ('high','medium','low')),
    is_reviewed  BOOLEAN DEFAULT FALSE,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads       ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles: users see only themselves
CREATE POLICY "Users read own profile"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Uploads: users see only their own
CREATE POLICY "Users read own uploads"   ON uploads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own uploads" ON uploads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own uploads" ON uploads FOR UPDATE USING (auth.uid() = user_id);

-- Transactions: users see only their own
CREATE POLICY "Users read own transactions"   ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Alerts: users see and update only their own
CREATE POLICY "Users read own alerts"   ON alerts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own alerts" ON alerts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own alerts" ON alerts FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions: users see and update only their own
CREATE POLICY "Users read own subscriptions"   ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own subscriptions" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own subscriptions" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- Indexes for performance
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_category  ON transactions(user_id, category);
CREATE INDEX IF NOT EXISTS idx_alerts_user_level      ON alerts(user_id, level);
CREATE INDEX IF NOT EXISTS idx_uploads_user           ON uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user     ON subscriptions(user_id);
