// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // This will hold user info and token
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8000/users/token/', {
                username,
                password
            });
            setUser({ token: response.data.token, username });
            setIsAuthenticated(true);
            setIsModalVisible(false); // Hide modal on successful login
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
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
