import axios from "axios";
import React, { useEffect, useState } from "react";
import { domain, token } from "../../.env";
import useTasks from "../../hooks/useTasks";
import "./Task.css";
const Task = ({ task }) => {
  const [color, setColor] = useState("");
  const { undoneTasks, setUndoneTasks, doneTasks, setDoneTasks } = useTasks();
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleDone = (id) => {
    task.is_done = true;
    console.log(localStorage.getItem("token"));
    axios
      .put(`${domain}/${id}/`, task, {
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const restData = undoneTasks.filter((t) => t.id != task.id);
        setUndoneTasks(restData);
        setDoneTasks([task, ...doneTasks]);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${domain}/${id}/`, {
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const restData = doneTasks.filter((t) => t.id !== task.id);

        setDoneTasks(restData);
      });
  };

  return (
    <div className="col">
      <div style={{ backgroundColor: color }} className="card task-card">
        {task.is_done ? (
          <button
            onClick={() => handleDelete(task.id)}
            className="markdone bg-danger"
          >
            <i className="fas fa-trash"></i> delete
          </button>
        ) : (
          <button onClick={() => handleDone(task.id)} className="markdone">
            <i className="fas fa-check"></i> Mark as Done
          </button>
        )}

        <div className="color-input">
          <i className="fas fa-lg fa-palette color-icon"></i>
          <input onChange={handleColorChange} type="color" />
        </div>

        <div className="card-body d-flex">
          <h5 className="card-title del">
            {task.is_done ? <del>{task?.note}</del> : task.note}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Task;
