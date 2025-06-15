
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useProfile(userId: string | undefined) {
  const queryClient = useQueryClient();
  // Fetch user profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      return data;
    },
    enabled: !!userId,
  });

  // Update profile
  const mutation = useMutation({
    mutationFn: async (updates: any) => {
      if (!userId) throw new Error("Not logged in");
      const { error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  return { profile, isLoading, updateProfile: mutation.mutateAsync, updateStatus: mutation.status, updateError: mutation.error };
}
