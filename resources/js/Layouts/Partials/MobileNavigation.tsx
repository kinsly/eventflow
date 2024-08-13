import { slide as Menu } from 'react-burger-menu';
import MenuItems from './MenuItems';
import { Session } from '@/types';

export default function Navigation({isSuperAdmin, session}:{isSuperAdmin:boolean, session:Session})
{


  return(
    
    <Menu className='bg-gray-50 pt-5 pl-2' id="cy-menu">
      <ul>
        <MenuItems isSuperAdmin={isSuperAdmin} session={session}/>
      </ul>
    </Menu>
  )
}