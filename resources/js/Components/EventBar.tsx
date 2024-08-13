import { getTimeInAMPM } from "@/Utils/DateJsUtils";
import { Event } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function EventBar({event}:{event:Event})
{
  const [processing, setProcessing] = useState(false);
  
  //Convert 24 hour format to 12 Hour AM/PM
  
  return(
    <Link href={route('events.show',[event.id])} 
        className={`relative py-3 rounded-xl mt-2 ml-5 mr-2 inline-flex flex-col  ${event.completed ? "line-through": ''}  ${processing? 'bg-blue-800' : 'bg-blue-400'} text-white px-5 py-1`}
        onClick={() => setProcessing(true)}>
      
      <span data-cy="event-name" className={`p-0 text-base leading-none`}>{event.name}</span>
      {
        event.start_time && <span className="p-0 text-sm leading-none" data-cy="event-times">{getTimeInAMPM(event.start_time)} - {getTimeInAMPM(event.end_time)}</span>
      }
   </Link>
)
}