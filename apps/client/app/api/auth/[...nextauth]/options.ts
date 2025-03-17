import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

import type { AuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { env as clientEnv } from '@/env/client.mjs'
import { env } from '@/env/server.mjs'
import { serverEnv } from '@/env/schema.mjs'

const db = new PrismaClient()

export const options: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'jhondoe' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-expect-error // credentials type
      async authorize(credentials) {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
          username: credentials?.name,
          password: credentials?.password,
        })

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        }

        console.log('REQUEST', requestOptions)

        const res = await fetch(
          `${serverEnv.NEXTAUTH_URL}/api/auth/login`,
          requestOptions
        )

        console.log('RPONSE', res)

        if (res.ok) {
          const response = (await res.json()) as
            | { user: User; access_token: string }
            | undefined

          // check if user exists
          if (response?.user && response?.access_token) {
            return { ...response.user, access_token: response.access_token }
          }
        } else {
          // Return null if login fails
          return null
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      // get user companies
      const userCompanies = await db.users_in_companies.findMany({
        where: { user_id: token.sub },
        include: {
          companies: true,
        },
      })

      // GET logged in user
      const oneUser = await db.users.findUnique({
        where: { id: token.sub },
      })

      if (session?.user) {
        session.user.id = token.sub
        session.user.companies = userCompanies.map((item) => item.companies)
        session.user.current_company_id = oneUser?.current_company_id
      }

      return session
    },
    redirect: () => {
      return '/company-select'
    },
    jwt: async ({ token }) => {
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === 'development',
}
