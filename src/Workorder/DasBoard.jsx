import React from 'react';
import { Outlet } from 'react-router-dom';
import SiBar from './SiBar';

const DasBoard = () => {
  return (
    <div className="flex md:h-[100vh] ">
      <SiBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DasBoard;
