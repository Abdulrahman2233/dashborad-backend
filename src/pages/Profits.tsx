import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProfitStatsCards } from "@/components/profits/ProfitStatsCards";
import { ProfitLineChart } from "@/components/profits/ProfitLineChart";
import { TopAccountsChart } from "@/components/profits/TopAccountsChart";
import { TransactionModal } from "@/components/profits/TransactionModal";
import { TransactionsTable } from "@/components/profits/TransactionsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  propertyName: string;
  region: string;
  accountType: string;
  propertyType: string;
  rentPrice: number;
  commission: number;
  profit: number;
  date: string;
}

// Sample initial transactions
const initialTransactions: Transaction[] = [
  {
    id: "1",
    propertyName: "شقة سيدي جابر الفاخرة",
    region: "سيدي جابر",
    accountType: "مالك",
    propertyType: "عائلات",
    rentPrice: 8500,
    commission: 1500,
    profit: 7000,
    date: new Date().toISOString(),
  },
  {
    id: "2",
    propertyName: "استوديو المنشية",
    region: "المنشية",
    accountType: "وسيط",
    propertyType: "طلاب",
    rentPrice: 3500,
    commission: 500,
    profit: 3000,
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "3",
    propertyName: "شاليه محطة الرمل",
    region: "محطة الرمل",
    accountType: "مكتب عقارات",
    propertyType: "مصيف",
    rentPrice: 15000,
    commission: 3000,
    profit: 12000,
    date: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "4",
    propertyName: "شقة سموحة المفروشة",
    region: "سموحة",
    accountType: "مالك",
    propertyType: "حجز يومي",
    rentPrice: 1200,
    commission: 200,
    profit: 1000,
    date: new Date(Date.now() - 259200000).toISOString(),
  },
];

export default function Profits() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.success("تم حذف الصفقة");
  };

  const handleEditTransaction = (transaction: Transaction) => {
    toast.info("سيتم إضافة خاصية التعديل قريباً");
  };

  return (
    <DashboardLayout title="إدارة الأرباح">
      <div className="space-y-6 lg:space-y-8">
        {/* Header with Add Transaction Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              💰 إدارة الأرباح
            </h1>
            <p className="text-muted-foreground mt-1">
              تتبع جميع الصفقات والأرباح في مكان واحد
            </p>
          </div>
          
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus className="h-5 w-5" />
            إتمام صفقة
          </Button>
        </div>

        {/* Stats Cards */}
        <ProfitStatsCards />

        {/* Main Line Chart - Full Width */}
        <ProfitLineChart />

        {/* Top Accounts Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopAccountsChart />
          
          {/* Quick Summary Card */}
          <div className="card-glow rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-5 lg:p-6 border border-primary/20 shadow-lg">
            <h3 className="text-lg lg:text-xl font-bold text-foreground flex items-center gap-2 mb-6">
              <span>📊</span>
              ملخص سريع
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-card/50">
                <span className="text-muted-foreground">إجمالي الصفقات</span>
                <span className="text-2xl font-bold text-primary">{transactions.length}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-card/50">
                <span className="text-muted-foreground">متوسط الربح</span>
                <span className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat("ar-EG").format(
                    transactions.reduce((sum, t) => sum + t.profit, 0) / transactions.length || 0
                  )} ج.م
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-card/50">
                <span className="text-muted-foreground">أعلى صفقة</span>
                <span className="text-2xl font-bold text-amber-600">
                  {new Intl.NumberFormat("ar-EG").format(
                    Math.max(...transactions.map((t) => t.profit), 0)
                  )} ج.م
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-card/50">
                <span className="text-muted-foreground">إجمالي الأرباح</span>
                <span className="text-2xl font-bold text-emerald-600">
                  {new Intl.NumberFormat("ar-EG").format(
                    transactions.reduce((sum, t) => sum + t.profit, 0)
                  )} ج.م
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <TransactionsTable
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          onEdit={handleEditTransaction}
        />

        {/* Transaction Modal */}
        <TransactionModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSubmit={handleAddTransaction}
        />
      </div>
    </DashboardLayout>
  );
}
