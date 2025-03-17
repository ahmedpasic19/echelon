'use client'

import React from 'react'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '@/components/root/button'
import TextField from '@/components/root/text-filed'
import ArticleSearchSelect from '@/components/searchables/article-search-select'
import { useCreateOfferArticleMutation } from '@/lib/_services/sales/offer-articles-api'
import { Article } from '@/schemas/basic/articles/articles.interface'
import { createOfferArticleSchema } from '@/schemas/sales/offer-articles/offer-article.schema'

type TProps = {
   offerId: number
}

const OfferArticleForm = ({ offerId }: TProps) => {
   const methods = useForm<createOfferArticleSchema>({
      defaultValues: {
         offers_id: offerId,
      },
   })

   const { setValue, handleSubmit, reset } = methods

   const [createOfferArticle] = useCreateOfferArticleMutation()

   const onSubmit: SubmitHandler<createOfferArticleSchema> = async (data) => {
      try {
         const dater = createOfferArticleSchema.parse(data)
         await createOfferArticle({ body: dater }).unwrap()
         reset()
      } catch (error) {
         // @ts-expect-error // error type
         toast.error(error.data.message)
      }
   }

   return (
      <FormProvider {...methods}>
         <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit(onSubmit)}>
            <ArticleSearchSelect
               name="article_id"
               label="Article"
               onChange={(option: Article | null) => {
                  if (option) {
                     setValue('name', option.name)
                     setValue('code', option.code)
                     setValue('base_price', option.price_without_vat)
                     setValue('base_price_with_vat', option.price_with_vat)
                     setValue('articles_id', option.id)
                     setValue('offers_id', offerId)
                     setValue('vat', 17)
                  }
               }}
            />
            <TextField label="Amount" type="number" name="amount" />
            <TextField label="Discount" type="number" name="discount" />
            <div className="mt-6">
               <Button type="submit">Submit</Button>
            </div>
         </form>
      </FormProvider>
   )
}

export default OfferArticleForm
