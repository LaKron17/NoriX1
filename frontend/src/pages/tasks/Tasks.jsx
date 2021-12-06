import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { domain, token } from "../../.env";
import Loader from "../../components/loader/Loader";
import Task from "../../components/task/Task";
import useAuth from "../../hooks/useAuth";
import "./Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(domain, {
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTasks(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios.post(domain, data, {
      headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
    })
    .then(res =>{
      console.log(res.data)
      setTasks([res.data,...tasks,])
    })
    reset();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
  
        <form className="w-75 mt-5 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="form-control task-input"
            placeholder="Add a new Task"
            {...register("note")}
          />
        </form>
       
      <div className="row row-cols-1 row-cols-md-4 g-4 my-4">
        {tasks?.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
