import { useEffect, useState } from "react"
import { Role, User } from "@/types"
import Alert from "./Alert"
import { router } from "@inertiajs/react";

export default function RoleUserEditForm( {showAlert, handleAlertClose, user, roles}:
                                          {showAlert:boolean, handleAlertClose: () => void,user:User|null, roles:string[]})
{
  
  const [selectedRole, setSelecetedRole] = useState('');
  const [processingAssignRole, setProcessingAssignRole] = useState(false);
  const [processingRemoveRole, setProcessingRemoveRole] = useState<{[key:string]:boolean}>({});
  const [editUser, setEditUser] = useState<User|null>(null);

  useEffect(() => {
   setEditUser(user) 
  },[user])

  const handleRoleChange = (role:string) => {
    setSelecetedRole(role);
  }

  const handleAssignRole = () =>{
    setProcessingAssignRole(true);
    router.visit(route('userRoles.store'), {
      method: 'post',
      data: {
        role:selectedRole,
        user_id: user?.id
      },
      replace: true,
      preserveState: true,
      preserveScroll: true,
      only: ['users'],
      onSuccess: (data) => {
        setProcessingAssignRole(false)
        var newRole:Role = {
          created_at:"",
          guard_name:"",
          id:"1",
          name:selectedRole,
          updated_at:""
        } 
        setEditUser(prevEditUser => ({
          ...prevEditUser!,
          roles: prevEditUser!.roles.concat(newRole),
        }));
      }
    })
  }

  const handleRemoveRole = (roleName:string) => {
    setProcessingRemoveRole(prev => ({...prev,[roleName]:true }))
    router.visit(route('userRoles.delete'), {
      method: 'delete',
      data: {
        role:roleName,
        user_id: user?.id
      },
      replace: false,
      preserveState: true,
      preserveScroll: true,
      only: ['users'],
      onSuccess: (data) => {
        setProcessingRemoveRole( prev => ({...prev, [roleName]:false}))        
        
        setEditUser(prevEditUser => ({
          ...prevEditUser!,
          roles: prevEditUser!.roles.filter(role => role.name !== roleName),
        }));
        
      }
    })
  }

  return (
    <Alert showAlert={showAlert} alertClose={handleAlertClose}>
  
      <div className="w-full bg-white p-1">
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-bold">{user?.name}</p>
          {/* <div>
            <button className="text-red-500 mr-2">Remove</button>
            <button className="text-red-500" onClick={handleAlertClose}>Cancel</button>
          </div> */}
        </div>

        
        <p className="mb-4"> {user?.email} </p>

        
        <div className="flex items-center mb-4">
          <div className="flex flex-col flex-wrap mr-4">

            {
              editUser?.roles.map((role, index) => {
                return <div className="mb-4" key={index}>
                        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{role.name}</span>
                        <button className="text-red-500" onClick={() => handleRemoveRole(role.name)} disabled={processingRemoveRole[role.name]}>
                          {processingRemoveRole[role.name]? "processing.." : "Delete"}
                        </button>
                      </div>
              })
            }
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Add User Roles</label>
          <div className="flex">
            
            <select onChange={(e) => handleRoleChange(e.target.value)} className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded">
              <option value="select">Select</option>
              {
                roles.map((role, index) => {
                  return <option key={index} value={role}>{role}</option>
                })
              }
            </select>
            <button disabled={processingAssignRole} onClick={handleAssignRole} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
              {processingAssignRole? "Processing..": "Add"}
            </button>

          </div>
        </div>
      </div>
    </Alert>
  )
}