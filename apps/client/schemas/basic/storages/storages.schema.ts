import z from 'zod'

export const createStorageSchema = z.object({
   name: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
   companies_id: z.coerce.number().min(1, 'Must provide companiesId'),
})
export const updateStorageSchema = z.object({
   id: z.coerce.number().min(1, 'Must provide storageId'),
   name: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
   companies_id: z.coerce.number().min(1, 'Must provide companiesId'),
})

export type createStorageSchema = z.infer<typeof createStorageSchema>
export type updateStorageSchema = z.infer<typeof updateStorageSchema>
