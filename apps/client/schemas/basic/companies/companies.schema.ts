import z from 'zod'

export const createCopmanySchema = z.object({
   name: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
})
export const updateCopmanySchema = z.object({
   id: z.coerce.number().min(1, 'Must provide companiesId'),
   name: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
})

export type createCopmanySchema = z.infer<typeof createCopmanySchema>
export type updateCopmanySchema = z.infer<typeof updateCopmanySchema>
