
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";

export type KanbanStage = 
  | "new-lead" 
  | "contacted" 
  | "quote-sent" 
  | "negotiation" 
  | "service-booked" 
  | "completed" 
  | "invoiced" 
  | "payment-received" 
  | "lost";

export type ServiceType = "window-washing" | "pressure-washing" | "holiday-lights" | "gutter-cleaning" | "all";

export interface Lead {
  id: string;
  clientName: string;
  serviceType: ServiceType;
  value: number;
  stage: KanbanStage;
  lastContact: string;
  notes?: string;
}

export const Kanban = () => {
  const [serviceFilter, setServiceFilter] = useState<ServiceType>("all");

  const stages: { id: KanbanStage; title: string; color: string }[] = [
    { id: "new-lead", title: "New Lead", color: "bg-gray-100" },
    { id: "contacted", title: "Contacted", color: "bg-blue-100" },
    { id: "quote-sent", title: "Quote Sent", color: "bg-yellow-100" },
    { id: "negotiation", title: "Negotiation", color: "bg-orange-100" },
    { id: "service-booked", title: "Service Booked", color: "bg-purple-100" },
    { id: "completed", title: "Completed", color: "bg-green-100" },
    { id: "invoiced", title: "Invoiced", color: "bg-indigo-100" },
    { id: "payment-received", title: "Payment Received", color: "bg-emerald-100" },
    { id: "lost", title: "Lost", color: "bg-red-100" },
  ];

  // Sample data - in a real app, this would come from your database
  const [leads] = useState<Lead[]>([
    {
      id: "1",
      clientName: "John Smith",
      serviceType: "window-washing",
      value: 250,
      stage: "new-lead",
      lastContact: "2024-01-15",
    },
    {
      id: "2",
      clientName: "Sarah Johnson",
      serviceType: "holiday-lights",
      value: 800,
      stage: "contacted",
      lastContact: "2024-01-14",
    },
    {
      id: "3",
      clientName: "Mike Wilson",
      serviceType: "pressure-washing",
      value: 400,
      stage: "quote-sent",
      lastContact: "2024-01-13",
    },
    {
      id: "4",
      clientName: "Lisa Brown",
      serviceType: "window-washing",
      value: 300,
      stage: "service-booked",
      lastContact: "2024-01-12",
    },
    {
      id: "5",
      clientName: "David Davis",
      serviceType: "gutter-cleaning",
      value: 150,
      stage: "completed",
      lastContact: "2024-01-11",
    },
  ]);

  const filteredLeads = serviceFilter === "all" 
    ? leads 
    : leads.filter(lead => lead.serviceType === serviceFilter);

  const getLeadsForStage = (stage: KanbanStage) => {
    return filteredLeads.filter(lead => lead.stage === stage);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Sales Pipeline</h2>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Service:</label>
          <Select value={serviceFilter} onValueChange={(value: ServiceType) => setServiceFilter(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="window-washing">Window Washing</SelectItem>
              <SelectItem value="pressure-washing">Pressure Washing</SelectItem>
              <SelectItem value="holiday-lights">Holiday Lights</SelectItem>
              <SelectItem value="gutter-cleaning">Gutter Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-4 min-w-max pb-4">
          {stages.map((stage) => (
            <KanbanColumn
              key={stage.id}
              title={stage.title}
              color={stage.color}
              count={getLeadsForStage(stage.id).length}
            >
              {getLeadsForStage(stage.id).map((lead) => (
                <KanbanCard key={lead.id} lead={lead} />
              ))}
            </KanbanColumn>
          ))}
        </div>
      </div>
    </div>
  );
};
