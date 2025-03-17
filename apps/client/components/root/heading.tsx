import React from 'react'

const Heading = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="w-full">
         <h3 className="w-full font-bold uppercase tracking-tighter py-2">{children}</h3>
      </div>
   )
}

export default Heading
