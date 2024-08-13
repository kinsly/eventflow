import Alert from "@/Components/Alert";
import Modal from "@/Components/Modal";
import RoleUserEditForm from "@/Components/RoleUserEditForm";
import UserRoleCard from "@/Components/UserRoleCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head } from '@inertiajs/react';
import { useState } from "react";

export default function Index({auth, users, roles, session}:PageProps<{users:User[], roles:string[]}>)
{
  const [showAlert,  setShowAlert] = useState(false);
  const [editFormUser, setEditFormUser] = useState<User|null>(null);

  const handleAlertClose = () => {
    setShowAlert(false);
  }

  const handleUserCardClick = (user: User) => {
    setShowAlert(true);
    setEditFormUser(user);
  }
  
  return (
    <AuthenticatedLayout
            backBtn=""
            user={auth.user}
            session={session}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage User Roles</h2>}
        >
          <Head title="Manage User Roles" />

          {
            users.map((user, index) => {
              return(
                <span key={index}>
                  <UserRoleCard user={user} userCardClick={(user:User) =>handleUserCardClick(user)}/>
                </span>
              )
            })
          }

          <RoleUserEditForm roles = {roles} user={editFormUser} showAlert={showAlert} handleAlertClose={handleAlertClose}/>

    </AuthenticatedLayout>

  )
}