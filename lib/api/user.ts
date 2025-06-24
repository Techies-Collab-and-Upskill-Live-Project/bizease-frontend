// REMOVE 'use server'; this is now usable both client/server depending on usage

import { InventoryItem } from '@/types';
import api from '../api';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchInventory = async (token: string) => {
  const res = await fetch(`${BASE_URL}/inventory/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch inventory');
  const json = await res.json();
  return json.data.products;
};

export const addInventoryItem = async (
  token: string,
  item: Omit<InventoryItem, 'id'>
) => {
  const res = await fetch(`${BASE_URL}/inventory/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify([item]),
  });

  if (!res.ok) throw new Error('Failed to add inventory item');
  return res.json();
};

export const updateInventoryItem = async (
  token: string,
  id: number,
  data: Partial<InventoryItem>
) => {
  const res = await fetch(`${BASE_URL}/inventory/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update inventory item');
  return res.json();
};

export const deleteInventoryItem = async (token: string, id: number) => {
  const res = await fetch(`${BASE_URL}/inventory/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete inventory item');
  return res.json();
};

export const fetchInventoryItem = async (id: number) => {
  const res = await api.get(`/inventory/${id}`);
  return res.data;
};
