import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthProvider';
import { getTransactions, getRecentTransactions, getCashBalance } from '@/services/transactions.service';
import { getBurnOverview, get90DayAverage, getCategoryBreakdownWithTrend, calcBurnRate, getCategoryBreakdown } from '@/services/burn.service';
import { getRunwayData, modelScenario } from '@/services/runway.service';
import { getWasteOverview, markReviewed } from '@/services/waste.service';
import { getAlerts, dismissAlert, getAlertCounts } from '@/services/alerts.service';
import { calcFundraiseTimeline } from '@/services/fundraise.service';
import type { AlertLevel, CompanyStage, DashboardSummary } from '@/types/database.types';

// ── Dashboard Summary ──────────────────────────────────
export function useDashboardSummary() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['dashboard-summary', user?.id],
    queryFn: async (): Promise<DashboardSummary> => {
      if (!user) throw new Error('Not authenticated');
      const [cashBalance, burnData, alertCounts] = await Promise.all([
        getCashBalance(user.id),
        getBurnOverview(user.id, 2),
        getAlertCounts(user.id),
      ]);
      const { grossBurn, netBurn, revenue } = burnData.burnMetrics;
      const runwayMonths = netBurn > 0 ? cashBalance / netBurn : 999;
      const cashOutDate = new Date();
      cashOutDate.setMonth(cashOutDate.getMonth() + Math.floor(runwayMonths));

      return {
        cashBalance,
        monthlyBurn: grossBurn,
        netBurn,
        revenue,
        runwayDays: Math.round(runwayMonths * 30),
        cashOutDate,
        alertCount: alertCounts.total,
      };
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ── Recent Transactions ────────────────────────────────
export function useRecentTransactions(limit = 5) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['recent-transactions', user?.id, limit],
    queryFn: () => {
      if (!user) throw new Error('Not authenticated');
      return getRecentTransactions(user.id, limit);
    },
    enabled: !!user,
  });
}

// ── Burn Overview ──────────────────────────────────────
export function useBurnOverview(months = 1) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['burn-overview', user?.id, months],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');
      const [current, avg] = await Promise.all([
        getBurnOverview(user.id, months),
        get90DayAverage(user.id),
      ]);

      // Now compute categories with trend
      const now = new Date();
      const midpoint = new Date(now);
      midpoint.setMonth(midpoint.getMonth() - months);
      const previousStart = new Date(midpoint);
      previousStart.setMonth(previousStart.getMonth() - months);

      const prevTxns = await getTransactions(user.id, {
        startDate: previousStart.toISOString().split('T')[0],
        endDate: midpoint.toISOString().split('T')[0],
      });

      const categoriesWithTrend = getCategoryBreakdownWithTrend(
        current.transactions,
        prevTxns
      );

      return {
        burnMetrics: current.burnMetrics,
        categories: categoriesWithTrend,
        avg90Day: avg,
      };
    },
    enabled: !!user,
  });
}

// ── Runway ─────────────────────────────────────────────
export function useRunwayData() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['runway', user?.id],
    queryFn: () => {
      if (!user) throw new Error('Not authenticated');
      return getRunwayData(user.id);
    },
    enabled: !!user,
  });
}

// ── Waste / Subscriptions ──────────────────────────────
export function useWasteData() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['waste', user?.id],
    queryFn: () => {
      if (!user) throw new Error('Not authenticated');
      return getWasteOverview(user.id);
    },
    enabled: !!user,
  });
}

export function useReviewSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (subscriptionId: string) => markReviewed(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waste'] });
    },
  });
}

// ── Alerts ─────────────────────────────────────────────
export function useAlerts(level?: AlertLevel) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['alerts', user?.id, level],
    queryFn: () => {
      if (!user) throw new Error('Not authenticated');
      return getAlerts(user.id, level);
    },
    enabled: !!user,
  });
}

export function useDismissAlert() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (alertId: string) => dismissAlert(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });
}

// ── Fundraise ──────────────────────────────────────────
export function useFundraiseData() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['fundraise', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');
      const runwayData = await getRunwayData(user.id);

      // Get the user's profile to determine stage
      const { supabase } = await import('@/lib/supabase');
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('stage')
        .eq('id', user.id)
        .single<{ stage: CompanyStage | null }>();

      if (error || !profile) {
        throw new Error('Could not load user profile');
      }

      const timeline = calcFundraiseTimeline(runwayData, profile.stage || 'funded');
      return timeline;
    },
    enabled: !!user,
  });
}

// ── Scenario Modeling ──────────────────────────────────
export function useScenarioModel() {
  return { modelScenario };
}
