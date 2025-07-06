import { NextResponse } from "next/server";
import { mockPrinters } from "@/lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedPrinters = mockPrinters.slice(startIndex, endIndex);

  const totalPages = Math.ceil(mockPrinters.length / limit);

  console.log(`API Mock: Buscando página ${page} com ${limit} itens.`);

  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json({
    printers: paginatedPrinters,
    currentPage: page,
    totalPages: totalPages,
  });
}

//adicionar uma nova impressora temporária só p ver como ta ficando
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