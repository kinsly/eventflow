import { Business, Session } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function BusinessCard({session, business}:{ session:Session, business:Business })
{
  const [loading, setLoading] = useState(false);
  
  const handleLinkClick = () => {
   setLoading(true);
  }

  return (
    <Link href={route('events',[session.selected_year,business.id])} onClick={handleLinkClick}>
      {/* Business Card item */}
      <div className="flex items-center p-4 bg-white rounded-xl shadow-2xl border-blue-400 border-t-2 mx-3 my-2">
        <div className="flex-grow">
          {loading ? 
            <span>Loading Please wait <i className="fa-solid fa-spinner"></i></span>
            :
            <span>
              <h2 className="text-xl font-semibold text-gray-800">{business.name}</h2>
              <p className="text-gray-500">{business.role}</p>
            </span>  
        }
          
            
        </div>
      </div>
    </Link>
    
  )
}