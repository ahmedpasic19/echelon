'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import ClientsForm from '../clients-form'

import Modal from '@/components/root/modal'
import { useGetOneUserQuery } from '@/lib/_services/basic/users-api'
import { User } from '@/schemas/basic/users/users.interface'

const EditClientModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const clientId = searchParams.get('clientId')

   const { data } = useGetOneUserQuery({ id: clientId! }, { skip: !clientId })

   return (
      <Modal open={clientId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content title="Edit your user" desc="Here is where you can edit your user.">
            <ClientsForm isEdit user={data?.user || ({} as User)} />
         </Modal.Content>
      </Modal>
   )
}

export default EditClientModal
