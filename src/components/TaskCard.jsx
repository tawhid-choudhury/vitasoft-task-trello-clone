import PropTypes from 'prop-types';

const TaskCard = ({ task }) => {

    const formatDate = (isoDateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return new Date(isoDateString).toLocaleString('en-US', options);
    };


    return (
        <div className='bg-white m-6 p-2 py-4 rounded-md'>
            <div className='flex justify-between items-center pb-5'>
                <div>
                    <h1 className='text-2xl'>{task.task}</h1>
                    <p className='text-gray-700 text-xs'>Created at: {formatDate(task.created_at)}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    {task?.priority === 'high' && <p className='bg-red-500 w-fit px-1 text-xs rounded-lg py-1 text-white' >High priority</p>}
                    {task?.priority === 'moderate' && <p className='bg-[#FFAA33] w-fit px-1 text-xs rounded-lg py-1 text-white' >Medium priority</p>}
                    {task?.priority === 'medium' && <p className='bg-[#FFAA33] w-fit px-1 text-xs rounded-lg py-1 text-white' >Medium priority</p>}
                    {task?.priority === 'low' && <p className='bg-[#097969] w-fit px-1 text-xs rounded-lg py-1 text-white' >Low priority</p>}
                </div>
            </div>
            <p className='text-gray-700 text-sm'>Assigned to <span className='font-bold'>{task.assigned_to}</span> by <span className='font-bold'>{task.assignee}</span></p>
            <p className='text-gray-700 text-sm'> Due Date <span className='font-bold'>{formatDate(task.due_date)}</span></p>
            {task.completed && <p className='bg-[#097969] w-fit px-1 text-xs rounded-md py-1 mt-4 text-white'>Completed at: {task.completed_at}</p>}
        </div>
    );
};

TaskCard.propTypes = {
    task: PropTypes.object,
    refetch: PropTypes.func,
};

export default TaskCard;