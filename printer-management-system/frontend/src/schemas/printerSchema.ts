import { z } from 'zod';

export const printerSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  model: z.string().min(1, { message: "É obrigatório o modelo ser inserido." }),
  location: z.string().min(2, { message: "A localização é obrigatória." }),
  status: z.enum(['ONLINE', 'OFFLINE'], {
    required_error: "Você precisa selecionar um status.",
  }),
  paperCapacity: z.coerce
    .number({ invalid_type_error: "Deve ser um número." })
    .min(0, { message: "A capacidade não pode ser negativa." }),
  
  createdAt: z.string().datetime().optional(),
});

export type PrinterFormValues = z.infer<typeof printerSchema>;