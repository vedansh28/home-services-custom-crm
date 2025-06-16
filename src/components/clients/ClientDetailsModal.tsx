
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  billing_term: "monthly" | "quarterly" | "biannually";
}

interface ClientDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
}

export const ClientDetailsModal = ({ open, onOpenChange, client }: ClientDetailsModalProps) => {
  if (!client) return null;

  const getBillingTermColor = (term: string) => {
    switch (term) {
      case "monthly":
        return "bg-green-100 text-green-800";
      case "quarterly":
        return "bg-blue-100 text-blue-800";
      case "biannually":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {client.name}
            <Badge className={getBillingTermColor(client.billing_term)}>
              {client.billing_term}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <span>{client.address}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span>Billing: {client.billing_term}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
