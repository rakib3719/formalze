'use client'
import React from 'react';
import formImg from '@/assets/images/myform/classic.png'
import Image from 'next/image';

const ClassicForm = () => {
    const formData = [
        {
            img: formImg,
            heading: 'New patient Registration Form',
            description: 'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img: formImg,
            heading: 'New patient Registration Form',
            description: 'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img: formImg,
            heading: 'New patient Registration Form',
            description: 'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img: formImg,
            heading: 'New patient Registration Form',
            description: 'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img: formImg,
            heading: 'New patient Registration Form',
            description: 'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img: formImg,
            heading: 'New patient Registration Form',
            description: 'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img: formImg,
            heading: 'New patient Registration Form',
            description: 'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
        {
            img: formImg,
            heading: 'New patient Registration Form',
            description: 'A New Customer Registration Form is a form template designed to streamline the process of collecting personal and contact information'
        },
    ];

    return (
        <div className='lg:px-8 px-4 pr-8 mt-26 md:ml-[30%] lg:ml-[26%]  2xl:ml-[20%] xl:ml-[23%] h-[calc(100vh-2rem)]'>
            <section className='custom-grid gap-8'>
                {formData.map((data, idx) => (
                    <div key={idx} className='mt-4 space-y-2.5 custom-shadow px-3 py-4 bg-white rounded-xl  overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100'>
                        <Image src={data.img} alt={data.heading} className='flex justify-center text-center mx-auto' />
                        <h1 className='text-primary text-xl font-semibold'>{data.heading}</h1>
                        <p className='text-[#000000] text-[16px]'>
                            {data.description}
                        </p>
                        <button className='bg-gray-300 dark:bg-gray-300 text-black px-6 w-full py-2 rounded-md cursor-pointer hover:bg-[#1A1466] hover:text-white duration-300 mt-4'>
                            Use Template
                        </button>
                    </div>
                ))}
            </section>

            {/* Custom responsive styling */}
            <style jsx>{`
                .custom-grid {
                    display: grid;
                    grid-template-columns: repeat(1,1fr);
                 
                }

                @media (min-width: 900px) {
                    .custom-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (min-width: 1024px) {
                    .custom-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                @media (min-width: 1280px) {
                    .custom-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                @media (min-width: 1680px) {
                    .custom-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
            `}</style>
        </div>
    );
};

export default ClassicForm;
