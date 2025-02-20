import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "./ui/button"; import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
const AddTask = () => {
    const [time, setTime] = useState(new Date());
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])
    const todayDate = time.toISOString().split("T")[0];

    const {
        register,
        handleSubmit,
    } = useForm()


    const onSubmit = (data) => {
        data.status = 'to-do';
        axiosSecure.post('/to-do', data)
        .then(res=>console.log(res.data))
        .catch(error=>console.log(error))
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"> <FaCirclePlus />Add task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a task</DialogTitle>
                    <DialogDescription>
                        <p>Date: {time.toLocaleDateString()}</p>
                        <p>Time: {time.toLocaleTimeString()}</p>
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            To-Do
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Write your task title (max-50)"
                            className="col-span-3"
                            maxLength={50}
                            {...register("name")}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <textarea
                            id="description"
                            defaultValue="Enter description here (max-200)"
                            className="col-span-3 border rounded-md p-2"
                            rows="4"
                            maxLength={200}
                            {...register("description")}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="date"
                            className="col-span-3 border rounded-md p-2"
                            rows="4"
                            maxLength={200}
                            type="date"
                            defaultValue={todayDate}
                            {...register("date")}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTask;