import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {user,setUser}=useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
      
    axios.post('http://localhost:8000/auth/login/',data)
    .then(res => {
        const token = res?.data?.access 
        localStorage.setItem('token',token)
        const decoded_token = jwtDecode(token)
        console.log(decoded_token)
        setUser(decoded_token)
        navigate('/')
    })
  };
 
  const toggleLogin = () => {
    setIsLogin(true);
  };
  const toggleRegister = () => {
    setIsLogin(false);
  };

  return (
    <div className="container">
      <div className="col-md-6 mx-auto  my-5 p-5">
        <h4 className="text-center">{isLogin ? "Login" : "Register"}</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <div className="w-75  mx-auto  m-2">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              defaultValue=""
              {...register("username")}
            />
          </div>
          {/* include validation with required or other standard HTML validation rules */}
          <div className="w-75  mx-auto py-2 m-2">
            <input
              type="password"
              placeholder="Your Password"
              className="form-control"
              {...register("password", { required: true })}
            />
          </div>{" "}
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
          <input
            className="btn btn-success d-block w-50 mx-auto fw-bolder py-2"
            type="submit"
            value={isLogin ? `Login` : "Register"}
          />
        </form>
        {isLogin ? (
          <p className="text-center my-2 lead">
            Haven't any account?{" "}
            <button onClick={toggleRegister} className="loginRegisterBtn">
              Register Now
            </button>{" "}
          </p>
        ) : (
          <p className="text-center my-2 lead">
            Already have an account?{" "}
            <button onClick={toggleLogin} className="loginRegisterBtn  ">
              Login Now
            </button>{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
