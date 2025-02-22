import { MdOutlineDeleteSweep } from "react-icons/md";
import { UpdateTask } from "./UpdateTask";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";


const ToDoLIst = ({ event }) => {
    const axiosSecure = useAxiosSecure();
    const { refetch } = useAuth();
    const handleDelete = (id) => {
        axiosSecure.delete(`/delete?id=${event._id}`)
            .then(res => {
                console.log(res.data)
                toast.warning('Task deleted.');
                refetch();
            })
            .catch(error => console.log(error.message))
    }
    const handleDone = (id) => {
        axiosSecure.patch(`/update-todo?id=${event._id}`, {status:'complete'})
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    refetch();
                    toast.success('Task completed successfully.')
                }
            })
            .catch(error => console.log(error))
    }
    const time = new Date();
    const todayDate = time.toISOString().split("T")[0];
    console.log();
    return (
        <div className="border rounded-sm p-2 border-gray-600 mx-2 my-4 hover:cursor-pointer group">
            <h4 className={`font-semibold ${event.date < todayDate ? "text-red-600" : "text-green-600"}`}>{event.date} || {event.name}</h4>
            <p>{event.description}</p>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right text-xl">
                <UpdateTask event={event} />
                <button
                    className={`px-2 cursor-pointer `} onClick={() => handleDelete(event._id)}
                >
                    <MdOutlineDeleteSweep />
                </button>
                <button
                    className={`px-2 cursor-pointer ${event.date > todayDate || event.status === 'complete' ? 'hidden' : ''}`} onClick={() => handleDone(event._id)}
                >
                    <IoCheckmarkDoneCircleOutline />
                </button>
            </div>
        </div>
    );
};

export default ToDoLIst;