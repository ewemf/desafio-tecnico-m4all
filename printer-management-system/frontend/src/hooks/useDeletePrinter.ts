'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
//import axios from 'axios';
import { toast } from 'sonner';
import apiClient from '@/lib/axios';

const deletePrinter = async (printerId: string) => {
  await apiClient.delete(`/printers/${printerId}`);
};

export function useDeletePrinter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePrinter,
    onSuccess: () => {
      toast.success("Impressora excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['printers'] });
    },
    onError: () => {
      toast.error("Falha ao excluir a impressora.");
    },
  });
}