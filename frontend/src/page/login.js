import React, { useState } from "react";
import loginSignupImage from "../component/assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  console.log(data);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  console.log("newwww");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      alert("successfull");
    } else {
      alert("Please Enter require filds");
    }
  };
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h1 className="text-center- text-2xl font-bold"> Signup</h1> */}
        <div className="w-20 overflow-hidden  rounded-full drop-shadow-md shadow-md m-auto ">
          <img src={loginSignupImage} className="w-full" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <lable htmlFor="email">Email</lable>
          <input
            type={"email"}
            id="email"
            name="email"
            class="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />
          <lable htmlFor="password">Password</lable>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200  bordor-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer "
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="  max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account?{" "}
          <Link to={"/signup"} className="text-red-500 ml-3 underlinw">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
