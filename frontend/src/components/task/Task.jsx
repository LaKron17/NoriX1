import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { domain, token } from "../../.env";
import {
  addToDoneList,
  removeFromDoneList,
  setDoneList,
  setUndoneList,
} from "../../redux/slices/taskSlice";
import notify from "../../utils/notify";
import "./Task.css";

const Task = ({ task: _task }) => {
  const [task, setTask] = useState(_task);
  const [color, setColor] = useState("");
  const { doneList, undoneList } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setTask({ ...task, color: e.target.value });
    console.log(task);
    axios
      .put(`${domain}/${task.id}/`, task, {
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      })
      .then((res) => {});
  };

  const handleDone = (id) => {
    const data = { ...task, is_done: true };
    axios
      .put(`${domain}/${id}/`, data, {
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        notify("Task added to done successfully!", "success");
        console.log(res.data);

        const restData = undoneList.filter((t) => t.id != res.data.id);
        dispatch(setUndoneList(restData));

        dispatch(addToDoneList(res.data));
      })
      .catch((error) => {
        notify("Something went wrong. Please try again!!", "info");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${domain}/${id}/`, {
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        notify("Task deleted successfully!", "success");
        dispatch(removeFromDoneList(task));
      })
      .catch((error) =>
        notify("Something went wrong. Please try again!!", "info")
      );
  };

  useEffect(() => {
    dispatch(setUndoneList(undoneList));
  }, [undoneList]);

  return (
    <div className="col">
      <div style={{ backgroundColor: task?.color }} className="card task-card">
        {task.is_done ? (
          <button
            onClick={() => handleDelete(task.id)}
            className="markdone bg-danger"
          >
            <i className="fas fa-trash"></i> delete
          </button>
        ) : (
          <button
            onClick={() => handleDone(task.id)}
            className="markdone bg-dark"
          >
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
