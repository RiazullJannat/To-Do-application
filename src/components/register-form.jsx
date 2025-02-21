import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import Google from "@/socialLogin/Google";

export function RegisterForm({
    className,
    ...props
}) {
    const {signup, setLoading, setUser} = useAuth();
    const {
        register,
        handleSubmit,
    } = useForm()
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        signup(data.email, data.password)
        .then(res=>{
            console.log(res);
            setUser(res.user)
            axiosSecure.post('/register', {name:data.name, email:data.email})
            .then(res=>{
                if(res.data.insertedId){
                    alert('user created successfully')
                    navigate('/dashboard')
                    setLoading(false)
                }
            })
            .catch(error=>console.log(error))
        })
        .catch(error=>console.log(error))
        
    }
    return (
        (<form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center gap-2 text-center" >
                <h1 className="text-2xl font-bold">Register your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email password to register your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Name</Label>
                    <Input id="name" type="text" placeholder="m@example.com" required {...register("name")} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required {...register("email")}/>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                    <Input id="password" type="password" required {...register("password")}/>
                </div>
                <Button type="submit" className="w-full">
                    Register
                </Button>
                <div
                    className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <Google/>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="underline underline-offset-4">
                    Log In
                </Link>
            </div>
        </form>)
    );
}