import Alert from "@/Components/Alert";
import AlertAreYourSure from "@/Components/Alerts/AlertAreYouSure";
import ShowEventPayments from "@/Pages/Event/Partials/ShowEventPayments";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Event, PageProps } from "@/types";
import { getMonthName, getDayName, getDayOfMonth, getTimeInAMPM } from '@/Utils/DateJsUtils'
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


export default function ShowEvent({auth, event,session}:PageProps<{event:Event}>)
{
  const [processingCompleted, setProcessingCompleted] = useState(false);
  const [processingDelete, setProcessingDelete] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const year = event.day.month.year.year;
  const monthName = getMonthName(parseInt(event.day.month.month));
  const dayNumber = getDayOfMonth(event.day.date);
  const dayName = getDayName(event.day.date);

  const handleEventCompleted = () => {
    setProcessingCompleted(true);
    router.visit(route('events.complete',[event.id]), {
      method: 'post',
      data: {
        event_id:event.id
      },
      replace: false,
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page:any) => {
        toast(page.props.flash.success_message)
        setProcessingCompleted(false);
      },
  
    })
  }

  const handleEventUndo = () => {
    setProcessingCompleted(true);
    router.visit(route('events.undoComplete',[event.id]), {
      method: 'post',
      data: {
        event_id:event.id
      },
      replace: false,
      preserveState: true,
      preserveScroll: true,
      onSuccess: (page:any) => {
        toast(page.props.flash.success_message)
        setProcessingCompleted(false);
      },
  
    })
  }

  const handleAlertClose = () =>{
    setShowDeleteAlert(false);
  }

  const handleShowDeleteAlert = () => {
    setShowDeleteAlert(true);
  }

  const handleOnAlertDeleteAction = () => {
    setProcessingDelete(true)
    router.visit(route('events.delete',[event.id]), {
      method: 'delete',
      data: {
        event_id:event.id
      },
      replace: false,
      preserveState: false,
      preserveScroll: true,
      onSuccess: (page:any) => {
        setShowDeleteAlert(false)
        setProcessingDelete(false);
      },
  
    })
  }

  var balance = 0;
  var total_deposits=0;
  event.payments?.map(deposit => {
    total_deposits = total_deposits+deposit.deposit;
  })

  const cost = event.cost ?? 0;
  balance =  cost - total_deposits;
  balance = balance >= 0 ? balance : 0;
 
  return(
    <AuthenticatedLayout
      user={auth.user}
      header= {<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Details</h2>}
      backBtn={route('events',[session.selected_year, session.selected_business])}
      session={session}
    >
      <ToastContainer />
      <div className="bg-gray-100 flex items-center justify-center m-2">
        <div className="p-4 mx-auto bg-white rounded-xl  space-y-4 relative shadow-lg
              md:space-y-6 lg:space-y-6  lg:text-xl">

          <Link href={route('events.edit',[event.id])} data-cy="event-edit" className="absolute top-3 right-3 text-green-500 font-bold text-l underline">
            Edit
          </Link>

          <div className="text-center">
            <div className="text-gray-500 text-l">
              <span id="year">{year}</span> <span id="month">{monthName}</span>
            </div>
            <div className="text-4xl font-semibold" id="day">{dayNumber}</div>
            <div className="text-gray-500 text-l" id="dayName">{dayName}</div>
          </div>

          <div className="space-y-2">
            <div className="text-xl font-extrabold text-center" id="eventDescription" data-cy='name'>{event.name}</div>
            {
              event.description && <div className="text-gray-600 text-xl px-2 py-5 text-center" data-cy="description" id="eventDescription">{event.description}</div>
            }
            

            {/* Event start and end times */}
            {
              (event.start_time || event.end_time) ?
                <div className="flex justify-between text-l text-gray-500 gap-3">
                  { event.start_time && <span id="eventStartTime" data-cy="from">From: {getTimeInAMPM(event.start_time)}</span>}
                  { event.end_time && <span id="eventEndTime" data-cy="to">To: {getTimeInAMPM(event.end_time)}</span>}
                </div>:""
            }
            
          </div>
          
          

          {/* Show telephone fields at least one number is available */}
          {
            (event.telephone_1 || event.telephone_2)?

            <div className="flex gap-4 justify-between py-3 px-4 text-l font-semibold text-blue-600 bg-green-50">
              {event.telephone_1 && <a href={`tel:${event.telephone_1}`} data-cy="telephone_1"><i className="fa-solid fa-phone-volume"></i> {event.telephone_1}</a>}
              
              {event.telephone_2 && <a href={`tel:${event.telephone_2}`} data-cy="telephone_2"><i className="fa-solid fa-phone-volume"></i> {event.telephone_2}</a>}
            </div>
          : ''
          }
          

        {event.cost && <div className="flex flex-col mb-4">
                          <div className="flex">
                            <p className="font-semibold">Cost:</p>
                            <p className="ml-5" data-cy="cost">Rs: {event.cost}/=</p>
                          </div>

                          <div className="flex">
                            <p className="">Balance:</p>
                            <p className="ml-5" data-cy="balance">Rs: {balance}/=</p>
                          </div>
                        </div>}

          {(event.payments?.length !== 0) && <ShowEventPayments payments={event.payments}/>}

          <div className="flex flex-col space-x-2 justify-center">
            
            {
              !event.completed && 
              <button 
                disabled={processingCompleted}
                onClick={handleEventCompleted}
                className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 my-2 text-l rounded" id="completedButton">
                 <i className="fa-solid fa-check"></i> {processingCompleted? "processing..":'Mark as Completed'}
              </button>
            }

            {
              event.completed ? 
                  <button 
                    disabled={processingCompleted}
                    onClick={handleEventUndo}
                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 my-2 text-l rounded" id="completedButton">
                    <i className="fa-solid fa-rotate-left"></i> undo Completed 
                  </button> : ''
            }

            <AlertAreYourSure processing={processingDelete} onAlertClose={handleAlertClose} isAlert={showDeleteAlert} onAlertDelete={handleOnAlertDeleteAction}/>

            <button onClick={handleShowDeleteAlert} disabled={processingDelete}  
                className={`${processingDelete? 'bg-red-300': 'bg-red-500'} hover:bg-red-700 text-white font-bold py-1 px-4 text-l rounded`} id="deleteButton">
                 <i className="fa-solid fa-trash-can"></i> Delete 
            </button>
            
            

          </div>
        </div>

      </div>
    </AuthenticatedLayout>
  )
}