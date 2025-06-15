
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<import("@supabase/supabase-js").Session | null>(null);
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  // Get user role from user_roles table
  const fetchRole = useCallback(async (uid: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid)
      .maybeSingle();
    setRole(data?.role || "user");
  }, []);

  useEffect(() => {
    // Auth change listener (MUST set up before getSession)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user || null);
      if (currentSession?.user) fetchRole(currentSession.user.id);
      else setRole(null);
    });

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      if (session?.user) fetchRole(session.user.id);
      else setRole(null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchRole]);

  return { user, session, role, isLoading };
}
