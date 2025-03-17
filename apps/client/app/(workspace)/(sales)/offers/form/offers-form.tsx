'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import React, { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import DateField from '@/components/root/date-field'
import ClientSearchSelect from '@/components/searchables/client-search-select'
import CurrenciesSelect from '@/components/searchables/currencies-select'
import { useCreateOfferMutation, useUpdateOfferMutation } from '@/lib/_services/sales/offers-api'
import { User } from '@/schemas/basic/users/users.interface'
import { Offer } from '@/schemas/sales/offers/offer.interface'
import { createOfferSchema, updateOfferSchema } from '@/schemas/sales/offers/offers.schema'
import { format, round } from '@/utils/common'

type TProps = {
   isEdit?: boolean
   offer?: Offer
   setOfferId: React.Dispatch<React.SetStateAction<number>>
   offerId?: number
   changeKey?: boolean
}

const OffersForm = ({ isEdit, offer, setOfferId, offerId, changeKey }: TProps) => {
   const session = useSession()
   const methods = useForm<createOfferSchema>({
      resolver: zodResolver(isEdit || offerId ? updateOfferSchema : createOfferSchema),
      values:
         (isEdit && offer) || (offerId && offer)
            ? { ...offer }
            : ({
                 worker_id: session?.data?.user?.id,
                 companies_id: session?.data?.user?.current_company_id,
                 vat: 17,
              } as Offer),
      defaultValues: {
         date_of_order: new Date(),
         payment_due_date: new Date(),
         delivery_due_date: new Date(),
         worker_id: session?.data?.user?.id,
         companies_id: session?.data?.user?.current_company_id,
         vat: 17,
         client_id: '',
      },
   })

   const {
      handleSubmit,
      setValue,
      formState: { errors },
   } = methods

   const [createOffer] = useCreateOfferMutation()
   const [updateOffer] = useUpdateOfferMutation()

   const onSubmit: SubmitHandler<createOfferSchema> = async (data) => {
      try {
         // If isEdit prop is present then use PUT
         // Also update after new offer has been saved
         if ((isEdit && offer) || (offerId && offer)) {
            // Don't send offer_articles
            // eslint-disable-next-line
            const { offer_articles, ...rest } = offer
            await updateOffer({ body: { ...rest, ...data } }).unwrap()
         } else {
            const response = await createOffer({ body: data }).unwrap()
            setOfferId(response.offer.id)
         }

         toast.success('Successfully saved')
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error?.data?.message || 'An error occurred')
      }
   }

   useEffect(() => {
      methods.reset()
   }, [changeKey])

   return (
      <FormProvider {...methods}>
         <form className="w-full grid grid-cols-4 gap-4" onSubmit={handleSubmit(onSubmit)}>
            <ClientSearchSelect
               label="Client"
               name="client1"
               companyId={session?.data?.user?.current_company_id}
               onChange={(option: User | null) => {
                  if (option) setValue('client_id', option.id)
               }}
               nameOption={methods.watch('client.name')}
            />
            <CurrenciesSelect
               label="Currency"
               name="currency1"
               onChange={(option: { label: string; value: number } | null) => {
                  if (option) setValue('currencies_id', option.value)
               }}
               nameOption={methods.watch('currency.name')}
            />
            <DateField label="Date of order" name="date_of_order" />
            <DateField label="Payment due date" name="payment_due_date" />
            <DateField label="Delivery due date" name="delivery_due_date" />
            <div className="mt-6">
               <Button type="submit">Save</Button>
            </div>
            <div className="mt-6">
               <p>Total: {round(offer?.offer_total ?? 0, 2)}</p>
               <p>VAT: {round(offer?.vat_value ?? 0, 2)}</p>
            </div>
            <ul>
               {Object.keys(errors).map((key) => (
                  <p key={Math.random()}>
                     {key} :{errors[key]?.message}
                  </p>
               ))}
            </ul>
         </form>
      </FormProvider>
   )
}

export default OffersForm
