import { PageProps } from "@/types";
import DangerButton from "../Buttons/DangerButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import { PropsWithChildren } from "react";

export default function AlertForm(
  {children, isAlert, onAlertClose, ...props}:
  PropsWithChildren<{isAlert:boolean, onAlertClose: () => void}>)
{
  return (
    <div className={`${isAlert? '': 'hidden'}`} {...props}>
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md ml-2 mr-2">
          <div className="p-6 relative">
            <button onClick={onAlertClose} className="absolute top-2 right-3 bg-gray-500 text-black rounded px-2 hover:text-gray-700" aria-label="Close" >
              <i className="fa-solid fa-xmark"></i>
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}