'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { useState } from 'react';

const HeaderPeriodSelection = () => {
  const [filter, setFilter] = useState<string>('all');

  return (
    <div className="flex justify-between max-lg:justify-end px-6 my-4">
      <h1 className="hidden lg:block text-lg  font-bold">Report & Analytics</h1>
      <div className="flex items-center gap-2">
        <Link href={'./report-analytics/generate-reports'}>
          <Button className="bg-darkblue hover:bg-lightblue">Export</Button>
        </Link>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[120px] border border-lightblue capitalize">
            {filter === 'all' ? 'All time' : filter}
          </SelectTrigger>
          <SelectContent className="border border-lightblue">
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HeaderPeriodSelection;
