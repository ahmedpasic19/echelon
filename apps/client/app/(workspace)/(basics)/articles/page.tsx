import React from 'react'

import ArticlesForm from './articles-form'
import ArticlesTable from './articles-table'

export default function UsersPage() {
   return (
      <div className="page">
         <ArticlesForm />
         <div className="mt-4 w-full">
            <ArticlesTable />
         </div>
      </div>
   )
}
