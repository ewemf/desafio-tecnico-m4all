'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import { toast } from "sonner";
//import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUpdatePrinter } from "@/hooks/useUpdatePrinter";
import { printerSchema, PrinterFormValues } from "@/schemas/printerSchema";
import { PrinterForm } from "./PrinterForm";

interface Printer { id: string; name: string; model: string; location: string; status: string; paperCapacity: number; createdAt: string; }
interface EditPrinterModalProps {
  printer: Printer;
  children: React.ReactNode;
}

export function EditPrinterModal({ printer, children }: EditPrinterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const updatePrinterMutation = useUpdatePrinter();

  const form = useForm<PrinterFormValues>({
    resolver: zodResolver(printerSchema),
    defaultValues: {
      name: printer.name,
      model: printer.model,
      location: printer.location,
      status: printer.status as any,
      paperCapacity: printer.paperCapacity,
    },
  });

  async function onSubmit(values: PrinterFormValues) {
    updatePrinterMutation.mutate({ id: printer.id, ...values }, {
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
        <PrinterForm
          form={form}
          onSubmit={onSubmit}
          isPending={updatePrinterMutation.isPending}
          submitButtonText="Salvar Alterações"
        />
      </DialogContent>
    </Dialog>
  );
}