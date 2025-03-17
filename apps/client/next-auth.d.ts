import NextAuth from 'next-auth'

declare module 'next-auth' {
   interface Session {
      user: {
         id: string
         current_company_id: number
      } & DefaultSession['user']
   }
}
