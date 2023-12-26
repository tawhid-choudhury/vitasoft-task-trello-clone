import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";

const Homepage = () => {

    const { isPending, error, data: tasks } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => axiosInstance.get('/tasks').then((res) => res.data),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(tasks.tasks);
    return (
        <div className="bg-[#F3F4F6] min-h-screen">

        </div>
    );
};

export default Homepage;
