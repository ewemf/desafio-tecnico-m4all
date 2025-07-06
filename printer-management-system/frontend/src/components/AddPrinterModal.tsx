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
      paperCapacity: 100,
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
    <DialogContent className="w-[95vw] max-w-[400px] max-h-[95dvh] overflow-y-auto rounded-lg">
      <DialogHeader className="px-4 pt-4">
        <DialogTitle className="text-lg">Adicionar Nova Impressora</DialogTitle>
        <DialogDescription className="text-sm">
          Preencha os dados abaixo.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 px-4 pb-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Nome<RequiredIndicator /></FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Epson EcoTank L3250" 
                    {...field} 
                    className="h-9 text-sm"
                  />
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
                <FormLabel className="text-sm">Modelo<RequiredIndicator /></FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: LaserJet Pro" 
                    {...field} 
                    className="h-9 text-sm"
                  />
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
                <FormLabel className="text-sm">Localização<RequiredIndicator/></FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Financeiro" 
                    {...field} 
                    className="h-9 text-sm"
                  />
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
                <FormLabel className="text-sm">Status Inicial <RequiredIndicator /></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='h-9 cursor-pointer text-sm'>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-sm">
                    <SelectItem className='cursor-pointer' value="ONLINE">Online</SelectItem>
                    <SelectItem className='cursor-pointer' value="OFFLINE">Offline</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="paperCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Capacidade de Papel<RequiredIndicator /></FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Ex: 85" 
                    {...field} 
                    className="h-9 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <DialogFooter className="pt-2">
            <Button 
              type="submit" 
              disabled={addPrinterMutation.isPending}
              className="h-9 cursor-pointer shadow-md text-sm"
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