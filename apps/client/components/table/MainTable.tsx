'use client'

import {
   flexRender,
   getCoreRowModel,
   getPaginationRowModel,
   useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

import Pagination from './Pagination'

interface ReactTableProps<T extends object> {
   data: T[]
   columns: ColumnDef<T>[]
   showNavigation?: boolean
}

const MainTable = <T extends object>({ data, columns, showNavigation }: ReactTableProps<T>) => {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
   })

   return (
      <div className="flex flex-col items-center overflow-x-auto">
         <div className="relative w-full">
            <div className="relative flex w-full flex-col pb-4">
               {showNavigation ? <Pagination table={table} /> : null}
               <table className="w-full">
                  <thead>
                     {table.getHeaderGroups().map(headerGroup => (
                        <tr
                           key={headerGroup.id}
                           className="uppercase font-semibold tracking-tighter"
                        >
                           {headerGroup.headers.map(header => (
                              <th key={Math.random()}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext(),
                                      )}
                              </th>
                           ))}
                        </tr>
                     ))}
                  </thead>
                  <tbody>
                     {table.getRowModel().rows.map(row => (
                        <tr
                           key={Math.random()}
                           className={`${
                              +row.id % 2 === 0
                                 ? 'bg-gray-200 dark:bg-my-gray-100'
                                 : 'dark:bg-my-gray-100'
                           } hover:bg-gray-300 dark:hover:bg-opacity-30 dark:border-b-2 dark:border-my-gray-200`}
                        >
                           {row.getVisibleCells().map(cell => (
                              <td key={cell.id} className="text-center">
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                           ))}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   )
}

export default MainTable
