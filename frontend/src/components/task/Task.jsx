import axios from "axios";
import React, { useEffect, useState } from "react";
import { domain, token } from "../../.env";
import "./Task.css";
const Task = ({ task }) => {
  const [color, setColor] = useState("");
  
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="col">
      <div style={{ backgroundColor: color }} className="card task-card">
        <button class="markdone">
          <i class="fas fa-check"></i> Mark as Done
        </button>

        <div className="color-input">
          <i class="fas fa-lg fa-palette color-icon"></i>
          <input onChange={handleColorChange} type="color" />
        </div>

        <div className="card-body d-flex">
          <h5 className="card-title">{task?.note}</h5>
        </div>
      </div>
    </div>
  );
};

export default Task;
