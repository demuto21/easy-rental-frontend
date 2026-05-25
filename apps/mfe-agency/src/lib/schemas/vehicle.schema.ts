import { z } from 'zod';

export const vehicleSchema = z.object({
    brand: z.string().min(2, "Marque obligatoire (min 2 caractères)"),
    model: z.string().min(2, "Modèle obligatoire (min 2 caractères)"),
    licencePlate: z.string().min(4, "Immatriculation obligatoire (min 4 caractères)"),
    vinNumber: z.string().min(10, "VIN obligatoire (min 10 caractères)").optional().or(z.literal('')),
    color: z.string().min(2, "Couleur obligatoire").optional().or(z.literal('')),
    yearProduction: z.string().min(4, "Année obligatoire"),
    categoryId: z.string().min(1, "Catégorie requise"),
    statut: z.string(), // "AVAILABLE" | "MAINTENANCE"

    engineDetails: z.object({
        type: z.string().optional(),
        horsepower: z.coerce.number().min(0).optional(),
        capacity: z.coerce.number().min(0).optional(),
    }),
    transmission: z.string(), // "MANUAL" | "AUTOMATIC"
    places: z.coerce.number().min(1, "Nombre de places invalide").max(100),
    kilometrage: z.coerce.number().min(0),

    fuelEfficiency: z.object({
        city: z.string().optional(),
        highway: z.string().optional(),
    }),

    functionalities: z.record(z.string(), z.boolean()),
    images: z.array(z.string()),

    insuranceDetails: z.object({
        provider: z.string().optional(),
        policy_number: z.string().optional(),
        expiry: z.string().optional().or(z.literal('')),
    }),

    agencyId: z.string().optional().nullable(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
