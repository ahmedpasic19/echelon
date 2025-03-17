import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import Modal from '@/components/root/modal'
import { useDeleteOfferMutation } from '@/lib/_services/sales/offers-api'

const DeleteOfferModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const offerId = searchParams.get('dId')

   const [deleteOffer, { isLoading: loadingDelete }] = useDeleteOfferMutation()

   const handleDelete = async () => {
      try {
         if (offerId) {
            await deleteOffer({ id: offerId }).unwrap()
            toast.success('Deleted successfuly')
            router.back()
         }
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error.data.message)
      }
   }

   return (
      <Modal open={offerId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content title="Delete your user" desc="Here is where you can delete your user.">
            <div className="flex justify-between gap-4">
               <Button white onClick={() => router.back()}>
                  Cancel
               </Button>
               <Button onClick={handleDelete} isLoading={loadingDelete} disabled={loadingDelete}>
                  Delete
               </Button>
            </div>
         </Modal.Content>
      </Modal>
   )
}

export default DeleteOfferModal
