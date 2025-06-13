
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, DollarSign, Calendar, FileText, User } from "lucide-react";

interface PaymentRecord {
  id: string;
  clientName: string;
  amount: number;
  billingTerm: "monthly" | "quarterly" | "biannually";
  dueDate: string;
  status: "pending" | "paid" | "overdue" | "failed";
  serviceType: string;
  invoiceGenerated: boolean;
}

export const PaymentIntegration = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Sample payment records
  const [payments] = useState<PaymentRecord[]>([
    {
      id: "1",
      clientName: "John Smith",
      amount: 250,
      billingTerm: "quarterly",
      dueDate: "2024-02-15",
      status: "pending",
      serviceType: "Window Washing",
      invoiceGenerated: false,
    },
    {
      id: "2",
      clientName: "Sarah Johnson",
      amount: 800,
      billingTerm: "monthly",
      dueDate: "2024-01-30",
      status: "paid",
      serviceType: "Holiday Lights",
      invoiceGenerated: true,
    },
    {
      id: "3",
      clientName: "Mike Wilson",
      amount: 400,
      billingTerm: "biannually",
      dueDate: "2024-01-25",
      status: "overdue",
      serviceType: "Pressure Washing",
      invoiceGenerated: true,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  const filteredPayments = filterStatus === "all" 
    ? payments 
    : payments.filter(payment => payment.status === filterStatus);

  // Stripe integration functions (placeholders)
  const processAutomaticBilling = (paymentId: string) => {
    // TODO: Integrate with Lovable's native Stripe integration
    console.log(`Processing automatic billing for payment ${paymentId}`);
    // This will use Stripe's subscription billing or one-time payments
    // Implementation depends on client billing terms setup
  };

  const generateAndSendInvoice = (paymentId: string) => {
    // TODO: Generate PDF invoice and send via email
    console.log(`Generating and sending invoice for payment ${paymentId}`);
    // This will be triggered after successful payment completion
    // Integration with PDF generation service and email delivery
  };

  const createStripeCheckout = (paymentId: string) => {
    // TODO: Create Stripe checkout session for manual payments
    console.log(`Creating Stripe checkout for payment ${paymentId}`);
    // This allows clients to pay manually through Stripe hosted checkout
  };

  const totalPending = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPaid = payments
    .filter(p => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOverdue = payments
    .filter(p => p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Payment Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Setup Automatic Billing
        </Button>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600">${totalPending}</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid This Month</p>
              <p className="text-2xl font-bold text-green-600">${totalPaid}</p>
            </div>
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">${totalOverdue}</p>
            </div>
            <Calendar className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card className="p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Payment Records */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <h3 className="font-medium text-gray-900">{payment.clientName}</h3>
                  <p className="text-sm text-gray-600">{payment.serviceType}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">${payment.amount}</div>
                <Badge className={getBillingTermColor(payment.billingTerm)}>
                  {payment.billingTerm}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                </div>
                <Badge className={getStatusColor(payment.status)}>
                  {payment.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                <span>Invoice: {payment.invoiceGenerated ? "Generated" : "Pending"}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              {payment.status === "pending" && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => processAutomaticBilling(payment.id)}
                  >
                    Process Payment
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => createStripeCheckout(payment.id)}
                  >
                    Send Payment Link
                  </Button>
                </>
              )}
              {payment.status === "paid" && !payment.invoiceGenerated && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => generateAndSendInvoice(payment.id)}
                >
                  Generate Invoice
                </Button>
              )}
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
