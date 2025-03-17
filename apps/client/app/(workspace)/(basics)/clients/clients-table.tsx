'use client'

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

import DeleteClientModal from './modals/DeleteClientModal'
import EditClientModal from './modals/EditClientModal'
import MainTable from '@/components/table/MainTable'
import { useGetAllCompaniesClientsQuery } from '@/lib/_services/basic/users-api'
import { User } from '@/schemas/basic/users/users.interface'

const UsersTable = () => {
   const session = useSession()

   const { data } = useGetAllCompaniesClientsQuery(
      { companies_id: session?.data?.user?.current_company_id },
      {
         skip: !session?.data?.user?.current_company_id,
      },
   )

   const tableData = useMemo(() => (Array.isArray(data?.clients) ? data?.clients : []), [data])
   const columns = useMemo<ColumnDef<User>[]>(
      () => [
         {
            header: 'Name',
            accessorKey: 'name',
         },
         {
            header: 'Email',
            accessorKey: 'email',
         },
         {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => {
               const client = row.original
               return (
                  <div className="flex justify-center gap-2">
                     <Link href={`?clientId=${client.id}`}>
                        <Pencil1Icon className="dark:text-gray-200 w-5 h-5" />
                     </Link>
                     <Link href={`?dId=${client.id}`}>
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

         <EditClientModal />
         <DeleteClientModal />
      </>
   )
}

export default UsersTable
