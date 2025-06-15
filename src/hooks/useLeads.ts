
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { KanbanStage } from "@/components/kanban/Kanban";

// Helper: List of valid Kanban stages
const KANBAN_STAGES: KanbanStage[] = [
  "new-lead",
  "contacted",
  "quote-sent",
  "negotiation",
  "service-booked",
  "completed",
  "invoiced",
  "payment-received",
  "lost"
];

export function useLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      // Map each lead to conform exactly to the frontend Lead type
      return (data ?? []).map((lead: any) => ({
        ...lead,
        stage: KANBAN_STAGES.includes(lead.stage) ? lead.stage as KanbanStage : "new-lead",
        last_contact: lead.last_contact || "",
        value: typeof lead.value === "number" ? lead.value : 0,
        notes: lead.notes ?? "",
      }));
    },
  });
}
