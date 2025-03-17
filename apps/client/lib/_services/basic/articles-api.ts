import { api } from '..'

import { Article } from '@/schemas/basic/articles/articles.interface'
import { createArticleSchema, updateArticleSchema } from '@/schemas/basic/articles/articles.schema'

export const articlesApi = api.injectEndpoints({
   endpoints: (builder) => ({
      createArticle: builder.mutation<{ message: string }, { body: createArticleSchema }>({
         query: ({ body }) => ({
            url: `/articles`,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Article'],
      }),
      updateArticle: builder.mutation<{ message: string }, { body: updateArticleSchema }>({
         query: ({ body }) => ({
            url: `/articles/${body.id}`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Article'],
      }),
      delteArticle: builder.mutation<{ message: string }, { id: number }>({
         query: ({ id }) => ({
            url: `/articles/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Article'],
      }),
      getAllArticles: builder.query<{ articles: Article[] }, { companies_id: number }>({
         query: ({ companies_id }) => ({
            url: `/articles/by-company/${companies_id}`,
         }),
         providesTags: ['Article'],
      }),
      getOneArticle: builder.query<{ article: Article }, { id: number }>({
         query: ({ id }) => ({
            url: `/articles/${id}`,
         }),
         providesTags: ['Article'],
      }),
      getArticlesByName: builder.query<
         { articles: Article[] },
         { companies_id: number; name: string }
      >({
         query: ({ name, companies_id }) => ({
            url: `/articles/by-name/${companies_id}/${name}`,
         }),
         providesTags: ['Article'],
      }),
   }),
})

export const {
   useCreateArticleMutation,
   useUpdateArticleMutation,
   useDelteArticleMutation,
   useGetOneArticleQuery,
   useGetAllArticlesQuery,
   useLazyGetArticlesByNameQuery,
} = articlesApi
