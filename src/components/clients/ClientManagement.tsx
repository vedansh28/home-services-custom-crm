
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Phone, Mail, Calendar } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceHistory: ServiceRecord[];
  billingTerm: "monthly" | "quarterly" | "biannually";
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

  // Sample client data
  const [clients] = useState<Client[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, ST 12345",
      billingTerm: "quarterly",
      nextService: "2024-02-15",
      totalValue: 1200,
      serviceHistory: [
        { id: "1", type: "Window Washing", date: "2024-01-15", amount: 250, status: "completed" },
        { id: "2", type: "Pressure Washing", date: "2023-12-01", amount: 400, status: "completed" },
      ],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Somewhere, ST 67890",
      billingTerm: "monthly",
      nextService: "2024-02-01",
      totalValue: 2400,
      serviceHistory: [
        { id: "3", type: "Holiday Lights", date: "2023-12-15", amount: 800, status: "completed" },
        { id: "4", type: "Window Washing", date: "2024-01-01", amount: 300, status: "completed" },
      ],
    },
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.address}</p>
                </div>
                <Badge className={getBillingTermColor(client.billingTerm)}>
                  {client.billingTerm}
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
                  Next Service: {new Date(client.nextService).toLocaleDateString()}
                </div>
                <div className="font-semibold text-green-600">
                  Total Value: ${client.totalValue}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Services</h4>
                <div className="space-y-2">
                  {client.serviceHistory.slice(0, 2).map((service) => (
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
        ))}
      </div>
    </div>
  );
};
