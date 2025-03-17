import React from 'react'

import OfferFormSlide from './form/offer-form-slide'
import OffersTable from './tables/offers-table'

export default function OffersPage() {
   return (
      <div className="page">
         <OfferFormSlide />

         <div className="w-full">
            <OffersTable />
         </div>
      </div>
   )
}
