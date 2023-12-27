import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import TaskCard from "./TaskCard";
import Column from "./Column";
import { useEffect, useState } from "react";

const Homepage = () => {

    const { isPending, error, data: tasks } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => axiosInstance.get('/tasks').then((res) => res.data),
    })

    const [completedTasks, setCompletedTasks] = useState([]);
    const [lowPriority, setLowPriority] = useState([]);
    const [mediumPriority, setMediumPriority] = useState([]);
    const [highPriority, setHighPriority] = useState([]);

    useEffect(() => {
        if (tasks && tasks.tasks) {
            const completed = tasks.tasks.filter((task) => task.completed);
            const incomplete = tasks.tasks.filter((task) => !task.completed);

            const low = incomplete.filter((task) => task.priority === 'low');
            const medium = incomplete.filter((task) => task.priority === 'medium');
            const high = incomplete.filter((task) => task.priority === 'high');

            setCompletedTasks(completed);
            setLowPriority(low);
            setMediumPriority(medium);
            setHighPriority(high);
        }
    }, [tasks]);

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    // console.log(tasks.tasks);
    // const tasks1 = {
    //     "count": 4,
    //     "tasks": [
    //         {
    //             "id": 1,
    //             "task": "Design Kanban",
    //             "assigned_to": "Robert",
    //             "assignee": "Vitasoft",
    //             "priority": "Completed",
    //             "due_date": "2023-12-27T10:06:15+06:00",
    //             "completed": true,
    //             "completed_at": "2023-12-26T12:05:16.688403+06:00",
    //             "created_at": "2023-12-25T10:06:30+06:00"
    //         },
    //         {
    //             "id": 2,
    //             "task": "string",
    //             "assigned_to": "string",
    //             "assignee": "string",
    //             "priority": "string",
    //             "due_date": "2019-08-24T20:15:22+06:00",
    //             "completed": false,
    //             "completed_at": null,
    //             "created_at": "2019-08-24T20:15:22+06:00"
    //         },
    //         {
    //             "id": 3,
    //             "task": "React APP",
    //             "assigned_to": "Lorel",
    //             "assignee": "Mandin",
    //             "priority": "High",
    //             "due_date": "2023-12-26T18:30:00+06:00",
    //             "completed": true,
    //             "completed_at": "2023-12-26T18:31:00+06:00",
    //             "created_at": "2023-12-26T18:31:00+06:00"
    //         },
    //         {
    //             "id": 4,
    //             "task": "hellow",
    //             "assigned_to": "me",
    //             "assignee": "you",
    //             "priority": "low",
    //             "due_date": "2023-12-06T19:28:00+06:00",
    //             "completed": false,
    //             "completed_at": "2023-12-15T19:28:00+06:00",
    //             "created_at": "2023-12-26T19:28:00+06:00"
    //         }
    //     ]
    // }

    return (
        <div className="bg-[#F3F4F6] min-h-screen">
            <h1 className="text-2xl pl-6 pt-4">Total Tasks: {tasks.count}</h1>
            <div className="grid grid-cols-4">
                <Column tasks={lowPriority} title={"Low Priority"} setTasks={setLowPriority} priority={"low"} />
                <Column tasks={mediumPriority} title={"Medium Priority"} setTasks={setMediumPriority} priority={"medium"} />
                <Column tasks={highPriority} title={"High Priority"} setTasks={setHighPriority} priority={"high"} />



                <div className="bg-[#082F49] mt-8 mx-4 rounded-lg min-h-[720px]">
                    <h1 className="text-white text-2xl pl-6 pt-4">Done</h1>
                    {completedTasks?.map((task) => <TaskCard key={task.id} task={task}></TaskCard>)}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
