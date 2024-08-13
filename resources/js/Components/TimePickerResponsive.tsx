/**
 * Datepicker docs: https://mui.com/x/react-date-pickers/getting-started/
 */

import React, { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePickerResponsive({label, onTimeChange, defaultTime=''}:
    {label:string, onTimeChange:(newTime: string|null) => void, defaultTime?:string}) {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  useEffect(() =>{
    if(defaultTime !== '' && defaultTime !== null ){ 
      const time = dayjs(defaultTime, 'HH:mm:ss');
      setValue(time)
    }
    
  },[])

  const handleTimeChange = (newTime:Dayjs|null) => { 
    if (newTime) {
      const timeString = newTime.format('HH:mm:ss');
      onTimeChange(timeString)
    } 
    
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={value}
          label={label}
          onChange={(newTime) => handleTimeChange(newTime)}
          className='cy-time-picker'
        />
      
    </LocalizationProvider>
  );
}