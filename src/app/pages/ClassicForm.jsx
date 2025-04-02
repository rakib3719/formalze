import React from 'react';
import formImg from '@/assets/images/myform/classic.png'
import Image from 'next/image';

const ClassicForm = () => {
    const formData = [
        {
            img:formImg,
            heading: 'New patient Registration Form',
            description:'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img:formImg,
            heading: 'New patient Registration Form',
            description:'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img:formImg,
            heading: 'New patient Registration Form',
            description:'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img:formImg,
            heading: 'New patient Registration Form',
            description:'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img:formImg,
            heading: 'New patient Registration Form',
            description:'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img:formImg,
            heading: 'New patient Registration Form',
            description:'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img:formImg,
            heading: 'New patient Registration Form',
            description:'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img:formImg,
            heading: 'New patient Registration Form',
            description:'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
    ]
    return (
        <div className='px-4 ml-[23%] h-[calc(100vh-12rem)]'>
            

<section className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
{
    formData && formData.map((data,idx)=> (
        <div key={idx} className='mt-4 space-y-2.5'>
<Image src={data.img} alt={data.heading}/>
<h1 className='text-primary  text-xl font-semibold'> {data.heading}</h1>

<p className='text-[#000000] text-[16px]'>
A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information
</p>

<button className='bg-gray-300 px-6 w-full  py-2 rounded-md cursor-pointer hover:bg-[#1A1466] hover:text-white duration-300 mt-4'>
    Use Tamplate 


</button>


        </div>
    ))
}

</section>

        </div>
    );
};

export default ClassicForm;