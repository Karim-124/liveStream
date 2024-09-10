import React, { useState } from "react";
import axios from "axios";
import logo from "./assets/logo.png";
import { useUser } from "../src/CONTEXT/UserContext"; // Import your UserContext

const LoginModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [error, setError] = useState(""); // State for error message
    const { login } = useUser(); // Get login function from context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any existing error

        try {
            const response = await axios.post('http://your-api-url/login', { email, password });
            const userData = response.data;
            login(userData); // Set user data in context
            setIsModalVisible(false); // Close the modal on successful login
            console.log(response);
        } catch (error) {
            setError("Login failed. Please check your credentials.");
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (!isModalVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={handleCancel}
                    aria-label="Close"
                >
                    &#10005;
                </button>

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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your email"
                                    required
                                    aria-describedby="email-error"
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
                                    aria-describedby="password-error"
                                />
                            </div>

                            {error && (
                                <div className="mb-4 text-red-500" id="login-error">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all"
                            >
                                Login
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

export default LoginModal;
