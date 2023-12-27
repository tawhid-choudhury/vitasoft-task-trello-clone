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
            const completed = tasks.tasks.filter((task) => task.completed);
            const incomplete = tasks.tasks.filter((task) => !task.completed);

            const low = incomplete.filter((task) => task.priority === 'low');
            const medium = incomplete.filter((task) => task.priority === 'medium');
            const high = incomplete.filter((task) => task.priority === 'high');
            const other = incomplete.filter((task) => !['low', 'medium', 'high'].includes(task.priority));

            setCompletedTasks(completed);
            setLowPriority(low);
            setMediumPriority(medium);
            setHighPriority(high);
            setOtherPriority(other);
        }
    }, [tasks]);


    const droppedToBacklog = async (id) => {
        alert("droppedToBacklot")
        // const res = await axiosInstance.patch(`/updateTaskStatus/${id}`, { status: "todo" });
        // if (res.status === 200 ) {
        //     refetch();
        // }
    };
    const droppedToLP = async (id) => {
        alert("droppedToBacklot" + "  id:" + id)
        // const res = await axiosInstance.patch(`/updateTaskStatus/${id}`, { status: "todo" });
        // if (res.status === 200 ) {
        //     refetch();
        // }
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




    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="bg-[#F3F4F6] min-h-screen">
            <h1 className="text-2xl pl-6 pt-4">Total Tasks: {tasks.count}</h1>
            <div className="grid grid-cols-5">
                <div ref={dropBacklog}>
                    <Column tasks={otherPriority} title={"Backlog"} priority={"other"} setTasks={setOtherPriority} refetch={refetch} />
                </div>
                <div ref={dropLP}>
                    <Column tasks={lowPriority} title={"Low Priority"} setTasks={setLowPriority} priority={"low"} refetch={refetch} />
                </div>
                <div>
                    <Column tasks={mediumPriority} title={"Medium Priority"} setTasks={setMediumPriority} priority={"medium"} refetch={refetch} />
                </div>
                <div>
                    <Column tasks={highPriority} title={"High Priority"} setTasks={setHighPriority} priority={"high"} refetch={refetch} />
                </div>

                <div>
                    <div className="bg-[#082F49] mt-8 mx-4 rounded-lg min-h-[720px]">
                        <h1 className="text-white text-2xl pl-6 pt-4">Done ({completedTasks.length})</h1>
                        {completedTasks?.map((task) => <TaskCard key={task.id} task={task} refetch={refetch}></TaskCard>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
