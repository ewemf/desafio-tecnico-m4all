import { z } from 'zod';

export const printerSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  model: z.string().min(1, { message: "É obrigatório o modelo ser inserido." }),
  location: z.string().min(2, { message: "A localização é obrigatória." }),
  status: z.enum(['ONLINE', 'OFFLINE', 'LOW_PAPER'], {
    required_error: "Você precisa selecionar um status.",
  }),
});

export type PrinterFormValues = z.infer<typeof printerSchema>;