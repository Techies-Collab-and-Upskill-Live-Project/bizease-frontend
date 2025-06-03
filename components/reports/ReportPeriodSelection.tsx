import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

interface HeaderPeriodSelectionProps {
  filter: string;
  onFilterChange: (value: string) => void;
  onExport: () => void;
}

const HeaderPeriodSelection = ({
  filter,
  onFilterChange,
  onExport,
}: HeaderPeriodSelectionProps) => (
  <div className="flex justify-between px-6 my-4">
    <h1 className="text-2xl font-bold">Report & Analytics</h1>
    <div className="flex items-center gap-2">
      <Button className="bg-darkblue hover:bg-lightblue" onClick={onExport}>
        Export
      </Button>
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[120px] capitalize">
          {filter === 'all' ? 'All time' : filter}
        </SelectTrigger>
        <SelectContent>
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

export default HeaderPeriodSelection;
