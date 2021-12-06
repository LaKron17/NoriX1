import React from "react";
import Task from "../task/Task";
import Tasks from "../../pages/tasks/Tasks";
import "./SideBar.css";
const SideBar = ({ handleCloseSideBar }) => {
  const tasks = [
    {
      note: "assignment tailwind css use korte hobe, onek kicu ace aro korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "ghum theke utbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "brush  korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
    {
      note: "assignment tailwind css use korte hobe, onek kicu ace aro korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "ghum theke utbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "brush  korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
    {
      note: "assignment tailwind css use korte hobe, onek kicu ace aro korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "ghum theke utbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "brush  korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
    {
      note: "assignment tailwind css use korte hobe, onek kicu ace aro korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "ghum theke utbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "brush  korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
    {
      note: "assignment tailwind css use korte hobe, onek kicu ace aro korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "ghum theke utbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "brush  korbo",
      is_done: false,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
    {
      note: "bathroom korbo korbo",
      is_done: true,
      color: "gray",
    },
  ];
  return (
    <aside className="">
      <div className="p-3 mb-2 border-bottom d-flex justify-center-center align-items-center sticky-top bg-white">
        <button
          className="border-2 border-dark me-2 rounded-circle p-2 fw-bolder px-3 text-center bg-dark text-white"
          onClick={handleCloseSideBar}
        >
          X
        </button>
        <h5 className="fw-bolder">Your Have Done</h5>
      </div>
      <div className="input-group p-3 mx-auto">
        <input
          type="text"
          className="form-control task-input"
          placeholder="Search by tasknote,date"
        />
      </div>
      <div className="row row-cols-1 g-4 p-2">
        {tasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
