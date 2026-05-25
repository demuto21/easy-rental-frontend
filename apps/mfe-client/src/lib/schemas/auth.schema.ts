import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Adresse email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const registerClientSchema = loginSchema.extend({
    firstname: z.string().min(2, "Le prénom est trop court"),
    lastname: z.string().min(2, "Le nom est trop court"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterClientFormData = z.infer<typeof registerClientSchema>;
