'use client'

import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import MainTable from '@/components/table/MainTable'
import { useGetAllOfferArticlesQuery } from '@/lib/_services/sales/offer-articles-api'
import { OfferArticle } from '@/schemas/sales/offer-articles/offer-article.interface'
import { round } from '@/utils/common'

type TProps = {
   offerId: number
}

const OfferArticleTable = ({ offerId }: TProps) => {
   const { data } = useGetAllOfferArticlesQuery({ offer_id: offerId })

   const tableData = useMemo(
      () => (Array.isArray(data?.offer_articles) ? data?.offer_articles : []),
      [data],
   )
   const columns = useMemo<ColumnDef<OfferArticle>[]>(
      () => [
         {
            header: 'Code',
            accessorKey: 'code',
         },
         {
            header: 'Name',
            accessorKey: 'name',
         },
         {
            header: 'Base price',
            accessorKey: 'base_price',
         },
         {
            header: 'Amount',
            accessorKey: 'amount',
         },
         {
            header: 'Discount (%)',
            accessorKey: 'discount',
         },
         {
            header: 'Discount value',
            accessorKey: 'discount_value',
            cell: ({ row }) => round(row.original.discount_value, 2),
         },
         {
            header: 'Vat (%)',
            accessorKey: 'vat',
         },
         {
            header: 'Vat value',
            accessorKey: 'vat_value',
            cell: ({ row }) => round(row.original.vat_value, 2),
         },
         {
            header: 'Total',
            accessorKey: 'selling_price_with_vat',
            cell: ({ row }) => round(row.original.selling_price_with_vat, 2),
         },
      ],
      [],
   )
   return (
      <div className="w-full">
         <MainTable columns={columns} data={tableData} />
      </div>
   )
}

export default OfferArticleTable
