// src/components/Dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import SiBar from './SiBar';
import LoginModal from '../LoginModal';
import { useUser } from '../CONTEXT/UserContext';

const Dashboard = () => {
  const { isModalVisible, user } = useUser();

  return (
    <div className="flex md:h-[100vh] relative">
      <SiBar />
      <div className="flex-1">
        <Outlet />

      </div>

      {/* Include the modal */}
      {isModalVisible && <LoginModal />}

      {/* Button to toggle modal visibility (for demonstration purposes) */}
      <button
        onClick={() => setIsModalVisible(!isModalVisible)}
        className="fixed bottom-5 right-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 z-50"
      >
        Toggle Modal
      </button>
    </div>
  );
};

export default Dashboard;
