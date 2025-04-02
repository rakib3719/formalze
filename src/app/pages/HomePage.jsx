import React from 'react';
import img from '@/assets/images/home/Annotations.png'
import Image from 'next/image';

const HomePage = () => {
    return (
        <div className='ml-[22%] mt-12 h-[calc(100vh-12rem)] flex justify-center py-20 flex-col'>
           
<Image alt='image' src={img} className='mx-auto text-center'/>

<button className='btn-primary mx-auto rounded-[10px] mt-4 px-6 py-3 w-[318px]'>
                    Create a new form
                </button>
        </div>
    );
};

export default HomePage;