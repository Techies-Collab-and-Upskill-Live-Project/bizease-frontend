'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FilterSelectProps {
  filterValue: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

const FilterSelect = ({
  filterValue,
  onChange,
  options,
  placeholder = 'Filter Options',
  className,
}: FilterSelectProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={filterValue}>
      <SelectTrigger
        className={cn('w-[160px] border-1 border-lightblue', className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border-1 border-lightblue">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
