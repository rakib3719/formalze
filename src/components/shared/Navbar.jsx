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
    // Hooks and state
    const pathname = usePathname();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const session = useSession();
    const user = session?.data?.user;
    const publicAxios = usePublicAxios();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle logout functionality
    const handleLogout = async () => {
        try {
            const resp = await publicAxios.post('/users/logout/', null, {
                headers: { 'Authorization': `Token ${user?.token}` }
            });
            
            if(resp?.status === 200) {
                await signOut({ redirect: false });
                window.location.href = '/sign-in';
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Proceed with logout even if API fails
            await signOut({ redirect: false });
            window.location.href = '/sign-in';
        }
    };
    if( pathname.includes('/formView') && !user){
        return null;
    }

    // Don't render navbar on auth pages
    if ( pathname.includes('/sign-in') || pathname.includes('/sign-up') || pathname.includes('/frontend')  ) {
        return null;
    }

    // Navigation links data
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/how-its-works', label: 'How it\'s Work' },
        { href: '/feature', label: 'Feature' },
        { href: '/templates', label: 'Templates' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/my-form', label: 'My Form' }
    ];

    return (
        <header className='flex custom-navbar-shadow font-outfit py-4 z-40 px-2 sticky top-0 md:px-8 mx-auto custom-bg-navbar items-center justify-between'>
            {/* Logo */}



                
            {/* Logo Section */}
            <div>
              <Link
              href={'/'}
              className='cursor-pointer mt-16 lg:mt-0 ml-32 lg:ml-0'>
                <Image 
                    alt='FormLazy Logo' 
                    height={180} 
                    width={180} 
                    src={logoImg} 
                    className={`w-24 ${user ? '-mt-[20px]' : '-mt-[28px]'} lg:-mt-0 ml-16 lg:ml-0 lg:w-auto`}
                    priority
                />
              </Link>
            </div>
            
            {/* Navigation Links */}
            <nav>
                {/* <ul className='text-white mt-2 text-sm lg:text-lg flex gap-8'>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link 
                                href={link.href} 
                                className='hover:text-primary-200 transition-colors'
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul> */}
            </nav>
            
            {/* Icons Section */}
           {user ? (
                <div className='flex items-center gap-6'>
                    {/* Notification Button */}
                    <button 
                        className='relative'
                        aria-label='Notifications'
                    >
                        <IoIosNotificationsOutline className='text-[30px] lg:text-[40px] text-white cursor-pointer hover:text-primary-200 transition-colors' />
                    </button>
                    
                    {/* Profile Dropdown */}
                    <div className='relative' ref={profileRef}>
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className='flex items-center gap-1 focus:outline-none'
                            aria-label='User profile'
                        >
                            <FaRegCircleUser className='text-[30px] lg:text-[40px] text-white hover:text-primary-200 cursor-pointer transition-colors' />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-100'>
                                <div className='py-1'>
                                    {/* User Info */}
                                    <div className='px-4 py-3 border-b border-gray-100'>
                                        <p className='text-sm font-medium text-gray-800'>{user?.username}</p>
                                        <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                                    </div>
                                    
                                    {/* Profile Link */}
                                    <Link 
                                        href="/profile" 
                                        className='flex cursor-pointer items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <FiUser className='mr-3 text-gray-500' />
                                        View Profile
                                    </Link>
                                    
                                    {/* Logout Button */}
                                    <button 
                                        onClick={handleLogout}
                                        className='w-full flex cursor-pointer items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                    >
                                        <FiLogOut className='mr-3 text-gray-500' />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='flex items-center '>
                    <Link 
                        href="/sign-in" 
                        className='px-5 py-2.5 rounded-md border-[#1A1466] text-white font-medium rounded-r-none border-r-0 hover:bg-opacity-10 transition-colors whitespace-nowrap border btn-primary  border-opacity-20'
                    >
                        Log in
                    </Link>
                    
                    <Link 
                        href="/sign-up" 
                        className='px-5 py-2.5 border-[#1A1466] rounded-md rounded-l-none  font-medium bg-third text-[#1A1466] hover:bg-opacity-90 transition-colors whitespace-nowrap shadow-md'
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;