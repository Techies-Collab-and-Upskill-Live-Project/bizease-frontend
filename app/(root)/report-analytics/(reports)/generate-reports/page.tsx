'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ChevronLeft, Eye } from 'lucide-react';
import ReportExportAnalytics from '@/components/reports/ExportReportMetrics';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface GenerateReport {
  title: string;
  value: number | string;
  icon?: string;
  growthRate?: number;
  change?: string;
  name: string;
  stock_status: string;
  quantity_sold: number;
  revenue: number;
  owner: string;
  product_name: string;
  description: string;
  category: string;
  stock_level: number;
  low_stock_threshold: number;
  price: number;
  date_added: string;
}

const formSchema = z.object({
  dateRange: z.string(),
  category: z.string(),
  fileName: z.string().min(1, 'File name is required'),
  format: z.enum(['pdf', 'csv', 'xlsx']),
});

type FormData = z.infer<typeof formSchema>;

const GenerateReports = () => {
  const [category, setCategory] = useState('all');
  const router = useRouter();
  const { user } = useCurrentUser();

  const [period, setPeriod] = useState<
    'last-week' | 'last-month' | 'last-6-months' | 'last-year'
  >('last-week');

  // const { summaryData } = useReportSummary();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // const previewRef = useRef<HTMLDivElement>(null);

  console.log(category);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      dateRange: 'last-week',
      category: 'all',
      fileName: 'My Sales Report',
      format: 'pdf',
    },
    resolver: zodResolver(formSchema),
  });

  // const format = watch('format');
  const fileName = watch('fileName');

  // interface GenerateBlobParams {
  //   inventory: InventoryItem[];
  //   summaryData: { data?: { summary?: OrderItem[] } };
  //   format: 'csv' | 'xlsx';
  //   fileName: string;
  //   watch: UseFormWatch<any>;
  // }

  // const generateBlob = ({
  //   inventory = [],
  //   summaryData = {},
  //   format,
  //   fileName,
  //   watch,
  // }: GenerateBlobParams) => {
  //   const selectedCategory = watch('category');
  //   const orderItems = summaryData?.data?.summary || [];

  //   let data: Record<string, string | number>[] = [];

  //   if (selectedCategory === 'inventory') {
  //     data = inventory.map((item: InventoryItem) => ({
  //       Product: item.product_name,
  //       'Stock Level': item.stock_level,
  //       'Low Stock Threshold': item.low_stock_threshold,
  //       Price: `₦${item.price.toLocaleString()}`,
  //     }));
  //   } else if (selectedCategory === 'sales') {
  //     data = orderItems.map((item: OrderItem) => ({
  //       Product: item.name,
  //       'Unit Sold': item.quantity_sold ?? 0,
  //       Revenue: `₦${(item.revenue ?? 0).toLocaleString()}`,
  //       'Stock Status': item.stock_status || 'N/A',
  //     }));
  //   } else {
  //     const combinedMap = new Map<string, Partial<InventoryItem & OrderItem>>();
  //     inventory.forEach((inv) => {
  //       combinedMap.set(inv.product_name, {
  //         product_name: inv.product_name,
  //         stock_level: inv.stock_level,
  //         low_stock_threshold: inv.low_stock_threshold,
  //         price: inv.price,
  //       });
  //     });
  //     orderItems.forEach((ord) => {
  //       const existing = combinedMap.get(ord.name) || {};
  //       combinedMap.set(ord.name, {
  //         ...existing,
  //         name: ord.name,
  //         quantity_sold: ord.quantity_sold,
  //         revenue: ord.revenue,
  //         stock_status: ord.stock_status,
  //       });
  //     });
  //     data = Array.from(combinedMap.values()).map((item) => ({
  //       Product: item.product_name || item.name || 'Unnamed',
  //       'Stock Level': item.stock_level ?? 'N/A',
  //       'Low Stock Threshold': item.low_stock_threshold ?? 'N/A',
  //       Price: item.price ? `₦${item.price.toLocaleString()}` : 'N/A',
  //       'Unit Sold': item.quantity_sold ?? 0,
  //       Revenue: item.revenue ? `₦${item.revenue.toLocaleString()}` : '₦0',
  //       'Stock Status': item.stock_status ?? 'N/A',
  //     }));
  //   }

  //   let blob: Blob;

  //   if (format === 'csv') {
  //     const headers = Object.keys(data[0] || {}).join(',') + '\n';
  //     const rows = data.map((row) => Object.values(row).join(',')).join('\n');
  //     blob = new Blob([headers + rows], { type: 'text/csv' });
  //   } else {
  //     const worksheet = XLSX.utils.json_to_sheet(data);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  //     const buffer = XLSX.write(workbook, {
  //       bookType: 'xlsx',
  //       type: 'array',
  //     });
  //     blob = new Blob([buffer], {
  //       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //     });
  //   }

  //   return {
  //     blob,
  //     cleanFileName: fileName.trim().replace(/\s+/g, '_'),
  //     data,
  //   };
  // };

  // const exportPreviewAsPDF = async (element: HTMLElement, fileName: string) => {
  //   const canvas = await html2canvas(element, { scale: 2 });
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF('p', 'mm', 'a4');
  //   const imgProps = pdf.getImageProperties(imgData);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   return pdf.output('blob');
  // };

  // const handleDownload = async () => {
  //   if (format === 'pdf') {
  //     if (!previewRef.current) return;
  //     const blob = await exportPreviewAsPDF(previewRef.current, fileName);
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(blob);
  //     link.download = `${fileName}.pdf`;
  //     link.click();
  //   } else {
  //     const { blob, cleanFileName } = generateBlob({
  //       inventory,
  //       summaryData: summaryData ?? {},
  //       format,
  //       fileName,
  //       watch,
  //     });
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(blob);
  //     link.download = `${cleanFileName}.${format}`;
  //     link.click();
  //   }
  //   router.push('/report-analytics');
  // };

  // const handleSend = async () => {
  //   let blob: Blob;
  //   if (format === 'pdf') {
  //     if (!previewRef.current) return;
  //     blob = await exportPreviewAsPDF(previewRef.current, fileName);
  //   } else {
  //     blob = generateBlob({
  //       inventory,
  //       summaryData: summaryData ?? {},
  //       format,
  //       fileName,
  //       watch,
  //     }).blob;
  //   }

  //   if (fileInputRef.current && formRef.current) {
  //     const file = new File([blob], `${fileName}.${format}`, {
  //       type: blob.type,
  //     });
  //     const dataTransfer = new DataTransfer();
  //     dataTransfer.items.add(file);
  //     fileInputRef.current.files = dataTransfer.files;
  //     formRef.current.submit();
  //   }
  //   router.push('/report-analytics');
  // };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-6 bg-surface-100">
      <Card className="w-full max-w-lg border-0 shadow-background">
        <CardHeader className="m-0 p-0">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5 text-darkblue" />
            </Button>
            <CardTitle className="text-lg text-darkblue mb-0 pb-0">
              Export Report
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="m-0 pt-0">
          <p className="text-sm text-muted-foreground mt-0 mb-6">
            Preview and confirm your report before download or send to email.
          </p>
          <form
            ref={formRef}
            encType="multipart/form-data"
            className="space-y-3"
            method="POST"
            action={`https://formsubmit.co/${user?.email}`}
            onSubmit={handleSubmit(() => setPreviewOpen(true))}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value={fileName} />
            <input
              type="hidden"
              name="message"
              value="Please find your report attached."
            />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_next"
              value="http://localhost:3000/report-analytics"
            />
            <input type="file" name="attachment" ref={fileInputRef} hidden />

            <div className="space-y-1">
              <Label className="text-surface-500 text-sm">Date Range</Label>
              <Select
                value={period}
                onValueChange={(value) => setPeriod(value as typeof period)}
              >
                <SelectTrigger className="w-full mb-4 text-sm text-surface-500 border border-surface-200">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-surface-500">Category</Label>
              <Select
                onValueChange={(val) => {
                  setCategory(val);
                  setValue('category', val);
                }}
                defaultValue="all"
              >
                <SelectTrigger className="w-full max-w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-surface-500">File Name</Label>
              <Input
                {...register('fileName')}
                placeholder="e.g., My Sales Report"
              />
              {errors.fileName && (
                <p className="text-xs text-red-500">
                  {errors.fileName.message}
                </p>
              )}
            </div>

            <div className="max-w-full space-y-1">
              <Label className="text-surface-500">Format</Label>
              <Select
                onValueChange={(val) =>
                  setValue('format', val as FormData['format'])
                }
                defaultValue="pdf"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="PDF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  {/* <SelectItem value="csv">CSV</SelectItem> */}
                  {/* <SelectItem value="xlsx">Excel (XLSX)</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogContent className="w-full">
                <DialogHeader>
                  <DialogTitle>Preview Report</DialogTitle>
                </DialogHeader>

                <ReportExportAnalytics />

                <div className="flex justify-end gap-3 pt-4">
                  {/* <Button
                    variant="outline"
                    onClick={() => {
                      setPreviewOpen(false);
                      // handleDownload();
                    }}
                  >
                    {/* <Download className="w-4 h-4 mr-1" /> */}
                  Download
                  {/* </Button>  */}
                  {/* <Button
                    className="bg-darkblue hover:bg-lightblue"
                    onClick={() => {
                      // setPreviewOpen(false);
                      // handleSend();
                    }}
                  >
                    <Mail className="w-4 h-4 mr-1" /> Send Email
                  </Button> */}
                </div>
              </DialogContent>
            </Dialog>

            <Button
              type="button"
              className="w-full bg-darkblue hover:bg-lightblue"
              onClick={handleSubmit(() => setPreviewOpen(true))}
            >
              <Eye className="w-4 h-4 mr-2" /> Preview Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default GenerateReports;
