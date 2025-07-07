export interface Printer {
  id: number;
  name: string;
  model: string;
  location: string;
  status: "ONLINE" | "OFFLINE";
  paperCapacity: number;
  lastUpdated: string;
  createdAt: string; 
}

export interface PrinterStatus {
  status: string;
  paperCapacity: number;
  lastUpdated?: string;
}