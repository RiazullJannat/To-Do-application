import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase/firebase.config";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "@/hooks/useAxiosSecure";
// eslint-disable-next-line react-refresh/only-export-components
export const contextProvider = createContext();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const time = new Date();
    const todayDate = time.toISOString().split("T")[0];

    const signup = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe();
    }, [auth])
    const { data: toDoList = [], refetch } = useQuery({
        queryKey: ['toDoList'],
        queryFn: async () => {
            const res = await axiosSecure(`/to-do-list?email=${user.email}`)
            return res.data
        }
    })
    const today = toDoList.filter(i => i.date <= todayDate)
    const nextDay = toDoList.filter(i => i.date >todayDate)
    const complete = toDoList.filter(i => i.status === 'complete')

    const val = {
        user,
        loading,
        today,
        nextDay,
        complete,
        todayDate,
        refetch,
        setUser,
        setLoading,
        signup,
        login,
        googleLogin,
    }
    return (
        <contextProvider.Provider value={val}>
            {children}
        </contextProvider.Provider>
    );
};

export default AuthProvider;