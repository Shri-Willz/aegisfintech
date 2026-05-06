import { supabase } from '@/lib/supabase';
import type { Transaction } from '@/types/database.types';

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: 'debit' | 'credit';
}

export async function getTransactions(userId: string, filters?: TransactionFilters) {
  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (filters?.startDate) query = query.gte('date', filters.startDate);
  if (filters?.endDate) query = query.lte('date', filters.endDate);
  if (filters?.category) query = query.eq('category', filters.category);
  if (filters?.type) query = query.eq('type', filters.type);

  const { data, error } = await query;
  if (error) throw error;
  return data as Transaction[];
}

export async function getTransactionsByUpload(uploadId: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('upload_id', uploadId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data as Transaction[];
}

export async function getRecentTransactions(userId: string, limit = 5) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Transaction[];
}

export async function getCashBalance(userId: string): Promise<number> {
  // Get the latest upload's closing balance
  const { data, error } = await supabase
    .from('uploads')
    .select('closing_bal')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('period_end', { ascending: false })
    .limit(1);

  if (error) throw error;
  return data?.[0]?.closing_bal ?? 0;
}
