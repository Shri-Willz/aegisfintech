import type { Transaction, BurnMetrics, CategorySpend } from '@/types/database.types';
import { getTransactions } from './transactions.service';

/**
 * Core burn rate calculation from a set of transactions over N months.
 */
export function calcBurnRate(transactions: Transaction[], months: number): BurnMetrics {
  const debits = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const credits = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const grossBurn = debits / months;
  const revenue = credits / months;
  const netBurn = grossBurn - revenue;

  return {
    grossBurn,
    revenue,
    netBurn,
    dailyBurn: netBurn / 30,
  };
}

/**
 * Compute category-level spend breakdown.
 */
export function getCategoryBreakdown(transactions: Transaction[]): CategorySpend[] {
  const debits = transactions.filter(t => t.type === 'debit');
  const totalSpend = debits.reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const byCategory = new Map<string, number>();
  for (const t of debits) {
    const cat = t.category || 'Other';
    byCategory.set(cat, (byCategory.get(cat) || 0) + Math.abs(t.amount));
  }

  return Array.from(byCategory.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalSpend > 0 ? (amount / totalSpend) * 100 : 0,
      trend: 0, // Will be computed when comparing with historical data
    }))
    .sort((a, b) => b.amount - a.amount);
}

/**
 * Compute category breakdown with trend (comparing two periods).
 */
export function getCategoryBreakdownWithTrend(
  currentPeriod: Transaction[],
  previousPeriod: Transaction[]
): CategorySpend[] {
  const current = getCategoryBreakdown(currentPeriod);
  const previous = getCategoryBreakdown(previousPeriod);

  return current.map(c => {
    const prev = previous.find(p => p.category === c.category);
    const trend = prev && prev.amount > 0
      ? ((c.amount - prev.amount) / prev.amount) * 100
      : 0;
    return { ...c, trend };
  });
}

/**
 * High-level burn overview: fetches transactions and computes metrics.
 */
export async function getBurnOverview(userId: string, months = 1) {
  // Get last N months of transactions
  const now = new Date();
  const startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - months);

  const transactions = await getTransactions(userId, {
    startDate: startDate.toISOString().split('T')[0],
  });

  const burnMetrics = calcBurnRate(transactions, months);
  const categories = getCategoryBreakdown(transactions);

  return { burnMetrics, categories, transactions };
}

/**
 * Get 90-day average burn for anomaly comparison.
 */
export async function get90DayAverage(userId: string): Promise<BurnMetrics> {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 90);

  const transactions = await getTransactions(userId, {
    startDate: start.toISOString().split('T')[0],
  });

  return calcBurnRate(transactions, 3);
}
