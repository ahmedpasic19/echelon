import React from 'react'

import StoragesForm from './storages-form'
import StoragesTable from './storages-table'

export default function StoragesPage() {
   return (
      <div className="page">
         <StoragesForm />
         <div className="mt-4 w-full">
            <StoragesTable />
         </div>
      </div>
   )
}
