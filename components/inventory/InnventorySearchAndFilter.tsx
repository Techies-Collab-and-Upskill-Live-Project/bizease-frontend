'use client';

import SearchInput from '../shared/SearchInput';
import FilterSelect from '../shared/FilterButton';
import AddButton from '../shared/InventoryAddButton';

interface InventoryHeaderActionsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onResetPage: () => void;
  filterValue: string;
  setFilter: (value: string) => void;
}

export const InventoryHeaderActions = ({
  searchTerm,
  setSearchTerm,
  onResetPage,
  filterValue,
  setFilter,
}: InventoryHeaderActionsProps) => {
  return (
    <div className="flex items-center justify-between mb-4 mt-6 max-lg:hidden">
      <SearchInput
        placeholder="Search inventory..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onResetPage={onResetPage}
      />
      <div className="flex items-center gap-2 max-md:gap-2">
        <FilterSelect
          filterValue={filterValue}
          className="cursor-pointer"
          onChange={setFilter}
          placeholder="Filter Products"
          options={[
            { label: 'All Products', value: 'all' },
            { label: 'Low Stock', value: 'low' },
            { label: 'In Stock', value: 'in' },
            { label: 'No Stock', value: 'no' },
          ]}
        />
        <AddButton label="Add New Product" />
      </div>
    </div>
  );
};
