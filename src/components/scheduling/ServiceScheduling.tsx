
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface ScheduledService {
  id: string;
  clientName: string;
  serviceType: string;
  date: string;
  time: string;
  address: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  estimatedDuration: number;
  value: number;
}

export const ServiceScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Sample scheduled services
  const [scheduledServices] = useState<ScheduledService[]>([
    {
      id: "1",
      clientName: "John Smith",
      serviceType: "Window Washing",
      date: "2024-01-20",
      time: "09:00",
      address: "123 Main St, Anytown, ST",
      status: "scheduled",
      estimatedDuration: 2,
      value: 250,
    },
    {
      id: "2",
      clientName: "Sarah Johnson",
      serviceType: "Pressure Washing",
      date: "2024-01-20",
      time: "14:00",
      address: "456 Oak Ave, Somewhere, ST",
      status: "scheduled",
      estimatedDuration: 3,
      value: 400,
    },
    {
      id: "3",
      clientName: "Mike Wilson",
      serviceType: "Holiday Lights Installation",
      date: "2024-01-21",
      time: "10:00",
      address: "789 Pine Rd, Elsewhere, ST",
      status: "scheduled",
      estimatedDuration: 4,
      value: 800,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredServices = scheduledServices.filter(
    service => service.date === selectedDate
  );

  // SMS reminder functionality (placeholder)
  const sendSMSReminder = (serviceId: string) => {
    // TODO: Integrate with SMS service (Twilio, TextMagic, etc.)
    console.log(`Sending SMS reminder for service ${serviceId}`);
    // Implementation will depend on chosen SMS provider
  };

  const sendSMSConfirmation = (serviceId: string) => {
    // TODO: Integrate with SMS service for appointment confirmations
    console.log(`Sending SMS confirmation for service ${serviceId}`);
    // Implementation will depend on chosen SMS provider
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Service Scheduling</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Schedule New Service
        </Button>
      </div>

      <Card className="p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <Calendar className="h-5 w-5 text-gray-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">
            {filteredServices.length} service(s) scheduled
          </span>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <Card className="p-8 text-center bg-white shadow-sm">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No services scheduled for this date</p>
          </Card>
        ) : (
          filteredServices.map((service) => (
            <Card key={service.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{service.time}</span>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">${service.value}</div>
                  <div className="text-xs text-gray-500">{service.estimatedDuration}h estimated</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{service.clientName}</span>
                  <span className="text-gray-600">- {service.serviceType}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <span className="text-sm text-gray-600">{service.address}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => sendSMSReminder(service.id)}
                >
                  Send Reminder
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => sendSMSConfirmation(service.id)}
                >
                  Send Confirmation
                </Button>
                {service.status === "scheduled" && (
                  <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                    Mark Complete
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
