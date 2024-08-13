import { PageProps } from "@/types";
import { Children, PropsWithChildren } from "react";

export default function Alert({children, showAlert, alertClose}:PropsWithChildren<{showAlert:boolean, alertClose: () => void}>)
{
  return (
    <div className={`${showAlert? '': 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md ml-2 mr-2">
          <div className="p-6 relative">
        
            <button onClick={alertClose} className="absolute right-0 top-1 mr-4 mt-4 text-gray-500 hover:text-gray-700" aria-label="Close" >
              x
            </button>

            {children}
            
          </div>
        </div>
      </div>
    </div>
  )
}