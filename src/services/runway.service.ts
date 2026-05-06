import type { RunwayData, RunwayScenario } from '@/types/database.types';
import { getCashBalance } from './transactions.service';
import { getBurnOverview } from './burn.service';

/**
 * Core runway calculation: base, conservative (+20% burn), optimistic (-10% burn).
 */
export function calcRunway(cashBalance: number, netBurn: number): Omit<RunwayData, 'cashBalance' | 'netBurn'> {
  if (netBurn <= 0) {
    // Not burning cash — infinite runway
    const farDate = new Date();
    farDate.setFullYear(farDate.getFullYear() + 10);
    const infinite: RunwayScenario = { months: 999, date: farDate };
    return { base: infinite, conservative: infinite, optimistic: infinite };
  }

  const toScenario = (months: number): RunwayScenario => {
    const d = new Date();
    d.setMonth(d.getMonth() + Math.floor(months));
    d.setDate(d.getDate() + Math.round((months % 1) * 30));
    return { months, date: d };
  };

  const base = cashBalance / netBurn;
  const conservative = cashBalance / (netBurn * 1.20);
  const optimistic = cashBalance / (netBurn * 0.90);

  return {
    base: toScenario(base),
    conservative: toScenario(conservative),
    optimistic: toScenario(optimistic),
  };
}

/**
 * Full runway data: fetches balance + burn, computes scenarios.
 */
export async function getRunwayData(userId: string): Promise<RunwayData> {
  const [cashBalance, burnData] = await Promise.all([
    getCashBalance(userId),
    getBurnOverview(userId, 2), // 2-month average for stability
  ]);

  const { netBurn } = burnData.burnMetrics;
  const scenarios = calcRunway(cashBalance, netBurn);

  return {
    ...scenarios,
    cashBalance,
    netBurn,
  };
}

/**
 * Model a what-if scenario with adjusted burn.
 */
export function modelScenario(
  cashBalance: number,
  currentNetBurn: number,
  adjustment: { type: 'hire' | 'cut' | 'revenue'; value: number; salary?: number }
): RunwayData {
  let newBurn = currentNetBurn;

  switch (adjustment.type) {
    case 'hire':
      newBurn += (adjustment.value * (adjustment.salary || 85000)) / 12;
      break;
    case 'cut':
      newBurn -= adjustment.value * 1000;
      break;
    case 'revenue':
      // Reduce net burn by increased revenue
      const revenueBoost = currentNetBurn * (adjustment.value * 0.05);
      newBurn -= revenueBoost;
      break;
  }

  const scenarios = calcRunway(cashBalance, Math.max(newBurn, 0));
  return { ...scenarios, cashBalance, netBurn: newBurn };
}
