import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const BASE_URL = "http://localhost:3000";
  const [todos, setTodos] = useState();
  const getTodo = async () => {
    //this function get all the todos from server
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/todos`);
      if (res?.data?.data) {
        const todosFromServer = res.data.data;
        console.log("todosFromServer ", todosFromServer);
        setTodos(todosFromServer); // Assuming you want to set state for rendering
      } else {
        console.error("No todos data received.");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    getTodo();
    //this is use so the object render only one time
  }, []);

  const addTodo = async (e) => {
    try {
      e.preventDefault();
      const todoValue = e.target.children[0].value;
      const res = await axios.post(`${BASE_URL}/api/v1/todo`, {
        todocontent: todoValue,
      });
      setTodos((prevtodos) => [...prevtodos, res?.data?.data]);
    } catch (err) {
      console.log(err);
    }
  };

  //
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">To-Do App</h1>
        <form
          className="w-full sm:w-96 bg-gray-800 p-6 rounded-lg shadow-lg "
          onSubmit={addTodo}
        >
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
            {todos?.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center p-2 bg-gray-700 rounded-lg"
              >
                <span className="text-white">{todo.todocontent}</span>
                <div className="flex space-x-2">
                  <button className="text-yellow-400 hover:text-white transition-all">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-white transition-all">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </>
  );
}

export default App;
