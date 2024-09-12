import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // This will hold user info and token
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);

    useEffect(() => {
        // Check for existing tokens in localStorage on component mount
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (storedToken && storedUsername) {
            setUser({ token: storedToken, username: storedUsername });
            setIsAuthenticated(true);
            setIsModalVisible(false); // Hide modal if user is already authenticated
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/users/token/', {
                username,
                password
            });
            const { access, refresh } = response.data; // Assuming response returns access and refresh tokens
            localStorage.setItem('token', access); // Store access token
            localStorage.setItem('username', username); // Store username
            setUser({ token: access, username });
            setIsAuthenticated(true);
            setIsModalVisible(false); // Hide modal on successful login
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
        setIsAuthenticated(false);
        setIsModalVisible(true); // Show modal on logout
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated, login, logout, isModalVisible }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
