'use server';

import { cookies } from 'next/headers';
import { InventoryItem } from '@/types';
// import api from '../api';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInventory = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) throw new Error('No token found');

    const res = await fetch(`${BASE_URL}/inventory/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Fetch failed: ${msg}`);
    }

    const json = await res.json();
    return json.data.products;
  } catch (error) {
    console.error('[fetchInventory error]', error);
    return []; // return empty inventory to avoid crash
  }
};

export const addInventoryItem = async (item: Omit<InventoryItem, 'id'>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

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
  id: number,
  data: Partial<InventoryItem>,
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
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

export const deleteInventoryItem = async (id: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
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
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const res = await fetch(`${BASE_URL}/inventory/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch inventory item');

  return res.json();
};
