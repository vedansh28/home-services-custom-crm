
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Phone, Mail, Calendar, Trash2 } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { useServiceRecords } from "@/hooks/useServiceRecords";
import { AddClientModal } from "./AddClientModal";
import { ClientDetailsModal } from "./ClientDetailsModal";
import { DeleteClientModal } from "./DeleteClientModal";

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
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
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

  const handleViewDetails = (client: any) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  const handleScheduleInvoice = (client: any) => {
    // TODO: Implement schedule invoice functionality
    console.log("Schedule invoice for:", client.name);
  };

  const handleDeleteClient = (client: any) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // TODO: Implement actual deletion
    console.log("Deleting client:", selectedClient.name);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Client Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddModal(true)}>
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

      <div className="space-y-4">
        {filteredClients.map((client: any) => {
          const { data: serviceHistory = [] } = useServiceRecords(client.id);
          const totalValue = serviceHistory.reduce((sum: number, sr: any) => sum + (sr.amount || 0), 0);
          const lastService = serviceHistory[0]; // Most recent service

          return (
            <Card key={client.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.address}</p>
                  </div>
                  <Badge className={getBillingTermColor(client.billing_term)}>
                    {client.billing_term || "—"}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    Total Value: ${totalValue}
                  </div>
                  <div className="text-sm text-gray-600">
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
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {client.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {client.phone}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last Service: {lastService ? 
                    `${lastService.type} - ${new Date(lastService.date).toLocaleDateString()} - $${lastService.amount} (${lastService.status})` 
                    : "No services yet"
                  }
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                    onClick={() => handleViewDetails(client)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    onClick={() => handleScheduleInvoice(client)}
                  >
                    Schedule Invoice
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteClient(client)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <AddClientModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
      
      <ClientDetailsModal 
        open={showDetailsModal} 
        onOpenChange={setShowDetailsModal} 
        client={selectedClient}
      />

      <DeleteClientModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        clientName={selectedClient?.name || ""}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
