import PropTypes from 'prop-types';
import axiosInstance from '../api';
import { MdDelete, MdDone } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task, refetch }) => {
    const [showEdit, setShowEdit] = useState(false)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))


    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/tasks/${task.id}/`)
                    .then(res => {
                        console.log(res);
                        if (res.status === 204) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    }
                    )
            }
        });
    }


    const handleUpdate = async (e) => {
        e.preventDefault();

        const taskName = e.target.elements.task.value;
        const assignee = e.target.elements.assignee.value;
        const priority = e.target.elements.priority.value;

        const updatedTask = {
            task: taskName,
            assigned_to: task.assigned_to,
            assignee: assignee,
            priority: priority,
            due_date: task.due_date,
            completed: task.completed,
            completed_at: task.completed_at,
            created_at: task.created_at,
        };

        const res = await axiosInstance.patch(`/tasks/${task.id}/`, updatedTask)
        console.log(res);
        if (res.status === 200) {
            refetch();
            console.log("success");
            setShowEdit(false)
        }
    };

    const handleMarkComplete = async () => {
        const currentDate = new Date();
        const isoString = currentDate.toISOString();
        let updatedTask = {};
        if (!task.completed) {
            updatedTask = {
                task: task.task,
                assigned_to: task.assigned_to,
                assignee: task.assignee,
                priority: 'complete',
                due_date: task.due_date,
                completed: true,
                completed_at: isoString,
                created_at: task.created_at,
            };
        } else {
            updatedTask = {
                task: task.task,
                assigned_to: task.assigned_to,
                assignee: task.assignee,
                priority: 'complete',
                due_date: task.due_date,
                completed: true,
                completed_at: task.completed_at,
                created_at: task.created_at,
            };
        }
        console.log(updatedTask);
        const res = await axiosInstance.patch(`/tasks/${task.id}/`, updatedTask)
        console.log(res);
        if (res.status === 200) {
            refetch();
            console.log("success");
            setShowEdit(false)
        }
    };


    const formatDate = (isoDateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(isoDateString).toLocaleString('en-US', options);
    };


    return (
        <div ref={drag} className={`bg-white m-6 p-2 py-4 rounded-md ${isDragging ? "border-2" : "border-0"}`}>
            <div className='mt-[-12px] flex justify-end'>
                {task?.priority === 'complete' && <p className='bg-blue-500 w-[80px] text-center text-[10px] rounded-lg p-1 text-white' >Complete</p>}
                {task?.priority === 'high' && <p className='bg-red-500 w-[80px] text-center text-[10px] rounded-lg p-1 text-white' >High priority</p>}
                {task?.priority === 'moderate' && <p className='bg-[#FFAA33] w-[80px] text-center text-[10px] rounded-lg p-1 text-white' >Medium priority</p>}
                {task?.priority === 'medium' && <p className='bg-[#FFAA33] w-[80px] text-center text-[10px] rounded-lg p-1 text-white' >Medium priority</p>}
                {task?.priority === 'low' && <p className='bg-[#097969] w-[80px] text-center text-[10px] rounded-lg p-1 text-white' >Low priority</p>}
                {!['high', 'medium', 'low', "complete"].includes(task?.priority) && <p className='bg-gray-600 w-[80px] text-center text-[10px] rounded-lg p-1 text-white' >Backlog</p>}
            </div>
            <div className='flex justify-between items-center pb-5'>
                <div>
                    <h1 className='text-xl'>{task.task}</h1>
                    <p className='text-gray-700 text-xs'>Created at: {formatDate(task.created_at)}</p>
                </div>

            </div>
            <p className='text-gray-700 text-xs'>Assigned to <span className='font-bold'>{task.assigned_to}</span> by <span className='font-bold'>{task.assignee}</span></p>
            <p className='text-gray-700 text-xs'> Due Date <span className='font-bold'>{formatDate(task.due_date)}</span></p>
            {task.completed && <p className='bg-[#097969] w-full text-center px-1 text-xs rounded-md py-1 mt-4 text-white'>Completed at: {formatDate(task.completed_at)}</p>}
            <div className='flex justify-center pt-5'>
                <button onClick={handleDelete} className="btn btn-xs  btn-outline py-1 text-sm text-red-500 btn-circle mr-2">
                    <MdDelete />
                </button>
                <button onClick={() => setShowEdit(!showEdit)} className="btn btn-xs btn-outline py-1 text-sm text-blue-500 btn-circle mr-2">
                    <FaPencil />
                </button>
                {task.priority !== "complete" &&
                    <button onClick={handleMarkComplete} className="btn btn-xs btn-outline py-1 text-sm text-green-500 btn-circle">
                        <MdDone />
                    </button>
                }
            </div>
            <div className={`relative bg-base-300 p-2 rounded-md mt-4 ${!showEdit && "hidden"}`}>
                <button onClick={() => setShowEdit(!showEdit)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg">Edit Task</h3>
                <form onSubmit={handleUpdate}>
                    <div className='flex flex-col'>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Task</span>
                            </div>
                            <input defaultValue={task.task} type="text" placeholder="Type here" name='task' className="input input-sm input-bordered w-full" />
                        </label>


                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Assignee</span>
                            </div>
                            <input defaultValue={task.assignee} type="text" placeholder="Type here" name='assignee' className="input input-sm input-bordered w-full" />
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Phase/Priority</span>
                            </div>
                            <input defaultValue={task.priority} type="text" placeholder="Type here" name='priority' className="input input-sm input-bordered w-full  mb-4" />
                        </label>

                        <input type='submit' className="btn btn-sm bg-[#082F49] text-white" value={"Save"} />
                    </div>
                </form>
            </div>
        </div>
    );
};

TaskCard.propTypes = {
    task: PropTypes.object,
    refetch: PropTypes.func,
};

export default TaskCard;