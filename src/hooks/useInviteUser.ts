
import { supabase } from "@/integrations/supabase/client";

export async function inviteUser(email: string) {
  // Use Supabase admin API to send invite
  // Because no secure backend is available, rely on frontend-side sign up (user will self-register)
  // You might want to email this link or integrate email invitation logic in an edge function in the future
  const { error } = await supabase.auth.admin.inviteUserByEmail(email);

  // Admin must assign new user the role "user" in user_roles (done after first login via DB or by another flow)
  return { error };
}
