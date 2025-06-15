import { useState } from "react";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { Navigation } from "@/components/layout/Navigation";
import { Kanban } from "@/components/kanban/Kanban";
import { ClientManagement } from "@/components/clients/ClientManagement";
import { ServiceScheduling } from "@/components/scheduling/ServiceScheduling";
import { PaymentIntegration } from "@/components/payments/PaymentIntegration";
import AuthPage from "@/components/layout/AuthPage";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { useAuth } from "@/hooks/useAuth";

type TabType = "dashboard" | "kanban" | "clients" | "scheduling" | "payments";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="text-center pt-10 text-gray-400">Loading...</div>;
  if (!user) return <AuthPage />;

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardMetrics />
            <DashboardCharts />
          </div>
        );
      case "kanban":
        return <Kanban />;
      case "clients":
        return <ClientManagement />;
      case "scheduling":
        return <ServiceScheduling />;
      case "payments":
        return <PaymentIntegration />;
      default:
        return (
          <div className="space-y-6">
            <DashboardMetrics />
            <DashboardCharts />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <HeaderBar />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Window Washing & Holiday Lights CRM
          </h1>
          <p className="text-gray-600">
            Manage your leads, clients, and services all in one place
          </p>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
