'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PrinterFormValues } from "@/schemas/printerSchema";

interface PrinterFormProps {
  form: UseFormReturn<PrinterFormValues>;
  onSubmit: (values: PrinterFormValues) => void;
  isPending: boolean;
  submitButtonText: string;
}

export function PrinterForm({ form, onSubmit, isPending, submitButtonText }: PrinterFormProps) {
  const RequiredIndicator = () => <span className="text-destructive">*</span>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 px-4 pb-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Nome<RequiredIndicator /></FormLabel>
              <FormControl>
                <Input placeholder="Ex: Epson EcoTank L3250" {...field} className="h-9 text-sm" />
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
                <Input placeholder="Ex: LaserJet Pro" {...field} className="h-9 text-sm" />
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
                <Input placeholder="Ex: Financeiro" {...field} className="h-9 text-sm" />
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
                <Input type="number" placeholder="Ex: 85" {...field} className="h-9 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <DialogFooter className="pt-2">
          <Button 
            type="submit" 
            disabled={isPending}
            className="h-9 cursor-pointer shadow-md text-sm"
          >
            {isPending ? "Salvando..." : submitButtonText}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}