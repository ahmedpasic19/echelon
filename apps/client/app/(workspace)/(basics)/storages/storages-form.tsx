'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import React from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import TextField from '@/components/root/text-filed'
import {
   useCreateStorageMutation,
   useUpdateStorageMutation,
} from '@/lib/_services/basic/storages-api'
import { Storage } from '@/schemas/basic/storages/storages.interface'
import { createStorageSchema, updateStorageSchema } from '@/schemas/basic/storages/storages.schema'

type TProps = {
   isEdit?: boolean
   storage?: Storage
}

const StoragesForm = ({ isEdit, storage }: TProps) => {
   const session = useSession()

   const methods = useForm<createStorageSchema>({
      resolver: zodResolver(isEdit ? updateStorageSchema : createStorageSchema),
      values:
         isEdit && storage
            ? storage
            : ({ companies_id: session?.data?.user.current_company_id } as Storage),
   })

   const { handleSubmit, reset } = methods

   const router = useRouter()

   const [createStorage, { isLoading: loadingCreate }] = useCreateStorageMutation()
   const [updateStorage, { isLoading: loadingUpdate }] = useUpdateStorageMutation()

   const onSubmit: SubmitHandler<createStorageSchema> = async (data) => {
      try {
         // If isEdit prop is present then use PUT
         if (isEdit && storage) {
            await updateStorage({ body: { ...data, id: storage.id } }).unwrap()
            router.back()
         }
         if (!isEdit) {
            await createStorage({ body: data }).unwrap()
         }

         toast.success('Succesfully saved')
         reset()
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error.data)
      }
   }

   return (
      <FormProvider {...methods}>
         <form
            className={
               isEdit ? 'flex flex-col gap-4' : 'flex flex-col sm:grid grid-cols-3 w-full gap-4'
            }
            onSubmit={handleSubmit(onSubmit)}
         >
            <TextField name="name" label="Name" autoComplete="off" autoFocus={isEdit} />

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

export default StoragesForm
