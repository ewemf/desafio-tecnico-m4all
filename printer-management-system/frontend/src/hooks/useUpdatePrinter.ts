'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import apiClient from '@/lib/axios';
import { PrinterFormValues } from '@/schemas/printerSchema';
import { Printer } from './usePrinters';

const updatePrinter = async ({ id, ...data }: { id: string } & PrinterFormValues) => {
  const response = await apiClient.put(`/printers/${id}`, data);
  return response.data;
};

export function useUpdatePrinter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePrinter,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['printers'] });
      const previousPrinters = queryClient.getQueryData<Printer[]>(['printers']);

      queryClient.setQueryData<Printer[]>(
        ['printers'],
        (old = []) => old.map(printer => {
          if (printer.id === newData.id) {
            return {
              ...printer,
              ...newData, 
            };
          }
          return printer;
        })
      );

      return { previousPrinters };
    },

    onError: (err, variables, context) => {
      if (context?.previousPrinters) {
        queryClient.setQueryData(['printers'], context.previousPrinters);
      }
      toast.error("Falha ao atualizar a impressora. A alteração foi desfeita.");
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['printers'] });
      if (variables.id) {
        queryClient.invalidateQueries({ queryKey: ['printerDetails', variables.id] });
      }
    },
    onSuccess: () => {
        toast.success("Impressora atualizada com sucesso!");
    }
  });
}