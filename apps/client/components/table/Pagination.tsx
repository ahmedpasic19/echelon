'use client'

import {
   ChevronLeftIcon,
   ChevronRightIcon,
   DoubleArrowLeftIcon,
   DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

interface ReactTableProps<T extends object> {
   table: Table<T>
}

const Pagination = <T extends object>({ table }: ReactTableProps<T>) => {
   return (
      <div className="sticky flex w-full justify-center bg-gray-100 dark:bg-black/30 dark:text-gray-100 py-1 gap-2 font-semibold text-gray-900 text-sm">
         <button
            className="border rounded p-1 bg-white dark:bg-my-gray-300 dark:text-gray-100 text-gray-900"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
         >
            <DoubleArrowLeftIcon className="w-6 h-6" />
         </button>
         <button
            className="border rounded p-1 bg-white dark:bg-my-gray-300 dark:text-gray-100 text-gray-900"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
         >
            <ChevronLeftIcon className="w-6 h-6" />
         </button>
         <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
               {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
         </span>
         <span className="flex items-center gap-1">
            | Go to page:
            <input
               type="number"
               defaultValue={table.getState().pagination.pageIndex + 1}
               onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
               }}
               className="border p-1 rounded w-16 outline-none"
            />
         </span>
         <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
               table.setPageSize(Number(e.target.value))
            }}
         >
            {[10, 20, 30, 40, 50].map(pageSize => (
               <option key={pageSize} value={pageSize}>
                  Show {pageSize}
               </option>
            ))}
         </select>
         <button
            className="border rounded p-1 bg-white dark:bg-my-gray-300 dark:text-gray-100 text-gray-900"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
         >
            <ChevronRightIcon className="w-6 h-6" />
         </button>
         <button
            className="border rounded p-1 bg-white dark:bg-my-gray-300 dark:text-gray-100 text-gray-900"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
         >
            <DoubleArrowRightIcon className="w-6 h-6" />
         </button>
      </div>
   )
}

export default Pagination
