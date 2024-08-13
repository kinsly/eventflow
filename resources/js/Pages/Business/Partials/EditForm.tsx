import AlertForm from "@/Components/Alerts/AlertForm";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Business } from "@/types";

import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

export default function BusinessEditForm({business, onFormClose}:{business:Business, onFormClose: (status:boolean)=>void})
{
  const [isAlertOpen, setIsAlertOpen] = useState(true);

  const { data, setData, reset, put, processing, errors } = useForm({
    name: business.name,
    id:business.id
  })

  const handleAlertFormClose = () => {
    onFormClose(true);
    setIsAlertOpen(false);
  }

  function submit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    var url = route('business.update',[business.id]);
    put(url,{
      onSuccess: () => {
        reset('name');
        onFormClose(true);
      },
    });
  }

  return (
    <div>
      <AlertForm isAlert={isAlertOpen} onAlertClose={handleAlertFormClose}>
        <form onSubmit={submit}>
          <div>
            <InputLabel>Business Name:</InputLabel>
            <TextInput
                  id="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  type="text"
                  className="mt-1 block w-full"
                  autoComplete="Name"
                  placeholder="Your Business Name"
                  data-cy="input-edit-business"
              />
              <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="float float-end m-3">
              <PrimaryButton disabled={processing} data-cy="submit-edit-business">
              {processing ?'...loading': 'Update' }   
              </PrimaryButton>
              <SecondaryButton onClick={handleAlertFormClose}>Cancel</SecondaryButton>
          </div>
        </form>  
      </AlertForm> 
    </div>
  
  )
}