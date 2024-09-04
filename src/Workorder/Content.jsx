import React from 'react';

import logo from '../assets/logo.png'

const Content = () => {
  return (
<div
  className="flex-1 p-3 rounded-tr-3xl rounded-br-3xl my-2 mr-3 bg-gradient-to-l from-[#E2E9E9] to-[#ffffff]    "
>      <div className=' flex justify-between'>
      <h1 className="text-3xl font-bold mb-4">Work Order</h1>
      <img src={logo} className='w-48 -mr-5 -mt-5 ' alt="" />
      </div>
      
    </div>
  );
};

export default Content;
