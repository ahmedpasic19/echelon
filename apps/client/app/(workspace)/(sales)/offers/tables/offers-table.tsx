'use client'

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

import DeleteOfferModal from '../modals/DeleteOfferModal'

import MainTable from '@/components/table/MainTable'
import { useGetAllCompaniesOffersQuery } from '@/lib/_services/sales/offers-api'
import { Offer } from '@/schemas/sales/offers/offer.interface'
import { format, round } from '@/utils/common'

const OffersTable = () => {
   const session = useSession()
   const { data } = useGetAllCompaniesOffersQuery(
      { id: session?.data?.user?.current_company_id },
      {
         skip: !session?.data?.user?.current_company_id,
      },
   )

   const tableData = useMemo(
      () => (data?.offers && Array.isArray(data?.offers) ? data?.offers : []),
      [data],
   )
   const columns = useMemo<ColumnDef<Offer>[]>(
      () => [
         {
            header: 'Offer number',
            accessorKey: 'offer_number',
         },
         {
            header: 'Client',
            accessorKey: 'client.name',
         },
         {
            header: 'Date',
            accessorKey: 'date_of_order',
            cell: ({ row }) => format(new Date(row.original.date_of_order), 'dd.MM.yyyy'),
         },
         {
            header: 'Payment',
            accessorKey: 'payment_due_date',
            cell: ({ row }) => format(new Date(row.original.payment_due_date), 'dd.MM.yyyy'),
         },
         {
            header: 'Delivery',
            accessorKey: 'delivery_due_date',
            cell: ({ row }) => format(new Date(row.original.delivery_due_date), 'dd.MM.yyyy'),
         },
         {
            header: 'Total',
            accessorKey: 'offer_total',
            cell: ({ row }) => round(row.original.offer_total, 2),
         },
         {
            header: 'User',
            accessorKey: 'worker.name',
         },
         {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => {
               const offer = row.original
               return (
                  <div className="flex justify-center gap-2">
                     <Link href={`/offers/${offer.id}/edit`}>
                        <Pencil1Icon className="dark:text-gray-200 w-5 h-5" />
                     </Link>
                     <Link href={`?dId=${offer.id}`}>
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

         <DeleteOfferModal />
      </>
   )
}

export default OffersTable
