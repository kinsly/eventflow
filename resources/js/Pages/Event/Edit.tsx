import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, router } from "@inertiajs/react";
import { CustomFormData, Event, EventFormData, EventPayment, PageProps } from "@/types";
import TimePickerResponsive from "@/Components/TimePickerResponsive";
import DatePickerResponsive from "@/Components/DatePickerResponsive";
import dayjs from "dayjs";
import {FormEvent, ReactNode, useEffect, useState } from "react";

import PrimaryButton from "@/Components/Buttons/PrimaryButton";

import Payment from "@/Pages/Event/Partials/Payment";
import InputError from "@/Components/InputError";
import { ToastContainer, toast } from 'react-toastify';
import TextAreaInput from "@/Components/TextAreaInput";

interface DepositComponent{
  id:string,
  defaultDate:string,
  defaultPayment:number,
  payment_id:number
}

export default function EditEvent({event, auth, errors,session}:PageProps<{event:Event}>)
{
  
  const [currentTime, setCurrentTime] = useState(dayjs().format("h:mm:ss A"));
  
  const cardClassName = "bg-white mx-2 my-3 rounded-xl px-3 py-3 pb-10 space-y-6 shadow-xl";

  const [formData, setFormData] = useState<CustomFormData<EventFormData>>({
    name:event.name,
    description:(event.description)? event.description : '',
    date:event.day.date,
    start_time:event.start_time,
    end_time:event.end_time,
    all_day:event.all_day,
    telephone_1:(event.telephone_1) ? event.telephone_1 :'',
    telephone_2:(event.telephone_2)? event.telephone_2 : '',
    cost:(event.cost)? event.cost : '',
    payments:(event.payments)? event.payments : []
  })

  /** Update form data */
  const handleChange = (key:string, value:string|number|boolean|null) => {
    setFormData(values => ({
        ...values,
        [key]: value,
    }))
  }

  // Update payments or deposits array with date
  const handlePaymentDate = (date:string|null, component_id:number, payment_id:string|undefined) => {

    setFormData( values => {
      const updatedDates = values.payments.map((payment: EventPayment & {component_id:number}) =>{
        // Changing a date of old deposit
        if(payment_id){
          if(payment.id == payment_id) return {...payment, date:date}

        }else{
          //Changing date of a new deposit
          if(payment.component_id == component_id) return {...payment, date:date}
        }
        return payment;
      })

      return {...values, payments:updatedDates}
 
    })
  };

  // Update payments or deposits array
  const handlePayments = (deposit:number|undefined, component_id:number, payment_id:string|undefined) => {
    setFormData(values => {
      
      const updatedPayments = values.payments.map((payment:EventPayment & {component_id:number}) => {
        
        //Changing value of a old deposit
        if(payment_id){
          if(payment.id == payment_id){
            return {...payment, deposit:deposit}
          }
        }else{
        //Changing value of new deposit
          if(payment.component_id == component_id){
            return {...payment, deposit:deposit}
          }
        }
        //Return payment if nothing updated
        return payment;

      })

      return {...values, payments:updatedPayments};
      
    });
  }

  /**Handle form submittion with inertia manual links */
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()
    
      var url = route('events.update',[event.id]);
      router.visit(url, {
          method: 'put',
          data:formData,
          replace: false,
          preserveState: true,
          preserveScroll: true,
          onSuccess: (page:any) => {
            toast(page.props.flash.success_message)
            setFormData(prev => {
              return {
                ...prev,
                payments: page.props.event.payments
              }
            }) 
          }
        }); //end of router
  }  

  const addDepostField = ()=>{ 
    
    
    setFormData( values => {
      const key = Object.keys(values.payments).length.toString();
      var newDeposit = {
        id:'',
        date:dayjs().format('YYYY-MM-DD'),
        event_id: event.id,
        deposit:0,
        component_id:key
      }
      return {
        ...values,
       payments: [...values.payments, newDeposit],
       
      }
    })
  }

  const handleOnDepositRemove = (component_id:number|null, payment_id:number|undefined) => {
    setFormData(values => {
      if(payment_id){
        // Removing old deposit value
        var url = route('events.removePayment');
        router.visit(url, {
          method: 'delete',
          data:{
            id:payment_id
          },
          replace: false,
          preserveState: true,
          preserveScroll: true,
          onSuccess: (page:any) => {

          }
        })
        return {
          ...values,
          payments: values.payments.filter( (payment: EventPayment) => parseInt(payment.id) != payment_id)
        }
        
      }else{
        //Removing newly added deposit value that is not fed to DB
        return {
          ...values,
          payments: values.payments.filter( (payment: EventPayment & {component_id:string}) => parseInt(payment.component_id) != component_id)
        }
      }

      
    })
  }

  return (
    <AuthenticatedLayout
        user={auth.user}
        header= {<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Event </h2>}
        backBtn={route('events.show',[event.id])}
        session={session}
    >
      <Head title="Add Task or Event" />
      <ToastContainer />
      <form  onSubmit={handleSubmit}>
        {/* card one */}
        <div className={cardClassName}>
          <div>
              {/* Event Name field */}
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  type="text"
                  className="mt-1 block w-full"
                  autoComplete="Name"
                  data-cy="name"
              />

              <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
              {/* Event Description Field */}
              <InputLabel htmlFor="description" value="Description" />

              <TextAreaInput
                  id="description"
                  // ref={currentPasswordInput}
                  value={formData.description}
                  onChange={e => handleChange('description', e.target.value)}
                  className="mt-1 block w-full"
                  data-cy="description"
              />

              <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
              {/* Event Contact Numbers */}
              <InputLabel htmlFor="telephone_1" value="Contact Numbers" />

              <TextInput
                  id="telephone_1"
                  value={formData.telephone_1}
                  onChange={e => handleChange('telephone_1', e.target.value)}
                  type="tel"
                  className="mt-1 block w-full"
                  placeholder="contact number 1"
                  data-cy="telephone_1"
              />
              
              <TextInput
                  id="telephone_2"
                  value={formData.telephone_2}
                  onChange={e => handleChange('telephone_2', e.target.value)}
                  type="tel"
                  className="mt-3 block w-full"
                  placeholder="contact number 2"
                  data-cy="telephone_2"
              />

              
            </div>

        </div>
        {/* End of card 1 */}
          
          {/* Card 2 */}
          <div className = {cardClassName}>
            <div>
              {/* Event Cost */}
              <InputLabel htmlFor="cost" value="Cost" />

              <TextInput
                  id="cost"
                  value={formData.cost? formData.cost:''}
                  onChange={e => handleChange('cost', e.target.value)}
                  type="number"
                  className="mt-1 block w-full"
                  autoComplete="Name"
                  data-cy="cost"
              />

              <InputError message={errors.cost} className="mt-2" />
            </div>

            <div>
              {/* Event Deposits */}
              <div className="flex">
                <div className="text-xl text-gray-600">
                  Deposits
                </div>
                
                <button
                      type="button" 
                      onClick={() => addDepostField()}
                      data-cy="btn-add-deposit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded text-xl mb-2 ml-5" id="editButton">
                      <i className="fa-regular fa-plus"></i>
                </button>
              </div>
              
              {
                formData.payments.map((payment:EventPayment & {component_id:number}, index:number) => {
                  return (
                    <div key={index}>
                      <Payment
                          key={index}
                          component_id={payment?.component_id}
                          defaultDate={payment.date}
                          defaultPayment={payment.deposit}
                          payment_id={payment.id}
                          onChangeDate={(date, deposit, payment_id) => handlePaymentDate(date, deposit, payment_id)}
                          onChangeDeposit={(deposit, date, payment_id) => handlePayments(deposit, date, payment_id)}
                          onDepositRemove={(component_id:number|null, payment_id) => handleOnDepositRemove(component_id,payment_id)}
                        />
                    </div>
                  )
                })
              }

              <InputError message={errors.deposit} className="mt-2" />
            </div>
          </div>
          {/* end of card 2 */}

          
        {/* card 3 */}
        <div className={cardClassName}>
          <div className="ml-1">
            <InputLabel value="Select Date" />
            <DatePickerResponsive
              label="Select Date"
              onDateChange={(newDate) => handleChange('date',newDate)}
              defaultDate={formData.date}
            /> 
            {/* <InputError message={errors.date} className="mt-2" />        */}
          </div>

          <InputLabel value={`Event Time -  now::(${currentTime})`} />
          
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" 
              defaultChecked={!!formData.all_day} 
              onChange={(e) => handleChange('all_day', e.target.checked)} 
              className="sr-only peer"
              data-cy="all-day"/>

            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-xl font-medium text-gray-900 dark:text-gray-300">All Day</span>
          </label>
              {!formData.all_day ? 
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <TimePickerResponsive
                      label="Start Time"
                      onTimeChange={(newTime) => handleChange('start_time',newTime)}
                      defaultTime={formData.start_time}
                    />
                    <InputError message={errors.start_time} className="mt-2" />
                  </div>
                  <div>
                    <TimePickerResponsive
                      label="End Time"
                      onTimeChange={(endTime) => handleChange('end_time',endTime)}
                      defaultTime={formData.end_time}
                    />
                    <InputError message={errors.end_time} className="mt-2" />
                  </div>
                </div>: ''
                }
          <div className="text-center mb-5">
            <PrimaryButton processing={false} data-cy="submit" disabled={false}>Update Event </PrimaryButton>
          </div>

        </div>
        {/* end of card 3 */}
      
        
      </form>
      
    </AuthenticatedLayout>


  );
}