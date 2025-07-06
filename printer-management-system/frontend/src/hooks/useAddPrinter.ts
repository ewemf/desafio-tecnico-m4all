'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { PrinterFormValues } from '@/schemas/printerSchema';

const addPrinter = async (newPrinter: PrinterFormValues) => {
  const { data } = await axios.post('/api/printers', newPrinter);
  return data;
};

export function useAddPrinter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPrinter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['printers', 'all'] });
    },
    onError: (error: AxiosError) => {
      console.error("Erro ao adicionar impressora:", error.response?.data);
    }
  });
}