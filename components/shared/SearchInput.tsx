'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  placeholder?: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onResetPage?: () => void; // optional: resets pagination
  className?: string;
}
const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  searchTerm,
  setSearchTerm,
  onResetPage,
  className = '',
}) => {
  return (
    <div className={`relative w-fit max-w-fit ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onResetPage?.();
        }}
        className="pl-8 border placeholder:italic max-w-fit border-lightblue"
      />
    </div>
  );
};

export default SearchInput;
