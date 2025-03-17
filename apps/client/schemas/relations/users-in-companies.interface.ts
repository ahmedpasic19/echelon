import { Company } from '../basic/companies/companies.interface'
import { User } from '../basic/users/users.interface'

export interface UsersInCompanies {
   user: User
   user_id: number
   company: Company
   company_id: number
}
