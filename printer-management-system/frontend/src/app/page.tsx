'use client';

import { useState, useMemo, useEffect } from 'react';
import { PrinterCard } from "@/components/PrinterCard";
import { FilterModal } from "@/components/FilterModal";
import { usePrinters } from "@/hooks/usePrinters";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AddPrinterModal } from "@/components/AddPrinterModal";
import { Search, X } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
//import { Printer } from 'lucide-react';

export default function DashboardPage() {
  const [nameFilter, setNameFilter] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, isError, error } = usePrinters();

  const filteredPrinters = useMemo(() => {
    if (!data?.printers) return [];
    
    return data.printers.filter(printer => {
      const nameMatch = printer.name.toLowerCase().includes(nameFilter.toLowerCase());
      const modelMatch = selectedModels.length === 0 || selectedModels.includes(printer.model);
      const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(printer.location);
      return nameMatch && modelMatch && locationMatch;
    });
  }, [data, nameFilter, selectedModels, selectedLocations]);
  
  const totalPages = Math.ceil(filteredPrinters.length / itemsPerPage);
  const printersOnCurrentPage = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredPrinters.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPrinters, page]);

  useEffect(() => {
    setPage(1);
  }, [nameFilter, selectedModels, selectedLocations]);

  const handleApplyModalFilters = (filters: { models: string[]; locations: string[] }) => {
    setSelectedModels(filters.models);
    setSelectedLocations(filters.locations);
  };
  const handleClearModalFilters = () => {
    setSelectedModels([]);
    setSelectedLocations([]);
  };

  const availableOptions = useMemo(() => {
    if (!data?.printers) return { models: [], locations: [] };
    const models = new Set(data.printers.map(p => p.model));
    const locations = new Set(data.printers.map(p => p.location));
    return {
      models: Array.from(models),
      locations: Array.from(locations),
    };
  }, [data]);

  return (
    <main className="container mx-auto p-4 md:p-8">
        <div className="w-full md:w-auto flex justify-end pb-5">
          <AddPrinterModal onAdditionSuccess={() => setPage(1)} />
        </div>
      
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
            <AlertDescription>{error.message as string}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && printersOnCurrentPage.map((printer) => (
          <PrinterCard key={printer.id} {...printer} />
        ))}

        {!isLoading && filteredPrinters.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">Nenhuma impressora encontrada.</p>
        )}
      </div>

      {totalPages > 1 && (
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
              
              {Array.from({ length: totalPages }).map((_, index) => (
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
                  onClick={(e) => { e.preventDefault(); setPage(prev => Math.min(prev + 1, totalPages)); }}
                  className={page === totalPages ? "pointer-events-none text-muted-foreground" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  );
}