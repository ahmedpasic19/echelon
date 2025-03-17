'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import React from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import SelectField from '@/components/root/select-field'
import { useSetCurrentCompanyMutation } from '@/lib/_services/basic/users-api'
import { Company } from '@/schemas/basic/companies/companies.interface'
import { setComanySchema } from '@/schemas/basic/users/set-company.schema'

const CompanySelectForm = () => {
   const session = useSession()
   const router = useRouter()

   const methods = useForm<setComanySchema>({
      resolver: zodResolver(setComanySchema),
      values: {
         user_id: session?.data?.user?.id,
         company_id: 0,
      },
   })

   const { handleSubmit, setValue, watch } = methods

   const [setCurrentCompany, { isLoading: loadingSet }] = useSetCurrentCompanyMutation()

   const companyOptions: { label: string; value: number }[] =
      session.data?.user?.companies?.map((company: Company) => ({
         label: company.name,
         value: company.id,
         company_id: company.id,
      })) || []

   const onSubmit: SubmitHandler<setComanySchema> = async (data) => {
      try {
         const res = await setCurrentCompany(data).unwrap()
         if (res.message && session.data) {
            router.push('/')
            session.update({
               ...session,
               ...{
                  data: {
                     ...session.data,
                     ...{ user: { ...session.data.user }, current_company_id: data.company_id },
                  },
               },
            })
         }
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error.data.message)
      }
   }

   return (
      <div>
         <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[20em]">
               <SelectField
                  label="Choose company"
                  options={companyOptions}
                  name="company_id"
                  onChange={(option) => {
                     if (option) setValue('company_id', option.value)
                  }}
                  value={companyOptions.find((option) => option.value === watch('company_id'))}
               />
               <div className="mt-4">
                  <Button isLoading={loadingSet}>Select company</Button>
               </div>
            </form>
         </FormProvider>
      </div>
   )
}

export default CompanySelectForm
