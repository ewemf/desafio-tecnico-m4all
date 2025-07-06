import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Image from 'next/image';
import printerImg from "../../public/printer.png";
import { Trash, Pencil, Eye } from 'lucide-react';
import { StatusModal } from "./StatusModal";

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
  const statusInfo = statusMap[printer.status];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Image src={printerImg} width={50} height={150} alt="Imagem de Impressora"/>
        <CardTitle className="truncate">{printer.name}</CardTitle>
        <div className="text-sm font-semibold">
          Modelo: <Badge variant="secondary" className="text-white shadow-md">{printer.model}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm rounded-xs font-semibold border-l-4 pl-2 text-muted-foreground">Local: {printer.location}</p>
        <div className="flex items-center font-semibold gap-2 mt-4">
          Status: <Badge className={statusInfo.className}>{statusInfo.text}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-1.5 flex-wrap">

        <StatusModal printer={printer}>
          <Button variant="outline" className="cursor-pointer shadow-md font-semibold" size="sm"><Eye />Ver Status</Button>
        </StatusModal>

        <Button variant="outline" className="cursor-pointer shadow-md font-semibold" size="sm"><Pencil />Editar</Button>
        <Button variant="destructive" className="cursor-pointer shadow-md font-semibold" size="sm"><Trash />Excluir</Button>

      </CardFooter>
    </Card>

  );
}