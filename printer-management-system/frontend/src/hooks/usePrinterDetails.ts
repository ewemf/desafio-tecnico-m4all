'use client';

import { useQuery } from '@tanstack/react-query';
//import axios from 'axios';
import apiClient from '@/lib/axios';

interface PrinterDetailsResponse {
  id: string;
  name: string;
  model: string;
  location: string;
  status: string;
  paperCapacity: number;
  createdAt: string;
}

const fetchPrinterDetails = async (printerId: string): Promise<PrinterDetailsResponse> => {
  const { data } = await apiClient.get(`/printers/${printerId}`);
  return data;
};

export function usePrinterDetails({ printerId, enabled }: { printerId: string; enabled: boolean }) {
  return useQuery<PrinterDetailsResponse, Error>({
    queryKey: ['printerDetails', printerId],
    queryFn: () => fetchPrinterDetails(printerId),
    enabled: enabled,
  });
}