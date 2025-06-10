'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import { reportSummary, user } from '@/constants';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import emailjs from 'emailjs-com';

const Generatereports = () => {
  const { email } = user;
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dateRange, setDateRange] = useState('last-30-days');
  const [category, setCategory] = useState('all');
  const [fileName, setFileName] = useState('My Sales Report');
  const [format, setFormat] = useState('pdf');

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = reportSummary.map((item) => ({
      Product: item.Product,
      'Unit Sold': item.productSold,
      Revenue: item.revenue,
      'Stock Status': item.stockStatus,
    }));

    const cleanFileName = fileName.trim().replace(/\s+/g, '_');
    let fileBlob: Blob | null = null;

    if (format === 'csv') {
      const csvHeader = 'Product,Unit Sold,Revenue,Stock Status\n';
      const csvRows = data
        .map((row) =>
          [
            row.Product,
            row['Unit Sold'],
            row.Revenue,
            row['Stock Status'],
          ].join(','),
        )
        .join('\n');

      fileBlob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    } else if (format === 'xlsx') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      fileBlob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
    } else if (format === 'pdf') {
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

      fileBlob = doc.output('blob');
    }

    if (fileBlob && fileInputRef.current && formRef.current) {
      const file = new File([fileBlob], `${cleanFileName}.${format}`, {
        type: fileBlob.type,
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;

      emailjs
        .sendForm(
          'service_goa35yn',
          'template_jexs67e',
          formRef.current,
          '5D6oo0cwN8cmpmcqm',
        )
        .then(
          () => {
            console.log('Email sent with attachment');
            router.push('/report-analytics/generate-report-res');
          },
          (error) => {
            console.error('Error sending email:', error);
            router.push('/report-analytics/generate-report-failed');
          },
        );
    }
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-surface-100 px-8 py-4">
      <Card className="w-full max-w-lg shadow-md border-none">
        <CardHeader>
          <CardTitle className="text-xl text-surface-600">
            Export Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Confirm the export of your business report for the selected date
            range and category.
          </p>

          <form ref={formRef} onSubmit={handleExport} className="space-y-4">
            <input type="hidden" name="to_email" value={email} />
            <input type="hidden" name="subject" value={fileName} />
            <input
              type="hidden"
              name="message"
              value="Please find your report attached."
            />
            <input
              type="file"
              name="my_file"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />

            <div className="space-y-1">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full">
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
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
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
              <Label htmlFor="fileName">File Name</Label>
              <Input
                id="fileName"
                placeholder="My Sales Report"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label>Format</Label>
              <Select value={format} onValueChange={setFormat}>
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

            <div className="flex flex-col gap-2 pt-2">
              <Button
                type="submit"
                className="bg-darkblue hover:bg-lightblue text-sm"
              >
                Send report to my email
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push('/report-analytics')}
                className="text-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Generatereports;
