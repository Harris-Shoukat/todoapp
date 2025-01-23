import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../feature/taskSlice";

function Edit({ task }) {
  const [isEditing, setisEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
//   const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editTask({id: task.id, title}))
    setisEditing(false);
  }
  return (
    <div>
      {isEditing ? (
        <div className=" bg-slate-500 w-[300px] h-32 p-5 flex flex-col">
          <input
            type="text"
            placeholder="What would you like to do ?"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="placeholder-slate-200 bg-transparent text-lg text-white w-full md:w-3/3 p-1 border-b-2 border-blue-950 focus:outline-none"
          />

          <div className="flex justify-center">
            <button
            onClick={handleEdit} 
            className="w-1/2 m-1 md:w-1/3 hover:shadow-orange-100 bg-orange-500 shadow-lg shadow-orange-300 text-white rounded-md py-1 text-xl mt-3">
              Save
            </button>
            <button
              onClick={() => setisEditing(false)}
              className="w-1/2 m-1 md:w-1/3 hover:shadow-orange-100 bg-orange-500 shadow-lg shadow-orange-300 text-white rounded-md py-1 text-xl mt-3"
            >
              X
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => setisEditing(true)}
            className="m-1 bg-violet-500 text-lg text-white p-2 ml-1 rounded "
          >
            <MdEdit className="cursor-pointer"/>
          </button>
        </>
      )}
    </div>
  );
}

export default Edit;
