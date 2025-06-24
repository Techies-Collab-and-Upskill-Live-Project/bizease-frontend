'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import emailjs from 'emailjs-com';

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

import { ChevronLeft } from 'lucide-react';
import { reportSummary, user } from '@/constants';

const formSchema = z.object({
  dateRange: z.string(),
  category: z.string(),
  fileName: z.string().min(1, 'File name is required'),
  format: z.enum(['pdf', 'csv', 'xlsx']),
});

type FormData = z.infer<typeof formSchema>;

const GenerateReports = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { email } = user;

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
    const data = reportSummary.map((item) => ({
      Product: item.Product,
      'Unit Sold': item.productSold,
      Revenue: item.revenue,
      'Stock Status': item.stockStatus,
    }));

    const cleanFileName = fileName.trim().replace(/\s+/g, '_');
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
        doc.setFontSize(12);
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

    return { blob, cleanFileName };
  };

  const onSubmit = async (values: FormData) => {
    const { blob, cleanFileName } = generateBlob();

    if (fileInputRef.current && formRef.current) {
      const file = new File([blob], `${cleanFileName}.${values.format}`, {
        type: blob.type,
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;

      try {
        await emailjs.sendForm(
          'service_goa35yn',
          'template_jexs67e',
          formRef.current,
          '5D6oo0cwN8cmpmcqm',
        );
        console.log('Email sent with attachment');
        router.push('/report-analytics/generate-report-res');
      } catch (error) {
        console.error('Email error:', error);
        router.push('/report-analytics/generate-report-failed');
      }
    }
  };

  const handleDownload = () => {
    const { blob, cleanFileName } = generateBlob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${cleanFileName}.${format}`;
    link.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-surface-100">
      <Card className="w-full max-w-lg border-0 shadow-background">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full focus-visible:outline-none"
            >
              <ChevronLeft className="h-5 w-5 text-darkblue" />
            </Button>
            <CardTitle className="text-lg text-darkblue">
              Export Report
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Confirm your export settings and send the report to your email.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <input type="hidden" name="to_email" value={email} />
            <input type="hidden" name="subject" value={fileName} />
            <input
              type="hidden"
              name="message"
              value="Please find your report attached."
            />
            <input type="file" name="my_file" ref={fileInputRef} hidden />

            {/* Date Range */}
            <div className="space-y-1">
              <Label className="text-surface-500 text-sm">Date Range</Label>
              <Select
                onValueChange={(value) => setValue('dateRange', value)}
                defaultValue="last-30-days"
              >
                <SelectTrigger className="w-full text-surface-400 focus-visible:outline-none">
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent
                  className="w-full text-surface-500"
                  position="popper"
                  side="bottom"
                  align="start"
                >
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <Label className="text-surface-500">Category</Label>
              <Select
                onValueChange={(value) => setValue('category', value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-full text-surface-400 focus-visible:outline-none">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent
                  className="text-surface-500"
                  position="popper"
                  side="bottom"
                  align="start"
                >
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* File Name */}
            <div className="space-y-1">
              <Label className="text-surface-500">File Name</Label>
              <Input
                className="focus-visible:outline-none text-surface-400 placeholder:text-surface-400"
                {...register('fileName')}
                placeholder="e.g., My Sales Report"
              />
              {errors.fileName && (
                <p className="text-xs text-red-500">
                  {errors.fileName.message}
                </p>
              )}
            </div>

            {/* Format */}
            <div className="space-y-1">
              <Label className="text-surface-500">Format</Label>
              <Select
                onValueChange={(value) =>
                  setValue('format', value as FormData['format'])
                }
                defaultValue="pdf"
              >
                <SelectTrigger className="w-full focus-visible:outline-none">
                  <SelectValue
                    className="text-surface-400 placeholder:text-surface-400"
                    placeholder="PDF"
                  />
                </SelectTrigger>
                <SelectContent
                  className="text-surface-500 placeholder:text-surface-400"
                  position="popper"
                  side="bottom"
                  align="start"
                >
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 pt-4">
              <Button
                type="submit"
                className="bg-darkblue hover:bg-lightblue focus-visible:outline-none"
              >
                Send report to my email
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleDownload}
                className="focus-visible:outline-none"
              >
                Download report
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateReports;
