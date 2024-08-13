import { User } from "@/types";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import Modal from "./Modal";

export default function UserRoleCard({user, userCardClick}:{user:User, userCardClick: (user:User) => void})
{
  
  const handleUserCardClick = () => {
    userCardClick(user)
  }

  return(
    
    <div onClick={handleUserCardClick} className="mb-2 mt-2  bg-white shadow-md rounded-md">
      <div className="p-4">
        <div className="flex items-center justify-between space-x-4 p-2">
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
          </div>
          
          <div className="space-x-3">
            {
              user.roles.map((role, index) =>{
                return(
                  <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">{role.name}</span>      
                )
              })
            }
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Email: {user.email}</p>
      </div>
    </div>
  );
}