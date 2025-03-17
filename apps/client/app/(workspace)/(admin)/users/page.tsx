import React from 'react'

import UsersForm from './users-form'
import UsersTable from './users-table'

export default function UsersPage() {
   return (
      <div className="page">
         <UsersForm />
         <div className="w-full mt-4">
            <UsersTable />
         </div>
      </div>
   )
}
