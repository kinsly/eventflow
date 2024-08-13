import { Business } from "@/types"
import BusinessCard from "./BusinessCard"
import BusinessEditForm from "./EditForm"
import { useState } from "react"
import AlertAreYourSure from "@/Components/Alerts/AlertAreYouSure"
import { router } from "@inertiajs/react"

export default function BusinessCards({businesses}: {businesses:Business[]})
{
  const [selectedBusiness, setSelectedBussiness] = useState<Business|null>(null)
  const [isEditBusiness, setIsEditBusiness] = useState<boolean>(false);
  const [isDeleteBusiness, setIsDeleteBusiness] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false)
  /**
   * Show business edit modal 
   * @param business 
   */
  const handleBusinessEdit = (business:Business) => {
    setIsEditBusiness(true)
    setSelectedBussiness(business);
  }

  /**
   * Hide business edit form
   */
  const handleEditFormClose = () => {
    setIsEditBusiness(false)
    setSelectedBussiness(null)
  }

  /**
   * Show confirmation modal for business delete
   * @param business 
   */
  const handleOnBusinessDelete = (business:Business) => {
    setIsDeleteBusiness(true)
    setSelectedBussiness(business);
  }

  /**
   * Perform business delete action
   */
  const handleBusinessDelete = () => {
    setProcessing(true);
    let url = route('business.delete',[selectedBusiness?.id])
    router.visit(url, {
      method: 'delete',
      data: {},
      replace: false,
      preserveState: false,
      preserveScroll: false,
      onSuccess: () => { setProcessing(false)},
    })
  }

  /**
   * Hide confirmation modal of business delete on cancel and success
   */
  const handleAlertClose = () => {
    setIsDeleteBusiness(false)
  }

  return (
    <div className="space-y-4 mt-10">
        {
          // Show all created business
          businesses.map((business, index) => {
            return (
                  <BusinessCard business={business} key={index} 
                    onEdit={(business:Business) => handleBusinessEdit(business)}
                    onDelete={(business:Business) => handleOnBusinessDelete(business)}/>
            )
          })
        }
    {
      // Business Edit
      selectedBusiness && isEditBusiness &&(
        <BusinessEditForm 
          business={selectedBusiness}
          onFormClose={handleEditFormClose}
          />
      )
    }

    {
      // Business Delete
      selectedBusiness && isDeleteBusiness && (
        <AlertAreYourSure 
            isAlert={true} 
            onAlertDelete={handleBusinessDelete} 
            onAlertClose={handleAlertClose}
            processing={processing}
        />
      )
    }
        
    </div>
  )

}