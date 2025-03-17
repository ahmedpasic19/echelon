'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import UsersForm from '../users-form'

import Modal from '@/components/root/modal'
import { useGetOneUserQuery } from '@/lib/_services/basic/users-api'
import { User } from '@/schemas/basic/users/users.interface'

const EditUserModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const userId = searchParams.get('userId')

   const { data } = useGetOneUserQuery({ id: userId! }, { skip: !userId })

   return (
      <Modal open={userId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content title="Edit your user" desc="Here is where you can edit your user.">
            <UsersForm isEdit user={data?.user || ({} as User)} />
         </Modal.Content>
      </Modal>
   )
}

export default EditUserModal
