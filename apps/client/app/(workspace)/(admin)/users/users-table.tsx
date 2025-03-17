'use client'

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import Link from 'next/link'

import DeleteUserModal from './modals/DeleteUserModal'
import EditUserModal from './modals/EditUserModal'
import MainTable from '@/components/table/MainTable'
import { useGetAllUsersQuery } from '@/lib/_services/basic/users-api'
import { User } from '@/schemas/basic/users/users.interface'

const UsersTable = () => {
   const { data } = useGetAllUsersQuery()

   const tableData = useMemo(() => (Array.isArray(data?.users) ? data?.users : []), [data])
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
               const company = row.original
               return (
                  <div className="flex justify-center gap-2">
                     <Link href={`?userId=${company.id}`}>
                        <Pencil1Icon className="dark:text-gray-200 w-5 h-5" />
                     </Link>
                     <Link href={`?dId=${company.id}`}>
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

         <EditUserModal />
         <DeleteUserModal />
      </>
   )
}

export default UsersTable
