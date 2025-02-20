import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase/firebase.config";
// eslint-disable-next-line react-refresh/only-export-components
export const contextProvider = createContext();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    const signup = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=> unsubscribe();
    }, [auth])

    const val = {
        user,
        loading,
        setUser,
        setLoading,
        signup,
        login,
    }
    return (
        <contextProvider.Provider value={val}>
            {children}
        </contextProvider.Provider>
    );
};

export default AuthProvider;