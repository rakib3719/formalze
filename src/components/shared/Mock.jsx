'use client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';

const Mock = () => {
    const pathName = usePathname();
    const user = useSession()?.data?.user;

    if(pathName.includes('/sign-in') || pathName.includes('/sign-up')) {
        return null;
    }

    if(!user && pathName.includes('/formView')) {
        return null;
    }

    return (
        <div className="hidden lg:flex w-[240px] lg:w-[240px]">
            {/* Your content here */}
        </div>
    );
};

export default Mock;