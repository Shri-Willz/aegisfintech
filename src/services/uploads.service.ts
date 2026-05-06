import { supabase } from '@/lib/supabase';
import type { Upload } from '@/types/database.types';

/**
 * Upload a PDF file to Supabase Storage and create an upload record.
 */
export async function uploadFile(userId: string, file: File) {
  const filePath = `${userId}/${Date.now()}_${file.name}`;

  // 1. Upload to Storage
  const { error: storageError } = await supabase.storage
    .from('statements')
    .upload(filePath, file, {
      contentType: 'application/pdf',
      upsert: false,
    });

  if (storageError) throw storageError;

  // 2. Create upload record
  const { data, error: dbError } = await supabase
    .from('uploads')
    .insert({
      user_id: userId,
      filename: file.name,
      file_path: filePath,
      status: 'processing',
    })
    .select()
    .single();

  if (dbError) throw dbError;
  return data as Upload;
}

/**
 * Get upload history for a user.
 */
export async function getUploadHistory(userId: string) {
  const { data, error } = await supabase
    .from('uploads')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Upload[];
}
