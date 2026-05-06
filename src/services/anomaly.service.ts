import type { AlertInsert, CategorySpend } from '@/types/database.types';

/**
 * Detect anomalies by comparing current month spend against historical average.
 *
 * Rules:
 *   current > avg × 1.50  →  CRITICAL (50%+ spike)
 *   current > avg × 1.20  →  WARNING  (20%+ spike)
 */
export function detectAnomalies(
  currentMonth: CategorySpend[],
  historicalAvg: CategorySpend[]
): Omit<AlertInsert, 'user_id'>[] {
  const alerts: Omit<AlertInsert, 'user_id'>[] = [];

  for (const current of currentMonth) {
    const avg = historicalAvg.find(h => h.category === current.category);
    if (!avg || avg.amount === 0) continue;

    const ratio = current.amount / avg.amount;

    if (ratio > 1.5) {
      alerts.push({
        level: 'critical',
        title: `${current.category} spend spike`,
        message: `${current.category} is ${Math.round((ratio - 1) * 100)}% above 90-day average ($${Math.round(current.amount).toLocaleString()} vs $${Math.round(avg.amount).toLocaleString()})`,
      });
    } else if (ratio > 1.2) {
      alerts.push({
        level: 'warning',
        title: `${current.category} trending up`,
        message: `${current.category} is ${Math.round((ratio - 1) * 100)}% above average ($${Math.round(current.amount).toLocaleString()} vs $${Math.round(avg.amount).toLocaleString()})`,
      });
    }
  }

  return alerts;
}

/**
 * Detect new vendors not seen in the previous 60 days.
 */
export function detectNewVendors(
  currentVendors: string[],
  historicalVendors: string[]
): Omit<AlertInsert, 'user_id'>[] {
  const historicalSet = new Set(historicalVendors.map(v => v.toLowerCase()));

  return currentVendors
    .filter(v => !historicalSet.has(v.toLowerCase()))
    .map(vendor => ({
      level: 'warning' as const,
      title: `New recurring vendor: ${vendor}`,
      message: `${vendor} is a new recurring charge not seen in the previous 60 days. Review to confirm it is expected.`,
    }));
}
