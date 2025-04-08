'use client'
import ErrorPage from '@/components/shared/ErrorPage';
import LoadingPage from '@/components/shared/Loader';
import Loader from '@/components/shared/Loader';
import NoDataAvailable from '@/components/shared/NoDataAvailable';
import useGetForm from '@/hooks/form/useGetForm';
import usePublicAxios from '@/hooks/usePublicAxios';
import React, { useState } from 'react';
import { FaRegStar } from 'react-icons/fa6';
import Swal from 'sweetalert2';

// titile

const MyAllFormPage = () => {

    const {data, isLoading, error, refetch}= useGetForm();
    console.log(data);

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

// delte handaler
const publicAxios = usePublicAxios()

const deleteForm = async (id)=>{

    const resp = await publicAxios.delete(`/form/list/${id}/`);

console.log(resp);

    if(resp.status === 204){
        refetch()

        Swal.fire({
            title: "Deleted!",
            text: "Your Form has been deleted.",
            icon: "success"
          });
    }

    
}

const deleteHandaler = (id)=>{


 Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1A1466",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
    deleteForm(id)
    }
  });

}

if(isLoading){
   
return <LoadingPage/>
}

if(error){
    return <ErrorPage message='Something went wrong! Please refresh this page or login again!'/>
}

if(data?.length < 1){

    return <NoDataAvailable message="No form available..." />;

}

const  chekcboxHandle = (e)=>{

    const formId = Number(e.target.name)
    const isChecked =  e.target.checked;

    setCheckedId(prev =>
        isChecked ? [ ...prev,formId]: prev.filter(id=> id !== formId )
    
    )

}
    return (
        <div className='lg:ml-[26%]  xl:ml-[22%] ml-[30%] xl:m mt-24 px-1 h-[calc(100vh-2rem)]'>
       <div className='space-y-4'>
      
{
   isLoading ? <div className='ml-[20%] mt-48'>  Loading... </div>   :  error? <div>

<h1 className=''>Something went wrong! please refersh this page...</h1>

   </div>:
 data && data.map((form)=> (


       <div key={form.id} className='flex items-center dark:bg-white   border-b-[#00000059] border-b border-[#00000059] px-6 py-3'>

<div  className='' >
<div className='space-x-3 flex items-center'>
<input type="checkbox"


onChange={chekcboxHandle}
name={form.id}
id={form.id} 
className='rounded text-lg cursor-pointer'/>
<FaRegStar  className='text-[#000000]'/>
<h1 className='text-lg text-black'>{form.title}</h1>
</div>
</div>
<div className='ml-auto'>

{
checkedId.includes(form.id) && <button
onClick={()=> deleteHandaler(form.id)}

className='bg-[#D4D4D4] cursor-pointer text-primary mr-6 ml-auto px-4 py-2 rounded'>
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