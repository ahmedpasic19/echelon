import { User } from 'next-auth'

import { UsersInCompanies } from '@/schemas/relations/users-in-companies.interface'

export interface Company {
   id: number
   name: string
   users: User[]
   users_in_companies: UsersInCompanies[]
}
