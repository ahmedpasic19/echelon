import { api } from '..'

import { createClientSchema, updateClientSchema } from '@/schemas/basic/users/clients.schema'
import { User } from '@/schemas/basic/users/users.interface'
import { createUserSchema, updateUserSchema } from '@/schemas/basic/users/users.schema'

export const usersApi = api.injectEndpoints({
   endpoints: (builder) => ({
      createUser: builder.mutation<{ message: string }, { body: createUserSchema }>({
         query: ({ body }) => ({
            url: `/users`,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['User'],
      }),
      updateUser: builder.mutation<
         { message: string },
         { body: updateUserSchema | updateClientSchema }
      >({
         query: ({ body }) => ({
            url: `/users/${body.id}`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['User'],
      }),
      delteUser: builder.mutation<{ message: string }, { id: string }>({
         query: ({ id }) => ({
            url: `/users/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['User'],
      }),
      getAllUsers: builder.query<{ users: User[] }, void>({
         query: () => ({
            url: `/users`,
         }),
         providesTags: ['User'],
      }),
      getOneUser: builder.query<{ user: User }, { id: string }>({
         query: ({ id }) => ({
            url: `/users/${id}`,
         }),
         providesTags: ['User'],
      }),
      setCurrentCompany: builder.mutation<
         { user: User; message: string },
         { user_id: string; company_id: number }
      >({
         query: (body) => ({
            url: `/users/set-current-company`,
            method: 'PATCH',
            body,
         }),
         invalidatesTags: ['User'],
      }),
      removeCurrentCompany: builder.mutation<{ user: User; message: 'string' }, { id: string }>({
         query: ({ id }) => ({
            url: `/users/remove-current-company/${id}`,
            method: 'PATCH',
         }),
         invalidatesTags: ['User'],
      }),
      createClient: builder.mutation<{ message: string }, { body: createClientSchema }>({
         query: ({ body }) => ({
            url: `/users/create-client`,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['User'],
      }),
      getAllCompaniesClients: builder.query<{ clients: User[] }, { companies_id: number }>({
         query: ({ companies_id }) => ({
            url: `/users/companies-clients/${companies_id}`,
         }),
         providesTags: ['User'],
      }),
      getCompaniesClientsByName: builder.query<
         { clients: User[] },
         { companies_id: number; name: string }
      >({
         query: ({ companies_id, name }) => ({
            url: `/users/companies-clients/by-name/${companies_id}/${name}`,
         }),
         providesTags: ['User'],
      }),
   }),
})

export const {
   useCreateUserMutation,
   useUpdateUserMutation,
   useDelteUserMutation,
   useGetAllUsersQuery,
   useGetOneUserQuery,
   useSetCurrentCompanyMutation,
   useRemoveCurrentCompanyMutation,
   useCreateClientMutation,
   useGetAllCompaniesClientsQuery,
   useLazyGetCompaniesClientsByNameQuery,
} = usersApi
