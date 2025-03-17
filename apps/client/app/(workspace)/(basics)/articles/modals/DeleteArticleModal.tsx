'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import Modal from '@/components/root/modal'
import { useDelteArticleMutation } from '@/lib/_services/basic/articles-api'

const DeleteArticleModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const userId = searchParams.get('dId')

   const [deleteArticle, { isLoading: loadingDelete }] = useDelteArticleMutation()

   const handleDelete = async () => {
      try {
         if (userId) {
            await deleteArticle({ id: +userId }).unwrap()
            toast.success('Deleted successfuly')
            router.back()
         }
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error.data.message)
      }
   }

   return (
      <Modal open={userId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content
            title="Delete your article"
            desc="Here is where you can delete your article."
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

export default DeleteArticleModal
