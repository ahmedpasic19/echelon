import React from 'react'

import CompaniesForm from './companies-form'
import CompaniesTable from './companies-table'

export default function CompaniesPage() {
   return (
      <div className="page">
         <CompaniesForm />
         <div className="mt-4 w-full">
            <CompaniesTable />
         </div>
      </div>
   )
}
