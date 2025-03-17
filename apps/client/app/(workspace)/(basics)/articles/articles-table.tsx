'use client'

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

import DeleteArticleModal from './modals/DeleteArticleModal'
import EditArticleModal from './modals/EditArticleModal'
import MainTable from '@/components/table/MainTable'
import { useGetAllArticlesQuery } from '@/lib/_services/basic/articles-api'
import { Article } from '@/schemas/basic/articles/articles.interface'

const ArticlesTable = () => {
   const session = useSession()

   const { data } = useGetAllArticlesQuery(
      {
         companies_id: session?.data?.user.current_company_id,
      },
      {
         skip: !session?.data?.user.current_company_id,
      },
   )

   const tableData = useMemo(() => (Array.isArray(data?.articles) ? data?.articles : []), [data])
   const columns = useMemo<ColumnDef<Article>[]>(
      () => [
         {
            header: 'Name',
            accessorKey: 'name',
         },
         {
            header: 'Code',
            accessorKey: 'code',
         },
         {
            header: 'Price without VAT',
            accessorKey: 'price_without_vat',
         },
         {
            header: 'Price with VAT',
            accessorKey: 'price_with_vat',
         },
         {
            header: 'Company',
            accessorKey: 'company.name',
         },
         {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => {
               const article = row.original
               return (
                  <div className="flex justify-center gap-2">
                     <Link href={`?articleId=${article.id}`}>
                        <Pencil1Icon className="dark:text-gray-200 w-5 h-5" />
                     </Link>
                     <Link href={`?dId=${article.id}`}>
                        <TrashIcon className="dark:text-gray-200 w-5 h-5" />
                     </Link>
                  </div>
               )
            },
         },
      ],
      [],
   )

   return (
      <>
         <MainTable data={tableData} columns={columns} showNavigation />

         <EditArticleModal />
         <DeleteArticleModal />
      </>
   )
}

export default ArticlesTable
