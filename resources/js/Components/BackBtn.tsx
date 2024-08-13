import { Link } from "@inertiajs/react";

export default function BackBtn({action}:{action:string})
{
  return (
    <Link
      className="bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
      href={action}
    >
      <i className="fa-solid fa-chevron-left"></i>
    </Link>
    
  )  
}