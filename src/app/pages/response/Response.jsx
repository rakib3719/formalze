import ErrorPage from '@/components/shared/ErrorPage';
import LoadingPage from '@/components/shared/Loader';
import NoDataAvailable from '@/components/shared/NoDataAvailable';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiClock, FiMail, FiGrid, FiList } from 'react-icons/fi';

const Response = ({ data, isLoading, error, title }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

    if (isLoading) return <LoadingPage />;
    if (error) return <ErrorPage message='Something went wrong...please refresh this page' />;
    if (!data || data.length === 0) return <NoDataAvailable message='No responses yet!' />;

    // Filter responses by email search when search button is clicked
    const filteredResponses = showSearchResults 
        ? data.filter(response => 
            response.responder_email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data;

    // Sort responses by date
    const sortedResponses = [...filteredResponses].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Format date to be more readable
    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleSearch = () => {
        setShowSearchResults(true);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setShowSearchResults(false);
    };

    return (
        <div className="ml-[26%] xl:ml-[20%] mt-28 px-16 py-8">
            {/* Header Section */}
            <div className="flex flex-col mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Responses for: <span className="text-primary">{title}</span>
                </h1>
                <p className="text-gray-900 mb-6">{data.length} total responses</p>
                
                {/* Controls Section */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* View Mode Toggle */}
                    <div className="flex gap-2 mr-16">
                        <button
                            onClick={() => setViewMode('card')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${viewMode === 'card' ? 'btn-primary' : 'bg-transparent border-[#1A1466] text-black'}`}
                        >
                            <FiGrid /> Card View
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${viewMode === 'table' ? 'btn-primary' : 'bg-transparent border-[#1A1466] text-black'}`}
                        >
                            <FiList /> Table View
                        </button>
                    </div>
                    
                    {/* Search with Button */}
                    <div className="flex flex-1 gap-2">
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by email..."
                                className="pl-10 pr-4 py-2 w-full border  border-[#1A1466] text-black placeholder:text-black placeholder:border-[#1A1466] rounded-lg focus:outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        <button 
                            onClick={handleSearch}
                            className="btn mr-24 btn-primary px-4 py-2 rounded-lg"
                        >
                            Search
                        </button>
                        {showSearchResults && (
                            <button 
                                onClick={handleClearSearch}
                                className="btn bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    
                    {/* Dropdown Sort */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-black transition w-full md:w-auto"
                        >
                            <FiClock />
                            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                            <FiChevronDown className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isSortOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            setSortOrder('newest');
                                            setIsSortOpen(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOrder === 'newest' ? 'bg-primary-50 text-primary' : 'text-black'}`}
                                    >
                                        Newest First
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSortOrder('oldest');
                                            setIsSortOpen(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${sortOrder === 'oldest' ? 'bg-primary-50 text-primary' : 'text-black'}`}
                                    >
                                        Oldest First
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Response Display */}
            {sortedResponses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-900 text-lg">No responses found matching your search</p>
                    <button 
                        onClick={handleClearSearch}
                        className="mt-4 text-primary hover:underline"
                    >
                        Clear search and show all
                    </button>
                </div>
            ) : viewMode === 'card' ? (
                /* Card View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {sortedResponses.map((response, idx) => (
                        <div 
                            key={idx} 
                            className="bg-[#0C0A2B] rounded-lg shadow-md p-6 transition-all duration-300 flex flex-col hover:shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-primary-100 p-3 rounded-full">
                                    <FiMail className="text-primary text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-100 line-clamp-1">
                                        {response.responder_email}
                                    </h3>
                                    <p className="text-sm text-gray-100">
                                        Response #{sortedResponses.length - idx}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-100 flex items-center gap-1">
                                        <FiClock size={14} />
                                        {formatDate(response.created_at)}
                                    </span>
                                    <Link 
                                    href={`/view-single-response/${response.id}`}
                                    className="btn btn-primary text-sm px-3 py-3 cursor-pointer rounded-md">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Table View */
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-primary">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                    Submitted At
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-50 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="menu-bg divide-y divide-gray-200">
                            {sortedResponses.map((response, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {sortedResponses.length - idx}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <FiMail className="text-primary" />
                                            {response.responder_email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <FiClock className="text-primary" />
                                            {formatDate(response.created_at)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                       <Link 
                                    href={`/view-single-response/${response.id}`}
                                    className="btn btn-primary text-sm px-3 py-3 cursor-pointer rounded-md">
                                        View Details
                                    </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Results Count */}
            {showSearchResults && (
                <div className="mt-6 text-sm text-gray-900 text-center">
                    Showing {sortedResponses.length} results for your search
                </div>
            )}
        </div>
    );
};

export default Response;