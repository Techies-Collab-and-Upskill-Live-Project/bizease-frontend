'use client';

import React, { useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

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
import { ChevronLeft, Download, Mail, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useCurrentUser from '@/hooks/useCurrentUser';
import { useInventoryStore, useOrderStore } from '@/lib/store';
import { Product } from '@/types';

const formSchema = z.object({
  dateRange: z.string(),
  category: z.string(),
  fileName: z.string().min(1, 'File name is required'),
  format: z.enum(['pdf', 'csv', 'xlsx']),
});

type FormData = z.infer<typeof formSchema>;

const GenerateReports = () => {
  const { user } = useCurrentUser();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { inventory } = useInventoryStore();
  const { orders } = useOrderStore();

  const reportSummary = useMemo(() => {
    return inventory.map((product: Product) => {
      const itemOrders = orders.flatMap((order) =>
        order.products.filter(
          (p) => String(p.productId) === String(product.id),
        ),
      );

      const unitsSold = itemOrders.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const revenue = (unitsSold * (product.price || 0)).toFixed(2);
      const stockStatus = product.stock < 5 ? 'Low' : 'In Stock';

      return {
        Product: product.name,
        'Unit Sold': unitsSold,
        Revenue: revenue,
        'Stock Status': stockStatus,
      };
    });
  }, [inventory, orders]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      dateRange: 'last-30-days',
      category: 'all',
      fileName: 'My Sales Report',
      format: 'pdf',
    },
    resolver: zodResolver(formSchema),
  });

  const format = watch('format');
  const fileName = watch('fileName');

  const generateBlob = () => {
    const dateRange = watch('dateRange');
    const category = watch('category');
    const fileName = watch('fileName').trim().replace(/\s+/g, '_');

    // Filter inventory by category
    const filteredInventory =
      category === 'all'
        ? inventory
        : inventory.filter((item) => item.category === category);

    // Filter orders by date range
    // const now = new Date();
    let fromDate = new Date(0);
    const today = new Date();

    switch (dateRange) {
      case 'last-7-days':
        fromDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case 'last-30-days':
        fromDate = new Date(today.setDate(today.getDate() - 30));
        break;
      case 'this-month':
        fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'last-month':
        fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
    }

    const filteredOrders = orders.filter(
      (order) => new Date(order.date) >= fromDate,
    );

    // Aggregate sales data
    const salesMap = new Map<string, { sold: number; revenue: number }>();
    filteredOrders.forEach((order) => {
      order.products.forEach((item) => {
        const product = inventory.find(
          (p) => String(p.id) === String(item.productId),
        );
        if (!product) return;

        const current = salesMap.get(item.productId) || { sold: 0, revenue: 0 };
        current.sold += item.quantity;
        current.revenue += item.quantity * product.price;
        salesMap.set(item.productId, current);
      });
    });

    // Build report data
    const data = filteredInventory.map((product) => {
      const sales = salesMap.get(String(product.id)) || { sold: 0, revenue: 0 };
      return {
        Product: product.name,
        'Unit Sold': sales.sold,
        Revenue: `₦${sales.revenue.toLocaleString()}`,
        'Stock Status': product.stock > 0 ? 'In Stock' : 'Out of Stock',
      };
    });

    let blob: Blob;

    switch (format) {
      case 'csv':
        const header = 'Product,Unit Sold,Revenue,Stock Status\n';
        const rows = data
          .map((row) =>
            [
              row.Product,
              row['Unit Sold'],
              row.Revenue,
              row['Stock Status'],
            ].join(','),
          )
          .join('\n');
        blob = new Blob([header + rows], { type: 'text/csv' });
        break;

      case 'xlsx':
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
        const buffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
        blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        break;

      case 'pdf':
      default:
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text('Sales Report', 10, 10);
        let y = 20;
        data.forEach((item, index) => {
          doc.text(
            `${index + 1}. ${item.Product} | Sold: ${
              item['Unit Sold']
            } | Revenue: ${item.Revenue} | Stock: ${item['Stock Status']}`,
            10,
            y,
          );
          y += 10;
        });
        blob = doc.output('blob');
        break;
    }

    return { blob, cleanFileName: fileName, data };
  };

  const handleDownload = () => {
    const { blob, cleanFileName } = generateBlob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${cleanFileName}.${format}`;
    link.click();
  };

  const handleSend = async () => {
    const { blob, cleanFileName } = generateBlob();
    if (fileInputRef.current && formRef.current) {
      const file = new File([blob], `${cleanFileName}.${format}`, {
        type: blob.type,
      });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      formRef.current.submit();
    }
  };

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
            method="POST"
            action={`https://formsubmit.co/${user?.email}`}
            encType="multipart/form-data"
            onSubmit={handleSubmit(() => setPreviewOpen(true))}
            className="space-y-3"
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
                onValueChange={(val) => setValue('dateRange', val)}
                defaultValue="last-30-days"
              >
                <SelectTrigger className="w-full max-w-full">
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-surface-500">Category</Label>
              <Select
                onValueChange={(val) => setValue('category', val)}
                defaultValue="all"
              >
                <SelectTrigger className="w-full max-w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
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
                <SelectContent className="w-full:">
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Preview Report</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] border rounded-md">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="text-darkblue font-semibold">
                          S/N
                        </TableHead>
                        <TableHead className="text-darkblue font-semibold">
                          Product
                        </TableHead>
                        <TableHead className="text-darkblue font-semibold">
                          Unit Sold
                        </TableHead>
                        <TableHead className="text-darkblue font-semibold">
                          Revenue
                        </TableHead>
                        <TableHead className="text-darkblue font-semibold">
                          Stock Level
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportSummary.map((item, index) => (
                        <TableRow className="even:bg-gray-100" key={index}>
                          <TableCell className="text-lightblue">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-lightblue">
                            {item.Product}
                          </TableCell>
                          <TableCell className="text-lightblue">
                            {item['Unit Sold']}
                          </TableCell>
                          <TableCell className="text-lightblue">
                            {item.Revenue}
                          </TableCell>
                          <TableCell className="text-center text-lightblue">
                            {item['Stock Status']}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPreviewOpen(false);
                      handleDownload();
                    }}
                  >
                    <Download className="w-4 h-4 mr-1" /> Download
                  </Button>
                  <Button
                    className="bg-darkblue hover:bg-lightblue"
                    onClick={() => {
                      setPreviewOpen(false);
                      handleSend();
                    }}
                  >
                    <Mail className="w-4 h-4 mr-1" /> Send Email
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              type="submit"
              className="w-full bg-darkblue hover:bg-lightblue"
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
