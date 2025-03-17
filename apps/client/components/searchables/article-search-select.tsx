'use client'

import React from 'react'

import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { AsyncProps } from 'react-select/async'

import SearchSelectField from '../root/search-select-field'

import { useLazyGetArticlesByNameQuery } from '@/lib/_services/basic/articles-api'
import { Article } from '@/schemas/basic/articles/articles.interface'
import { User } from '@/schemas/basic/users/users.interface'
import { debounce } from '@/utils/common'

type TProps<
   Option,
   IsMulti extends boolean = false,
   Group extends GroupBase<Option> = GroupBase<Option>,
> = AsyncProps<Option, IsMulti, Group> & {
   label: string
}

const ArticleSearchSelect = <
   Option,
   IsMulti extends boolean = false,
   Group extends GroupBase<Option> = GroupBase<Option>,
>({
   label,
   ...props
}: TProps<Option, IsMulti, Group>) => {
   const session = useSession()

   const [getArticlesByName] = useLazyGetArticlesByNameQuery()

   const getData = debounce(
      async (
         inputValue: string,
         // eslint-disable-next-line
         callback: (options: OptionsOrGroups<Article, GroupBase<Article>>) => void,
      ) => {
         try {
            const data = await getArticlesByName({
               companies_id: session.data?.user?.current_company_id,
               name: inputValue?.length ? inputValue : 'ANY_ARTICLES',
            }).unwrap()

            callback(data.articles)
         } catch (error) {
            // @ts-expect-error // ignore error type
            toast.error(error.data.message)
         }
      },
      500,
   )

   return (
      <SearchSelectField
         {...props}
         label={label ?? 'Client'}
         // @ts-expect-error // User as Option type
         loadOptions={getData}
         defaultOptions
         getOptionLabel={(option: User) => option.name}
         getOptionValue={(option: User) => option.id}
      />
   )
}

export default ArticleSearchSelect
