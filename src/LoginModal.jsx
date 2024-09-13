import React, { useState } from 'react';
import logo from './assets/logo.png';
import { useUser } from '../src/CONTEXT/UserContext';
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css';

const LoginModal = () => {
    const { login, isModalVisible, setIsModalVisible } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner
        try {
            await login(username, password);
            setError('');
            toast.success("Login successful!"); // Show success toast on login
        } catch (err) {
            setError('Login failed. Please try again.');
            toast.error('Login failed. Please check your credentials.'); // Show error toast on login failure
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    if (!isModalVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex relative">
                {/* <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsModalVisible(false)}
                    aria-label="Close"
                >
                    &#10005;
                </button> */}

                <div className="hidden md:flex w-1/2 bg-blue-500 flex-col items-center justify-center text-white text-center p-6">
                    <h1 className="text-3xl font-bold mb-4">GoFinance</h1>
                    <p className="mb-6">The most popular peer-to-peer lending platform in SEA</p>
                    <button className="px-6 py-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-all">
                        See More
                    </button>
                </div>

                <div className="w-full md:w-1/2 p-8">
                    <div className="flex flex-col justify-center h-full">
                        <div className="flex justify-center mb-6">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-20"
                            />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="mb-4 text-red-500">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center hover:bg-blue-600 transition-all"
                            >
                                {loading ? (
                                    <div className="spinner border-t-2 border-white border-solid w-6 h-6 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    'Login'
                                )}
                            </button>


                            <div className="mt-4 text-center">
                                <a href="#" className="text-sm text-blue-500 hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal
