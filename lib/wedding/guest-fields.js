import {z} from 'zod';
// Missing field preserves older clients; an empty value clears a previous assignment.
export const tableNumberSchema=z.union([z.string(),z.number().int()]).transform(String).pipe(z.string().trim().regex(/^(?:[1-9]\d{0,5})?$/,'Ingresa un número de mesa entre 1 y 999999, o déjalo vacío.')).optional();
