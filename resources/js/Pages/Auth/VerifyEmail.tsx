import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { PageProps } from '@/types';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function VerifyEmail({ status,auth, errors }: PageProps<{ status?: string }>) {
    const { post, processing } = useForm({});
    const [showChangeMail, setShowChangeMail] = useState(false);
    const [email, setEmail] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };
    
    const handleToggleChangeMailForm = () => {
      setShowChangeMail(prev => !prev);  
    }

    const handleChangeEmail: FormEventHandler = (e) => {
        e.preventDefault();
        router.visit(route('profile.email.update'), {
            method: 'patch',
            data: {
                email:email
            },
            replace: false,
            preserveState: true,
            preserveScroll: true,
            onSuccess: page => {
                setShowChangeMail(false)
            },
          })
    }
    return (
        <GuestLayout backBtnAction=''>
            <Head title="Email Verification" />

            <div className="mb-4 text-l text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}
            <div className='flex gap-5'>
                <div>Email {auth.user.email} </div>
                <PrimaryButton className='bg-amber-700' onClick={handleToggleChangeMailForm}>
                {showChangeMail? 'Cancel': 'Change Email'}      
                </PrimaryButton>

            </div>

            {
                showChangeMail && <form className='space-y-3' onSubmit={handleChangeEmail}>
                                        <div>
                                            <InputLabel> Email Address</InputLabel>
                                            <TextInput 
                                                type='text'
                                                onChange={(e) => setEmail(e.target.value)}/>
                                            <InputError message={errors.email}/>
                                        </div>
                                        <div>
                                            <PrimaryButton type='submit'>Update</PrimaryButton>
                                        </div>
                                    </form>    
            }
            
           {
            !showChangeMail &&  <form onSubmit={submit}>
            <div className="mt-4 flex items-center justify-between">
                <PrimaryButton disabled={processing}>Resend Verification Email</PrimaryButton>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Log Out
                </Link>
            </div>
        </form>
           }
        </GuestLayout>
    );
}
