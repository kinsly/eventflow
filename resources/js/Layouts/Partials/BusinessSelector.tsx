import AlertForm from "@/Components/Alerts/AlertForm";
import BusinessCard from "./BusinessCard";
import { Business, Session, User } from "@/types";

export default function BusinessSelector({businesses, user, onClose, session}:
    {businesses?:Business[], user:User, onClose:() => void, session:Session})
{
  
  const handleAlertClose = () => {
    onClose();
  }
  const personal:Business= {
    id:'',
    name:user.name,
    role:"Peronal account"    
  }
  return (
    <AlertForm isAlert={true} onAlertClose={handleAlertClose} data-cy="available-businesses">
      <BusinessCard business={personal} session={session}/>
      {
        businesses?.map((business, index) => {
          return (
            <BusinessCard business={business} key={index} session={session}/>
          )
        })
      }
    </AlertForm>
  )
}