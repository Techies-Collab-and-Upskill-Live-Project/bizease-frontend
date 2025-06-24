import { InventoryItem } from '@/types';
import {
  fetchInventory,
  addInventoryItem as addItem,
  updateInventoryItem as updateItem,
  deleteInventoryItem as deleteItem,
  fetchInventoryItem as getItem,
} from '../user';

export const fetchInventoryClient = async () => await fetchInventory();

export const addInventoryItemClient = async (item: InventoryItem) =>
  await addItem(item);
export const updateInventoryItemClient = async (
  id: number,
  data: InventoryItem,
) => await updateItem(id, data);
export const deleteInventoryItemClient = async (id: number) =>
  await deleteItem(id);
export const fetchInventoryItemClient = async (id: number) => await getItem(id);
