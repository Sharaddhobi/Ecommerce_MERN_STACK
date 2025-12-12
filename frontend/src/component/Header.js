import React, { useState } from "react";
import logo from "./assest/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state?.user);
  const appadminmail = JSON.parse(process.env.REACT_APP_ADMIN_EMAIL);
  console.log(userData?.email);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("logout successfully");
  };
  // console.log(process.env.REACT_APP_ADMIN_EMAIL);
  const cartItemNumber = useSelector((state) => state.product.cartItem);
  return (
    <header className="sticky shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/*desktop*/}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4  md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}> Home </Link>
            <Link to={"menu/687f85d4aac71bbefe3efa64"}> Menu </Link>
            <Link to={"about"}> About </Link>
            <Link to={"contect"}> Contect </Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              {" "}
              <BsCartFill />
              <div className="absolute -top-2 -right-1 text-white bg-red-500 w-4 rounded-full m-0 p-0 g-4 text-sm text-center">
                {cartItemNumber?.length}
              </div>
            </Link>
          </div>
          <div className="text-xl text-slate-600 " onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full- overflow-hidden drop-shadow-sm">
              {userData.image ? (
                <img src={userData?.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow-md flex flex-col min-w-[120px] text-center">
                {appadminmail.includes(userData?.email) && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}

                {userData?.image ? (
                  <p
                    className="  cursor-pointer   px-2 "
                    onClick={handleLogout}
                  >
                    Logout ({userData?.firstName})
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className=" text-base md:text-lg flex flex-col md:hidden ">
                  <Link to={""} className="px-2 py-1">
                    {" "}
                    Home{" "}
                  </Link>
                  <Link
                    to={"menu/687f85d4aac71bbefe3efa64"}
                    className="px-2 py-1"
                  >
                    {" "}
                    Menu{" "}
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    {" "}
                    About{" "}
                  </Link>
                  <Link to={"contect"} className="px-2 py-1">
                    {" "}
                    Contect{" "}
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*mobile*/}
    </header>
  );
};

export default Header;
