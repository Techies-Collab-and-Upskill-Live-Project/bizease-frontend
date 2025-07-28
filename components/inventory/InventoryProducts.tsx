'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatCurrency } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react';
import Link from 'next/link';

import { SearchProductProps } from '@/types';
import DeleteConfirmationModal from '../modals/DeleteModal';
import { useInventory } from '@/hooks/useInventory';
import { string } from 'zod';

export default function InventoryComponent({
  setCurrentPage,
  handleAddProduct,
  currentPage,
  filter,
}: SearchProductProps) {
  const { inventory, deleteItem } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 6;

  const selectedProduct = inventory.find(
    ({ id }) => id === Number(selectedProductId),
  );

  const getStockStatus = (stock_level: number) => {
    if (stock_level === 0) return 'Zero Stock';
    if (stock_level <= 5) return 'Low Stock';
    return 'In Stock';
  };

  const getStockStatusClass = (stock: number) => {
    if (stock === 0) return 'bg-red-500 font-normal p-0 text-surface-100';
    if (stock <= 5) return 'bg-warning p-0 font-normal';
    return 'bg-success font-normal p-0';
  };

  const filteredProduct = inventory
    .filter(({ product_name }) =>
      typeof product_name === 'string'
        ? product_name.toLowerCase().includes(searchTerm.toLowerCase())
        : false,
    )
    .filter(({ stock_level }) => {
      if (filter === 'zero') return stock_level === 0;
      if (filter === 'low') return stock_level > 0 && stock_level <= 5;
      if (filter === 'in') return stock_level > 5;
      return true;
    })
    .map((product) => ({
      ...product,
      stockStatus: getStockStatus(product.stock_level),
      statusClass: getStockStatusClass(product.stock_level),
    }));

  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProduct.slice(startIndex, endIndex);

  const EmptyState = () => (
    <div className="min-h-60 text-center flex flex-col items-center justify-center py-10 text-muted-foreground">
      <h3 className="text-lg font-semibold mt-2">No Products Found</h3>
      <p className="text-sm mb-4">Inventory is empty, try adding new product</p>
      <Button
        onClick={handleAddProduct}
        className="bg-darkblue text-surface-100 hover:bg-lightblue"
      >
        Add New Product
      </Button>
    </div>
  );

  return (
    <div className="space-y-4 max-lg:bg-gray-100 max-md:overflow-hidden py-4">
      {/* Desktop View */}
      <div className="max-lg:hidden grid grid-cols-1 gap-4">
        <div className="px-4 grid grid-cols-7 text-center bg-gray-100 py-3 text-gray-500 font-semibold rounded gap-4 text-sm">
          <span>Items in Stock</span>
          <span>Category</span>
          <span>Stock</span>
          <span>Price</span>
          <span>Status</span>
          <span>Last Updated</span>
          <span>Actions</span>
        </div>

        {currentProducts.length === 0 ? (
          <EmptyState />
        ) : (
          currentProducts.map(
            ({
              id,
              category,
              stock_level,
              last_updated,
              price,
              product_name,
              stockStatus,
              statusClass,
            }) => (
              <Card key={id} className="p-2 border-0 shadow min-w-50">
                <CardContent className="px-0 py-0 text-center grid grid-cols-7 gap-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2 text-left">
                    <div className="h-5 w-5 bg-gray-200" />
                    {product_name}
                  </div>
                  <div className="flex-center">{category}</div>
                  <div className="flex-center">
                    {stock_level} {stock_level > 1 ? 'Units' : 'Unit'}
                  </div>
                  <div className="flex-center">{formatCurrency(price)}</div>
                  <div
                    className={cn('px-1 flex-center rounded-2xl', statusClass)}
                  >
                    {stockStatus}
                  </div>
                  <div className="flex-center px-2 ml-2">{last_updated}</div>
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/inventory/edit-product/${id}`}>
                      <Button className="bg-darkblue text-surface-100 hover:bg-lightblue text-xs px-4 py-2">
                        Restock
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        setSelectedProductId(id || null);
                        setDeleteModalOpen(true);
                      }}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-100 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ),
          )
        )}

        {selectedProduct && (
          <DeleteConfirmationModal
            productId={selectedProduct.id?.toString()}
            open={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
              setSelectedProductId(null);
            }}
            onConfirm={async () => {
              try {
                await deleteItem(String(selectedProductId));
              } catch (err) {
                console.error('Failed to delete item:', err);
              } finally {
                setDeleteModalOpen(false);
                setSelectedProductId(null);
              }
            }}
            productName={selectedProduct.product_name}
          />
        )}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col gap-4">
        {currentProducts.length === 0 ? (
          <EmptyState />
        ) : (
          currentProducts.map(
            ({ id, category, stock_level, price, product_name }) => (
              <Card key={id} className="p-4 bg-gray-100">
                <CardContent className="flex justify-between items-end p-0 gap-4">
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="text-gray-600 font-semibold text-base">
                      {product_name}
                    </h3>
                    <div className="text-gray-400">{category}</div>
                    <div className="text-[10px] font-bold py-0.5 px-2 rounded-lg bg-warning text-gray-800">
                      <div className="flex-center gap-2">
                        <div className="bg-red-600 h-1.5 w-1.5 rounded-full" />
                        {stock_level === 0
                          ? 'Zero Stock'
                          : stock_level <= 5
                          ? 'Low Stock'
                          : `${stock_level} - Units`}
                      </div>
                    </div>
                    <div className="text-gray-700 text-lg font-semibold">
                      {formatCurrency(price)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <Link href={`/inventory/edit-product/${id}`}>
                      <Button className="bg-darkblue text-surface-100 hover:bg-lightblue text-xs px-3">
                        Restock
                      </Button>
                    </Link>
                    <Button
                      onClick={async () => {
                        try {
                          await deleteItem(String(id));
                        } catch (err) {
                          console.error('Failed to delete item:', err);
                        }
                      }}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-100 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ),
          )
        )}

        {/* Floating Add Button */}
        <div className="fixed bottom-24 right-4 z-50 flex gap-2">
          {isOpen && (
            <Button
              onClick={handleAddProduct}
              className="bg-darkblue text-surface-100 hover:bg-lightblue text-xs shadow-lg"
            >
              Add New Product
            </Button>
          )}
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            variant="outline"
            className="bg-darkblue text-surface-100 hover:bg-lightblue shadow-lg"
          >
            <X />
          </Button>
        </div>
      </div>

      {/* Pagination */}
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
