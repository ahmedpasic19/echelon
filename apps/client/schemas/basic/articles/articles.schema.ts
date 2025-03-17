import { z } from 'zod'

export const createArticleSchema = z.object({
   name: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
   code: z.string().min(4, 'Minimum 4 characters').max(45, 'Maximum 45 characters'),
   price_without_vat: z.coerce.number().min(0, 'Value cant be negative'),
   price_with_vat: z.coerce.number().min(0, 'Value cant be negative'),
   companies_id: z.coerce.number().min(1, 'Must provide companiesId'),
})
export const articleId = z.object({ id: z.coerce.number().min(1, 'Must provide articleId') })
export const updateArticleSchema = createArticleSchema.merge(articleId)

export type createArticleSchema = z.infer<typeof createArticleSchema>
export type updateArticleSchema = z.infer<typeof updateArticleSchema>
