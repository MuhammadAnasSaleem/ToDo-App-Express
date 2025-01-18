import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./style.css";

const maxTodoLength = 30;

function App() {
  // const geturl() =
  //    || ; // or production URL
  //

  // export const getUri = ()=>{
  //   if(window.herf)
  // }

  const geturl = () => {
    const isHosted = window.location.protocol === "https:";

    const baseurl = isHosted
      ? "https://to-do-app-express-iela.vercel.app"
      : "http://localhost:3000";
    return baseurl;
  };

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Fetch todos from the server
  const getTodo = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }  flex flex-col justify-center items-center transition-all duration-500 `}
    >
      <h1
        className={`${
          darkMode ? " text-blue-400 " : "  text-indigo-600"
        } mb-6 text-4xl font-bold transition-all duration-500`}
      >
        To-Do App
      </h1>
      <div
        className={`w-full sm:w-96  p-6 rounded-lg shadow-lg transition-all duration-500 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {loading ? (
          //loader
          <div className="flex justify-center items-center ">
            <div className="dot-spinner">
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
            </div>
          </div>
        ) : (
          //loader
          <>
            {" "}
            <form onSubmit={addTodo}>
              <input
                type="text"
                className={`w-full p-3 rounded-lg placeholder-gray-400  mb-4 transition-all duration-500 border ${
                  darkMode
                    ? "   bg-gray-700 text-white outline-none border-gray-700 "
                    : "   focus:outline-none  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 "
                }`}
                placeholder="Enter task..."
              />
              <button
                className={`w-full rounded-lg py-3 transition-all font-bold duration-500 ${
                  darkMode
                    ? "  bg-blue-500 text-black   hover:bg-blue-600 "
                    : " bg-indigo-600 text-white   hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                }`}
              >
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
                  className={` transition-all duration-500 flex justify-between items-center p-2 rounded-lg${
                    darkMode
                      ? "  bg-gray-700 "
                      : "  bg-gray-50  shadow-sm hover:bg-gray-100 "
                  }`}
                >
                  {!todo.isEditing ? (
                    <span
                      className={`${darkMode ? "text-white" : "text-black "}`}
                    >
                      {todo.todocontent}
                    </span>
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
                                t._id === todo._id
                                  ? { ...t, isEditing: false }
                                  : t
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
          </>
        )}
      </div>
      <button
        onClick={toggleDarkMode}
        className={`px-4 py-2   rounded-full shadow-sm focus:outline-none focus:ring-2   absolute top-4 right-2 transition-all duration-500 ${
          darkMode ? " bg-white  text-black" : "bg-gray-700 text-white"
        }`}
      >
        {darkMode ? "Lightmode" : "Darkmode"}
      </button>
    </div>
  );
}

export default App;
