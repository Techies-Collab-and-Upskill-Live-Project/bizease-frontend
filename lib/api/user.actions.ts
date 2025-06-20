'use server';

import { InventoryItem } from '@/types';
import api from '../api';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllInventoryItems = async () => {
  const res = await api.get('/inventory'); // no ID
  return res.data; // Assuming the API returns an array of inventory items
};

export const fetchInventoryItemById = async (id: number) => {
  const res = await api.get(`/inventory/${id}`);
  if (!res) throw new Error('Failed to fetch inventory item');
  return res.data; // Assuming the API returns a single inventory item
};

export const createInventoryItem = async (data: InventoryItem) => {
  const res = await fetch(`${BASE_URL}/inventory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create inventory item');
  return res.json();
};
export const updateInventoryItem = async (id: number, data: InventoryItem) => {
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
