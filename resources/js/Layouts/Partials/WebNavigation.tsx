import { Link } from "@inertiajs/react";
import MenuItems from "./MenuItems";
import { Session } from "@/types";

export default function StaticNavigation({isSuperAdmin, session}:{isSuperAdmin:boolean, session:Session}){
  return(
    <aside id="logo-sidebar" className="fixed  z-40 w-64 h-screen" aria-label="Sidebar">
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <Link href={route('welcome')} className="flex items-center ps-2.5 mb-5">
        <i className="fa-brands fa-square-pied-piper h-6 me-3 sm:h-7 text-2xl"></i>
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">EventFlow</span>
        </Link>
        <ul className="space-y-2 font-medium">
            <MenuItems isSuperAdmin={isSuperAdmin} session={session}/>
        </ul>
    </div>
  </aside>
  )
}