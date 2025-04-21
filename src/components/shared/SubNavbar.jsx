'use client'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IoIosSearch } from 'react-icons/io';

const SubNavbar = () => {
     const session = useSession();

     const pathname = usePathname();
     const user = session?.data?.user;

    //  if(!user){
    //     return null;
    //  }

 
    if( pathname.includes('/formView') && !user){
        return null;
    }

        if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
            return null;
        }
        if (pathname.includes('/sign-in') || pathname.includes('/sign-up') ) {
        return null;
        }
        if (pathname.includes('/frontend') || pathname.includes('/frontend')) {
            return null;
            }
    return (
        <div className=''>

           
            <div className='px-4 bg-white  z-30  flex justify-between py-6  border-b fixed w-full border-[#00000059]'>
         <section className=''>
            <div className='w-[80%] hidden md:flex mx-auto md:ml-auto absolute top-8 bg-white z-50 left-0  -50'>

            </div>
         <div className=' '>


</div>
         </section>
            <section className=''>
            <div className="relative w-full product_search_input">
            <input
                className="px-4 text-[#1A1466] placeholder:text-[#1A1466] border-primary  py-2 border border-border rounded-[10px] w-[300px] pl-[40px] outline-none focus:border-[#1A1466]"
                placeholder="Search my form" />
            <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] rounded-md text-[#adadad]"/>
                </div>
            </section>
        </div>
        </div>
    );
};

export default SubNavbar;