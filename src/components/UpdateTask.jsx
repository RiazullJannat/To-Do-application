import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";

export function UpdateTask({ event }) {
    const [time, setTime] = useState(new Date());
    const axiosSecure = useAxiosSecure();
    const {refetch, todayDate} = useAuth();
    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000);
    }, [])

    const {
        register,
        handleSubmit,
    } = useForm()


    const onSubmit = (data) => {
        axiosSecure.patch(`/update-todo?id=${event._id}`, data)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    refetch();
                    toast.success('updated successfully.')
                }
            })
            .catch(error => console.log(error))
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={`px-2 cursor-pointer  ${ event.status === 'complete' ? 'hidden' : ''}`}><CiEdit /></button>
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
                            defaultValue={event.name}
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
                            defaultValue={event.description}
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
                            defaultValue={event.date}
                            {...register("date")}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
