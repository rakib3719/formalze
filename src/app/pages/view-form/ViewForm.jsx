'use client'
import ErrorPage from '@/components/shared/ErrorPage';
import LoadingPage from '@/components/shared/Loader';
import usePublicAxios from '@/hooks/usePublicAxios';
import React, { useState } from 'react';
import { 
  FaChevronDown,
  FaCalendarAlt,
  FaClock,
  FaHashtag,
  FaEnvelope,
  FaSignature,
  FaLink,
  FaPhone
} from 'react-icons/fa';
import { FiImage } from 'react-icons/fi';
import FormSubmitConfirmation from '../auhtantication/form-submit-confirmation/FormSubmitConfarmation';
import { toast, ToastContainer } from 'react-toastify';

const ViewForm = ({ data, isLoading, error,id }) => {
    const [formData, setFormData] = useState({});
    const [email, setEmail] = useState('');
    const [filledFields, setFilledFields] = useState({});
    const publicAxios = usePublicAxios();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false)
   
    if (isSubmitted) {
        return <FormSubmitConfirmation onNewSubmission={() => setIsSubmitted(false)} />;
    }
   
    const countryCodes = [
        { code: '+1', name: 'USA' },
        { code: '+44', name: 'UK' },
        { code: '+91', name: 'India' },
        { code: '+880', name: 'Bangladesh' },
        { code: '+86', name: 'China' },
        { code: '+81', name: 'Japan' },
        { code: '+33', name: 'France' },
        { code: '+49', name: 'Germany' },
        { code: '+7', name: 'Russia' },
        { code: '+61', name: 'Australia' },
        { code: '+971', name: 'UAE' },
    ];

    if(isLoading){
        return <LoadingPage/>;
    }
    if(error){
        return <ErrorPage message='Something went wrong. Please try again later.'/>;
    }

    if (!data) {
        return <div className="ml-[30%] mt-28 text-gray-500">No form data available</div>;
    }

    const handleInputChange = (fieldId, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldId]: value
        }));
        
        // Track filled fields for border styling
        if (value && value !== '') {
            setFilledFields(prev => ({
                ...prev,
                [fieldId]: true
            }));
        } else {
            setFilledFields(prev => ({
                ...prev,
                [fieldId]: false
            }));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const responseData = data.fields.map(field => {
            let responseValue = formData[field.id] || '';
            
            // Handle phone field specifically
            if (field.type === 'phone' && responseValue && responseValue.code && responseValue.number) {
                responseValue = `${responseValue.code}${responseValue.number}`;
            }

            return {
                field_id: field.id,
                field_type: field.type,
                question_title: field.heading || 'Untitled Question',
                response: responseValue
            };
        });

        const formResponse = {
            responder_email: email,
            response_data: responseData,
            form: data.id,
            title: data.form_name || data.title ||''
        };

        console.log('Form Response:', formResponse);

        const resp = await publicAxios.post('/form/response/', formResponse);
        console.log(resp);
        if(resp.status === 201){
            toast.success('Response sent successfully')
            setIsSubmitted(true);
            setLoading(false)
        }
        else{
            setLoading(false)
        }
    };

    const renderField = (field, index) => {
        const isFilled = filledFields[field.id] || false;
        
        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 focus:outline-none focus:border-[#1A1466] text-black form-bg`}
                        placeholder="Your answer"
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 focus:outline-none focus:border-[#1A1466] text-black form-bg`}
                        placeholder="Your answer"
                        rows={3}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                );
            case 'radio':
                return (
                    <div className="space-y-3 mt-2">
                        {field.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center">
                                <label className="flex items-center cursor-pointer w-full">
                                    <input 
                                        type="radio" 
                                        name={`radio-${field.id}`} 
                                        className="h-4 w-4 border-gray-300 text-[#1A1466] focus:ring-[#1A1466]"
                                        value={option}
                                        onChange={() => handleInputChange(field.id, option)}
                                    />
                                    <span className="ml-3 text-black">{option}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="space-y-3 mt-2">
                        {field.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center">
                                <label className="flex items-center cursor-pointer w-full">
                                    <input 
                                        type="checkbox" 
                                        className="h-4 w-4 rounded border-gray-300 text-[#1A1466] focus:ring-[#1A1466] checked:bg-[#1A1466] checked:border-[#1A1466]"
                                        value={option}
                                        onChange={(e) => {
                                            const currentValues = Array.isArray(formData[field.id]) ? formData[field.id] : [];
                                            const newValues = e.target.checked
                                                ? [...currentValues, option]
                                                : currentValues.filter(v => v !== option);
                                            handleInputChange(field.id, newValues);
                                        }}
                                    />
                                    <span className="ml-3 text-black">{option}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case 'dropdown':
                return (
                    <div className="relative mt-2">
                        <select 
                            className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 pl-3 pr-8 focus:outline-none focus:border-[#1A1466] appearance-none form-bg text-black`}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                        >
                            <option value="">Select an option</option>
                            {field.options.map((option, optIndex) => (
                                <option 
                                    key={optIndex} 
                                    value={option} 
                                    className="px-4 py-2 hover:bg-[#1A1466] hover:text-white"
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                        <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                );
            case 'date':
                return (
                    <div className="relative mt-2">
                        <input
                            type="date"
                            className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 pl-3 pr-8 focus:outline-none focus:border-[#1A1466] appearance-none form-bg text-black`}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                        <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                );
            case 'time':
                return (
                    <div className="relative mt-2">
                        <input
                            type="time"
                            className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 pl-3 pr-8 focus:outline-none focus:border-[#1A1466] appearance-none form-bg text-black`}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                        <FaClock className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                );
            case 'file':
                return (
                    <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center form-bg">
                        <div className="flex flex-col items-center justify-center">
                            <FiImage className="text-gray-400 text-3xl mb-2" />
                            <p className="text-gray-500">Drag and drop files here or click to upload</p>
                            <input 
                                type="file" 
                                className="hidden" 
                                id={`file-${field.id}`}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        // Only store the file name instead of the full file data
                                        handleInputChange(field.id, file.name);
                                    }
                                }}
                            />
                            <label 
                                htmlFor={`file-${field.id}`}
                                className="mt-4 px-4 py-2 text-white bg-[#1A1466] bg-opacity-10 text-[#1A1466] rounded-md hover:bg-opacity-20 cursor-pointer"
                            >
                                Select files
                            </label>
                        </div>
                    </div>
                );
            case 'email':
                return (
                    <div className="relative mt-2">
                        <input
                            type="email"
                            className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 pl-3 pr-8 focus:outline-none focus:border-[#1A1466] text-black form-bg`}
                            placeholder="email@example.com"
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                        <FaEnvelope className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                );
            case 'number':
                return (
                    <div className="relative mt-2">
                        <input
                            type="number"
                            className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 pl-3 pr-8 focus:outline-none focus:border-[#1A1466] text-black form-bg`}
                            placeholder="123"
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                        <FaHashtag className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                );
            case 'phone':
                return (
                    <div className="mt-2">
                        <div className="flex items-center">
                            <div className="relative w-1/5 mr-2">
                                <select
                                    className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 pl-3 pr-8 focus:outline-none focus:border-[#1A1466] appearance-none form-bg text-black`}
                                    onChange={(e) => {
                                        const phoneData = formData[field.id] || { code: '', number: '' };
                                        phoneData.code = e.target.value;
                                        handleInputChange(field.id, phoneData);
                                    }}
                                >
                                    <option value="">Select code</option>
                                    {countryCodes.map((country, idx) => (
                                        <option key={idx} value={country.code}>
                                            {country.name} ({country.code})
                                        </option>
                                    ))}
                                </select>
                                <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative flex-1">
                                <input
                                    type="tel"
                                    className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 pl-3 pr-8 focus:outline-none focus:border-[#1A1466] text-black form-bg`}
                                    placeholder="Phone number"
                                    onChange={(e) => {
                                        const phoneData = formData[field.id] || { code: '', number: '' };
                                        phoneData.number = e.target.value;
                                        handleInputChange(field.id, phoneData);
                                    }}
                                />
                                <FaPhone className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                );
            case 'address':
                return (
                    <div className="mt-4 border border-gray-200 rounded-lg p-4 space-y-4 form-bg">
                        {field.addressFields?.map((addrField, addrIndex) => (
                            <div key={addrIndex} className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">
                                    {addrField.label}
                                    {addrField.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1A1466] focus:border-[#1A1466] text-black form-bg"
                                    placeholder={`Enter ${addrField.label.toLowerCase()}`}
                                    onChange={(e) => {
                                        const addressData = formData[field.id] || {};
                                        addressData[addrField.label] = e.target.value;
                                        handleInputChange(field.id, addressData);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                );
            case 'signature':
                return (
                    <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-40 flex items-center justify-center form-bg">
                        <div className="text-center">
                            <FaSignature className="mx-auto text-gray-400 text-4xl mb-3" />
                            <p className="text-gray-500">Sign above</p>
                            <input 
                                type="file" 
                                accept="image/*"
                                className="hidden" 
                                id={`signature-${field.id}`}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        // Only store the file name instead of the full file data
                                        handleInputChange(field.id, file.name);
                                    }
                                }}
                            />
                            <label 
                                htmlFor={`signature-${field.id}`}
                                className="mt-3 text-sm text-[#1A1466] hover:text-[#8886CD] cursor-pointer"
                            >
                                Upload Signature
                            </label>
                        </div>
                    </div>
                );
            case 'url':
                return (
                    <div className="relative mt-2">
                        <input
                            type="url"
                            className={`w-full border-b ${isFilled ? 'border-[#1A1466]' : 'border-gray-300'} py-2 pl-3 pr-8 focus:outline-none focus:border-[#1A1466] text-black form-bg`}
                            placeholder="https://example.com"
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                        <FaLink className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen px-32  bg-white">
            <div className="w-[80%] mt-28 pb-16  ml-[20%] mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <ToastContainer/>
                <form onSubmit={handleSubmit}>
                    {/* Form Header */}
                    <div className="form-bg w-full form-bg rounded-lg mx-auto shadow-sm p-6 mb-6 border-t-4 border-[#1A1466]">
                        <h1 className="text-2xl font-medium text-gray-900 mb-2">{data.title || data.form_name || ''}</h1>
                        <p className="text-gray-600">{data.description || 'Form description'}</p>
                        {data.fields?.some(field => field.required) && (
                            <p className="text-xs text-red-500 mt-4">* Indicates required question</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="form-bg form-bg rounded-lg shadow-sm p-6 mb-6">
                        <div className="mb-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                Your Email Address
                                <span className="text-red-500 ml-1">*</span>
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">We'll use this to contact you if needed</p>
                        </div>
                        <div className="relative mt-2">
                            <input
                                type="email"
                                className="w-full border-b border-gray-300 py-2 pl-3 pr-8 focus:outline-none focus:border-[#1A1466] text-black"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FaEnvelope className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        {data.fields?.map((field, index) => (
                            <div key={index} className="form-bg rounded-lg shadow-sm p-6">
                                <div className="mb-4">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        {field.heading || 'Untitled Question'}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </h2>
                                    {field.description && (
                                        <p className="text-sm text-gray-500 mt-1">{field.description}</p>
                                    )}
                                </div>
                                {renderField(field, index)}
                            </div>
                        ))}
                    </div>

                    {/* Form Footer */}
                    <div className="mt-8 flex justify-between items-center">
                        <button 
                            type="submit"
                            className="px-6 py-2 bg-[#1A1466] text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#1A1466] focus:ring-offset-2"
                        >
                         { 
                         loading ? 'loading...':'Submit'
                        }
                        </button>
                        <p className="text-sm text-gray-500">All responses will be kept confidential</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewForm;