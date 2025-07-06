'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Printer {
  id: string;
  name: string;
  model: string;
  location: string;
  status: 'ONLINE' | 'OFFLINE' | 'LOW_PAPER';
}

export interface PrintersResponse {
  printers: Printer[];
  totalPages: number;
  currentPage: number;
}

const fetchPrinters = async (page: number): Promise<PrintersResponse> => {
  const { data } = await axios.get('/api/printers', {
    params: {
      page: page,
      limit: 10
    }
  });
  return data;
};

export function usePrinters({ page }: { page: number }) {
  return useQuery<PrintersResponse, Error>({
    queryKey: ['printers', page],
    queryFn: () => fetchPrinters(page),
  });
}