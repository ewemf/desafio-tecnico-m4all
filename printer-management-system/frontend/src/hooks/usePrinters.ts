'use client';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';

export interface Printer {
  id: string;
  name: string;
  model: string;
  location: string;
  status: 'ONLINE' | 'OFFLINE';
  paperCapacity: number;
  createdAt: string;
}

const fetchPrinters = async (): Promise<Printer[]> => {
  const { data } = await apiClient.get('/printers');
  return data;
};

export function usePrinters() {
  return useQuery<Printer[], Error>({
    queryKey: ['printers'],
    queryFn: fetchPrinters,
  });
}