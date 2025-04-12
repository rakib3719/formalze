'use client'
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import logoImg from '@/assets/images/logo/formlazy white logo.png'
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiLogOut, FiUser } from "react-icons/fi";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import usePublicAxios from '@/hooks/usePublicAxios';

const Navbar = () => {
    const pathname = usePathname();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const session = useSession();
    const user =  session?.data?.user;
    console.log('User details:', user);
 
    const profileRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (pathname.includes('/sign-in') || pathname.includes('/sign-up') || pathname.includes('/frontend')) {
        return null;
    }
const publicAxios = usePublicAxios()


const handleLogout = async () => {

  const token = user?.token;
  console.log(token,'token to asei mama');

  try {
  const resp =   await publicAxios.post('/users/logout/', null, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    if(resp?.status === 200){
        await signOut({ redirect: false });
     window.location.href = '/sign-in';

        
    }
    console.log('Log out details:', resp);
  } catch (error) {
    console.log('Logout API error (proceeding anyway)', error);
  }

//   await signOut({ redirect: false });
//   window.location.href = '/sign-in';
};

    return (
        <div className='flex custom-navbar-shadow font-outfit py-4 z-40 px-4 sticky top-0 md:px-8 mx-auto custom-bg-navbar items-center justify-between'>
            {/* logo */}
            <section>
                <Image 
                    alt='logo' 
                    height={180} 
                    width={180} 
                    src={logoImg} 
                    className='w-24 lg:w-auto'
                />
            </section>
            
            {/* Navigation Links */}
            <section>
                <ul className='text-white mt-2 text-sm lg:text-lg flex gap-8'>
                    <Link href={'/'} className='hover:text-primary-200 transition-colors'>Home</Link>
                    <Link href={'/how-its-works'} className='hover:text-primary-200 transition-colors'>{`How it's Work`}</Link>
                    <Link href={'/feature'} className='hover:text-primary-200 transition-colors'>Feature</Link>
                    <Link href={'/templates'} className='hover:text-primary-200 transition-colors'>Templates</Link>
                    <Link href={'/pricing'} className='hover:text-primary-200 transition-colors'>Pricing</Link>
                    <Link href={'/my-form'} className='hover:text-primary-200 transition-colors'>My Form</Link>
                </ul>
            </section>
            
            {/* Icons Section */}
            <section className='flex items-center gap-6'>
                <button className='relative'>
                    <IoIosNotificationsOutline className='text-[30px] lg:text-[40px] text-white hover:text-primary-200 transition-colors' />
                    {/* <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                        3
                    </span> */}
                </button>
                
                {/* Profile Dropdown */}
              {  <div className='relative' ref={profileRef}>
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className='flex items-center gap-1 focus:outline-none'
                    >
                        <FaRegCircleUser className='text-[30px] lg:text-[40px] text-white hover:text-primary-200 transition-colors' />
                    </button>
                    
                    {/* Dropdown Menu */}
                    { user && isProfileOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-100'>
                            <div className='py-1'>
                                <div className='px-4 py-3 border-b border-gray-100'>
                                    <p className='text-sm font-medium text-gray-800'>{user?.username}</p>
                                    <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                                </div>
                                
                                <Link 
                                    href="/profile" 
                                    className='flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                >
                                    <FiUser className='mr-3 text-gray-500' />
                                    View Profile
                                </Link>
                                
                                <button 
                                
                                onClick={handleLogout}
                                className='w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'>
                                    <FiLogOut className='mr-3 text-gray-500' />
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>}
            </section>
        </div>
    );
};

export default Navbar;