import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import BackupTableItem from "./Partials/TableItem";
import { ToastContainer, toast } from 'react-toastify';

export default function BackupIndex({auth, backups, session}:PageProps<{backups:string[]}>)
{
  const [processingDelete, setProcessingDelete] = useState<number|null>(null);

  const handleBackupDownload = (backup:string) => {
    let fileName = backup.split('/').pop();
    let url = route('backups.download',[fileName]);
    window.location.href = url
    
  }

  const handleBackupDelete = (backup:string, index:number) => { 
    setProcessingDelete(index);
    let url = route('backups.delete')
    let fileName = backup.split('/').pop();
    router.visit(url, {
      method: 'delete',
      data: {
        fileName:fileName
      },
      replace: false,
      preserveState: true,
      preserveScroll: true,
      onSuccess: page => { 
        setProcessingDelete(null)
        toast('backup deleted successfully')
      },
    })
  }


  return(
    <Authenticated
      backBtn=""
      user={auth.user}
      session={session}>
      <ToastContainer/>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-xl text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  backups.map((backup,index) => {
                    return(
                      <BackupTableItem
                        key={index}
                        index={index}
                        backup={backup}
                        processing={processingDelete === index}
                        onBackupDelete={(fileName:string) => handleBackupDelete(fileName, index) }
                        onBackupDownload={(fileName:string) => handleBackupDownload(fileName)}
                      />
                    ) 
                    
                  })
                }
                  
              </tbody>
          </table>
      </div>

  </Authenticated>
  )
}