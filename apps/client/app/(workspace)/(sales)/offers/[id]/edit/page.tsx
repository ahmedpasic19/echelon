import React from 'react'

import OfferFormSlide from '../../form/offer-form-slide'

export default function EditOfferPage({ params: { id } }: { params: { id: string } }) {
   return (
      <div className="page">
         <OfferFormSlide isEdit offerId={+id!} />
      </div>
   )
}
