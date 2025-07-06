'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { PrinterFormValues } from '@/schemas/printerSchema';

const updatePrinter = async ({ id, ...data }: { id: string } & PrinterFormValues) => {
  const response = await axios.put(`/api/printers/${id}`, data);
  return response.data;
};

export function useUpdatePrinter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePrinter,
    onSuccess: () => {
      toast.success("Impressora atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['printers', 'all'] });
    },
    onError: () => {
      toast.error("Falha ao atualizar a impressora.");
    },
  });
}