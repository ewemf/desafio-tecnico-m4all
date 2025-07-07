'use client';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/axios';

interface StatusReport {
  status: 'ONLINE' | 'OFFLINE';
  paperLevel: number;
}

const fetchPrinterStatus = async (printerId: string): Promise<StatusReport> => {
  const { data } = await apiClient.get(`/printers/${printerId}/status`);
  return data;
};

export function usePrinterStatus(printerId: string, enabled: boolean) {
  return useQuery<StatusReport, Error>({
    queryKey: ['printerStatus', printerId],
    queryFn: () => fetchPrinterStatus(printerId),
    enabled: enabled,
    refetchInterval: 5000,
  });
}