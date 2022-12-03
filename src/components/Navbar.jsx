import React from "react";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { LOGOUT } from "../context/action.types";

// icons
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const { user, dispatch } = useUserContext();
  // console.log(user);
  return (
    <nav className="w-[95%] md:w-[90%] lg:w-[85%] mx-auto text-primary-font flex flex-col sm:flex-row justify-between items-center p-5 gap-14 sm:gap-0">
      <Link
        to="/"
        className="flex items-center justify-center  text-[2rem] font-[500] gap-3"
      >
        <FaMapMarkedAlt />
        <h1>Trackerr</h1>
      </Link>
      <ul className="flex items-center  justify-center  text-[1.2rem] font-[400] gap-20 sm:gap-10">
        {user !== null && user !== undefined ? (
          <>
            <Link to="#" className=" flex justify-center items-center gap-2">
              <BsPersonCircle />
              <p className="text-[1.2rem]">{`${user.name.split(" ")[0]}`}</p>
            </Link>
            <Link to="/" onClick={() => dispatch({ type: LOGOUT })}>
              logout
            </Link>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
