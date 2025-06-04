'use client';

import React, { useState } from 'react';
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
import { reportSummary } from '@/constants';
import * as XLSX from 'xlsx';

const Generatereports = () => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState('last-30-days');
  const [category, setCategory] = useState('all');
  const [fileName, setFileName] = useState('My Sales Report');
  const [format, setFormat] = useState('pdf');
  const [sendToEmail, setSendToEmail] = useState(false);

  const handleExport = () => {
    const data = reportSummary.map((item) => ({
      Product: item.Product,
      'Unit Sold': item.productSold,
      Revenue: item.revenue,
      'Stock Status': item.stockStatus,
    }));

    const cleanFileName = fileName.trim().replace(/\s+/g, '_');

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
      const blob = new Blob([csvHeader + csvRows], {
        type: 'text/csv;charset=utf-8;',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cleanFileName}.csv`;
      link.click();
    } else if (format === 'xlsx') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
      XLSX.writeFile(workbook, `${cleanFileName}.xlsx`);
    } else if (format === 'pdf') {
      alert('PDF export is not implemented yet. Use CSV or XLSX.');
      // Placeholder: You can implement this with `jsPDF` if needed.
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
            Please confirm the export of your business report for the selected
            date range and category. Choose your preferred format.
          </p>

          <div className="space-y-1">
            <Label>Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent className="text-surface-400">
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className=" space-y-1">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="text-surface-400">
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
              <SelectContent className="text-surface-400">
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              className="bg-darkblue hover:bg-lightblue text-sm"
              onClick={() => {
                handleExport();
                setSendToEmail(true);
                router.push('/report-analytics');
              }}
            >
              Export to my email
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push('/report-analytics')}
              className="text-sm"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Generatereports;
