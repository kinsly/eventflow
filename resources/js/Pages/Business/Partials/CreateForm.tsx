import AlertForm from "@/Components/Alerts/AlertForm";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

export default function BusinessCreateForm()
{
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { data, setData, reset, post, processing, errors } = useForm({
    name: '',
  })

  const handleAlertFormClose = () => {
    setIsAlertOpen(false);
  }

  const handleBusinessCreateAlert = () => {
    setIsAlertOpen(true);
  }

  function submit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    var url = route('business.store');
    post(url,{
      onSuccess: () => {
        reset('name');
        setIsAlertOpen(false);
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
                  data-cy="input-business-name"
              />
              <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="float float-end m-3">
              <PrimaryButton disabled={processing} className="mr-3" data-cy="submit">
                {processing ?'...loading': 'Create New' }   
              </PrimaryButton>
              <SecondaryButton onClick={handleAlertFormClose}>Cancel</SecondaryButton>
          </div>
        </form>  
      </AlertForm> 
      {/* Flating business add button */}
      
      <div className="fixed bottom-4 right-1 md:right-1/3 lg:right-1/3" data-cy="btn-create-business" onClick={handleBusinessCreateAlert}>
        <span className="inline-flex items-center justify-center rounded-full text-green-700 p-2">
          <i className="fa-solid fa-circle-plus text-5xl text-red-600"></i> 
        </span>
      </div>

    </div>
  
  )
}