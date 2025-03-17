import { z } from 'zod'

export const createOfferSchema = z.object({
   date_of_order: z.string().min(1, 'Must provide date value').or(z.date()),
   delivery_due_date: z.string().min(1, 'Must provide date value').or(z.date()),
   payment_due_date: z.string().min(1, 'Must provide date value').or(z.date()),
   worker_id: z.string().min(1, 'Must provide userId as workerId'),
   client_id: z.string().min(1, 'Must provide userId as clientId'),
   currencies_id: z.coerce.number().min(1, 'Must provide currencyId'),
   companies_id: z.coerce.number().min(1, 'Must provide companyId'),
   vat: z.coerce.number().min(0, "Value can't be bellow 0").max(100, 'Max 100%'),
   client: z
      .object({
         id: z.number(),
         name: z.string(),
      })
      .optional(),
   currency: z
      .object({
         id: z.number(),
         name: z.string(),
      })
      .optional(),
})

export const updateOfferSchema = createOfferSchema.extend({
   id: z.coerce.number().min(1, 'Must provide offerId'),
   offer_number: z.string().min(1, 'Must provide offer_number'),
})

export type createOfferSchema = z.infer<typeof createOfferSchema>
export type updateOfferSchema = z.infer<typeof updateOfferSchema>
