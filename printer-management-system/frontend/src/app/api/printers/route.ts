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