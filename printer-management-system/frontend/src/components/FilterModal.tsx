'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ListFilter } from 'lucide-react';

interface FilterModalProps {
  appliedFilters: {
    models: string[];
    locations: string[];
  };
  availableOptions: {
    models: string[];
    locations: string[];
  };
  onApply: (filters: { models: string[]; locations: string[] }) => void;
  onClear: () => void;
}

export function FilterModal({ appliedFilters, availableOptions, onApply, onClear }: FilterModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [tempSelectedModels, setTempSelectedModels] = useState<string[]>(appliedFilters.models);
  const [tempSelectedLocations, setTempSelectedLocations] = useState<string[]>(appliedFilters.locations);

  useEffect(() => {
    if (isOpen) {
      setTempSelectedModels(appliedFilters.models);
      setTempSelectedLocations(appliedFilters.locations);
    }
  }, [isOpen, appliedFilters]);

  const handleModelChange = (model: string) => {
    setTempSelectedModels(prev =>
      prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
    );
  };

  const handleLocationChange = (location: string) => {
    setTempSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const handleApply = () => {
    onApply({ models: tempSelectedModels, locations: tempSelectedLocations });
    setIsOpen(false);
  };

  const handleClear = () => {
    onClear();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className='cursor-pointer shadow-md'><ListFilter />Filtrar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filtrar Impressoras</DialogTitle>
          <DialogDescription>
            Selecione uma ou mais opções para filtragem.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-1">
          <div>
            <h4 className="font-semibold mb-2">Modelo</h4>
            <div className="space-y-2">
              {availableOptions.models.map(model => (
                <div key={model} className="flex items-center space-x-2">
                  <Checkbox
                    id={`model-${model}`}
                    checked={tempSelectedModels.includes(model)}
                    onCheckedChange={() => handleModelChange(model)}
                    className='cursor-pointer'
                  />
                  <Label className='cursor-pointer' htmlFor={`model-${model}`}>{model}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Localização</h4>
            <div className="space-y-2">
              {availableOptions.locations.map(location => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={tempSelectedLocations.includes(location)}
                    onCheckedChange={() => handleLocationChange(location)}
                    className='cursor-pointer'
                  />
                  <Label className='cursor-pointer' htmlFor={`location-${location}`}>{location}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" className='cursor-pointer' onClick={handleClear}>Limpar Filtros</Button>
          <Button onClick={handleApply} className='cursor-pointer bg-lilas hover:bg-roxo-escuro'>Aplicar Filtros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}