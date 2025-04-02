'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";
const Sidebar = () => {
    const pathname = usePathname();
  

    const [openMenu, setOpenMenu] = useState(null);

    const toogleMenu = (idx)=>{

        setOpenMenu(prev => prev === idx ? null : idx)
    }
    
    const menu = [
        { 
            id:1,
            menuName: 'My All Form',
            link: '/my-all-form'
        },
        { 
            id:2,
            menuName: 'Template',
            link: '/template',
            submenu: [{
                menuName:'Classic Form',
                link:'/classic-form'
        
            },
        {
            id:3,
             menuName:'Card Form',
                link:'/card-form'

        }]
        },
        { 
            id:4,
            menuName: 'Favorites',
            link: '/favorites'
        },
        {
            id:5,
            menuName: 'Archive',
            link: '/archive'
        },
        {
            id:6,
            menuName: 'Trash',
            link: '/trash'
        },
    ];

    const menu2 = [
        {   
            id:1,
            menuName: 'Get Help',
            link: '/get-help'
        },
        { 
            id:2,
            menuName: 'Support',
            link: '/support',
        },
        { 
            id:3,
            menuName: 'Privacy & policy',
            link: '/policy'
        },
    ];


    // if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
    //     return null;
    // }if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
// return null;}

const isActive = (path) => {
    return pathname === path;
};
    return (
        <div className={`  ${pathname.includes('sign-in') || pathname.includes('sign-up') || pathname.includes('frontend') ? 'hidden ' : 'w-[22%] z-50  h-screen fixed flex flex-col bg-third'} `}>
            {/* Fixed header section */}
            <div className='px-7 py-[20.5px] bg-third'>
                <button className='btn-primary rounded-[10px] px-6 py-3 w-full'>
                    Create a new form
                </button>
            </div>

            {/* Scrollable content section */}
            <div className='flex-1 overflow-y-auto px-7'>
                <div className='pl-6 mt-4 text-black space-y-1'>
                    {menu.map((menuItem, idx) => (
                       menuItem.submenu ? 
                     <div key={idx}>
   <li
                        onClick={()=>toogleMenu(menuItem.id)}
                       href={menuItem.link} 
                     
                       className={` items-center flex font-semibold px-2 py-2 rounded transition-colors ${
                           isActive(menuItem.link) 
                               ? 'menu-bg border-b' 
                               : 'hover-menu-bg'
                       }`}
                   >
                       {menuItem.menuName}
                       <span>
{
   openMenu === menuItem.id  ? <MdOutlineKeyboardArrowRight className='mt-[1px] ml-8 font-semibold text-xl'/> :   <MdOutlineKeyboardArrowDown className='mt-[1px] ml-8 font-semibold text-xl'/>
}



                       
                     
                       </span>

               
                   </li>


                   {

   openMenu === menuItem.id && menuItem.submenu.map((Item,idx)=> (<Link href={Item.link} key={idx}>
    
<label id={idx} className='flex items-center gap-2 menu-bg pl-4 '>
    <input type="checkbox" name="" id={idx} />
    <p>{Item.menuName}</p>
</label>

    </Link>

    ))
}


                     </div>
                   
                   
                   :  <Link 
                            href={menuItem.link} 
                            key={idx}
                          
                            className={`block font-semibold px-2 py-2 rounded transition-colors ${
                                isActive(menuItem.link) 
                                    ? 'menu-bg' 
                                    : 'hover-menu-bg'
                            }`}
                        >
                            {menuItem.menuName}
                        </Link>
                    ))}
                </div>
                
                <div className='pl-6 mt-28 pb-8 text-black space-y-1'>
                    {menu2.map((menuItem, idx) => (
                        <Link 
                            href={menuItem.link} 
                            key={idx}
                            className={`block font-semibold pl-2 px-2 py-2 rounded transition-colors ${
                                isActive(menuItem.link) 
                                    ? 'bg-[#F4F4FF] rounded-md' 
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {menuItem.menuName}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;