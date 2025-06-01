'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { inventoryItems } from '@/constants';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import SearchProduct from './SearchProductDesk';

export default function InventoryComponent({
  setCurrentPage,
  handleAddProduct,
  currentPage,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
}: SearchProductProps) {
  const [isOpen, setisOpen] = useState(false);

  const itemsPerPage = 3;

  const filteredProduct = inventoryItems
    .filter((item) =>
      item.itemsInStock.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((item) => {
      if (filter === 'low') return item.status === 'Low Stock';
      if (filter === 'in') return item.status === 'In Stock';
      return true;
    });

  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProduct.slice(startIndex, endIndex);

  // const lowStockItems = inventoryItems.filter(
  //   (item) => item.status === 'Low Stock',
  // );

  return (
    <div className="space-y-4 bg-surface-100 max-md:bg-gray-100 max-md:overflow-hidden py-4 px-5">
      <SearchProduct
        handleAddProduct={handleAddProduct}
        filter={filter}
        setSearchTerm={setSearchTerm}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {/*  Desktop View */}
      <div className="max-md:hidden grid grid-cols-1 gap-4">
        <div className="px-4 grid grid-cols-7 text-center bg-gray-100 p-4 text-surface-500 font-semibold rounded gap-4 text-sm">
          <span>Items in Stock</span>
          <span>Category</span>
          <span>Stock</span>
          <span>Price</span>
          <span>Status</span>
          <span>Last Updated</span>
          <span>Actions</span>
        </div>
        {currentProducts.map(
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
              <CardContent className=" px-4 text-center grid grid-cols-7 gap-2 text-[11px] text-surface-600">
                <div className="flex items-center text-left">
                  {itemsInStock}
                </div>
                <div className="flex-center">{category}</div>
                <div className="flex-center">{stockLevel}</div>
                <div className="flex-center">{price}</div>
                <div
                  className={`flex flex-center text-center ${cn(
                    status === 'Low Stock'
                      ? 'bg-yellow-500 font-semibold'
                      : 'bg-green-400 font-semibold',
                    'px-2 py-2  rounded-2xl',
                  )}`}
                >
                  {status}
                </div>
                <div className="px-2 mr-4">{lastUpdated}</div>
                <Button className="bg-darkblue text-surface-100 font-normal rounded-lg cursor-pointer hover:bg-lightblue">
                  {actions}
                </Button>
              </CardContent>
            </Card>
          ),
        )}
      </div>

      {/* ✅ Mobile View */}
      <div className="md:hidden relative overflow-hidden bg-gray-100 max-md:bg-gray-100 flex flex-col gap-4">
        {currentProducts.map(
          ({ id, category, status, stockLevel, price, itemsInStock }) => (
            <Card key={id} className="p-4 bg-gray-100">
              <CardContent className="flex bg-gray-100 justify-between items-end p-0 gap-4">
                <div className="flex flex-col gap-1 text-sm">
                  <h3 className="text-[14px] text-gray-600 font-semibold">
                    {itemsInStock}
                  </h3>
                  <div className="text-gray-400">{category}</div>
                  <div className="bg-amber-400 text-[10px] text-gray-800 font-bold py-0.5 px-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <div className="bg-red-600 h-1.5 w-1.5 rounded-full" />
                      {stockLevel} - {status}
                    </div>
                  </div>
                  <div className="text-surface-600 text-[16px] font-semibold">
                    ₦{price}
                  </div>
                </div>
                <Button className="bg-darkblue font-normal text-surface-100 hover:bg-lightblue whitespace-nowrap">
                  Restock
                </Button>
              </CardContent>
            </Card>
          ),
        )}

        {/* Floating Action Buttons */}
        <div className="fixed bottom-25 right-4 z-50 flex gap-2">
          {isOpen && (
            <Button
              onClick={handleAddProduct}
              className="bg-darkblue text-surface-200 hover:bg-lightblue font-normal text-[12px] shadow-lg"
            >
              {isOpen && <span>Add New Product</span>}
            </Button>
          )}
          <Button
            onClick={() => {
              setisOpen((prev) => !prev);
            }}
            variant="outline"
            className="bg-darkblue hover:text-surface-100 hover:bg-lightblue text-surface-100 shadow-lg"
          >
            x
          </Button>
        </div>
      </div>

      {/*  Pagination Footer */}
      <div className="flex items-center justify-between pt-2 mb-2 text-sm">
        <div className="text-muted-foreground">
          Showing {startIndex + 1} -{' '}
          {Math.min(endIndex, filteredProduct.length)} of{' '}
          {filteredProduct.length} products
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
