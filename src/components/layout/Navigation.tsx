
import { cn } from "@/lib/utils";
import { BarChart, Users, Calendar, CreditCard, KanbanSquare } from "lucide-react";

type TabType = "dashboard" | "kanban" | "clients" | "scheduling" | "payments";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: BarChart },
    { id: "kanban" as TabType, label: "Pipeline", icon: KanbanSquare },
    { id: "clients" as TabType, label: "Clients", icon: Users },
    { id: "scheduling" as TabType, label: "Scheduling", icon: Calendar },
    { id: "payments" as TabType, label: "Payments", icon: CreditCard },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors",
                  activeTab === item.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
