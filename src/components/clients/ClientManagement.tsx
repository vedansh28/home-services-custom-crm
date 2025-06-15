import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Phone, Mail, Calendar } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { useServiceRecords } from "@/hooks/useServiceRecords";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceHistory: ServiceRecord[];
  billing_term: "monthly" | "quarterly" | "biannually";
  nextService: string;
  totalValue: number;
}

interface ServiceRecord {
  id: string;
  type: string;
  date: string;
  amount: number;
  status: "completed" | "scheduled" | "cancelled";
}

export const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: clients = [], isLoading } = useClients();

  const filteredClients = clients.filter((client: any) =>
    client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Client Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>
      <Card className="p-4 bg-white shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search clients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>
      {isLoading && (
        <div className="text-center text-gray-400 py-8">Loading clients…</div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client: any) => {
          // Service records
          // To keep this performant, show up to 2 most recent by default
          const { data: serviceHistory = [] } = useServiceRecords(client.id);
          const totalValue = serviceHistory.reduce((sum: number, sr: any) => sum + (sr.amount || 0), 0);

          return (
            <Card key={client.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.address}</p>
                  </div>
                  <Badge className={getBillingTermColor(client.billing_term)}>
                    {client.billing_term || "—"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {client.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {client.phone}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {/* Next service is just most recent future/scheduled */}
                    Next Service: {
                      serviceHistory.find((s: any) =>
                        new Date(s.date) >= new Date() && s.status === "scheduled"
                      )?.date
                        ? new Date(serviceHistory.find((s: any) =>
                          new Date(s.date) >= new Date() && s.status === "scheduled"
                        )?.date).toLocaleDateString()
                        : "—"
                    }
                  </div>
                  <div className="font-semibold text-green-600">
                    Total Value: ${totalValue}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Services</h4>
                  <div className="space-y-2">
                    {serviceHistory.slice(0, 2).map((service: any) => (
                      <div key={service.id} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                        <span>{service.type}</span>
                        <span>{new Date(service.date).toLocaleDateString()}</span>
                        <span className="font-medium">${service.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Schedule Service
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
