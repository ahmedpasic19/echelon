import { z } from 'zod'

export const userType = z.object({ type: z.enum(['USER', 'CLIENT']) })
export const createClientSchema = z
   .object({
      name: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
      email: z.string().email('Not valid email format'),
      current_company_id: z.coerce.number().min(1, 'Must provide companyId'),
   })
   .merge(userType)

export const clientsId = z.object({ id: z.string().min(1, 'Must provide clientsId') })
export const updateClientSchema = createClientSchema.merge(clientsId)

export type createClientSchema = z.infer<typeof createClientSchema>
export type updateClientSchema = z.infer<typeof updateClientSchema>
