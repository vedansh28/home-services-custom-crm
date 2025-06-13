
import { Card } from "@/components/ui/card";
import { Users, DollarSign, Calendar, CheckCircle } from "lucide-react";

export const DashboardMetrics = () => {
  const metrics = [
    {
      title: "Total Clients",
      value: "127",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Monthly Revenue",
      value: "$8,450",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Scheduled Services",
      value: "34",
      change: "+5%",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Completed Jobs",
      value: "89",
      change: "+15%",
      icon: CheckCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {metric.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {metric.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${metric.bgColor}`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
