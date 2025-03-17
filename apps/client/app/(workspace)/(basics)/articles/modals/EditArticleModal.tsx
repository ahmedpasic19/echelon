'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import ArticlesForm from '../articles-form'

import Modal from '@/components/root/modal'
import { useGetOneArticleQuery } from '@/lib/_services/basic/articles-api'
import { Article } from '@/schemas/basic/articles/articles.interface'

const EditArticleModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const articleId = searchParams.get('articleId')

   const { data } = useGetOneArticleQuery({ id: +articleId! }, { skip: !articleId })

   return (
      <Modal open={articleId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content title="Edit your article" desc="Here is where you can edit your article.">
            <ArticlesForm isEdit article={data?.article || ({} as Article)} />
         </Modal.Content>
      </Modal>
   )
}

export default EditArticleModal
