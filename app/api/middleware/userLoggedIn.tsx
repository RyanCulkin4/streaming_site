import axios from "axios";
import { useEffect, useState, createContext, useContext, ReactNode, useRef } from "react";
import React from "react";

// Define the shape of the authentication context
interface AuthContextType {
    isUserLoggedIn: boolean | null;
    userId: string | null;
}

// Create a context to hold the user authentication status
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to check user token
const useCheckUserToken = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const hasCheckedToken = useRef(false); // Track if the token has been checked

    useEffect(() => {
        if (hasCheckedToken.current) return; // Prevent multiple checks

        const checkUserToken = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsUserLoggedIn(false);
                setUserId(null);
            } else {
                try {
                    const response = await axios.get('http://localhost:3001/checkToken', {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Use 'Authorization' and include 'Bearer' prefix
                        },
                    });

                    const { success, userId } = response.data;
                    
                    setIsUserLoggedIn(success);
                    setUserId(success ? userId : null);
                } catch (error) {
                    setIsUserLoggedIn(false);
                    setUserId(null);
                }
            }
        };

        checkUserToken();
        hasCheckedToken.current = true; // Mark the token as checked
    }, []);

    return { isUserLoggedIn, userId };
};

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useCheckUserToken();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// RunIfLoggedIn component
export const RunIfLoggedIn: React.FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useContext(AuthContext);

    if (auth === undefined) {
        throw new Error("RunIfLoggedIn must be used within an AuthProvider");
    }

    return auth.isUserLoggedIn ? <>{children}</> : null; // Render children if logged in
};

// RunIfLoggedOut component
export const RunIfLoggedOut: React.FC<{ children: ReactNode }> = ({ children }) => {
    const auth = useContext(AuthContext);

    if (auth === undefined) {
        throw new Error("RunIfLoggedOut must be used within an AuthProvider");
    }

    return auth.isUserLoggedIn === false ? <>{children}</> : null; // Render children if logged out
};

// Export the custom hook
export default useCheckUserToken;
