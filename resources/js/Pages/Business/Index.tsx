
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Business, PageProps } from "@/types";
import BusinessCreateForm from "./Partials/CreateForm";
import BusinessCard from "./Partials/BusinessCard";
import BusinessCards from "./Partials/BusinessCards";


export default function BusinessIndex({auth, businesses,session}:PageProps<{businesses:Business[]}>)
{


  return (
    <AuthenticatedLayout 
      user={auth.user}
      header= {<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Business</h2>}
      backBtn=""
      session={session}>

    
      <BusinessCards businesses={businesses}/> 

      <BusinessCreateForm/>
   
    </AuthenticatedLayout>
  )
}