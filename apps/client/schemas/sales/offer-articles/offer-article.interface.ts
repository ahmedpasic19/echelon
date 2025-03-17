import { Offer } from '../offers/offer.interface'

import { Article } from '@/schemas/basic/articles/articles.interface'

export interface OfferArticle {
   id: number
   name: string
   code: string
   base_price: number
   base_price_with_vat: number
   selling_price: number
   selling_price_with_vat: number
   amount: number
   total: number
   vat: number
   vat_value: number
   discount: number
   discount_value: number
   articles_id: number
   offers_id: number
   articles: Article
   offers: Offer
}
