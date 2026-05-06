-- ============================================================
-- Aegis FinTech — Seed Data
-- Run this AFTER 001_initial_schema.sql and AFTER signing up
-- a test user.  Replace YOUR_USER_ID_HERE with the user's
-- UUID from auth.users.
-- ============================================================

-- You can find your user ID in Supabase Dashboard → Authentication → Users
-- Or run:  SELECT id FROM auth.users LIMIT 1;

-- ── Helper: set a variable for the user id ──────────────
-- (Supabase SQL Editor supports DO blocks)
DO $$
DECLARE
    uid UUID;
    upload1_id UUID := gen_random_uuid();
    upload2_id UUID := gen_random_uuid();
BEGIN
    -- Auto-detect the first user (change this if you have multiple users)
    SELECT id INTO uid FROM auth.users LIMIT 1;

    IF uid IS NULL THEN
        RAISE EXCEPTION 'No users found. Sign up first, then run this seed script.';
    END IF;

    -- Make sure profile exists
    INSERT INTO profiles (id, email, name, company, stage)
    SELECT uid, u.email, COALESCE(u.raw_user_meta_data->>'name', 'Test User'), 'Acme Inc', 'funded'
    FROM auth.users u WHERE u.id = uid
    ON CONFLICT (id) DO NOTHING;

    -- ── Uploads ────────────────────────────────────────
    INSERT INTO uploads (id, user_id, filename, file_path, bank_name, period_start, period_end, opening_bal, closing_bal, status) VALUES
    (upload1_id, uid, 'acme_bank_jan2026.pdf', 'statements/acme_bank_jan2026.pdf', 'Silicon Valley Bank', '2026-01-01', '2026-01-31', 971700.00, 912500.00, 'completed'),
    (upload2_id, uid, 'acme_bank_feb2026.pdf', 'statements/acme_bank_feb2026.pdf', 'Silicon Valley Bank', '2026-02-01', '2026-02-28', 912500.00, 847200.00, 'completed');

    -- ── Transactions (January 2026) ────────────────────
    INSERT INTO transactions (user_id, upload_id, date, description, amount, type, category, vendor, is_recurring) VALUES
    -- Payroll
    (uid, upload1_id, '2026-01-01', 'Gusto Payroll - January',        -46000.00, 'debit',  'Payroll',      'Gusto',         TRUE),
    (uid, upload1_id, '2026-01-15', 'Gusto Payroll - January (2nd)',   -46000.00, 'debit',  'Payroll',      'Gusto',         TRUE),
    -- Cloud
    (uid, upload1_id, '2026-01-03', 'AWS Monthly Invoice',            -18500.00, 'debit',  'Cloud Infra',  'AWS',           TRUE),
    (uid, upload1_id, '2026-01-03', 'Google Cloud Platform',           -2100.00, 'debit',  'Cloud Infra',  'Google Cloud',  TRUE),
    -- SaaS
    (uid, upload1_id, '2026-01-05', 'Slack Business+ Subscription',     -840.00, 'debit',  'SaaS/Software','Slack',         TRUE),
    (uid, upload1_id, '2026-01-05', 'GitHub Enterprise',                -420.00, 'debit',  'SaaS/Software','GitHub',        TRUE),
    (uid, upload1_id, '2026-01-05', 'Figma Professional Plan',          -75.00, 'debit',  'SaaS/Software','Figma',         TRUE),
    (uid, upload1_id, '2026-01-05', 'Sketch Team License',              -65.00, 'debit',  'SaaS/Software','Sketch',        TRUE),
    (uid, upload1_id, '2026-01-05', 'Notion Team Plan',                -840.00, 'debit',  'SaaS/Software','Notion',        TRUE),
    (uid, upload1_id, '2026-01-05', 'Datadog Pro Plan',                -420.00, 'debit',  'SaaS/Software','Datadog',       TRUE),
    (uid, upload1_id, '2026-01-05', 'Zoom Business (40 licenses)',     -200.00, 'debit',  'SaaS/Software','Zoom',          TRUE),
    (uid, upload1_id, '2026-01-05', 'Intercom Support Plan',           -350.00, 'debit',  'SaaS/Software','Intercom',      TRUE),
    (uid, upload1_id, '2026-01-05', 'Linear Team Plan',                -120.00, 'debit',  'SaaS/Software','Linear',        TRUE),
    (uid, upload1_id, '2026-01-05', 'Vercel Pro',                      -150.00, 'debit',  'SaaS/Software','Vercel',        TRUE),
    -- Marketing
    (uid, upload1_id, '2026-01-10', 'Google Ads - January',           -12000.00, 'debit',  'Marketing/Ads','Google Ads',    FALSE),
    (uid, upload1_id, '2026-01-10', 'Meta Ads - January',              -5500.00, 'debit',  'Marketing/Ads','Meta',          FALSE),
    -- Office
    (uid, upload1_id, '2026-01-01', 'WeWork Office Rent',              -6800.00, 'debit',  'Office/Ops',   'WeWork',        TRUE),
    (uid, upload1_id, '2026-01-15', 'Office Supplies & Snacks',         -420.00, 'debit',  'Office/Ops',   'Various',       FALSE),
    -- Revenue
    (uid, upload1_id, '2026-01-07', 'Stripe Payout - Week 1',          8200.00, 'credit', 'Revenue',      'Stripe',        FALSE),
    (uid, upload1_id, '2026-01-14', 'Stripe Payout - Week 2',          7800.00, 'credit', 'Revenue',      'Stripe',        FALSE),
    (uid, upload1_id, '2026-01-21', 'Stripe Payout - Week 3',          9100.00, 'credit', 'Revenue',      'Stripe',        FALSE),
    (uid, upload1_id, '2026-01-28', 'Stripe Payout - Week 4',          7200.00, 'credit', 'Revenue',      'Stripe',        FALSE);

    -- ── Transactions (February 2026) ───────────────────
    INSERT INTO transactions (user_id, upload_id, date, description, amount, type, category, vendor, is_recurring) VALUES
    -- Payroll
    (uid, upload2_id, '2026-02-01', 'Gusto Payroll - February',       -48000.00, 'debit',  'Payroll',      'Gusto',         TRUE),
    (uid, upload2_id, '2026-02-15', 'Gusto Payroll - February (2nd)', -48000.00, 'debit',  'Payroll',      'Gusto',         TRUE),
    -- Cloud (up 35%!)
    (uid, upload2_id, '2026-02-03', 'AWS Monthly Invoice',            -22100.00, 'debit',  'Cloud Infra',  'AWS',           TRUE),
    (uid, upload2_id, '2026-02-03', 'Google Cloud Platform',           -2400.00, 'debit',  'Cloud Infra',  'Google Cloud',  TRUE),
    -- SaaS
    (uid, upload2_id, '2026-02-05', 'Slack Business+ Subscription',     -840.00, 'debit',  'SaaS/Software','Slack',         TRUE),
    (uid, upload2_id, '2026-02-05', 'GitHub Enterprise',                -420.00, 'debit',  'SaaS/Software','GitHub',        TRUE),
    (uid, upload2_id, '2026-02-05', 'Figma Professional Plan',          -75.00, 'debit',  'SaaS/Software','Figma',         TRUE),
    (uid, upload2_id, '2026-02-05', 'Sketch Team License',              -65.00, 'debit',  'SaaS/Software','Sketch',        TRUE),
    (uid, upload2_id, '2026-02-05', 'Notion Team Plan',                -840.00, 'debit',  'SaaS/Software','Notion',        TRUE),
    (uid, upload2_id, '2026-02-05', 'Datadog Pro Plan',                -420.00, 'debit',  'SaaS/Software','Datadog',       TRUE),
    (uid, upload2_id, '2026-02-05', 'Zoom Business (40 licenses)',     -200.00, 'debit',  'SaaS/Software','Zoom',          TRUE),
    (uid, upload2_id, '2026-02-05', 'Intercom Support Plan',           -350.00, 'debit',  'SaaS/Software','Intercom',      TRUE),
    (uid, upload2_id, '2026-02-05', 'Linear Team Plan',                -120.00, 'debit',  'SaaS/Software','Linear',        TRUE),
    (uid, upload2_id, '2026-02-05', 'Vercel Pro',                      -150.00, 'debit',  'SaaS/Software','Vercel',        TRUE),
    -- Marketing
    (uid, upload2_id, '2026-02-10', 'Google Ads - February',          -11500.00, 'debit',  'Marketing/Ads','Google Ads',    FALSE),
    (uid, upload2_id, '2026-02-10', 'Meta Ads - February',             -8100.00, 'debit',  'Marketing/Ads','Meta',          FALSE),
    -- Office
    (uid, upload2_id, '2026-02-01', 'WeWork Office Rent',              -6800.00, 'debit',  'Office/Ops',   'WeWork',        TRUE),
    (uid, upload2_id, '2026-02-12', 'Team Lunch & Events',             -1400.00, 'debit',  'Office/Ops',   'Various',       FALSE),
    -- Revenue
    (uid, upload2_id, '2026-02-04', 'Stripe Payout - Week 1',          8420.00, 'credit', 'Revenue',      'Stripe',        FALSE),
    (uid, upload2_id, '2026-02-11', 'Stripe Payout - Week 2',          9200.00, 'credit', 'Revenue',      'Stripe',        FALSE),
    (uid, upload2_id, '2026-02-18', 'Stripe Payout - Week 3',          8900.00, 'credit', 'Revenue',      'Stripe',        FALSE),
    (uid, upload2_id, '2026-02-25', 'Stripe Payout - Week 4',          8780.00, 'credit', 'Revenue',      'Stripe',        FALSE);

    -- ── Alerts ─────────────────────────────────────────
    INSERT INTO alerts (user_id, level, title, message) VALUES
    (uid, 'critical', 'Burn rate increased 23% vs 90-day average',          'Current month burn tracking at $124,500 — 23% above the 90-day average of $101,200. Main driver: AWS costs up 35%.'),
    (uid, 'critical', 'Runway Below 90 Days (Conservative)',               'Conservative scenario puts cash-out at July 14, 2026 — only 138 days away. Consider cutting costs or accelerating fundraise.'),
    (uid, 'warning',  'New recurring charge detected: Notion ($840/mo)',    'Notion Team Plan ($840/mo) appeared as a new recurring charge. This vendor was not seen in the previous 60 days.'),
    (uid, 'warning',  'Duplicate vendor suspected: Figma + Sketch',        'Both Figma ($75/mo) and Sketch ($65/mo) are active design tools. Consider consolidating to save $780/yr.'),
    (uid, 'warning',  'AWS costs up 35%',                                  'AWS monthly invoice increased from $18,500 to $22,100. Consider reviewing reserved instances and usage patterns.'),
    (uid, 'info',     'Revenue tracking 12% above last month',             'Stripe MRR tracking at $35,300 — 12% above last month''s $31,500 at the same point in the billing cycle.'),
    (uid, 'info',     'Weekly financial report ready',                     'Your weekly Aegis financial digest has been generated. Review your dashboard for the latest metrics.');

    -- ── Subscriptions (flagged) ────────────────────────
    INSERT INTO subscriptions (user_id, vendor, monthly_cost, first_seen, last_seen, flag, severity) VALUES
    (uid, 'Figma',        75.00,  '2025-03-01', '2026-02-05', 'Duplicate: also paying for Sketch ($65/mo)',                    'medium'),
    (uid, 'Sketch',       65.00,  '2024-11-01', '2026-02-05', 'Duplicate: also paying for Figma ($75/mo)',                     'medium'),
    (uid, 'Datadog',     420.00,  '2025-06-01', '2026-02-05', 'Usage dropped 60% last month — review if Pro plan still needed', 'high'),
    (uid, 'Notion',      840.00,  '2026-01-05', '2026-02-05', 'New charge — didn''t exist 60 days ago',                       'medium'),
    (uid, 'AWS Reserved',1200.00, '2025-01-01', '2026-02-03', 'Charged 35% more than last month — review reserved instances',  'high'),
    (uid, 'Zoom',        200.00,  '2025-04-01', '2026-02-05', 'Only 3 of 40 licenses active — 37 wasted',                     'high'),
    (uid, 'Intercom',    350.00,  '2025-08-01', '2026-02-05', 'No support tickets filed in last 30 days',                     'medium');

END $$;
