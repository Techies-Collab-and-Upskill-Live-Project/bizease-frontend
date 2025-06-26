import { InventoryItem } from '@/types';
import {
  fetchInventory,
  addInventoryItem as addItem,
  updateInventoryItem as updateItem,
  deleteInventoryItem as deleteItem,
  fetchInventoryItem as getItem,
} from '../user';

export const fetchInventoryClient = async (token: string) =>
  await fetchInventory(token);

export const addInventoryItemClient = async (
  token: string,
  item: InventoryItem,
) => await addItem(token, item);

export const updateInventoryItemClient = async (
  id: number,
  data: InventoryItem,
  token: string,
) => await updateItem(token, id, data);

export const deleteInventoryItemClient = async (token: string, id: number) =>
  await deleteItem(token, id);
export const fetchInventoryItemClient = async (id: number) => await getItem(id);
