import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const maxTodoLength = 30;

function App() {
  // const geturl() =
  //    || ; // or production URL
  //

  // export const getUri = ()=>{
  //   if(window.herf)
  // }

  const geturl = () => {
    const isHosted = window.location.href.includes("https");

    const baseurl = isHosted
      ? "https://to-do-app-express-iela.vercel.app"
      : "http://localhost:3000";
    return baseurl;
  };

  const [todos, setTodos] = useState([]);

  // Fetch todos from the server
  const getTodo = async () => {
    //this function get all the todos from server
    try {
      const res = await axios.get(`${geturl()}/api/v1/todos`);
      if (res?.data?.data) {
        setTodos(res.data.data); // Set todos from server
      } else {
        console.error("No todos data received.");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Error fetching todos.");
    }
  };

  useEffect(() => {
    getTodo(); // Fetch todos on component mount
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    let todoValue = e.target.children[0].value;
    if (todoValue.length > maxTodoLength) {
      alert("Todo can't be this long");
      return;
    }

    if (todoValue.trim() !== "") {
      try {
        const res = await axios.post(`${geturl()}/api/v1/todo`, {
          todocontent: todoValue,
        });
        setTodos((prevTodos) => [res?.data?.data, ...prevTodos]);
        e.target.children[0].value = ""; // Clear input
        toast.success("Todo added!");
      } catch (err) {
        console.log("error hai post main", err);
        toast.error("Error adding todo.");
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${geturl()}/api/v1/todo${id}`);
      if (res?.status === 201) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        toast.success(res?.data?.message);
      } else {
        toast.error("Failed to delete todo.");
      }
    } catch (error) {
      console.log("Error deleting todo", error);
      toast.error("Error deleting todo.");
    }
  };

  const editTodo = async (event, id) => {
    event.preventDefault();
    const todoValue = event.target.children[0].value;

    if (todoValue.trim() === "") {
      toast.error("Todo can't be empty!");
      return;
    }

    try {
      await axios.patch(`${geturl()}/api/v1/todo${id}`, {
        todocontent: todoValue,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id
            ? { ...todo, todocontent: todoValue, isEditing: false }
            : todo
        )
      );
      toast.success("Todo updated!");
    } catch (error) {
      console.error("Error editing todo:", error);
      toast.error("Error updating todo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">To-Do App</h1>
      <div className="w-full sm:w-96 bg-gray-800 p-6 rounded-lg shadow-lg">
        <form onSubmit={addTodo}>
          <input
            type="text"
            className="w-full p-3 rounded-lg mb-4 bg-gray-700 text-white outline-none placeholder-gray-400"
            placeholder="Enter task..."
          />
          <button className="w-full py-3 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-600 transition-all">
            Add Task
          </button>
        </form>

        {/* Display message if no todos */}
        {todos.length === 0 && (
          <p className=" p-2 bg-gray-700 rounded-lg mt-3 text-center">
            📝 No Todo
          </p>
        )}

        {/* Task List */}
        <ul className="mt-4 space-y-2">
          {todos?.map((todo, index) => (
            <li
              key={todo._id}
              className="flex justify-between items-center p-2 bg-gray-700 rounded-lg"
            >
              {!todo.isEditing ? (
                <span className="text-white">{todo.todocontent}</span>
              ) : (
                <form
                  className="flex gap-6"
                  onSubmit={(e) => editTodo(e, todo._id)}
                >
                  <input
                    type="text"
                    defaultValue={todo.todocontent}
                    className="border border-gray-400 text-white bg-slate-900 rounded"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setTodos((prevTodos) =>
                          prevTodos.map((t) =>
                            t._id === todo._id ? { ...t, isEditing: false } : t
                          )
                        );
                      }}
                      type="button"
                      className="text-red-500"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="text-green-500">
                      Submit
                    </button>
                  </div>
                </form>
              )}

              <div className="flex space-x-2">
                {!todo.isEditing && (
                  <>
                    <button
                      onClick={() => {
                        setTodos((prevTodos) =>
                          prevTodos.map((t) =>
                            t._id === todo._id
                              ? { ...t, isEditing: true }
                              : { ...t, isEditing: false }
                          )
                        );
                      }}
                      className="text-yellow-400 hover:text-white transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-500 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
