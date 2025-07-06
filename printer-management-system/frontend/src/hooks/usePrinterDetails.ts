'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
  const { data } = await axios.get(`/api/printers/${printerId}`);
  return data;
};

export function usePrinterDetails({ printerId, enabled }: { printerId: string; enabled: boolean }) {
  return useQuery<PrinterDetailsResponse, Error>({
    queryKey: ['printerDetails', printerId],
    queryFn: () => fetchPrinterDetails(printerId),
    enabled: enabled,
  });
}