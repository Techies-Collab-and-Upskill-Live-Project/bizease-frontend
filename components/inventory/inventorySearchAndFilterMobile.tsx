'use client';

import AddButton from '../shared/AddButton';
import FilterSelect from '../shared/FilterButton';
import SearchInput from '../shared/SearchInput';

interface InventoryHeaderActionsMobileProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onResetPage: () => void;
  filterValue: string;
  setFilter: (value: string) => void;
}

export const InventoryHeaderActionsMobile = ({
  searchTerm,
  setSearchTerm,
  onResetPage,
  filterValue,
  setFilter,
}: InventoryHeaderActionsMobileProps) => {
  return (
    <div className="flex w-full px-5 justify-between items-center lg:hidden mb-4 mt-6">
      <SearchInput
        placeholder="Search inventory..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onResetPage={onResetPage}
      />
      <div className="w-fit flex justify-between items-center gap-2">
        <FilterSelect
          filterValue={filterValue}
          className="w-full"
          onChange={setFilter}
          placeholder="Filter Products"
          options={[
            { label: 'All Products', value: 'all' },
            { label: 'Low Stock', value: 'low' },
            { label: 'In Stock', value: 'in' },
            { label: 'No Stock', value: 'no' },
          ]}
        />
        <AddButton label="Add" className="hidden whitespace-nowrap px-3" />
      </div>
    </div>
  );
};
