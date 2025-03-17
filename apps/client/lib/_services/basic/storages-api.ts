import { api } from '..'

import { Storage } from '@/schemas/basic/storages/storages.interface'
import { createStorageSchema, updateStorageSchema } from '@/schemas/basic/storages/storages.schema'

export const storagesAp = api.injectEndpoints({
   endpoints: (builder) => ({
      createStorage: builder.mutation<
         { message: string; storage: Storage },
         { body: createStorageSchema }
      >({
         query: ({ body }) => ({
            url: `/storages`,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Storage'],
      }),
      updateStorage: builder.mutation<
         { message: string; storage: Storage },
         { body: updateStorageSchema }
      >({
         query: ({ body }) => ({
            url: `/storages/${body.id}`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Storage'],
      }),
      delteStorage: builder.mutation<{ message: string; storage: Storage }, { id: number }>({
         query: ({ id }) => ({
            url: `/storages/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Storage'],
      }),
      getAllCompaniesStorages: builder.query<{ storages: Storage[] }, { companies_id: number }>({
         query: ({ companies_id }) => ({
            url: `/storages/by-company/${companies_id}`,
         }),
         providesTags: ['Storage'],
      }),
      getOneStorage: builder.query<{ storage: Storage }, { id: number }>({
         query: ({ id }) => ({
            url: `/storages/${id}`,
         }),
         providesTags: ['Storage'],
      }),
   }),
})

export const {
   useCreateStorageMutation,
   useUpdateStorageMutation,
   useDelteStorageMutation,
   useGetAllCompaniesStoragesQuery,
   useGetOneStorageQuery,
} = storagesAp
