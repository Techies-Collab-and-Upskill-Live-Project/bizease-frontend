'use client';

import React, { useRef, useState } from 'react';
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

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ChevronLeft, Download, Eye, Mail } from 'lucide-react';
import { useReportSummary } from '@/hooks/useReportSummary';
import { useInventory } from '@/hooks/useInventory';
import { InventoryItem } from '@/types';

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

type OrderItem = {
  name: string;
  quantity_sold: number;
  revenue: number;
  stock_status?: string;
};

type FormData = z.infer<typeof formSchema>;

const GenerateReports = () => {
  const [category, setCategory] = useState('all');
  const { inventory } = useInventory();

  const router = useRouter();
  const { user } = useCurrentUser();

  const [period, setPeriod] = useState<
    'last-week' | 'last-month' | 'last-6-months' | 'last-year'
  >('last-week');
  const { summaryData } = useReportSummary();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

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

  const format = watch('format');
  const fileName = watch('fileName');

  const generateBlob = () => {
    const selectedCategory = watch('category');
    const inventoryItems = inventory || [];
    const orderItems = summaryData?.data?.summary || [];

    let data: Record<string, string | number>[] = [];

    if (selectedCategory === 'inventory') {
      data = inventoryItems.map((item: InventoryItem) => ({
        Product: item.product_name,
        'Stock Level': item.stock_level,
        'Low Stock Threshold': item.low_stock_threshold,
        Price: `₦${item.price.toLocaleString()}`,
      }));
    } else if (selectedCategory === 'sales') {
      data = orderItems.map((item: OrderItem) => ({
        Product: item.name,
        'Unit Sold': item.quantity_sold ?? 0,
        Revenue: `₦${(item.revenue ?? 0).toLocaleString()}`,
        'Stock Status': item.stock_status || 'N/A',
      }));
    } else {
      // 'all' combines both Inventory and Sales if matched by name
      const combinedMap = new Map<string, Partial<InventoryItem & OrderItem>>();

      inventoryItems.forEach((inv: InventoryItem) => {
        combinedMap.set(inv.product_name, {
          product_name: inv.product_name,
          stock_level: inv.stock_level,
          low_stock_threshold: inv.low_stock_threshold,
          price: inv.price,
        });
      });

      orderItems.forEach((ord: OrderItem) => {
        const existing = combinedMap.get(ord.name) || {};
        combinedMap.set(ord.name, {
          ...existing,
          name: ord.name,
          quantity_sold: ord.quantity_sold,
          revenue: ord.revenue,
          stock_status: ord.stock_status,
        });
      });

      data = Array.from(combinedMap.values()).map((item) => ({
        Product: item.product_name || item.name || 'Unnamed',
        'Stock Level': item.stock_level ?? 'N/A',
        'Low Stock Threshold': item.low_stock_threshold ?? 'N/A',
        Price: item.price ? `₦${item.price.toLocaleString()}` : 'N/A',
        'Unit Sold': item.quantity_sold ?? 0,
        Revenue: item.revenue ? `₦${item.revenue.toLocaleString()}` : '₦0',
        'Stock Status': item.stock_status ?? 'N/A',
      }));
    }

    let blob: Blob;
    switch (format) {
      case 'csv':
        const headers = Object.keys(data[0] || {}).join(',') + '\n';
        const rows = data.map((row) => Object.values(row).join(',')).join('\n');
        blob = new Blob([headers + rows], { type: 'text/csv' });
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
        doc.text('Report Summary', 10, 10);
        let y = 20;
        data.forEach((item, index) => {
          const line = Object.entries(item)
            .map(([key, val]) => `${key}: ${val}`)
            .join(' | ');
          doc.text(`${index + 1}. ${line}`, 10, y);
          y += 10;
        });
        blob = doc.output('blob');
        break;
    }

    return {
      blob,
      cleanFileName: fileName.trim().replace(/\s+/g, '_'),
      data,
    };
  };

  const handleDownload = () => {
    const { blob, cleanFileName } = generateBlob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${cleanFileName}.${format}`;
    link.click();
    router.push('/report-analytics');
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
    router.push('/report-analytics');
  };

  const selectedCategory = watch('category');

  const filteredSummary = summaryData?.data.summary?.filter((item) => {
    if (selectedCategory === 'sales') {
      return item.quantity_sold > 0 || item.revenue > 0;
    }

    if (selectedCategory === 'inventory') {
      return item.stock_status && item.stock_status !== 'In Stock';
    }

    return true;
  });

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
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogContent className="max-w-6xl">
                <DialogHeader>
                  <DialogTitle>Preview Report</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-fit border rounded-md">
                  <Table>
                    <TableHeader className="bg-surface-200">
                      <TableRow className="font-medium text-md">
                        <TableHead>#</TableHead>

                        {category === 'inventory' && (
                          <>
                            <TableHead>Product</TableHead>
                            <TableHead>Stock Level</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock Status</TableHead>
                          </>
                        )}

                        {category === 'sales' && (
                          <>
                            <TableHead>Product</TableHead>
                            <TableHead>Sold</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Stock Status</TableHead>
                          </>
                        )}

                        {category === 'all' && (
                          <>
                            <TableHead>Product</TableHead>
                            <TableHead>Stock Level</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Sold</TableHead>
                            <TableHead>Revenue</TableHead>
                          </>
                        )}
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredSummary?.map((item, index) => (
                        <TableRow key={index} className="even:bg-gray-100">
                          <TableCell>{index + 1}</TableCell>

                          {category === 'inventory' && (
                            <>
                              <TableCell>{item.name || 'N/A'}</TableCell>
                              <TableCell>{item.stock_status ?? 0}</TableCell>
                              <TableCell>
                                ₦
                                {typeof item.revenue === 'number'
                                  ? item.revenue.toLocaleString()
                                  : '0.00'}
                              </TableCell>
                              <TableCell>
                                {item.stock_status || 'N/A'}
                              </TableCell>
                            </>
                          )}

                          {category === 'sales' && (
                            <>
                              <TableCell>{item.name || 'N/A'}</TableCell>
                              <TableCell>{item.quantity_sold ?? 0}</TableCell>
                              <TableCell>
                                ₦
                                {typeof item.revenue === 'number'
                                  ? item.revenue.toLocaleString()
                                  : '0.00'}
                              </TableCell>
                              <TableCell>
                                {item.stock_status || 'N/A'}
                              </TableCell>
                            </>
                          )}

                          {category === 'all' && (
                            <>
                              <TableCell>
                                {item.name || item.name || 'N/A'}
                              </TableCell>
                              <TableCell>{item.stock_status ?? 0}</TableCell>
                              <TableCell>
                                ₦
                                {typeof item.revenue === 'number'
                                  ? item.revenue.toLocaleString()
                                  : '0.00'}
                              </TableCell>
                              <TableCell>{item.quantity_sold ?? 0}</TableCell>
                              <TableCell>
                                ₦
                                {typeof item.revenue === 'number'
                                  ? item.revenue.toLocaleString()
                                  : '0.00'}
                              </TableCell>
                            </>
                          )}
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
                    <Download className="w-4 h-4 mr-1" />
                    Download
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
