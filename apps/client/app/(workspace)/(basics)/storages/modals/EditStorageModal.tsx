'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import StoragesForm from '../storages-form'

import Modal from '@/components/root/modal'
import { useGetOneStorageQuery } from '@/lib/_services/basic/storages-api'
import { Storage } from '@/schemas/basic/storages/storages.interface'

const EditStorageModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const storageId = searchParams.get('storageId')

   const { data } = useGetOneStorageQuery({ id: +storageId! }, { skip: !storageId })

   return (
      <Modal open={storageId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content title="Edit your company" desc="Here is where you can edit your company.">
            <StoragesForm isEdit storage={data?.storage || ({} as Storage)} />
         </Modal.Content>
      </Modal>
   )
}

export default EditStorageModal
