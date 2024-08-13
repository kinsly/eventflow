import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, router } from "@inertiajs/react";
import { CustomFormData, EventFormData, EventPayment, PageProps } from "@/types";
import TimePickerResponsive from "@/Components/TimePickerResponsive";
import DatePickerResponsive from "@/Components/DatePickerResponsive";
import dayjs from "dayjs";
import {FormEvent, ReactNode, useEffect, useState } from "react";

import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import Payment from "@/Pages/Event/Partials/Payment";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";


export default function AddTask({auth, errors,session}:PageProps)
{

  const [currentTime, setCurrentTime] = useState(dayjs().format("hh:mm:ss A"));
  
  const [depositComps, setDepositComps] = useState<ReactNode[]>([]);

  const cardClassName = "bg-white mx-2 my-3 rounded-xl px-3 py-3 pb-10 space-y-6 shadow-xl";
  
  const [formData, setFormData] = useState<CustomFormData<EventFormData>>({
    name:'',
    description:'',
    date:dayjs().format('YYYY-MM-DD'),
    start_time:'',
    end_time:'',
    all_day:false,
    telephone_1:'',
    telephone_2:'',
    cost:null,
    payments:[],
    business_id:session.selected_business,
  })


  /** Update form data */
  const handleChange = (key:string, value:string|number|boolean|null) => {
    setFormData(values => ({
        ...values,
        [key]: value,
    }))

    console.log(formData)
  }

  // Update payments or deposits array with date
  const handlePaymentDate = (date:string|null, component_id:number) => {

    setFormData( values => {
      const updatedDate = values.payments.map((payment:EventPayment & {component_id:string  }) =>{
        if(component_id == parseInt(payment.component_id)) return {...payment, date:date}

        //Return payment if nothing updated
        return payment;
      })

      return {...values, payments:updatedDate}
    })
  };

  // Update payments or deposits array
  const handlePayments = (deposit:number|undefined, component_id:number) => {
    setFormData(values => {
      
      const updatedDeposit = values.payments.map((payment:EventPayment & {component_id:string}) =>{
        if(component_id == parseInt(payment.component_id)) return {...payment, deposit:deposit}
        return payment;
      })

      return {...values, payments: updatedDeposit}
      
    });
  }

  /**Handle form submittion with inertia manual links */
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()
    var url = route('events.store');
    router.visit(url, {
        method: 'post',
        data:formData,
        replace: false,
        preserveState: true,
        preserveScroll: true,
        onSuccess: page => {},
      })
  }  

  const addDepostField = ()=>{
    setFormData( values => {
      const key = Object.keys(values.payments).length.toString();
      var newDeposit = {
        id:'',
        date:dayjs().format('YYYY-MM-DD'),
        event_id: '',
        deposit:0,
        component_id:key
      }
      return {
        ...values,
       payments: [...values.payments, newDeposit],
       
      }
    })
  }

  const handleOnDepositRemove = (component_id:number|null) => {
    setFormData(values => {
      
      return {
        ...values,
        payments: values.payments.filter( (payment: EventPayment & {component_id:string}) => parseInt(payment.component_id) != component_id)
      }
    })
  }
  debugger
  return (
    <AuthenticatedLayout
        user={auth.user}
        header= {<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Event </h2>}
        backBtn={route('events',[session.selected_year, session.selected_business])}
        session={session}
    >
      <Head title="Add Task or Event" />

      <form onSubmit={handleSubmit}>

          {/* Card 1 */}
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

              <InputError message={errors.name} className="mt-2" data-cy="error-name" />
            </div>

            <div>
              {/* Event Description Field */}
              <InputLabel htmlFor="description" value="Description" />

              <TextAreaInput
                  id="description"
                  // ref={currentPasswordInput}
                  // value={data.current_password}
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
          {/* end of card 1 */}

          {/* Card 2 */}
          <div className={cardClassName}>

            <div>
              {/* Event Cost */}
              <InputLabel htmlFor="cost" value="Cost" />

              <TextInput
                  id="cost"
                  value={formData.cost? formData.cost:''}
                  onChange={e => handleChange('cost', e.target.value)}
                  type="number"
                  className="mt-1 block w-full"
                  autoComplete="cost"
                  data-cy="cost"
              />

              <InputError message={errors.cost} className="mt-2" />
            </div>

            <div>
              {/* Event Deposits */}
              <div className="flex">
                <InputLabel htmlFor="deposits" value="Deposits" />
                <button
                      type="button"
                      data-cy='btn-add-deposit' 
                      onClick={() => addDepostField()}
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
                          onChangeDate={(date, deposit) => handlePaymentDate(date, deposit)}
                          onChangeDeposit={(deposit, date) => handlePayments(deposit, date)}
                          onDepositRemove={(component_id:number|null) => handleOnDepositRemove(component_id)}
                        />
                    </div>
                  )
                })
              }

              <InputError message={errors.deposit} className="mt-2" />
            </div>

          </div>
          {/* end of card 2 */}


          {/* Card 3 */}
          <div className={cardClassName}>
            <div className="ml-1">
              <InputLabel value="Select Date" />
              <DatePickerResponsive
                label="Select Date"
                onDateChange={(newDate) => handleChange('date',newDate)}
              /> 
              {/* <InputError message={errors.date} className="mt-2" />        */}
            </div>

            <InputLabel value={`Event Time -  now::(${currentTime})`} />
            
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" 
                defaultChecked={true} 
                onChange={(e) => handleChange('all_day', e.target.checked)} data-cy='all-day' className="sr-only peer"/>
                
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-xl font-medium text-gray-900 dark:text-gray-300">All Day</span>
            </label>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <TimePickerResponsive
                  label="Start Time"
                  onTimeChange={(newTime) => handleChange('start_time',newTime)}
                />
                <InputError message={errors.start_time} className="mt-2" />
              </div>
              <div>
                <TimePickerResponsive
                  label="End Time"
                  onTimeChange={(endTime) => handleChange('end_time',endTime)}
                />
                <InputError message={errors.end_time} className="mt-2" />
              </div>
            </div>
            <div className="text-center">
              <PrimaryButton processing={false} disabled={false} data-cy="submit">Create new Event </PrimaryButton>
            </div>
          </div>
          {/* end of card 3 */}

      </form>
      
    </AuthenticatedLayout>


  );
}