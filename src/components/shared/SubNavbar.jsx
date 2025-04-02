'use client'
import { usePathname } from 'next/navigation';
import React from 'react';
import { IoIosSearch } from 'react-icons/io';

const SubNavbar = () => {

     const pathname = usePathname();
        if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
            return null;
        }
        if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
        return null;
        }
        if (pathname.includes('/frontend') || pathname.includes('/frontend')) {
            return null;
            }
    return (
        <div className='px-4  z-50 flex justify-between py-6  border-b fixed w-full border-[#00000059]'>
         <section className=''>
         <div className=' '>


</div>
         </section>
            <section className=''>
            <div className="relative w-full product_search_input">
            <input
                className="px-4 border-primary  py-2 border border-border rounded-[10px] w-[300px] pl-[40px] outline-none focus:border-[#1A1466]"
                placeholder="Search my form" />
            <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] rounded-md text-[#adadad]"/>
                </div>
            </section>
        </div>
    );
};

export default SubNavbar;