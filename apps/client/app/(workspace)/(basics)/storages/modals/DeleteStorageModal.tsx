'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import Modal from '@/components/root/modal'
import { useDelteStorageMutation } from '@/lib/_services/basic/storages-api'

const DeleteStorageModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const storageId = searchParams.get('dId')

   const [deleteStorage, { isLoading: loadingDelete }] = useDelteStorageMutation()

   const handleDelete = async () => {
      try {
         if (storageId) {
            await deleteStorage({ id: +storageId }).unwrap()
            toast.success('Deleted successfuly')
            router.back()
         }
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error.data.message)
      }
   }

   return (
      <Modal open={storageId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content
            title="Delete your storage"
            desc="Here is where you can delete your storage."
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

export default DeleteStorageModal
