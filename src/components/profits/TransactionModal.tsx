import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (transaction: Transaction) => void;
}

const regions = ["سيدي جابر", "المنشية", "محطة الرمل", "سموحة", "كليوباترا", "العصافرة"];
const accountTypes = ["مالك", "وسيط", "مكتب عقارات"];
const propertyTypes = ["طلاب", "عائلات", "مصيف", "حجز يومي", "استوديو"];

export function TransactionModal({ open, onOpenChange, onSubmit }: TransactionModalProps) {
  const [formData, setFormData] = useState({
    propertyName: "",
    region: "",
    accountType: "",
    propertyType: "",
    rentPrice: "",
    commission: "",
  });

  const calculateProfit = () => {
    const rent = parseFloat(formData.rentPrice) || 0;
    const commission = parseFloat(formData.commission) || 0;
    return rent - commission;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.propertyName || !formData.region || !formData.accountType || 
        !formData.propertyType || !formData.rentPrice || !formData.commission) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      propertyName: formData.propertyName,
      region: formData.region,
      accountType: formData.accountType,
      propertyType: formData.propertyType,
      rentPrice: parseFloat(formData.rentPrice),
      commission: parseFloat(formData.commission),
      profit: calculateProfit(),
      date: new Date().toISOString(),
    };

    onSubmit(transaction);
    toast.success("تم تسجيل الصفقة بنجاح!");
    
    // Reset form
    setFormData({
      propertyName: "",
      region: "",
      accountType: "",
      propertyType: "",
      rentPrice: "",
      commission: "",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <span>🧾</span>
            إتمام صفقة جديدة
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="propertyName">اسم العقار</Label>
            <Input
              id="propertyName"
              placeholder="أدخل اسم العقار"
              value={formData.propertyName}
              onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>المنطقة</Label>
              <Select
                value={formData.region}
                onValueChange={(value) => setFormData({ ...formData, region: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنطقة" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>نوع الحساب</Label>
              <Select
                value={formData.accountType}
                onValueChange={(value) => setFormData({ ...formData, accountType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>نوع العقار</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع العقار" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rentPrice">سعر الإيجار (ج.م)</Label>
              <Input
                id="rentPrice"
                type="number"
                placeholder="0"
                value={formData.rentPrice}
                onChange={(e) => setFormData({ ...formData, rentPrice: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commission">العمولة (ج.م)</Label>
              <Input
                id="commission"
                type="number"
                placeholder="0"
                value={formData.commission}
                onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
              />
            </div>
          </div>

          {/* Profit Preview */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">ربحك النهائي:</span>
              <span className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat("ar-EG").format(calculateProfit())} ج.م
              </span>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              تأكيد الصفقة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
