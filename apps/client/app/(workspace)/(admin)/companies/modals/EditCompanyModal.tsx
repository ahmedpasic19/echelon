'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import CompaniesForm from '../companies-form'

import Modal from '@/components/root/modal'
import { useGetOneCompanyQuery } from '@/lib/_services/basic/companies-api'
import { Company } from '@/schemas/basic/companies/companies.interface'

const EditCompanyModal = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const companyId = searchParams.get('companyId')

   const { data } = useGetOneCompanyQuery({ id: +companyId! }, { skip: !companyId })

   return (
      <Modal open={companyId ? true : false} onOpenChange={() => router.back()}>
         <Modal.Content title="Edit your company" desc="Here is where you can edit your company.">
            <CompaniesForm isEdit company={data?.company || ({} as Company)} />
         </Modal.Content>
      </Modal>
   )
}

export default EditCompanyModal
