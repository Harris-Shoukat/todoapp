import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../feature/taskSlice";
import { v4 } from "uuid";
import Edit from "./Edit";

function Content() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleSumit = (e) => {
    e.preventDefault();
    const newTask = {
      id: v4(),
      title,
      status: status
    };
    // console.log(status);
    
    dispatch(addTask(newTask));

    setTitle("");
    setStatus("Todo");
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      <form
        onSubmit={handleSumit}
        className="absolute -top-24 flex flex-col justify-center items-center w-[90%] md:w-5/6 bg-slate-100 rounded-lg py-6"
      >
        <input
          type="text"
          placeholder="What would you like to do ?"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent text-lg w-full md:w-2/3 p-1 border-b-2 border-blue-950 focus:outline-none"
        />
        <div className="w-4/6 my-2 flex justify-evenly items-center py-2">
          <label htmlFor="status" className="text-xl text-slate-600">
            Status :
          </label>
          <select
            name="status"
            onChange={(e) =>{setStatus(e.target.value)}}
            className="w-32 h-8 px-2 border-b-2 border-blue-900"
          >
            <option value="Todo">Todo</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-1/2 md:w-1/3 hover:shadow-orange-100 bg-orange-500 shadow-lg shadow-orange-300 text-white rounded-md py-1 text-xl mt-2"
        >
          Add
        </button>
      </form>

      {/* Todo list section */}
      {/* class="overflow-y-auto h-72" */}
      <div className="overflow-y-auto h-96 mt-28 w-[90%] md:w-10/12 bg-slate-100 rounded-lg py-10 mb-5">
        <h1 className="flex justify-start text-xl font-medium pl-3 pb-1">
          Todo List
        </h1>
        <table className="min-w-full table-auto border-collapse">
          <thead className="sticky -top-10">
            <tr className="bg-gray-300">
              <th className="px-4 py-2 border">List</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((ele, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b-2 border-blue-200">
                  {ele.title}
                </td>
                <td className="px-4 py-2 border-b-2 border-blue-200">
                  {ele.status}
                </td>
                <td className="px-4 py-2 border-b-2 border-blue-200">
                  <button
                    onClick={() => {
                      handleDelete(ele.id);
                    }}
                    className="m-1 bg-red-500 text-lg text-white p-2 rounded"
                  >
                    <MdDelete />
                  </button>
                  <Edit task={ele} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Content;
