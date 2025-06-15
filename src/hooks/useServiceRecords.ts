
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useServiceRecords(clientId?: string) {
  return useQuery({
    queryKey: ["service-records", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("service_records")
        .select("*")
        .eq("client_id", clientId)
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!clientId,
  });
}
