import { Company } from '../companies/companies.interface'

export interface Article {
   id: number
   name: string
   code: string
   price_without_vat: number
   price_with_vat: number
   company: Company
   companies_id: number
   created_at: string
   updated_at: string
}
