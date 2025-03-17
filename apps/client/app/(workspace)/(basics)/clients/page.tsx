import { Metadata } from 'next'

import React from 'react'

import ClientForm from './clients-form'
import ClientsForm from './clients-table'

export const metadata: Metadata = {
   title: 'Clients | NextJS Enterprise',
   description: 'Clients | NextJS ERP System',
}

export default function ClientsPage() {
   return (
      <div className="page">
         <ClientForm />
         <div className="w-full mt-4">
            <ClientsForm />
         </div>
      </div>
   )
}
