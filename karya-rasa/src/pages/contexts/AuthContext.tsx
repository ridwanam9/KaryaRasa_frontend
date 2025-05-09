// "use client";

// import {
//     createContext,
//     useContext,
//     useState,
//     useEffect,
//     ReactNode,
// } from "react";

// type user = {
//     name: string;
//     avatar: string;
// };

// type AuthContextType = {
//     user: User | null;
//     login: (userData: User) => void;
//     logout: () => void;
// };

// type AuthProviderProps = {
//     children: ReactNode;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//     const [user, setUser] = useState<User | null>(null);

//     useEffect(() => {
//         consy storedUser = local
//     })
// }

// "use client";
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const stored = localStorage.getItem("user");
//         if (stored) setUser(JSON.parse(stored));
//     }, []);

//     const login = (userData) => {
//         localStorage.setItem("user", JSON.stringify(userData));
//         setUser(userData);
//     };

//     const logout = () => {
//         localStorage.removeItem("user");
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
const AuthContext = () => {

    
}
export default AuthContext;