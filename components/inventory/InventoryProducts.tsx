'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { inventoryItems } from '@/constants';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function InventoryComponent() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredItems = inventoryItems
    .filter((item) =>
      item.itemsInStock.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((item) => {
      if (filter === 'low') return item.status === 'Low Stock';
      if (filter === 'in') return item.status === 'In Stock';
      return true;
    });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handleShowAll = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleAddProduct = () => {
    router.push('/inventory/add-product');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center text-center justify-between">
        <div className="relative w-fit max-w-md mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 border border-lightblue"
          />
        </div>

        <div className="flex items-center gap-4">
          <Select onValueChange={(val) => setFilter(val)} defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter Products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="in">In Stock</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddProduct}
            className="bg-darkblue hover:bg-lightblue font-normal text-surface-100"
          >
            Add New Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4  bg-surface-100 py-4 px-5">
        <div className="px-4 grid grid-cols-7 text-center bg-gray-100 p-4 text-surface-500 font-semibold rounded gap-4 text-sm">
          <span>Items in Stock</span>
          <span>Category</span>
          <span>Stock</span>
          <span>Price</span>
          <span>Status</span>
          <span>Last Updated</span>
          <span>Actions</span>
        </div>
        {filteredItems.map(
          ({
            id,
            category,
            status,
            stockLevel,
            lastUpdated,
            price,
            actions,
            itemsInStock,
          }) => (
            <Card key={id} className="p-5">
              <CardContent className="place-items-center px-4  text-center grid grid-cols-7 gap-2 text-[11px]  text-surface-600">
                <div className="flex justify-items-start text-left">
                  {itemsInStock}
                </div>
                <div>{category}</div>
                <div>{stockLevel}</div>
                <div>{price}</div>
                <div
                  className={`${cn(
                    status === 'Low Stock'
                      ? 'bg-yellow-500 font-semibold'
                      : 'bg-green-400 font-semibold',
                  )} px-4 py-2 text-center  rounded-2xl`}
                >
                  {status}
                </div>
                <div>{lastUpdated}</div>

                <Button className="bg-darkblue text-surface-100 px-10 font-normal rounded-lg cursor-pointer hover:bg-lightblue">
                  {actions}
                </Button>
              </CardContent>
            </Card>
          ),
        )}
      </div>
      <div className="flex items-center justify-between pt-2 mb-2">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} - {Math.min(endIndex, filteredItems.length)}{' '}
          of {filteredItems.length} products
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
