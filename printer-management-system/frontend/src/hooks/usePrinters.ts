'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Printer {
  id: string;
  name: string;
  model: string;
  location: string;
  status: 'ONLINE' | 'OFFLINE';
}

export interface PrintersResponse {
  printers: any[];
}

const fetchPrinters = async (): Promise<PrintersResponse> => {
  const { data } = await axios.get('/api/printers');
  return data;
};

export function usePrinters() {
  return useQuery<PrintersResponse, Error>({
    queryKey: ['printers'],
    queryFn: fetchPrinters,
  });
}