import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { domain, token } from "../../.env";
import Loader from "../../components/loader/Loader";
import SideBar from "../../components/sideBar/SideBar";
import Task from "../../components/task/Task";
import useAuth from "../../hooks/useAuth";
import useTasks from "../../hooks/useTasks";
import "./Tasks.css";

const Tasks = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { undoneTasks, setUndoneTasks, doneTasks } = useTasks();
  console.log(doneTasks);
  const [sideBar, setSideBar] = useState(false);

  const handleCloseSideBar = (e) => {
    sideBar && setSideBar(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      await axios
        .get(`${domain}/?query=undone`, {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setUndoneTasks(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(domain, data, {
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUndoneTasks([res.data, ...undoneTasks]);
      });
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
        {undoneTasks?.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>

      <div onClick={handleCloseSideBar} className="container-fluid">
        <a
          onClick={() => setSideBar(true)}
          id="my-done"
          class="text-decoration-none fw-bolder"
        >
          My Done <sup>{doneTasks.length}</sup>{" "}
        </a>
      </div>
      {sideBar && <SideBar handleCloseSideBar={handleCloseSideBar} />}
    </div>
  );
};

export default Tasks;
