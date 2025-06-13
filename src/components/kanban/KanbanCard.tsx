
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lead } from "./Kanban";

interface KanbanCardProps {
  lead: Lead;
}

export const KanbanCard = ({ lead }: KanbanCardProps) => {
  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case "window-washing":
        return "bg-blue-100 text-blue-800";
      case "pressure-washing":
        return "bg-green-100 text-green-800";
      case "holiday-lights":
        return "bg-yellow-100 text-yellow-800";
      case "gutter-cleaning":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatServiceType = (serviceType: string) => {
    return serviceType.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-white">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-gray-900 text-sm">{lead.clientName}</h4>
          <span className="text-sm font-semibold text-green-600">${lead.value}</span>
        </div>
        
        <Badge className={getServiceTypeColor(lead.serviceType)}>
          {formatServiceType(lead.serviceType)}
        </Badge>
        
        <div className="text-xs text-gray-500">
          Last contact: {new Date(lead.lastContact).toLocaleDateString()}
        </div>
        
        {lead.notes && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            {lead.notes}
          </div>
        )}
      </div>
    </Card>
  );
};
