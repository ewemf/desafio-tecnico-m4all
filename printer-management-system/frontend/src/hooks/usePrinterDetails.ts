'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import { Printer } from './usePrinters';

const fetchPrinterDetails = async (printerId: string): Promise<Printer> => {
  const { data } = await apiClient.get(`/printers/${printerId}`);
  return data;
};

export function usePrinterDetails(printerId: string, options: { enabled: boolean }) {
  return useQuery<Printer, Error>({
    queryKey: ['printerDetails', printerId],
    queryFn: () => fetchPrinterDetails(printerId),
    enabled: options.enabled,
  });
}