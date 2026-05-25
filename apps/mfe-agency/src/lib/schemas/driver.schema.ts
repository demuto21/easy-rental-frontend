import { z } from 'zod';

export const driverSchema = z.object({
    firstname: z.string().min(2, "Prénom requis (min 2 caractères)"),
    lastname: z.string().min(2, "Nom requis (min 2 caractères)"),
    tel: z.string().min(8, "Téléphone invalide"),
    age: z.coerce.number().min(18, "Doit être majeur"),
    gender: z.coerce.number(),
});

export type DriverFormData = z.infer<typeof driverSchema>;
