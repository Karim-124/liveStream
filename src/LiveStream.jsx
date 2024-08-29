import React from 'react';
import Sidebar from './Sidebar';
import MyVideoComponent from './MyVideoComponent';

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
                      <div className='flex justify-between mb-10'>
                        <MyVideoComponent/>
                      <img 
                            src="http://127.0.0.1:8000/livestream/video/"
                            alt="Video Stream"
                            className="object-cover w-full h-full rounded-lg shadow-lg"
                        />
                      </div>
                      <div
                className="absolute bottom-4 right-4 bg-red-600 text-white py-2 px-3 rounded-lg shadow-lg"
              >
                Live
              </div>
                    </div >
                    {/* Video Controls */}
                </div>

                {/* Chat Component */}
                <Chat  />

                {/* Additional Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                    {/* Performance Metrics */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">Performance Metrics</h3>
                        <p>Response Time: 200ms</p>
                        <p>Error Rate: 1%</p>
                    </div>

                    {/* Activity Feed */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">Activity Feed</h3>
                        <ul className="list-disc list-inside">
                            <li>User Jane Doe logged in.</li>
                            <li>System update completed.</li>
                            <li>User John Smith started a new stream.</li>
                        </ul>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">Upcoming Events</h3>
                        <p>Webinar on React: March 10</p>
                        <p>System Maintenance: March 15</p>
                    </div>

                    {/* User Feedback */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">User Feedback</h3>
                        <p>"Great experience using the platform!"</p>
                    </div>

                    {/* Recent Articles */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">Recent Articles</h3>
                        <ul>
                            <li><a href="#" className="text-blue-600">Understanding React Hooks</a></li>
                            <li><a href="#" className="text-blue-600">Tailwind CSS Tips and Tricks</a></li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">Support</h3>
                        <p>Need help? <a href="#" className="text-blue-600">Contact Support</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
