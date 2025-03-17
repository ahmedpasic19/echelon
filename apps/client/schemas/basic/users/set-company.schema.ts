import { z } from 'zod'

export const setComanySchema = z.object({
   company_id: z.coerce.number().min(1, 'Must provide companyId'),
   user_id: z.string().min(1, 'Must provide userId'),
})

export type setComanySchema = z.infer<typeof setComanySchema>
