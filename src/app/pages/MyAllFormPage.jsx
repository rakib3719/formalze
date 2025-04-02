'use client'
import React, { useState } from 'react';
import { FaRegStar } from 'react-icons/fa6';

const MyAllFormPage = () => {

    const [checkedId, setCheckedId] = useState([])

    const allForm = [
         {
        id:1,
        formName:'My Order New Form',

    },
         {
        id:2,
        formName:'My Order New Form',

    },
         {
        id:3,
        formName:'My Order New Form',

    },
         {
        id:4,
        formName:'My Order New Form',

    },
         {
        id:5,
        formName:'My Order New Form',

    },
         {
        id:6,
        formName:'My Order New Form',

    },
         {
        id:7,
        formName:'My Order New Form',

    },
         {
        id:8,
        formName:'My Order New Form',

    },
         {
        id:9,
        formName:'My Order New Form',

    },
         {
        id:10,
        formName:'My Order New Form',

    },

]

const  chekcboxHandle = (e)=>{

    const formId = Number(e.target.name)
    const isChecked =  e.target.checked;

    setCheckedId(prev =>
        isChecked ? [ ...prev,formId]: prev.filter(id=> id !== formId )
    
    )

}
    return (
        <div className='ml-[22%] px-1 h-[calc(100vh-12rem)]'>
       <div className='space-y-4'>
       {
            allForm.map((form)=> (


                <div key={form.id} className='flex items-center border-b px-6 py-3'>

<label id={form.id} className='cursor-pointer' >
<div className='space-x-3 flex items-center'>
<input type="checkbox"


onChange={chekcboxHandle}
 name={form.id}
  id={form.id} 
  className='rounded text-lg'/>
<FaRegStar />
<h1 className='text-lg text-black'>{form.formName}</h1>
</div>
</label>
<div className='ml-auto'>
    
{
    checkedId.includes(form.id) && <button className='bg-[#D4D4D4] text-primary mr-6 ml-auto px-4 py-2 rounded'>
   Delete
</button>
}


<button className='btn-primary rounded ml-auto px-4 py-2 '>
    Edit
</button>
</div>

                </div>
            ))
         }
       </div>
        </div>
    );
};

export default MyAllFormPage;