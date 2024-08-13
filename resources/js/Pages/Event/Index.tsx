import EventBar from "@/Components/EventBar";
import FloatingPlusBtn from "@/Components/FloatingPlusBtn";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { getDayNameAbbr, getDayOfMonth, getMonthAbbr, getMonthName, isToday } from "@/Utils/DateJsUtils";
import { EventYear, PageProps } from "@/types"
import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import dayjs from 'dayjs';
import MonthBar from "./Partials/MonthBar";

export default function EventIndex({session, auth, flash, allEvents }:PageProps<{allEvents:EventYear[]}>)
{
  const cardRefs = useRef<null|Record<any,any>>(null);
  const [dates, setDates] = useState<string[]>([])
  
  useEffect( () => {
    const timeroutId = setTimeout(() =>{
      let nearestDay = findTodayOrNearest()
      //scrollToView(nearestDay)
    },1000)  

    return () => clearTimeout(timeroutId)  

  },[])


  useEffect(() =>{
    if(flash.success_message){
      toast(flash.success_message)
    }
  }, [flash])  
 

  const scrollToView = (dateString:string|null) => {
    const map = getMap();
    const node = map.get(dateString);
    
    node.scrollIntoView({
      behavior: "instant",
      block: "nearest",
      inline: "center",
    });
  }  


  function getMap() {
    if (!cardRefs.current) {
      // Initialize the Map on first usage.
      cardRefs.current = new Map();
    }
    return cardRefs.current;
  }


  
  const findTodayOrNearest = () => {
    //Collect all available dates
    allEvents.map(year => {
      year.months.map(month => {
        month.days.map(date => {
          setDates(prev => [...prev, date.date])
        })
      })
    })

    const today = dayjs().format('YYYY-MM-DD');
    // Filter rows with dates on or after today
    const availableRows = dates.filter((date) => dayjs(date) >= dayjs(today));
  
    // // Check if any rows are available on today
     if (availableRows.length > 0) {
      // Return the first available row (today's row)
       return availableRows[0];
    } else {
      // If no rows on today, find the nearest available day (optional)
      if (availableRows.length === 0) {
        // Implement logic to find the nearest day with data (e.g., using array sorting)
        return null; // Or handle the case where no data is available
      } else {
        // If data exists for future days, return the first available row
        return availableRows[0];
      }
    }
  }; 
  return(
    <AuthenticatedLayout
      user={auth.user}
      header= {<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Events </h2>}
      backBtn=""
      session={session}
    >
      
      <ToastContainer />
      <div className="bg-white p-0">
      {
        allEvents.map((year, index) => {
          return(
            <div key={index}>
              {
                year.months.map((month, index) => {
                  return(
                    <Fragment key={index}>
                      <MonthBar monthName={getMonthName(parseInt(month.month))}/>
                      {
                        month.days.map((date, index) => {
                          return(
                            <div className="grid grid-cols-5" key={index} id={date.date}
                              ref={(node) => {
                                const map = getMap();
                                if (node) {
                                  map.set(date.date, node);
                                } else {
                                  map.delete(date.date);
                                }
                              }}>
                              <div className="col-span-1 flex flex-col items-center p-2">
                                  <span className={`${isToday(date.date)? 'bg-blue-400' : 'bg-slate-400'} ml-2 text-white font-bold py-2 px-5 rounded-xl min-w-fit`}>
                                      {/* <div className="bg-green-500 px-2 rounded-md">{getMonthAbbr(date.date)}</div> */}
                                      <div className="text-center text-2xl">{ getDayOfMonth(date.date)}</div>
                                      <div className="text-center text-sm font-semibold">{getDayNameAbbr(date.date)}</div>
                                      {/* <br/>
                                      {date.date} */}
                                  </span>
                              </div>
                              
                              <div className='col-span-4 flex flex-col'>
                              {
                                date.events.map((event, index) => {
                                  return (
                                    <Fragment key={index} >
                                      <EventBar event={event}/>
                                    </Fragment>
                                  )
                                })
                              }
                              </div>
                            </div>
                          )
                        })
                      }
                    </Fragment>
                  )
                })
              }
            </div>
          )
        })
      }

        {
          session.selected_business ? <FloatingPlusBtn action={route('events.add',session.selected_business)} />:
                        <FloatingPlusBtn action={route('events.add')} />
        }
        

      </div>
    </AuthenticatedLayout>
  )
}