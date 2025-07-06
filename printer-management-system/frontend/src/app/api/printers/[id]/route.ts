import { NextResponse } from 'next/server';
import { mockPrinters } from '@/lib/mockData';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context;
  const { id: printerId } = params;

  const printer = mockPrinters.find(p => p.id === printerId);

  if (!printer) {
    return NextResponse.json({ message: 'Impressora não encontrada' }, { status: 404 });
  }
  
  return NextResponse.json(printer);
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context;
  const { id: printerId } = params;
  const updatedData = await request.json();

  const index = mockPrinters.findIndex(p => p.id === printerId);

  if (index === -1) {
    return NextResponse.json({ message: 'Impressora não encontrada' }, { status: 404 });
  }

  mockPrinters[index] = { ...mockPrinters[index], ...updatedData };
  return NextResponse.json(mockPrinters[index]);
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context;
  const { id: printerId } = params;
  
  const index = mockPrinters.findIndex(p => p.id === printerId);

  if (index === -1) {
    return NextResponse.json({ message: 'Impressora não encontrada' }, { status: 404 });
  }

  mockPrinters.splice(index, 1);
  return new NextResponse(null, { status: 204 });
}