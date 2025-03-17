'use client'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef, PaginationState } from '@tanstack/react-table'

import { useEffect, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import Pagination from './Pagination'

interface ReactTableProps<T extends object> {
   data: T[]
   columns: ColumnDef<T>[]
   showNavigation?: boolean
   pageCount: number
}

const MainPaginatedTable = <T extends object>({
   data,
   columns,
   pageCount,
   showNavigation,
}: ReactTableProps<T>) => {
   const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
   })

   const searchParams = useSearchParams()
   const router = useRouter()

   useEffect(() => {
      const page = searchParams.get('page')
      const pageSize = searchParams.get('pageSize')

      if (!page || !pageSize) {
         router.push('?page=1&pageSize=10')
      }
   }, [])

   useEffect(() => {
      router.push(`?page=${pageIndex + 1}&pageSize=${pageSize}`)
   }, [pageIndex, pageSize])

   const tableData = useMemo(() => (Array.isArray(data) ? data : []), [data])
   const tableColumns = useMemo(() => (Array.isArray(columns) ? columns : []), [columns])

   const table = useReactTable({
      data: tableData,
      columns: tableColumns,
      pageCount: pageCount ?? -1,
      state: {
         pagination: {
            pageIndex,
            pageSize,
         },
      },
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      enableHiding: true,
   })

   return (
      <div className="flex flex-col items-center overflow-x-auto">
         <div className="relative w-full">
            {showNavigation ? <Pagination table={table} /> : null}
            <table className="w-full">
               <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                     <tr
                        key={headerGroup.id}
                        className="uppercase font-semibold tracking-tighter bg-gray-100 dark:bg-black/30"
                     >
                        {headerGroup.headers.map(header => {
                           return (
                              <th key={header.id} colSpan={header.colSpan}>
                                 {header.isPlaceholder ? null : (
                                    <div>
                                       {flexRender(
                                          header.column.columnDef.header,
                                          header.getContext(),
                                       )}
                                    </div>
                                 )}
                              </th>
                           )
                        })}
                     </tr>
                  ))}
               </thead>
               <tbody>
                  {table.getRowModel().rows.map(row => {
                     return (
                        <tr
                           key={row.id}
                           className={`${
                              +row.id % 2 === 0
                                 ? 'bg-gray-200 dark:bg-my-gray-100'
                                 : 'dark:bg-my-gray-100'
                           } hover:bg-gray-300 dark:hover:bg-opacity-30 dark:border-b-2 dark:border-my-gray-200`}
                        >
                           {row.getVisibleCells().map(cell => {
                              return (
                                 <td key={cell.id} className="text-center">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                 </td>
                              )
                           })}
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default MainPaginatedTable
