import { z } from 'zod'

export const createUserSchema = z.object({
   name: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
   password: z.string().min(8, 'Minimum 8 characters').max(45, 'Maximum 45 characters'),
   email: z.string().email('Not valid email format'),
   companies: z.array(
      z.object({
         company_id: z.coerce.number().min(1, 'Must provide companyId'),
      }),
   ),
})
export const usersId = z.object({ id: z.string().min(1, 'Must provide usersId') })
export const updateUserSchema = createUserSchema.merge(usersId)

export type createUserSchema = z.infer<typeof createUserSchema>
export type updateUserSchema = z.infer<typeof updateUserSchema>
