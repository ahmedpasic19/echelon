import { Company } from '../companies/companies.interface'

export interface Storage {
   id: number
   name: string
   company: Company
   companies_id: number
}
