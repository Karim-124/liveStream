import React from 'react';
import Sidebar from './Sidebar';
import MyVideoComponent from './MyVideoComponent';
import FaceDetection from './FaceDetection';

const Chat = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="font-semibold text-lg">Chat</h3>
            <div className="overflow-y-auto max-h-48 mb-2">
                <ul>
                    <li>User1: Hello everyone!</li>
                    <li>User2: How's the stream going?</li>
                </ul>
            </div>
            <input
                type="text"
                placeholder="Type your message..."
                className="border rounded-lg p-2 w-full mt-2"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2">Send</button>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="flex bg-gray-200 h-screen">
            <Sidebar />
            <div className="flex-1 p-6 overflow-y-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-500">Log Out</button>
                </header>

                {/* Live Stream Section */}
                <div className="bg-white p-7 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl text-center   font-bold mb-4 text-gray-700">Live Video Stream</h2>
                    <div className="relative w-full aspect-w-16 aspect-h-9 mb-4">
                      <div className='flex justify-between  w-full '>
                        <div className=' w-1/2 mt-28'>
                        <MyVideoComponent/>

                        </div>
                      <FaceDetection/>
                      </div>
                      <div
                className="absolute bottom-14 right-4 bg-red-600 text-white py-2 px-3 rounded-lg shadow-lg"
              >
                Live
              </div>
                    </div >
                    {/* Video Controls */}
                </div>

                {/* Chat Component */}
                
            </div>
        </div>
    );
};

export default Dashboard;
