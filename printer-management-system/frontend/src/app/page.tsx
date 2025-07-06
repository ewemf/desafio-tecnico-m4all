'use client';

import { useState, useMemo } from 'react';
import { PrinterCard } from "@/components/PrinterCard";
import { FilterModal } from "@/components/FilterModal";
import { usePrinters } from "@/hooks/usePrinters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function DashboardPage() {
  const [nameFilter, setNameFilter] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = usePrinters({ page });

  const availableOptions = useMemo(() => {
    if (!data?.printers) {
      return { models: [], locations: [] };
    }
    const models = new Set(data.printers.map(p => p.model));
    const locations = new Set(data.printers.map(p => p.location));
    return {
      models: Array.from(models),
      locations: Array.from(locations),
    };
  }, [data]);

  const filteredPrinters = useMemo(() => {
    if (!data?.printers) {
      return [];
    }
    
    return data.printers.filter(printer => {
      const nameMatch = printer.name.toLowerCase().includes(nameFilter.toLowerCase());
      const modelMatch = selectedModels.length === 0 || selectedModels.includes(printer.model);
      const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(printer.location);
      
      return nameMatch && modelMatch && locationMatch;
    });
  }, [data, nameFilter, selectedModels, selectedLocations]);

  const handleApplyModalFilters = (filters: { models: string[]; locations: string[] }) => {
    setSelectedModels(filters.models);
    setSelectedLocations(filters.locations);
  };

  const handleClearModalFilters = () => {
    setSelectedModels([]);
    setSelectedLocations([]);
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Gestão de Impressoras</h1>
        <div className="flex gap-2">
            <Button className='cursor-pointer shadow-md'>Adicionar nova Impressora</Button>
        </div>
      </header>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="pl-10 pr-8" 
          />
          {nameFilter && (
            <X
              className="absolute top-1/2 right-2.5 -translate-y-1/2 h-5 w-5 text-muted-foreground cursor-pointer"
              onClick={() => setNameFilter('')}
            />
          )}
        </div>
        <FilterModal
            appliedFilters={{ models: selectedModels, locations: selectedLocations }}
            availableOptions={availableOptions}
            onApply={handleApplyModalFilters}
            onClear={handleClearModalFilters}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading && Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-56" />)}
        
        {isError && (
          <Alert variant="destructive" className="col-span-full">
            <AlertTitle>Erro!</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && filteredPrinters.map((printer) => (
          <PrinterCard key={printer.id} {...printer} />
        ))}

        {!isLoading && filteredPrinters.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">Nenhuma impressora encontrada com os filtros selecionados.</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); setPage(prev => Math.max(prev - 1, 1)); }}
                className={page === 1 ? "pointer-events-none text-muted-foreground" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: data?.totalPages || 0 }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink 
                  href="#"
                  onClick={(e) => { e.preventDefault(); setPage(index + 1); }}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); setPage(prev => Math.min(prev + 1, data?.totalPages || 1)); }}
                className={page === data?.totalPages ? "pointer-events-none text-muted-foreground" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}


/*
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
*/