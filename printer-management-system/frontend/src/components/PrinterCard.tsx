import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Image from 'next/image';
import printerImg from "../../public/printer.png";
import { Trash, Pencil, Eye } from 'lucide-react';

type PrinterStatus = 'ONLINE' | 'OFFLINE' | 'LOW_PAPER';
interface PrinterCardProps {
  name: string;
  model: string;
  location: string;
  status: PrinterStatus;
}

const statusMap: Record<PrinterStatus, { text: string; className: string }> = {
  ONLINE: { text: "Online", className: "bg-green-500" },
  OFFLINE: { text: "Offline", className: "bg-red-500" },
  LOW_PAPER: { text: "Pouco Papel", className: "bg-yellow-500 text-black" },
};

export function PrinterCard({ name, model, location, status }: PrinterCardProps) {
  const statusInfo = statusMap[status];
  return (
    <Card>
      <CardHeader>
        <Image src={printerImg} width={50} height={150} alt="Imagem de Impressora"/>
        <CardTitle className="truncate">{name}</CardTitle>
        <div className="text-sm font-semibold">
          Modelo: <Badge variant="secondary" className="text-white shadow-md">{model}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm rounded-xs font-semibold border-l-4 pl-2 text-muted-foreground">Local: {location}</p>
        <div className="flex items-center font-semibold gap-2 mt-4">
          Status: <Badge className={statusInfo.className}>{statusInfo.text}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-1.5 flex-wrap">
        <Button variant="outline" className="cursor-pointer shadow-md font-semibold" size="sm"><Eye />Ver Status</Button>
        <Button variant="outline" className="cursor-pointer shadow-md font-semibold" size="sm"><Pencil />Editar</Button>
        <Button variant="destructive" className="cursor-pointer shadow-md font-semibold" size="sm"><Trash />Excluir</Button>
      </CardFooter>
    </Card>
  );
}