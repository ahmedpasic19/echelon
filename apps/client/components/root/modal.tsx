import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import React from 'react'

export default function Modal({
   children,
   onOpenChange,
   open,
}: {
   children: React.ReactNode
   onOpenChange: () => void
   open: boolean
}) {
   return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
         {children}
      </Dialog.Root>
   )
}

const ModalContent = ({
   children,
   title,
   desc,
}: {
   children: React.ReactNode
   desc?: string
   title: string
}) => {
   return (
      <>
         <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
         <Dialog.Content className="dark:bg-dark fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-8 text-gray-900 shadow">
            <div className="flex justify-between pb-4">
               <div>
                  <Dialog.Title className="pb-1 font-semibold text-gray-900 dark:text-gray-200">
                     {title}
                  </Dialog.Title>
                  <Dialog.Description className="text-ms text-gray-600">{desc}</Dialog.Description>
               </div>
               <div>
                  <Dialog.Close asChild>
                     <button aria-label="Close">
                        <Cross2Icon className="dark:text-gray-200" />
                     </button>
                  </Dialog.Close>
               </div>
            </div>
            {children}
         </Dialog.Content>
      </>
   )
}

Modal.Button = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent
