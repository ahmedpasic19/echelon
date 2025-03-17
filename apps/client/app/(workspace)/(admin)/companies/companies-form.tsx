'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import React from 'react'

import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import TextField from '@/components/root/text-filed'
import {
   useCreateCompanyMutation,
   useUpdateCompanyMutation,
} from '@/lib/_services/basic/companies-api'
import { Company } from '@/schemas/basic/companies/companies.interface'
import {
   createCopmanySchema,
   updateCopmanySchema,
} from '@/schemas/basic/companies/companies.schema'

type TProps = {
   isEdit?: boolean
   company?: Company
}

const CompaniesForm = ({ isEdit, company }: TProps) => {
   const methods = useForm<createCopmanySchema>({
      resolver: zodResolver(isEdit ? updateCopmanySchema : createCopmanySchema),
      values: isEdit && company ? company : ({} as Company),
   })

   const { handleSubmit, reset } = methods

   const router = useRouter()

   const [createCompany, { isLoading: loadingCreate }] = useCreateCompanyMutation()
   const [updateCompany, { isLoading: loadingUpdate }] = useUpdateCompanyMutation()

   const onSubmit: SubmitHandler<createCopmanySchema> = async (data) => {
      try {
         // If isEdit prop is present then use PUT
         if (isEdit && company) {
            await updateCompany({ body: { ...data, id: company.id } }).unwrap()
            router.back()
         }
         if (!isEdit) {
            await createCompany({ body: data }).unwrap()
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

export default CompaniesForm
