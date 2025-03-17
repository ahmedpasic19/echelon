'use client'

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import Link from 'next/link'

import DeleteStorageModal from './modals/DeleteStorageModal'
import EditStorageModal from './modals/EditStorageModal'
import MainTable from '@/components/table/MainTable'
import { useGetAllCompaniesStoragesQuery } from '@/lib/_services/basic/storages-api'
import { Storage } from '@/schemas/basic/storages/storages.interface'

const StoragesTable = () => {
   const { data } = useGetAllCompaniesStoragesQuery({ companies_id: 1 })

   const tableData = useMemo(() => (Array.isArray(data?.storages) ? data?.storages : []), [data])
   const columns = useMemo<ColumnDef<Storage>[]>(
      () => [
         {
            header: 'Name',
            accessorKey: 'name',
         },
         {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => {
               const storage = row.original
               return (
                  <div className="flex justify-center gap-2">
                     <Link href={`?storageId=${storage.id}`}>
                        <Pencil1Icon className="dark:text-gray-200 w-5 h-5" />
                     </Link>
                     <Link href={`?dId=${storage.id}`}>
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

         <EditStorageModal />
         <DeleteStorageModal />
      </>
   )
}

export default StoragesTable
