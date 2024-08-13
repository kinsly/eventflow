import { useState, PropsWithChildren, ReactNode, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { Session, User } from '@/types';
import BackBtn from '@/Components/BackBtn';

import BusinessSelector from './Partials/BusinessSelector';
import MobileNavigation from './Partials/MobileNavigation';
import StaticNavigation from './Partials/WebNavigation';
import 'react-toastify/dist/ReactToastify.css';
import YearSelector from './Partials/YearSelector';

export default function Authenticated({ user, header, children, backBtn='', session }: 
            PropsWithChildren<{ user: User, header?: ReactNode, backBtn:string, session:Session }>) {
    
    const [isburgerMenu, setIsBurgerMenu] = useState(true);

    // update showing react burger menu based on screen size
    useEffect(() => { 
        
        const isMdOrLg = window.innerWidth < 768;
        setIsBurgerMenu(isMdOrLg); 

        const handleResize = () => {
            const isMdOrLg = window.innerWidth < 768;
            setIsBurgerMenu(isMdOrLg); // Update isOpen based on screen size
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);
              
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    /** Check logged in user role is super admin to display super admin only links */
    const isSuperAdmin = user.roles.some(role => role.name === "Super Admin");
    
    const [showBusinessSelector, setShowBussinessSelector] = useState(false);

    const handleBusinessSelector = () => {
        setShowBussinessSelector(true);
    }

    const handleBusinessSelectorClose = () => {
        setShowBussinessSelector(false)
    }
    
    // get selected business from server session
    const selectedBusiness = user?.businesses?.find(business => parseInt(business.id) == session.selected_business)
    return (
        <div>
            {!isburgerMenu && <StaticNavigation isSuperAdmin={isSuperAdmin} session={session}/>}
            <div className="md:ml-64 lg:ml-64 mt-20 flex justify-center  h-screen">
                <div className='absolute top-0 left-0'>
                    {/* fixed below div */}
                    <div className='grid grid-cols-5 gap-1 shadow-xl fixed bg-white w-full z-50'>
                        {/* Menu icon */}
                        <div className='text-xl leading-10 text-white'>
                            {isburgerMenu && <MobileNavigation isSuperAdmin={isSuperAdmin} session={session}/> }
                        </div>
                        {/* end of menu icon */}

                        {/* App bar middle  */}
                        <div className='flex col-span-3 justify-center'>
                                
                            <div className='min-w-32'>
                                <div className='mt-4 px-5 py-1 text-xl overflow-hidden relative bg-green-300 rounded-lg' 
                                    onClick={handleBusinessSelector} data-cy="business-selector">
                                    {
                                        selectedBusiness ?<>{selectedBusiness.name.substring(0, 30)} &nbsp;</>:
                                                <>{user.name} &nbsp;</>
                                    }
                                </div>

                                {
                                    showBusinessSelector && (
                                        <BusinessSelector
                                            session={session}
                                            user={user} 
                                            businesses={user.businesses}
                                            onClose={handleBusinessSelectorClose}
                                            />)
                                }
                            </div>

                            {/* Year Selector */}
                            <div className='float-end'>
                               <YearSelector session={session} />
                            </div>

                        </div>
                        {/* end of app bar middle */}

                        {/* App Logo */}
                        <div>
                            <div className="flex py-3 px-3">
                                <div className="shrink-0 flex items-center">
                                    {
                                        backBtn ? <BackBtn action={backBtn}/>:
                                        <Link href="/">
                                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                        </Link>
                                    }
                                    
                                </div>

                                {/* <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink href={route('events')} active={route().current('events')}>
                                        Dashboard
                                    </NavLink>
                                </div> */}
                            </div>

                        </div>
                        
                        
                        {/* End of app logo */}

                    </div>
                </div>  
                
                
                
                
                    <main>
                            {header && (
                                    <div className='px-5 text-center'>
                                {header}
                            </div>
                        )}
                        {children}
                    </main>    
                
                

            </div>

        </div>


    );
}
