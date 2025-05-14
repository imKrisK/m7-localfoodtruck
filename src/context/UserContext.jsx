// Import necessary React modules
import React, { useState, useContext } from 'react';

// 1. Create the context
const UserContext = React.createContext();

// Custom provider component for this context
export const UserProvider = (props) => {
    // Store the current user in state at the top level
    const [currentUser, setCurrentUser] = useState({});

    // Sets user object in state shared via context
    const handleUpdateUser = (user) => {
        setCurrentUser(user);
    };

    // 2. Provide the context
    // The provider component of any context (UserContext.Provider) takes a prop called value
    // Sends data via its value prop to all children at every level
    // We are sending both the current user and an update function
    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

// 3. Use the context. This custom hook allows easy access
// to this particular context from any child component
export const useUserContext = () => {
    return useContext(UserContext);
};

