import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Adresse email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const registerOrgSchema = loginSchema.extend({
    name: z.string().min(2, "Le nom de l'organisation est trop court"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterOrgFormData = z.infer<typeof registerOrgSchema>;
