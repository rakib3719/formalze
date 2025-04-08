'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiChevronDown, FiX, FiImage } from 'react-icons/fi';
import { 
  FaRegCircle, 
  FaRegCheckSquare, 
  FaChevronDown as FaDropdown,
  FaCalendarAlt,
  FaClock,
  FaHashtag,
  FaEnvelope,
  FaAlignLeft,
  FaFont
} from 'react-icons/fa';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import usePublicAxios from '@/hooks/usePublicAxios';
import { toast, ToastContainer } from 'react-toastify';
import useGetForm from '@/hooks/form/useGetForm';

const CreateForm = () => {

  const session = useSession();



  const publicAxios = usePublicAxios()
  const {refetch} = useGetForm()
 
  const user_id = session?.data?.user?.id;
  console.log(user_id, 'id asca nire???');


  const [form, setForm] = useState({
    title: '',
    created_by: user_id,
    description: '' || "null",
    fields: []
  });

  const [editingFieldIndex, setEditingFieldIndex] = useState(null);
  const [newOptionText, setNewOptionText] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [currentSelectIndex, setCurrentSelectIndex] = useState(null);
  const fieldRefs = useRef([]);

  const addNewField = () => {
    const newField = {
      id: Date.now(),
      heading: 'Untitled Question',
      type: 'text',
      description: '',
      options: [],
      required: false
    };
    setForm(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
    const newIndex = form.fields.length;
    setEditingFieldIndex(newIndex);
  };

  useEffect(() => {
    if (editingFieldIndex !== null && fieldRefs.current[editingFieldIndex]) {
      fieldRefs.current[editingFieldIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [editingFieldIndex, form.fields.length]);

  const updateField = (index, updatedField) => {
    const updatedFields = [...form.fields];
    updatedFields[index] = updatedField;
    setForm(prev => ({
      ...prev,
      fields: updatedFields
    }));
  };

  const deleteField = (index) => {
    const updatedFields = form.fields.filter((_, i) => i !== index);
    setForm(prev => ({
      ...prev,
      fields: updatedFields
    }));
    if (editingFieldIndex === index) {
      setEditingFieldIndex(null);
    } else if (editingFieldIndex > index) {
      setEditingFieldIndex(editingFieldIndex - 1);
    }
  };

  const addOption = (fieldIndex) => {
    if (!newOptionText.trim()) return;
    
    const updatedField = { ...form.fields[fieldIndex] };
    updatedField.options = [...updatedField.options, newOptionText];
    updateField(fieldIndex, updatedField);
    setNewOptionText('');
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const updatedField = { ...form.fields[fieldIndex] };
    updatedField.options = updatedField.options.filter((_, i) => i !== optionIndex);
    updateField(fieldIndex, updatedField);
  };

  const updateOption = (fieldIndex, optionIndex, value) => {
    const updatedField = { ...form.fields[fieldIndex] };
    updatedField.options[optionIndex] = value;
    updateField(fieldIndex, updatedField);
  };

  const publishForm = async() => {

    const newForm = {...form, created_by:user_id};
    console.log(newForm, 'ki s omossa?');
    console.log(newForm.created_by, 'na aslce maira lao');
    if (!newForm.created_by) {
      toast.error('You must be logged in to create a form');
      return;
    }

    if(!newForm.description){
      toast.error('descripotion must be needed');
      return;
    }
    if(!newForm.title){
      toast.error('titile must be needed');
      return
    }


  
    try {

      if(user_id){
       

        const newForm = {...form, created_by:user_id}
        const resp = await publicAxios.post('/form/list/', newForm);

        if(resp.data.success === true) {
          toast.success('Form created successfully');
          refetch();
      }
      else{
        toast.error('please login first')
      }
      
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong - please try again later');
    }
  };

  const fieldTypes = [
    { value: 'text', label: 'Short Answer', icon: <FaFont className="text-gray-500 mr-2" /> },
    { value: 'textarea', label: 'Paragraph', icon: <FaAlignLeft className="text-gray-500 mr-2" /> },
    { value: 'radio', label: 'Multiple Choice', icon: <FaRegCircle className="text-gray-500 mr-2" /> },
    { value: 'checkbox', label: 'Checkboxes', icon: <FaRegCheckSquare className="text-gray-500 mr-2" /> },
    { value: 'dropdown', label: 'Dropdown', icon: <FaDropdown className="text-gray-500 mr-2" /> },
    { value: 'date', label: 'Date', icon: <FaCalendarAlt className="text-gray-500 mr-2" /> },
    { value: 'time', label: 'Time', icon: <FaClock className="text-gray-500 mr-2" /> },
    { value: 'file', label: 'File Upload', icon: <FiImage className="text-gray-500 mr-2" /> },
    { value: 'number', label: 'Number', icon: <FaHashtag className="text-gray-500 mr-2" /> },
    { value: 'email', label: 'Email', icon: <FaEnvelope className="text-gray-500 mr-2" /> }
  ];

  const toggleSelect = (index) => {
    setIsSelectOpen(!isSelectOpen);
    setCurrentSelectIndex(index);
  };

  const handleSelectChange = (index, value) => {
    updateField(index, {
      ...form.fields[index],
      type: value,
      options: ['radio', 'checkbox', 'dropdown'].includes(value) ? form.fields[index].options : []
    });
    setIsSelectOpen(false);
  };

  const renderFieldInput = (field, index) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1466]"
            placeholder={field.type === 'email' ? 'email@example.com' : field.type === 'number' ? '123' : 'Your answer'}
            disabled
          />
        );
      case 'textarea':
        return (
          <textarea
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1466]"
            placeholder="Your answer"
            rows={3}
            disabled
          />
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center">
                <FaRegCircle className="text-gray-400 mr-2" />
                <input type="radio" className="mr-2" disabled />
                <span>{option}</span>
              </div>
            ))}
            {field.options.length === 0 && (
              <div className="text-gray-400 flex items-center">
                <FaRegCircle className="mr-2" />
                <span>No options added</span>
              </div>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center">
                <FaRegCheckSquare className="text-gray-400 mr-2" />
                <input type="checkbox" className="mr-2" disabled />
                <span>{option}</span>
              </div>
            ))}
            {field.options.length === 0 && (
              <div className="text-gray-400 flex items-center">
                <FaRegCheckSquare className="mr-2" />
                <span>No options added</span>
              </div>
            )}
          </div>
        );
      case 'dropdown':
        return (
          <div className="relative">
            <select className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1466] appearance-none bg-transparent" disabled>
              <option value="">{field.options.length > 0 ? "Select an option" : "No options added"}</option>
              {field.options.map((option, optIndex) => (
                <option key={optIndex} value={option}>{option}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-0 top-3 text-gray-400" />
          </div>
        );
      case 'date':
        return (
          <input
            type="date"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1466]"
            disabled
          />
        );
      case 'time':
        return (
          <input
            type="time"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#1A1466]"
            disabled
          />
        );
      case 'file':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm">
              Add file
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='w-[80%] pb-16 mx-auto'>
      <div className="ml-[20%] mt-36 px-12">
        <div className="mb-8 mx-auto p-6 form-bg border-t-10 border-[#1A1466] rounded-lg shadow-sm">
          <input
            type="text"
            className="w-full text-black placeholder:text-black text-2xl font-medium border-b border-transparent hover:border-gray-200 focus:border-[#1A1466] focus:border-b-3 duration-300 focus:outline-none py-2"
            placeholder="Form Title"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
          />
          <input
            type="text"
            className="w-full font-medium border-b border-transparent dark:text-gray-700 placeholder:text-gray-700 hover:border-gray-200 focus:border-[#1A1466] focus:border-b-3 duration-300 focus:outline-none py-2"
            placeholder="Form Description"
            required
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
          />
        </div>

        <div className="space-y-6">
          {form.fields.map((field, index) => (
            <div 
              key={field.id} 
              ref={el => fieldRefs.current[index] = el}
              className="p-4 form-bg shadow rounded-md dark:text-black border-l-6 border-[#1A1466]"
            >
              {editingFieldIndex === index ? (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <input
                      type="text"
                      className="w-full text-lg font-medium border-b border-transparent hover:border-gray-200 focus:border-[#1A1466] focus:border-b-4 duration-300 focus:outline-none py-1"
                      value={field.heading}
                      onChange={(e) => updateField(index, {...field, heading: e.target.value})}
                    />
                    <div className="relative ml-4">
                      <button
                        className="flex items-center border rounded px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1A1466] focus:border-[#1A1466] w-48"
                        onClick={() => toggleSelect(index)}
                      >
                        {fieldTypes.find(type => type.value === field.type)?.icon}
                        <span className="flex-1 text-left">
                          {fieldTypes.find(type => type.value === field.type)?.label}
                        </span>
                        <FiChevronDown className={`ml-2 text-gray-400 transition-transform ${isSelectOpen && currentSelectIndex === index ? 'transform rotate-180' : ''}`} />
                      </button>
                      
                      {isSelectOpen && currentSelectIndex === index && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                          {fieldTypes.map((type) => (
                            <div
                              key={type.value}
                              className="flex items-center px-3 py-2 hover:bg-[#1A1466] hover:text-white cursor-pointer"
                              onClick={() => handleSelectChange(index, type.value)}
                            >
                              {type.icon}
                              <span>{type.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    className="w-full text-gray-600 border-b border-transparent hover:border-gray-200 focus:border-[#1A1466] focus:border-b-4 duration-300 focus:outline-none py-1 text-sm"
                    placeholder="Description (optional)"
                    value={field.description}
                    onChange={(e) => updateField(index, {...field, description: e.target.value})}
                  />
                  
                  {(field.type === 'radio' || field.type === 'checkbox' || field.type === 'dropdown') && (
                    <div className="space-y-3 ml-4">
                      <div className="space-y-2">
                        {field.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            {field.type === 'radio' && <FaRegCircle className="text-gray-400" />}
                            {field.type === 'checkbox' && <FaRegCheckSquare className="text-gray-400" />}
                            {field.type === 'dropdown' && <FaHashtag className="text-gray-400" />}
                            <input
                              type="text"
                              className="border-b border-gray-300 py-1 focus:outline-none focus:border-[#1A1466] flex-1 ml-2"
                              value={option}
                              onChange={(e) => updateOption(index, optIndex, e.target.value)}
                              placeholder="Option text"
                            />
                            <button
                              onClick={() => removeOption(index, optIndex)}
                              className="text-gray-500 hover:text-red-500 p-1"
                            >
                              <FiX size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <input
                          type="text"
                          className="border-b border-gray-300 py-1 focus:outline-none focus:border-[#1A1466] flex-1 ml-2"
                          value={newOptionText}
                          onChange={(e) => setNewOptionText(e.target.value)}
                          placeholder="Add another option"
                          onKeyDown={(e) => e.key === 'Enter' && addOption(index)}
                        />
                        <button
                          onClick={() => {
                            if (newOptionText.trim()) {
                              addOption(index);
                            }
                          }}
                          className="px-3 py-1 btn-primary text-white rounded cursor-pointer text-sm hover:bg-[#1A1466]"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t">
                    <label className="flex items-center text-sm">
                      <div 
                        className={`relative inline-flex items-center h-6 rounded-full w-11 mr-2 transition-colors ${field.required ? 'bg-[#1A1466]' : 'bg-gray-300'}`}
                        onClick={() => updateField(index, {...field, required: !field.required})}
                      >
                        <span 
                          className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${field.required ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </div>
                      Required
                    </label>
                
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingFieldIndex(null)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => deleteField(index)}
                        className="p-1 text-gray-500 hover:text-red-500"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{field.heading || 'Untitled Question'}</h3>
                      {field.description && (
                        <p className="text-sm text-gray-500 mt-1">{field.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingFieldIndex(index)}
                        className="p-1 text-gray-500 hover:text-[#1A1466] hover:bg-gray-100 rounded"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteField(index)}
                        className="p-1 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    {renderFieldInput(field, index)}
                  </div>
                  {field.required && (
                    <p className="text-xs text-red-500 mt-1">* Required</p>
                  )}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={addNewField}
            className="flex fixed right-24 top-3/5 p-3 items-center cursor-pointer btn-primary rounded-full"
          >
            <FiPlus className="text-white text-2xl" />
          </button>
        </div>

        <div className="mt-8 flex justify-start">
          <button
            onClick={publishForm}
            className="px-6 py-2 cursor-pointer btn-primary text-white rounded-md shadow"
          >
            Publish Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;