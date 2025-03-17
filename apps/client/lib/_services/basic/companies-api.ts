import { api } from '..'

import { Company } from '@/schemas/basic/companies/companies.interface'
import {
   createCopmanySchema,
   updateCopmanySchema,
} from '@/schemas/basic/companies/companies.schema'

export const companiesApi = api.injectEndpoints({
   endpoints: (builder) => ({
      createCompany: builder.mutation<{ message: string }, { body: createCopmanySchema }>({
         query: ({ body }) => ({
            url: `/companies`,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Company'],
      }),
      updateCompany: builder.mutation<{ message: string }, { body: updateCopmanySchema }>({
         query: ({ body }) => ({
            url: `/companies/${body.id}`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Company'],
      }),
      delteCompany: builder.mutation<{ message: string }, { id: number }>({
         query: ({ id }) => ({
            url: `/companies/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Company'],
      }),
      getAllCompanies: builder.query<{ companies: Company[] }, void>({
         query: () => ({
            url: `/companies`,
         }),
         providesTags: ['Company'],
      }),
      getAllUsersCompanies: builder.query<{ companies: Company[] }, { users_id: string }>({
         query: ({ users_id }) => ({
            url: `/companies/by-user/${users_id}`,
         }),
         providesTags: ['Company'],
      }),
      getOneCompany: builder.query<{ company: Company }, { id: number }>({
         query: ({ id }) => ({
            url: `/companies/${id}`,
         }),
         providesTags: ['Company'],
      }),
   }),
})

export const {
   useCreateCompanyMutation,
   useUpdateCompanyMutation,
   useDelteCompanyMutation,
   useGetAllCompaniesQuery,
   useGetOneCompanyQuery,
   useGetAllUsersCompaniesQuery,
} = companiesApi
