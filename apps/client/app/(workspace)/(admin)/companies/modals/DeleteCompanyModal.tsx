'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import Modal from '@/components/root/modal'
import { useDelteCompanyMutation } from '@/lib/_services/basic/companies-api'

const DeleteCompanyModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const companyId = searchParams.get('dId')

   const [deleteCompany, { isLoading: loadingDelete }] = useDelteCompanyMutation()

   const handleDelete = async () => {
      try {
         if (companyId) {
            await deleteCompany({ id: +companyId }).unwrap()
            toast.success('Deleted successfuly')
            router.back()
         }
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error.data.message)
      }
   }

   return (
      <Modal open={companyId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content
            title="Delete your company"
            desc="Here is where you can delete your company."
         >
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

export default DeleteCompanyModal
