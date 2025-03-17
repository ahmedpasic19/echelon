'use client'

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import Link from 'next/link'

import DeleteCompanyModal from './modals/DeleteCompanyModal'
import EditCompanyModal from './modals/EditCompanyModal'
import MainTable from '@/components/table/MainTable'
import { useGetAllCompaniesQuery } from '@/lib/_services/basic/companies-api'
import { Company } from '@/schemas/basic/companies/companies.interface'

const CompaniesTable = () => {
   const { data } = useGetAllCompaniesQuery()

   const tableData = useMemo(() => (Array.isArray(data?.companies) ? data?.companies : []), [data])
   const columns = useMemo<ColumnDef<Company>[]>(
      () => [
         {
            header: 'Name',
            accessorKey: 'name',
         },
         {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => {
               const company = row.original
               return (
                  <div className="flex justify-center gap-2">
                     <Link href={`?companyId=${company.id}`}>
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

         <EditCompanyModal />
         <DeleteCompanyModal />
      </>
   )
}

export default CompaniesTable
