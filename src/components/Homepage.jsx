import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import TaskCard from "./TaskCard";

const Homepage = () => {

    const { isPending, error, data: tasks } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => axiosInstance.get('/tasks').then((res) => res.data),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    // console.log(tasks.tasks);
    const tasks1 = {
        "count": 4,
        "tasks": [
            {
                "id": 1,
                "task": "Design Kanban",
                "assigned_to": "Robert",
                "assignee": "Vitasoft",
                "priority": "Completed",
                "due_date": "2023-12-27T10:06:15+06:00",
                "completed": true,
                "completed_at": "2023-12-26T12:05:16.688403+06:00",
                "created_at": "2023-12-25T10:06:30+06:00"
            },
            {
                "id": 2,
                "task": "string",
                "assigned_to": "string",
                "assignee": "string",
                "priority": "string",
                "due_date": "2019-08-24T20:15:22+06:00",
                "completed": false,
                "completed_at": null,
                "created_at": "2019-08-24T20:15:22+06:00"
            },
            {
                "id": 3,
                "task": "React APP",
                "assigned_to": "Lorel",
                "assignee": "Mandin",
                "priority": "High",
                "due_date": "2023-12-26T18:30:00+06:00",
                "completed": true,
                "completed_at": "2023-12-26T18:31:00+06:00",
                "created_at": "2023-12-26T18:31:00+06:00"
            },
            {
                "id": 4,
                "task": "hellow",
                "assigned_to": "me",
                "assignee": "you",
                "priority": "low",
                "due_date": "2023-12-06T19:28:00+06:00",
                "completed": false,
                "completed_at": "2023-12-15T19:28:00+06:00",
                "created_at": "2023-12-26T19:28:00+06:00"
            }
        ]
    }
    return (
        <div className="bg-[#F3F4F6] min-h-screen">
            <div className="grid grid-cols-4">
                <div className="bg-[#082F49] mt-8 mx-4 rounded-lg min-h-[720px]">
                    <h1 className="text-white text-2xl pl-6 pt-4">Backlog</h1>
                    {tasks?.tasks?.map((task) => <TaskCard key={task.id} task={task}></TaskCard>)}
                </div>
                <div className="bg-[#082F49] mt-8 mx-4 rounded-lg min-h-[720px]">
                    <h1 className="text-white text-2xl pl-6 pt-4">ToDo</h1>
                    {tasks?.tasks?.map((task) => <TaskCard key={task.id} task={task}></TaskCard>)}
                </div>
                <div className="bg-[#082F49] mt-8 mx-4 rounded-lg min-h-[720px]">
                    <h1 className="text-white text-2xl pl-6 pt-4">Doing</h1>
                    {tasks?.tasks?.map((task) => <TaskCard key={task.id} task={task}></TaskCard>)}
                </div>
                <div className="bg-[#082F49] mt-8 mx-4 rounded-lg min-h-[720px]">
                    <h1 className="text-white text-2xl pl-6 pt-4">Done</h1>
                    {tasks?.tasks?.map((task) => <TaskCard key={task.id} task={task}></TaskCard>)}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
