import React, { useState } from 'react';
import { FaHome, FaUsers, FaComments, FaCog } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300`}>
            
            <div className="p-6 flex flex-col items-center">
            <div className="flex flex-col items-center mb-6">
                        {isOpen && (
                            <img
                                src="https://w7.pngwing.com/pngs/358/473/png-transparent-computer-icons-user-profile-person-child-heroes-public-relations.png" // Replace with actual user image URL
                                alt="User Profile"
                                className="w-20 h-20 rounded-full border-2 border-gray-600 mb-2"
                            />
                        )}
                        {isOpen && (
                            <div className="text-center">
                                <h2 className="text-lg font-bold">User Name</h2>
                                <p className="text-sm">User Role</p>
                            </div>
                        )}
                    </div>
               

                <nav className="flex-1">
                    <ul>
                        <li className="flex items-center p-4 hover:bg-gray-700">
                            <FaHome className="mr-3" />
                            <span className={`${isOpen ? '' : 'hidden'}`}>Dashboard</span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray-700">
                            <FaUsers className="mr-3" />
                            <span className={`${isOpen ? '' : 'hidden'}`}>Work Order Management</span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray-700">
                            <FaComments className="mr-3" />
                            <span className={`${isOpen ? '' : 'hidden'}`}>User Access Management</span>
                        </li>
                        <li className="flex items-center p-4 hover:bg-gray-700">
                            <FaCog className="mr-3" />
                            <span className={`${isOpen ? '' : 'hidden'}`}>Reports</span>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='flex justify-end '>
            <button 
                onClick={toggleSidebar} 
                className="  bg-gray-700 text-white p-2 rounded-l-lg shadow-md"
            >
                {isOpen ? '←' : '→'}
            </button>
            </div>
         
        </aside>
    );
};

export default Sidebar;
