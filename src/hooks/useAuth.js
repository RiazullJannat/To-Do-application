import { contextProvider } from "@/providers/AuthProvider";
import { useContext } from "react";


const useAuth = () => {
    const data = useContext(contextProvider)
    return data;
};

export default useAuth;