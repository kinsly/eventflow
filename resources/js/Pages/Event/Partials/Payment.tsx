import { PropsWithChildren, useState } from "react";
import DatePickerResponsive from "../../../Components/DatePickerResponsive";
import TextInput from "../../../Components/TextInput";
import { router } from "@inertiajs/react";

export default function Payment({
  component_id,
  defaultDate,
  defaultPayment='',
  payment_id='',
  onChangeDeposit,
  onChangeDate,
  onDepositRemove,
}: { 
  component_id:number,
  defaultDate:string|null,
  defaultPayment?:number|string,
  payment_id?:string,
  onChangeDeposit:(deposit:number, component_id:number, payment_id?:string) =>void,
  onChangeDate:(date:string|null, component_id:number, payment_id?:string)=>void
  onDepositRemove?:(component_id:number|null, payment_id?:number)=>void
})
{

  const [deposit, setDeposit] = useState<number>();
  const [date, setDate] = useState<string|null>(null);
  const [processDelete, setProcessDelete] = useState(false);

  const handleChangeDeposit = (val:number) => {
    setDeposit(val);
    onChangeDeposit(val, component_id, payment_id);
  }

  const handleDateChange = (date:string|null) => {
    setDate(date)
    if(!deposit){
      setDeposit(0)
    }
    onChangeDate(date, component_id, payment_id)
  }

  const handleDepositRemove = () => { 
    setProcessDelete(true)
    
    if(payment_id){
      if(onDepositRemove) onDepositRemove(null, parseInt(payment_id));  
    }else{
      if(onDepositRemove) onDepositRemove(component_id);
    }
  }

  return(
    <div className="flex justify-between">
        <TextInput
            id="deposits"
            // value={data.name}
            defaultValue={defaultPayment? defaultPayment:''}
            onChange={(e) => handleChangeDeposit(parseInt(e.target.value))}
            type="number"
            className="mt-1 block w-1/3 mr-2"
            autoComplete="off"
            data-cy='input-deposit'
        />
      
        <DatePickerResponsive
          label="Select Date"
          defaultDate={defaultDate}
          onDateChange={(newDate) => handleDateChange(newDate)}
        /> 

      <div onClick={handleDepositRemove}>
        {
          processDelete ? "...": <i className="bg-red-700 mt-2 p-2 text-white fa-solid fa-trash-can"></i>
        }
        
      </div>                
    </div>
  )
}