import { NextResponse } from "next/server";
import { mockPrinters } from "@/lib/mockData";

export async function GET(request: Request) {
  return NextResponse.json({
    printers: mockPrinters,
  });
}

export async function POST(request: Request) {
  try {
    const newPrinterData = await request.json();

    if (!newPrinterData.name || !newPrinterData.model) {
      return NextResponse.json({ message: "Nome e modelo são obrigatórios." }, { status: 400 });
    }

    const newPrinter = {
      id: `printer_${new Date().getTime()}`,
      ...newPrinterData,
      createdAt: new Date().toISOString(),
    };


    mockPrinters.unshift(newPrinter);

    console.log("API Mock: Nova impressora adicionada.", newPrinter);
    
    return NextResponse.json({ message: "Impressora adicionada com sucesso!", printer: newPrinter }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao processar a requisição." }, { status: 500 });
  }
}