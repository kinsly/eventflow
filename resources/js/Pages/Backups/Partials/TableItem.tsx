import { router } from "@inertiajs/react";
import { useState } from "react";
import { Oval } from 'react-loader-spinner'


export default function BackupTableItem({index, backup, processing, onBackupDownload, onBackupDelete}:
    {index:number, backup:string, processing: boolean, onBackupDownload: (fileName:string) => void, onBackupDelete:(fileName:string) => void})
{
  
  const loader = <Oval
      visible={true}
      height="20"
      width="20"
      color="red"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
  return(
      <tr key={index} className="border-b text-lg border-gray-200 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
            {index}
        </th>
        <td className="px-6">
            ....
        </td>
        <td className="px-6 bg-gray-50 dark:bg-gray-800">
        <i className="fa-solid fa-file-zipper"></i> {backup.split('/').pop()}
        </td>
        <td className="px-6 space-x-5 flex mt-5">
          <i className="fa-solid fa-file-arrow-down text-blue-500"
          onClick={() => onBackupDownload(backup)}></i>
          {processing ?
          loader:
          <i className="fa-solid fa-trash text-red-600" onClick={() => onBackupDelete(backup)}></i>
          }
          
        </td>
    </tr>
  )
}