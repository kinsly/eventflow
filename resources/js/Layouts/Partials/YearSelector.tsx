import { useEffect, useState } from "react";
import Alert from "@/Components/Alert"
import AlertForm from "@/Components/Alerts/AlertForm";
import dayjs from "dayjs";
import { Link } from "@inertiajs/react";
import { Session } from "@/types";

export default function YearSelector({session}:{session:Session})
{
  const [isAlert, setIsAlert] = useState(false);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  useEffect(() => {
    const years = getYears()
    setAvailableYears(years);
  },[])
  

  const getYears = () => {
    const currentYear = dayjs().year();

    const startYear = 2024;//Do not change this. 
    let yearsArray = [];

    // Loop from startYear to currentYear, incrementing by 2
    for (let year = startYear; year <= currentYear+2; year ++) {
        yearsArray.push(year);
    }
    return yearsArray;
  }

  const handleYearClick = () => {
    setIsAlert(true)
  }

  const handleAlertClose = () => {
    setIsAlert(false)
  }

  /**
   * @param year 
   * Set selected year on session variable of on server side with a 
   * manual inertia visit to events route
   */
  const onYearSelect = (year:number) => {

  }
 
  return (<>
  
      <div className='mt-4 mx-5 px-5 py-1 text-xl overflow-hidden relative bg-green-300 rounded-lg' 
            onClick={handleYearClick} data-cy="year-selector"> {session.selected_year}
      </div>

      <AlertForm isAlert={isAlert} onAlertClose={handleAlertClose} data-cy="available-years">
        Select Year:
        <div className="grid grid-cols-3 gap-3 mt-4 items-center">
          {
            availableYears.map((year, index) => {
              return (
                <Link href={route('events',[year, session.selected_business])} className="bg-gray-300 shadow-xl rounded-xl px-4 py-7 text-center" key={index} 
                  onClick={() => onYearSelect(year)}>
                  {year}
                </Link>
              )
            })
          }
        </div>
      </AlertForm>
  </>)
}