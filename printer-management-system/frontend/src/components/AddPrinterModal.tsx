'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddPrinter } from "@/hooks/useAddPrinter";
import { printerSchema, PrinterFormValues } from "@/schemas/printerSchema";

interface AddPrinterModalProps {
  onAdditionSuccess: () => void;
}

export function AddPrinterModal({ onAdditionSuccess }: AddPrinterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const addPrinterMutation = useAddPrinter();

  const form = useForm<PrinterFormValues>({
    resolver: zodResolver(printerSchema),
    defaultValues: {
      name: "",
      model: "",
      location: "",
      status: undefined,
    },
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

  const RequiredIndicator = () => <span className="text-destructive">*</span>;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer shadow-md'>Adicionar nova Impressora</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Impressora</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome<RequiredIndicator /></FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Epson EcoTank L3250" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo<RequiredIndicator /></FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: LaserJet Pro" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização<RequiredIndicator/></FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Financeiro" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Inicial <RequiredIndicator /></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='cursor-pointer'>
                        <SelectValue placeholder="Selecione um status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className='cursor-pointer' value="ONLINE">Online</SelectItem>
                      <SelectItem className='cursor-pointer' value="OFFLINE">Offline</SelectItem>
                      <SelectItem className='cursor-pointer' value="LOW_PAPER">Pouco Papel</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={addPrinterMutation.isPending}
                className="cursor-pointer shadow-md"
              >
                {addPrinterMutation.isPending ? "Salvando..." : "Salvar Impressora"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}