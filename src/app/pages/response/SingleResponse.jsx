import React from 'react';
import { 
  FiDownload, 
  FiCheck, 
  FiCalendar, 
  FiMail, 
  FiFileText,
  FiLink,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiChevronDown,
  FiUser,
  FiCircle,
  FiSquare,
  FiType,
  FiAlignLeft,
  FiHash,
  FiPenTool
} from 'react-icons/fi';

const SingleResponse = ({ data }) => {
    console.log('Response data', data);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Field type icons mapping with distinct icons
  const fieldIcons = {
    text: <FiType className="text-[#1A1466]" />,
    textarea: <FiAlignLeft className="text-[#1A1466]" />,
    email: <FiMail className="text-[#1A1466]" />,
    file: <FiFileText className="text-[#1A1466]" />,
    radio: <FiCircle className="text-[#1A1466]" />,
    checkbox: <FiSquare className="text-[#1A1466]" />,
    dropdown: <FiChevronDown className="text-[#1A1466]" />,
    date: <FiCalendar className="text-[#1A1466]" />,
    number: <FiHash className="text-[#1A1466]" />,
    address: <FiMapPin className="text-[#1A1466]" />,
    signature: <FiPenTool className="text-[#1A1466]" />,
    url: <FiLink className="text-[#1A1466]" />,
    phone: <FiPhone className="text-[#1A1466]" />
  };

  // icoonnn
  const getCheckIcon = (fieldType) => {
    return fieldType === 'radio' ? (
      <FiCircle className="text-[#1A1466] mr-3" />
    ) : (
      <FiSquare className="text-[#1A1466] mr-3" />
    );
  };

  return (
    <div className="xl:ml-[20%] ml-[25%]  text-black mt-28 rounded-2xl  overflow-hidden border border-[#CCCAEC] mb-8 bg-white">
      {/* Response Header with gradient */}
      <div className="bg-gradient-to-r from-[#1A1466] to-[#8886CD] px-6 py-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center mb-1">
              <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                <FiUser className="text-[#1A1466] text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {data.responder_email || 'Anonymous Respondent'}
                </h3>
                <p className="text-sm text-[#CCCAEC] flex items-center mt-1">
                  <FiCalendar className="mr-1.5" />
                  <span>Submitted {formatDate(data.created_at)}</span>
                </p>
              </div>
            </div>
          </div>
          <span className="bg-white text-[#1A1466] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            Show Response
          </span>
        </div>
      </div>

      {/* Response Data */}
      <div className="px-6 py-5">
        {data.response_data?.map((field, index) => (
          <div key={index} className="mb-6 last:mb-0 group">
            {/* Question Header */}
            <div className="flex items-start mb-3">
              <div className="bg-[#F4F4FF] p-2 rounded-lg border border-[#CCCAEC] mr-3 mt-0.5">
                {fieldIcons[field.field_type] || <FiEdit2 className="text-[#1A1466]" />}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-[#1A1466]">
                  {field.question_title || 'Untitled Question'}
                </h4>
                <div className="w-full h-px bg-[#CCCAEC] mt-2 opacity-50"></div>
              </div>
            </div>
            
            {/* Answer Container */}
            <div className="ml-11 pl-2">
              {/* Text Response */}
              {field.field_type === 'text' && (
                <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC]">
                  <p className="text-gray-800 font-medium">
                    {field.response || <span className="text-gray-500 italic">No response provided</span>}
                  </p>
                </div>
              )}

              {/* Textarea Response */}
              {field.field_type === 'textarea' && (
                <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC] whitespace-pre-line">
                  <p className="text-gray-800 font-medium">
                    {field.response || <span className="text-gray-500 italic">No response provided</span>}
                  </p>
                </div>
              )}

              {/* Email Response */}
              {field.field_type === 'email' && (
                <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC] flex items-center">
                  <FiMail className="text-[#1A1466] mr-3 text-lg" />
                  {field.response ? (
                    <a href={`mailto:${field.response}`} className="text-[#1A1466] hover:underline font-medium">
                      {field.response}
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">No email provided</span>
                  )}
                </div>
              )}

              {/* File Upload Response */}
              {field.field_type === 'file' && (
                field.response ? (
                  <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC] flex items-center justify-between">
                    <div className="flex items-center">
                      <FiFileText className="text-[#1A1466] mr-3 text-xl" />
                      <div>
                        <p className="text-gray-800 font-medium">{field.response}</p>
                        {/* <p className="text-xs text-gray-500">{Math.round(field.response.size / 1024)} KB</p> */}
                      </div>
                    </div>
                    <a 
                      href={field.response.url} 
                      download
                      className="text-sm bg-white px-3 py-1.5 rounded-lg border border-[#CCCAEC] text-[#1A1466] hover:bg-[#E9E9FD] flex items-center"
                    >
                      <FiDownload className="mr-1.5" /> Download
                    </a>
                  </div>
                ) : (
                  <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC]">
                    <p className="text-gray-500 italic">No file uploaded</p>
                  </div>
                )
              )}

              {/* Radio Response */}
              {field.field_type === 'radio' && (
                <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC] flex items-center">
                  <FiCircle className="text-[#1A1466] mr-3 text-lg" />
                  <span className="text-gray-800 font-medium">
                    {field.response || <span className="text-gray-500 italic">No selection</span>}
                  </span>
                </div>
              )}

              {/* Checkbox Response */}
              {field.field_type === 'checkbox' && (
                <div className="space-y-2">
                  {Array.isArray(field.response) && field.response.length > 0 ? (
                    field.response.map((item, i) => (
                      <div key={i} className="bg-[#F4F4FF] p-3 rounded-lg border border-[#CCCAEC] flex items-center">
                        <FiSquare className="text-[#1A1466] mr-3" />
                        <span className="text-gray-800 font-medium">{item}</span>
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC]">
                      <p className="text-gray-500 italic">No options selected</p>
                    </div>
                  )}
                </div>
              )}

              {/* Dropdown Response */}
              {field.field_type === 'dropdown' && (
                <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC] flex items-center">
                  <FiChevronDown className="text-[#1A1466] mr-3 text-lg" />
                  <span className="text-gray-800 font-medium">
                    {field.response || <span className="text-gray-500 italic">No selection</span>}
                  </span>
                </div>
              )}

              {/* Date Response */}
              {field.field_type === 'date' && (
                <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC] flex items-center">
                  <FiCalendar className="text-[#1A1466] mr-3 text-lg" />
                  <span className="text-gray-800 font-medium">
                    {field.response ? new Date(field.response).toLocaleDateString() : <span className="text-gray-500 italic">No date selected</span>}
                  </span>
                </div>
              )}

              {/* Number Response */}
              {field.field_type === 'number' && (
                <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC] flex items-center">
                  <FiHash className="text-[#1A1466] mr-3 text-lg" />
                  <p className="text-gray-800 font-medium">
                    {field.response || <span className="text-gray-500 italic">No response</span>}
                  </p>
                </div>
              )}

              {/* Address Response */}
              {field.field_type === 'address' && (
                <div className="bg-[#F4F4FF] p-5 rounded-lg border border-[#CCCAEC]">
                  {typeof field.response === 'object' && field.response !== null ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {Object.entries(field.response).map(([key, value]) => (
                          <div key={key} className="bg-white p-3 rounded-lg border border-[#CCCAEC]">
                            <p className="text-xs text-[#1A1466] uppercase font-medium mb-1">{key}</p>
                            <p className="text-gray-800 font-medium">{value || '-'}</p>
                          </div>
                        ))}
                      </div>
                      <button className="text-sm bg-white px-3 py-1.5 rounded-lg border border-[#CCCAEC] text-[#1A1466] hover:bg-[#E9E9FD] flex items-center">
                        <FiMapPin className="mr-1.5" /> View on Map
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-500 italic">No address provided</p>
                  )}
                </div>
              )}

              {/* Signature Response */}
              {field.field_type === 'signature' && (
                field.response ? (
                  <div className="bg-[#F4F4FF] p-5 rounded-lg border border-[#CCCAEC]">
                    <div className="border border-[#CCCAEC] rounded-lg p-3 bg-white">
                      <img 
                        src={field.response} 
                        alt="Signature" 
                        className="max-h-32 mx-auto"
                      />
                    </div>
                    <button className="mt-3 text-sm bg-white px-3 py-1.5 rounded-lg border border-[#CCCAEC] text-[#1A1466] hover:bg-[#E9E9FD] flex items-center">
                      <FiDownload className="mr-1.5" /> Download Signature
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC]">
                    <p className="text-gray-500 italic">No signature provided</p>
                  </div>
                )
              )}

              {/* URL Response */}
              {field.field_type === 'url' && (
                <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC] flex items-center">
                  <FiLink className="text-[#1A1466] mr-3 text-lg" />
                  {field.response ? (
                    <a 
                      href={field.response} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#1A1466] hover:underline font-medium truncate"
                    >
                      {field.response}
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">No URL provided</span>
                  )}
                </div>
              )}

              {/* Phone Response */}
              {field.field_type === 'phone' && (
                <div className="bg-[#F4F4FF] p-4 rounded-lg border border-[#CCCAEC] flex items-center">
                  <FiPhone className="text-[#1A1466] mr-3 text-lg" />
                  {field.response ? (
                    <a 
                      href={`tel:${field.response}`}
                      className="text-[#1A1466] hover:underline font-medium"
                    >
                      {field.response}
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">No phone number provided</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleResponse;