'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import apiClient from '@/lib/axios';
import { PrinterFormValues } from '@/schemas/printerSchema';

const updatePrinter = async ({ id, ...data }: { id: string } & PrinterFormValues) => {
  const response = await apiClient.put(`/printers/${id}`, data);
  return response.data;
};

export function useUpdatePrinter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePrinter,
    onSuccess: (data, variables) => {
      toast.success("Impressora atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['printers'] });
      queryClient.invalidateQueries({ queryKey: ['printerDetails', variables.id] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Falha ao atualizar a impressora.";
      toast.error(errorMessage);
    },
  });
}