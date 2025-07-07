'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUpdatePrinter } from "@/hooks/useUpdatePrinter";
import { usePrinterDetails } from "@/hooks/usePrinterDetails";
import { printerSchema, PrinterFormValues } from "@/schemas/printerSchema";
import { PrinterForm } from "./PrinterForm";
import { Skeleton } from "./ui/skeleton";

interface EditPrinterModalProps {
  printerId: string;
  children: React.ReactNode;
}

export function EditPrinterModal({ printerId, children }: EditPrinterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const updatePrinterMutation = useUpdatePrinter();
  
  const { data: printer, isLoading, isError } = usePrinterDetails(printerId, { enabled: isOpen });

  const form = useForm<PrinterFormValues>({
    resolver: zodResolver(printerSchema),
  });

  useEffect(() => {
    if (printer) {
      form.reset({
        name: printer.name,
        model: printer.model,
        location: printer.location,
        status: printer.status,
        paperCapacity: printer.paperCapacity,
      });
    }
  }, [printer, form]);

  async function onSubmit(values: PrinterFormValues) {
    updatePrinterMutation.mutate({ id: printerId, ...values }, {
      onSuccess: () => {
        setIsOpen(false);
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[400px] max-h-[95dvh] overflow-y-auto rounded-lg">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="text-lg">Editar Impressora</DialogTitle>
          <DialogDescription className="text-sm">
            Altere os dados abaixo e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="space-y-4 p-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : isError ? (
          <p className="p-4 text-center text-destructive">Falha ao carregar dados da impressora.</p>
        ) : (
          <PrinterForm
            form={form}
            onSubmit={onSubmit}
            isPending={updatePrinterMutation.isPending}
            submitButtonText="Salvar Alterações"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}