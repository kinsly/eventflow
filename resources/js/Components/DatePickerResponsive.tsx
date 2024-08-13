import React, { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerResponsive(
    {label, onDateChange, defaultDate=null}:
    {label:string, onDateChange: (newDate:string|null)=> void, defaultDate?:null|string}) {
  
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  useEffect(()=>{
    if(defaultDate){setValue(dayjs(defaultDate))}
    

  },[])

  const handleDateChange = (newDate:Dayjs|null) => {
    if(newDate)
    {
      const formattedDate = newDate?.format('YYYY-MM-DD'); 
      onDateChange(formattedDate);
    }
    setValue(newDate);
    
  }
  
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          // label={label}
          value={value}
          onChange={(newValue) => handleDateChange(newValue)}
          className='block w-10 mx-4 cy-datapicker'
          
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}