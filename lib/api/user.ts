'use server';

import { InventoryItem } from '@/types';
import api from '../api';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInventory = async () => {
  const res = await fetch(`${BASE_URL}/inventory/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch inventory');
  const json = await res.json();
  return json.data.products;
};

export const addInventoryItem = async (item: Omit<InventoryItem, 'id'>) => {
  const res = await fetch(`${BASE_URL}/inventory/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify([item]),
  });

  if (!res.ok) throw new Error('Failed to add inventory item');
  return res.json();
};

export const updateInventoryItem = async (
  id: number,
  data: Partial<InventoryItem>,
) => {
  const res = await fetch(`${BASE_URL}/inventory/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update inventory item');
  return res.json();
};

export const deleteInventoryItem = async (id: number) => {
  const res = await fetch(`${BASE_URL}/inventory/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete inventory item');
  return res.json();
};

export const fetchInventoryItem = async (id: number) => {
  const res = await api.get(`/inventory/${id}`);
  return res.data;
};
