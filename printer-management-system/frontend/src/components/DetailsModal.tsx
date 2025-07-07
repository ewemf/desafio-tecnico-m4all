'use client';

import { useState } from 'react';
import { usePrinterStatus } from '@/hooks/usePrinterStatus';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from './ui/badge';
import { Printer } from '@/hooks/usePrinters';
import { Skeleton } from './ui/skeleton';

interface DetailsModalProps {
  printer: Printer;
  children: React.ReactNode;
}

export function DetailsModal({ printer, children }: DetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: statusData, isLoading } = usePrinterStatus(printer.id, isOpen);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ONLINE': return 'bg-green-500 hover:bg-green-600';
      case 'OFFLINE': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-400';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-black">{printer.name}</DialogTitle>
          <DialogDescription>Detalhes completos e status do equipamento.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-[120px_1fr] items-center gap-x-4 gap-y-3 text-sm">
            <span className="font-semibold text-right text-muted-foreground">Modelo</span>
            <span>{printer.model}</span>
            
            <span className="font-semibold text-right text-muted-foreground">Localização</span>
            <span>{printer.location}</span>

            <span className="font-semibold text-right text-muted-foreground">Status</span>
            {isLoading ? <Skeleton className="h-6 w-20" /> : <Badge className={getStatusColor(statusData?.status)}>{statusData?.status || 'Carregando...'}</Badge>}
            
            <span className="font-semibold text-right text-muted-foreground">Data de Criação</span>
            <span>{new Date(printer.createdAt).toLocaleDateString('pt-BR')}</span>

            <div className="col-span-2 space-y-2 pt-2">
              <div className="flex justify-between items-baseline">
                  <span className="font-semibold">Nível de Papel:</span>
                  {isLoading ? <Skeleton className="h-6 w-24" /> : <span className="font-mono text-lg">{statusData?.paperLevel ?? '...'} Papéis</span>}
              </div>
              {isLoading ? <Skeleton className="h-4 w-full" /> : <Progress value={statusData?.paperLevel || 0} />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}