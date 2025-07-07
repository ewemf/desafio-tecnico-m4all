'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import apiClient from '@/lib/axios';
import { PrinterFormValues } from '@/schemas/printerSchema';
import { Printer } from './usePrinters';

const addPrinter = async (newPrinter: PrinterFormValues): Promise<Printer> => {
  const { data } = await apiClient.post('/printers', newPrinter);
  return data;
};

export function useAddPrinter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPrinter,
    onMutate: async (newPrinter) => {
      await queryClient.cancelQueries({ queryKey: ['printers'] });

      const previousPrinters = queryClient.getQueryData<Printer[]>(['printers']);

      queryClient.setQueryData<Printer[]>(['printers'], (oldData = []) => {
        const optimisticPrinter: Printer = {
          ...newPrinter,
          id: `temp_${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        return [optimisticPrinter, ...oldData];
      });

      return { previousPrinters };
    },
    onError: (err, newPrinter, context) => {
      if (context?.previousPrinters) {
        queryClient.setQueryData(['printers'], context.previousPrinters);
      }
      toast.error("Falha ao adicionar a impressora.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['printers'] });
    },
  });
}