'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import React from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import TextField from '@/components/root/text-filed'
import { useCreateClientMutation, useUpdateUserMutation } from '@/lib/_services/basic/users-api'
import { createClientSchema, updateClientSchema } from '@/schemas/basic/users/clients.schema'
import { User } from '@/schemas/basic/users/users.interface'

type TProps = {
   isEdit?: boolean
   user?: User
}

const ClientsForm = ({ isEdit, user }: TProps) => {
   const session = useSession()
   const methods = useForm<createClientSchema>({
      resolver: zodResolver(isEdit ? updateClientSchema : createClientSchema),
      values:
         isEdit && user
            ? {
                 ...user,
                 type: 'CLIENT',
              }
            : ({
                 type: 'CLIENT',
                 current_company_id: session?.data?.user?.current_company_id,
              } as User),
   })

   const { handleSubmit, reset } = methods

   const router = useRouter()

   const [createUser, { isLoading: loadingCreate }] = useCreateClientMutation()
   const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

   const onSubmit: SubmitHandler<createClientSchema> = async (data) => {
      try {
         // If isEdit prop is present then use PUT
         if (isEdit && user) {
            await updateUser({ body: { ...data, id: user.id } }).unwrap()
            router.back()
         }
         if (!isEdit) {
            await createUser({ body: data }).unwrap()
         }

         toast.success('Succesfully saved')
         reset()
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error.data.message)
      }
   }

   return (
      <FormProvider {...methods}>
         <form
            className={
               isEdit ? 'flex flex-col gap-4' : 'flex flex-col sm:grid grid-cols-4 w-full gap-4'
            }
            onSubmit={handleSubmit(onSubmit)}
         >
            <TextField name="name" label="Name" autoComplete="off" autoFocus={isEdit} />
            <TextField
               name="email"
               type="email"
               label="Email"
               autoComplete="off"
               autoFocus={isEdit}
            />
            <div className="mt-6">
               <Button
                  type="submit"
                  isLoading={loadingCreate || loadingUpdate}
                  disabled={loadingCreate || loadingUpdate}
               >
                  Submit
               </Button>
            </div>
         </form>
      </FormProvider>
   )
}

export default ClientsForm
