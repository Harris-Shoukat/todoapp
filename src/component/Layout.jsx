import React, { useEffect } from "react";
import Content from "./Content";
import { useDispatch, useSelector } from "react-redux";
import { fetchtodo } from "../feature/taskSlice";

function Layout() {

  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchtodo())
  },[dispatch]);

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>There is an error...</h1>
  }
  

  return (
    <div className="w-screen h-screen bg-custom-bg flex justify-center items-center">
      <div className="w-3/4 sm:w-2/3 md:w-1/3 h-auto bg-slate-300 flex justify-center items-center flex-col rounded-xl">
        {/* purple section */}
        <div className="w-full h-36 bg-purple-900 rounded-t-xl">
          <h1 className="text-3xl text-white pt-1">TODO List</h1>
        </div>
        <Content />
      </div>
    </div>
  );
}

export default Layout;
