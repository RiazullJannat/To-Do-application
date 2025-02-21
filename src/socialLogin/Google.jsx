
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Google = () => {
    const {googleLogin, setLoading, } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    function handleGoogle(){
        googleLogin()
        .then((res)=>{
            axiosSecure.post('/register',{ name:res.user.displayName, email:res.user.email})
            .then(res=>{
                if(res.data.insertedId){
                      toast.success('register successful')
                }
                else{
                    toast.success('login successful');
                }
                navigate('/');
                setLoading(false)
            })
            .catch(error=>{
                toast.error(error.message);
                setLoading(false)
            })
        })
        .catch(err=>{
            toast.error(err.message)
        })
    }
    return (
        <div className="mx-auto my-2">
            <Button variant="outline"  onClick={handleGoogle}>
                <FaGoogle></FaGoogle>
                Google...
            </Button>
        </div>
    );
};

export default Google;