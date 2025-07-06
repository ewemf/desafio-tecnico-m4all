'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PrinterFormValues } from '@/schemas/printerSchema';

interface Printer {
  id: string;
  name: string;
  model: string;
  location: string;
  status: string;
  paperCapacity: number;
  createdAt: string;
}

interface AllPrintersResponse {
  printers: Printer[];
}

const addPrinter = async (newPrinter: PrinterFormValues) => {
  const { data } = await axios.post('/api/printers', newPrinter);
  return data;
};

export function useAddPrinter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPrinter,
    
    onMutate: async (newPrinter) => {
      await queryClient.cancelQueries({ queryKey: ['printers', 'all'] });

      const previousPrinters = queryClient.getQueryData<AllPrintersResponse>(['printers', 'all']);

      queryClient.setQueryData<AllPrintersResponse>(['printers', 'all'], (oldData) => {
        const optimisticPrinter = {
          ...newPrinter,
          id: `temp_${new Date().getTime()}`,
          createdAt: new Date().toISOString(),
        };
        
        if (!oldData) {
          return { printers: [optimisticPrinter] };
        }
        
        return {
          printers: [optimisticPrinter, ...oldData.printers],
        };
      });

      return { previousPrinters };
    },

    onError: (err, newPrinter, context) => {
      if (context?.previousPrinters) {
        queryClient.setQueryData(['printers', 'all'], context.previousPrinters);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['printers'] });
    },
  });
}