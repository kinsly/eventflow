import { Business } from "@/types";
import { Link } from "@inertiajs/react";

export default function BusinessCard({business, onEdit, onDelete}:
  {business:Business, onEdit: (business:Business) => void, onDelete:(business:Business)=>void}){
  
  const handleBusinessEditForm = () => {
    onEdit(business)
  }

  const handleDeleteAlert = () => {
    onDelete(business);
  }

  return (
    <div>
      {/* Business Card item */}
      <div className="flex gap-10 p-4 bg-white rounded-xl shadow-md mx-3" data-cy="business-card">
        <div className="flex-grow">
            <h2 className="text-xl font-semibold text-gray-800" data-cy="business-name">{business.name}</h2>
            <p className="text-gray-500">{business.role}</p>
        </div>
        <div className="flex space-x-2">
            <button onClick={handleBusinessEditForm} data-cy="btn-edit-business" className="px-4 py-2 text-white bg-blue-500 rounded">Edit</button>
            <button onClick={handleDeleteAlert} data-cy="btn-delete-business" className="px-4 py-2 text-white bg-red-500 rounded">Delete</button>
        </div>
      </div>
    </div>
    
  )
}