'use client';

//import { useState } from 'react';
//import { usePrinterStatus } from '@/hooks/usePrinterStatus';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
//import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';

interface Printer {
  id: string;
  name: string;
  model: string;
  location: string;
  status: string;
  paperCapacity: number;
  createdAt: string;
}

interface StatusModalProps {
  printer: Printer;
  children: React.ReactNode;
}

export function StatusModal({ printer, children }: StatusModalProps) {


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE': return 'bg-green-500';
      case 'OFFLINE': return 'bg-red-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-black">{printer.name}</DialogTitle>
          <DialogDescription>Detalhes completos do equipamento.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-[120px_1fr] items-center gap-x-4 gap-y-3 text-sm">
            <span className="font-semibold text-right text-muted-foreground">Modelo</span>
            <span>{printer.model}</span>
            
            <span className="font-semibold text-right text-muted-foreground">Localização</span>
            <span>{printer.location}</span>

            <span className="font-semibold text-right text-muted-foreground">Status</span>
            <Badge className={getStatusColor(printer.status)}>{printer.status}</Badge>
            
            <span className="font-semibold text-right text-muted-foreground">Data de Criação</span>
            <span>{new Date(printer.createdAt).toLocaleDateString('pt-BR')}</span>

            <div className="col-span-2 space-y-2 pt-2">
              <div className="flex justify-between items-baseline">
                  <span className="font-semibold">Capacidade Papel:</span>
                  <span className="font-mono text-lg">{printer.paperCapacity} Papéis</span>
              </div>
              <Progress value={printer.paperCapacity} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}