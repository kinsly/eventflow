import ApplicationLogo from '@/Components/ApplicationLogo';
import BackBtn from '@/Components/BackBtn';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children, backBtnAction }: PropsWithChildren<{backBtnAction:string}>) {
    return (
        <>
        <div className="min-h-screen pt-6 sm:pt-0 bg-gray-100">
            <div className='left-4 top-4 absolute md:hidden lg:hidden'>
                <BackBtn action={backBtnAction}/>
            </div>
            <div className='flex flex-col sm:justify-center items-center'>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="m-auto w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
            
        </div>
        </>
        
    );
}
