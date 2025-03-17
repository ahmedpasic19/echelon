import { Currency } from '../currencies/currencies.interface'
import { OfferArticle } from '../offer-articles/offer-article.interface'

import { Company } from '@/schemas/basic/companies/companies.interface'
import { User } from '@/schemas/basic/users/users.interface'

export interface Offer {
   id: number
   offer_number: string
   offer_total: number
   vat: number
   vat_value: number
   total_discount: number
   date_of_order: Date
   delivery_due_date: Date
   payment_due_date: Date
   valid: boolean
   companies_id: number
   client_id: string
   currencies_id: number
   worker_id: string
   createdAt: string | Date
   updatedAt: string | Date
   offer_articles: OfferArticle[]
   users: User
   companies: Company
   currencies: Currency
}
