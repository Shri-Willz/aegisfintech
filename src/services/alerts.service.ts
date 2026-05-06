import { supabase } from '@/lib/supabase';
import type { Alert, AlertLevel } from '@/types/database.types';

/**
 * Get alerts for a user, optionally filtered by level.
 */
export async function getAlerts(userId: string, level?: AlertLevel) {
  let query = supabase
    .from('alerts')
    .select('*')
    .eq('user_id', userId)
    .eq('is_dismissed', false)
    .order('created_at', { ascending: false });

  if (level) {
    query = query.eq('level', level);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Alert[];
}

/**
 * Get all alerts including dismissed ones.
 */
export async function getAllAlerts(userId: string) {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Alert[];
}

/**
 * Dismiss an alert.
 */
export async function dismissAlert(alertId: string) {
  const { error } = await supabase
    .from('alerts')
    .update({ is_dismissed: true })
    .eq('id', alertId);

  if (error) throw error;
}

/**
 * Get alert counts by level.
 */
export async function getAlertCounts(userId: string) {
  const alerts = await getAlerts(userId);

  return {
    total: alerts.length,
    critical: alerts.filter(a => a.level === 'critical').length,
    warning: alerts.filter(a => a.level === 'warning').length,
    info: alerts.filter(a => a.level === 'info').length,
  };
}
