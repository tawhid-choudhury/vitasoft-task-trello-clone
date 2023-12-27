import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, setTasks, priority }) => {
    const handleAddNew = (e) => {
        e.preventDefault();

        // Extract values from form fields
        const taskName = e.target.elements.task.value;
        const assignedTo = e.target.elements.assigned_to.value;
        const assignee = e.target.elements.assignee.value;
        const dueDate = e.target.elements.due_date.value;

        // Create a new task object
        const newTask = {
            id: tasks.length + 1, // You might want to use a better way to generate IDs
            task: taskName,
            assigned_to: assignedTo,
            assignee: assignee,
            priority: priority,
            due_date: dueDate,
            completed: false, // Set completed to false initially
            completed_at: null, // Set completed_at to null initially
            created_at: new Date().toISOString(), // Set the creation date
        };

        // Update the tasks array
        setTasks((prevTasks) => [...prevTasks, newTask]);

        // Close the modal
        const modal = document.getElementById(`my_modal_${title}`);
        if (modal) {
            modal.close();
        }
    };
    return (
        <div className="bg-[#082F49] mt-8 mx-4 rounded-lg min-h-[720px]">
            <h1 className="text-white text-2xl pl-6 pt-4">{title} ({tasks.length})</h1>
            <div>
                {tasks?.map((task) => <TaskCard key={task.id} task={task}></TaskCard>)}
            </div>
            <div onClick={() => document.getElementById(`my_modal_${title}`).showModal()} className='bg-white m-6 p-2 py-4 rounded-md hover:bg-base-200 hover:cursor-pointer'>
                <div className='text-2xl flex justify-between items-center '>
                    <div>Create a new Task</div>
                    <div className='text-3xl font-bold pr-2'>+</div>
                </div>
            </div>
            <dialog id={`my_modal_${title}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add a new low priority task</h3>
                    <form onSubmit={handleAddNew}>
                        <div className='flex flex-col'>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Task</span>
                                </div>
                                <input type="text" placeholder="Type here" name='task' className="input input-bordered w-full  mb-4" />
                            </label>

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Assigned to</span>
                                </div>
                                <input type="text" placeholder="Type here" name='assigned_to' className="input input-bordered w-full  mb-4" />
                            </label>

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Assignee</span>
                                </div>
                                <input type="text" placeholder="Type here" name='assignee' className="input input-bordered w-full  mb-4" />
                            </label>

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Due date</span>
                                </div>
                                <input type="date" placeholder="Select date" name='due_date' className="input input-bordered w-full  mb-4" />
                            </label>

                            <input type='submit' className="btn" value={"Add new"} />
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

Column.propTypes = {
    title: PropTypes.string,
    priority: PropTypes.string,
    tasks: PropTypes.object,
    setTasks: PropTypes.func
};

export default Column;