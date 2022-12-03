import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// context
import { LOGIN } from "../context/action.types";
import { useUserContext } from "../context/UserContext";

import Loader from "../components/Loader";

const Login = () => {
  const { dispatch } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      try {
        const res = await axios.post(
          `https://staging-api.tracknerd.io/v1/auth/login`,
          { username: email, password }
        );
        await dispatch({ type: LOGIN, payload: { user: res.data.user } });
        localStorage.setItem("AUTH_TOKEN", JSON.stringify(res.data.token));
        setIsLoading(false);
        navigate("/");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      onSubmit={handleLogin}
      className="flex justify-center items-center h-screen"
    >
      <form className="flex flex-col justify-center items-center gap-8  w-[50%]">
        <h1 className="text-[2rem] text-primary-font">Login</h1>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required
          className="rounded leading-10 pl-3 text-primary-bg w-[40%]"
          onChange={(e) => setEmail(e.target.value.trim())}
        />

        <input
          type="password"
          name="password"
          id="password"
          className="rounded leading-10 pl-3 text-primary-bg w-[40%]"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <button
          type="submit"
          className="flex justify-center items-center gap-1 text-lg p-1 w-[20%] rounded border-solid border-2 opacity-80 hover:opacity-100 hover:bg-primary-font border-primary-font text-primary-font hover:text-primary-bg"
        >
          {isLoading && <Loader />}
          <p>Login</p>
        </button>
      </form>
    </div>
  );
};

export default Login;
