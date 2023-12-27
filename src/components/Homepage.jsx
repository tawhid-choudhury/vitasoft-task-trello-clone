import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import TaskCard from "./TaskCard";
import Column from "./Column";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";

const Homepage = () => {

    const { isPending, error, data: tasks, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => axiosInstance.get('/tasks').then((res) => res.data),
    })

    const [completedTasks, setCompletedTasks] = useState([]);
    const [lowPriority, setLowPriority] = useState([]);
    const [mediumPriority, setMediumPriority] = useState([]);
    const [highPriority, setHighPriority] = useState([]);
    const [otherPriority, setOtherPriority] = useState([]);

    useEffect(() => {
        if (tasks && tasks.tasks) {

            const completed = tasks.tasks.filter((task) => task.priority === 'complete');
            const low = tasks.tasks.filter((task) => task.priority === 'low');
            const medium = tasks.tasks.filter((task) => task.priority === 'medium');
            const high = tasks.tasks.filter((task) => task.priority === 'high');
            const other = tasks.tasks.filter((task) => !['low', 'medium', 'high', 'complete'].includes(task.priority));

            setCompletedTasks(completed);
            setLowPriority(low);
            setMediumPriority(medium);
            setHighPriority(high);
            setOtherPriority(other);
        }
    }, [tasks]);


    const droppedToBacklog = async (id) => {
        const res = await axiosInstance.patch(`/tasks/${id}/`, { priority: 'backlog' });
        if (res.status === 200) {
            refetch();
        }
    };
    const droppedToLP = async (id) => {
        const res = await axiosInstance.patch(`/tasks/${id}/`, { priority: 'low' });
        if (res.status === 200) {
            refetch();
        }
    };
    const droppedToMP = async (id) => {
        const res = await axiosInstance.patch(`/tasks/${id}/`, { priority: 'medium' });
        if (res.status === 200) {
            refetch();
        }
    };
    const droppedToHP = async (id) => {
        const res = await axiosInstance.patch(`/tasks/${id}/`, { priority: 'high' });
        if (res.status === 200) {
            refetch();
        }
    };
    const droppedToCompleted = async (id) => {
        const { data: task } = await axiosInstance.get(`/tasks/${id}/`);
        console.log(task);

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
        }
    };

    const [{ isOver: isOverBacklog }, dropBacklog] = useDrop(() => ({
        accept: "task",
        drop: (item) => droppedToBacklog(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    const [{ isOver: isOverLP }, dropLP] = useDrop(() => ({
        accept: "task",
        drop: (item) => droppedToLP(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    const [{ isOver: isOverMP }, dropMP] = useDrop(() => ({
        accept: "task",
        drop: (item) => droppedToMP(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    const [{ isOver: isOverHP }, dropHP] = useDrop(() => ({
        accept: "task",
        drop: (item) => droppedToHP(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    const [{ isOver: isOverCompleted }, dropCompleted] = useDrop(() => ({
        accept: "task",
        drop: (item) => droppedToCompleted(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));




    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="bg-[#F3F4F6] min-h-screen">
            <h1 className="text-2xl pl-6 pt-4">Total Tasks: {tasks.count}</h1>
            {/* <div className="grid  md:grid-cols-3 lg:grid-cols-5"> */}
            <div className="flex flex-wrap justify-center items-start">
                <div ref={dropBacklog}>
                    <Column tasks={otherPriority} title={"Backlog"} priority={"other"} setTasks={setOtherPriority} refetch={refetch} />
                </div>
                <div ref={dropLP}>
                    <Column tasks={lowPriority} title={"Low Priority"} setTasks={setLowPriority} priority={"low"} refetch={refetch} />
                </div>
                <div ref={dropMP}>
                    <Column tasks={mediumPriority} title={"Medium Priority"} setTasks={setMediumPriority} priority={"medium"} refetch={refetch} />
                </div>
                <div ref={dropHP}>
                    <Column tasks={highPriority} title={"High Priority"} setTasks={setHighPriority} priority={"high"} refetch={refetch} />
                </div>

                <div ref={dropCompleted}>
                    <Column tasks={completedTasks} title={"Done"} setTasks={setCompletedTasks} priority={"complete"} refetch={refetch} />
                </div>

            </div>
        </div>
    );
};

export default Homepage;
