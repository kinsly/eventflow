
export default function MonthBar({monthName}:{monthName:string})
{
  return(
    <>
      <div className='col-span-4 flex flex-col sticky top-10 z-30 shadow-lg'>
        <div className='mt-5 px-5 py-2 text-xl inline-flex items-center justify-between bg-green-500 text-white rounded-lg'>
          <div className="">
            <i className="fa-solid fa-calendar-days pr-2"></i>  {monthName}
          </div>
         
        </div>
      </div>
    </>
  )
}