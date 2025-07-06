'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Image from 'next/image';
import printerImg from "../../public/printer.png";
import { Trash, Pencil, Eye } from 'lucide-react';
import { DetailsModal } from "./DetailsModal";
import { EditPrinterModal } from "./EditPrinterModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useDeletePrinter } from "@/hooks/useDeletePrinter";


interface PrinterCardProps {
  id: string;
  name: string;
  model: string;
  location: string;
  status: 'ONLINE' | 'OFFLINE';
  paperCapacity: number;
  createdAt: string;
}

const statusMap: Record<string, { text: string; className: string }> = {
  ONLINE: { text: "Online", className: "bg-green-500" },
  OFFLINE: { text: "Offline", className: "bg-red-500" },
};

export function PrinterCard(printer: PrinterCardProps) {
  const statusInfo = statusMap[printer.status] || { text: 'Desconhecido', className: 'bg-gray-400' };
  const deletePrinterMutation = useDeletePrinter();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Image src={printerImg} width={50} height={150} alt="Imagem de Impressora"/>
        <CardTitle className="truncate">{printer.name}</CardTitle>
        <div className="text-sm font-semibold">
          Modelo: <Badge variant="secondary" className="bg-roxo-escuro text-white shadow-md">{printer.model}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm rounded-xs font-semibold border-l-4 pl-2 text-muted-foreground">Local: {printer.location}</p>
        <div className="flex items-center font-semibold gap-2 mt-4">
          Status: <Badge className={statusInfo.className}>{statusInfo.text}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-1.5 flex-wrap">

        <DetailsModal printer={printer}>
          <Button variant="outline" className="cursor-pointer shadow-md font-semibold" size="sm"><Eye />Ver Status</Button>
        </DetailsModal>

        <EditPrinterModal printer={printer}>
          <Button variant="outline" className="cursor-pointer shadow-md font-semibold" size="sm"><Pencil />Editar</Button>
        </EditPrinterModal>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="cursor-pointer shadow-md font-semibold" size="sm"><Trash />Excluir</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente a impressora "{printer.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer shadow-md">Cancelar</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 cursor-pointer shadow-md hover:bg-red-500" onClick={() => deletePrinterMutation.mutate(printer.id)}>
                Confirmar Exclusão
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </CardFooter>
    </Card>

  );
}