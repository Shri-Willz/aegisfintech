import { supabase } from '@/lib/supabase';
import type { Subscription } from '@/types/database.types';

/**
 * Get all flagged subscriptions for a user.
 */
export async function getSubscriptions(userId: string, onlyUnreviewed = false) {
  let query = supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('severity', { ascending: true });

  if (onlyUnreviewed) {
    query = query.eq('is_reviewed', false);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Subscription[];
}

/**
 * Mark a subscription as reviewed.
 */
export async function markReviewed(subscriptionId: string) {
  const { error } = await supabase
    .from('subscriptions')
    .update({ is_reviewed: true })
    .eq('id', subscriptionId);

  if (error) throw error;
}

/**
 * Calculate potential annual savings from unreviewed flagged subscriptions.
 */
export function calcPotentialSavings(subscriptions: Subscription[]): number {
  return subscriptions
    .filter(s => !s.is_reviewed)
    .reduce((sum, s) => sum + s.monthly_cost * 12, 0);
}

/**
 * Get waste overview: subscriptions + computed savings.
 */
export async function getWasteOverview(userId: string) {
  const subscriptions = await getSubscriptions(userId);
  const potentialSavings = calcPotentialSavings(subscriptions);
  const flaggedCount = subscriptions.filter(s => !s.is_reviewed).length;
  const reviewedCount = subscriptions.filter(s => s.is_reviewed).length;

  return {
    subscriptions,
    potentialSavings,
    flaggedCount,
    reviewedCount,
    totalTracked: subscriptions.length,
  };
}
