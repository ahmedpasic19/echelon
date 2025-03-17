import { redirect } from 'next/navigation'

export default async function Home() {
   redirect('/articles')
   return (
      <div className="page">
         <h1>This is the starting page to the ERP</h1>
      </div>
   )
}
