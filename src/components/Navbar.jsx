
const Navbar = () => {
    return (
        <div className="shadow-2xl flex justify-between items-center px-4 py-2">
            <h1 className="font-semibold text-2xl">Tasks</h1>
            <div className="flex gap-2">
                {/* <button className="btn bg-[#082F49] text-white hover:bg-blue-500">Login</button> */}
                {/* <button className="btn">Sign up</button> */}
            </div>
        </div>
    );
};

export default Navbar;