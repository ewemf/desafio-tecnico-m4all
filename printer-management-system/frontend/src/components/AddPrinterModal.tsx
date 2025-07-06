'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAddPrinter } from "@/hooks/useAddPrinter";
import { printerSchema, PrinterFormValues } from "@/schemas/printerSchema";
import { PrinterForm } from "./PrinterForm";

interface AddPrinterModalProps {
  onAdditionSuccess: () => void;
}

export function AddPrinterModal({ onAdditionSuccess }: AddPrinterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const addPrinterMutation = useAddPrinter();

  const form = useForm<PrinterFormValues>({
    resolver: zodResolver(printerSchema),
    defaultValues: { name: "", model: "", location: "", status: undefined, paperCapacity: 100 },
  });

  async function onSubmit(values: PrinterFormValues) {
    addPrinterMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message || "Impressora adicionada com sucesso!");
        form.reset();
        setIsOpen(false);
        onAdditionSuccess();
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Ocorreu um erro.");
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='bg-lilas hover:bg-roxo-escuro cursor-pointer shadow-md'>Adicionar nova Impressora</Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[400px] max-h-[95dvh] overflow-y-auto rounded-lg">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="text-lg">Adicionar Nova Impressora</DialogTitle>
          <DialogDescription className="text-sm">
            Preencha os dados abaixo.
          </DialogDescription>
        </DialogHeader>
        <PrinterForm
          form={form}
          onSubmit={onSubmit}
          isPending={addPrinterMutation.isPending}
          submitButtonText="Salvar Impressora"
        />
      </DialogContent>
    </Dialog>
  );
}