
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const DashboardCharts = () => {
  const monthlyRevenue = [
    { month: "Jan", revenue: 4200, services: 28 },
    { month: "Feb", revenue: 3800, services: 24 },
    { month: "Mar", revenue: 5100, services: 32 },
    { month: "Apr", revenue: 4700, services: 29 },
    { month: "May", revenue: 6200, services: 38 },
    { month: "Jun", revenue: 5800, services: 35 },
  ];

  const serviceTypes = [
    { name: "Window Washing", value: 45, color: "#3B82F6" },
    { name: "Pressure Washing", value: 25, color: "#10B981" },
    { name: "Holiday Lights", value: 20, color: "#F59E0B" },
    { name: "Gutter Cleaning", value: 10, color: "#EF4444" },
  ];

  const pipelineData = [
    { stage: "New Lead", count: 15 },
    { stage: "Contacted", count: 12 },
    { stage: "Quote Sent", count: 8 },
    { stage: "Negotiation", count: 5 },
    { stage: "Service Booked", count: 10 },
    { stage: "Completed", count: 18 },
    { stage: "Invoiced", count: 16 },
    { stage: "Payment Received", count: 14 },
    { stage: "Lost", count: 3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-white shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue & Services</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
            <Bar dataKey="services" fill="#10B981" name="Services Completed" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-white shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Type Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={serviceTypes}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {serviceTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-white shadow-sm lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pipeline Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pipelineData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="stage" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
