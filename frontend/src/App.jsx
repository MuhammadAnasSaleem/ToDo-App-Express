function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">To-Do App</h1>
        <div className="w-full sm:w-96 bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Input for new task */}
          <input
            type="text"
            className="w-full p-3 rounded-lg mb-4 bg-gray-700 text-white outline-none placeholder-gray-400"
            placeholder="Enter task..."
          />
          {/* Add Task button */}
          <button className="w-full py-3 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-600 transition-all">
            Add Task
          </button>
          {/* Task List */}
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between items-center p-2 bg-gray-700 rounded-lg">
              <span className="text-white">Sample Task 1</span>
              <div className="flex space-x-2">
                <button className="text-yellow-400 hover:text-white transition-all">
                  Edit
                </button>
                <button className="text-red-500 hover:text-white transition-all">
                  Delete
                </button>
              </div>
            </li>
            <li className="flex justify-between items-center p-2 bg-gray-700 rounded-lg">
              <span className="text-white">Sample Task 2</span>
              <div className="flex space-x-2">
                <button className="text-yellow-400 hover:text-white transition-all">
                  Edit
                </button>
                <button className="text-red-500 hover:text-white transition-all">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
