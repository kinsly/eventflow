import { Audio } from 'react-loader-spinner'
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Session } from '@/types';
export default function MenuItems({isSuperAdmin, session}:{isSuperAdmin:boolean, session:Session})
{
  const [processing, setProcessing] = useState(
    [
      {
        id:'events',
        processing:false
      },
      {
        id:'users',
        processing:false
      },
      {
        id:'business',
        processing:false
      },
      {
        id:'profile',
        processing:false
      },
      {
        id:'logout',
        processing:false
      },
      {
        id:'backups',
        processing:false
      }
    ]
  );

  const linkProcessing = (id:string) => {
    setProcessing(prev => 
      prev.map(item => item.id == id ? 
                      {...item, processing:true}
                      : item)
    )
  }

  const isProcessing = (id:string) => {
    return processing.find(item => item.id === id)?.processing;
  };


  const { url } = usePage()
  const loader = <Audio
                    height="20"
                    width="20"
                    color="#06ff06"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="px-5 py-2 absolute right-0 top-0"
                    visible={true}
                    />
  
  const linkClassName ="relative flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";
  const linkClassNameActive = "bg-gray-200";
  const linkClassNameProcessing = 'bg-white';
  const iconClass = "text-gray-500 text-lg"
  
  return(
    <div className=''>
      <li>
        <Link id="events" href={route('events', [session.selected_year, session.selected_business])} onClick={() => linkProcessing('events')} preserveState={false}
          className={`${url.startsWith('/events') && linkClassNameActive } ${linkClassName} ${isProcessing('events') && linkClassNameProcessing}`}>
            <i className={`fa-solid fa-calendar-check mr-3 ${iconClass}`} ></i>
            <span>Events </span> {isProcessing('events') && loader}
        </Link>
      </li>
      
      
      {
          isSuperAdmin && 
            <>
            <li>
              <Link id="users"  href={route('userRoles.index')} onClick={() => linkProcessing('users')} preserveState={false}
                className={`${url.startsWith('/user-roles') && linkClassNameActive} ${linkClassName} ${isProcessing('users') && linkClassNameProcessing}`}>
                  <i className={`fa-solid fa-user-pen mr-3 ${iconClass}`}></i>
                  Manage Users {isProcessing('users') && loader}
              </Link>
            </li>
            
            <li>
              <Link id="backups"  href={route('backups')} onClick={() => linkProcessing('backups')} preserveState={false}
                className={`${url.startsWith('/backups') && linkClassNameActive} ${linkClassName} ${isProcessing('backups') && linkClassNameProcessing}`}>
                  <i className={`fa-solid fa-database mr-3 ${iconClass}`}></i>
                  Backups {isProcessing('backups') && loader}
              </Link>
            </li>
            </>
              
      }

      <li>
        <Link id="business" data-cy="link-create-business" href={route('business.index')} onClick={() => linkProcessing('business')} preserveState={false}
          className={`${url.startsWith('/business') && linkClassNameActive} ${linkClassName} ${isProcessing('business') && linkClassNameProcessing}`} > 
            <i className={`fa-solid fa-briefcase mr-3 ${iconClass}`}></i>
            Create Business {isProcessing('business') && loader}
        </Link>
      </li>

      <li>
        <Link id="profile"  href={route('profile.edit')} onClick={() => linkProcessing('profile')} preserveState={false}
          className={`${url.startsWith('/profile') && linkClassNameActive} ${linkClassName} ${isProcessing('profile') && linkClassNameProcessing}`}>
            <i className={`fa-solid fa-user mr-3 ${iconClass}`}></i>
            Profile {isProcessing('profile') && loader}
        </Link>
      </li>

      

      <li>
        <Link id="logout" method="post" href={route('logout')} as="button" onClick={() => linkProcessing('logout')} preserveState={false}
          className={`${url.startsWith('/logout') && linkClassNameActive} ${linkClassName} ${isProcessing('logout') && linkClassNameProcessing}`}>
            <i className={`fa-solid fa-right-from-bracket mr-3 ${iconClass}`}></i>
            Log Out {isProcessing('logout') && loader}
        </Link>
      </li>
      
    </div>
  )
}