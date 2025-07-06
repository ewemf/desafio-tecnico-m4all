import { Printer } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-purpura-vivo text-white shadow-md rounded-b-3xl">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Printer className="h-12 w-10" />
          <h1 className="text-3xl font-bold tracking-tight">
            Sistema de Gestão de Impressoras
          </h1>
        </div>
      </div>
    </header>
  );
}