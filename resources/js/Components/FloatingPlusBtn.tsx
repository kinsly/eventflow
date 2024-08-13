import { Link } from "@inertiajs/react";
import { useState } from "react";
import LoaderFloatingBtn from "./loaders/LoaderFloatingBtn";

export default function FloatingPlusBtn({action}:{action:string}){
  const [processing, setProcessing] = useState(false);
  
  return (
    <Link href={action} data-cy="add-event-btn" className="fixed bottom-4 right-4 md:right-1/3" onClick={() => setProcessing(true)}>
      <span className="inline-flex items-center justify-center rounded-full text-green-700 p-2">
         
          {
            processing?  <LoaderFloatingBtn/> :
            <i className="fa-solid fa-circle-plus text-5xl text-red-600"></i> 
          }
            
          
      </span>
    </Link>
  )
}