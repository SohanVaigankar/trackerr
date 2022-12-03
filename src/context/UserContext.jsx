import { createContext, useContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loadingVehicles: false,
  vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
};

// user context
export const UserContext = createContext(initialState);

// user context provider
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  //   persisting user auth data
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  //   persisting vehicle data
  useEffect(() => {
    localStorage.setItem("vehicles", JSON.stringify(state.vehicles));
  }, [state.vehicles]);


  const value = {
    user: state.user,
    vehicles: state.vehicles,
    loadingVehicles: state.loadingVehicles,
    dispatch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// hook to use user context
export const useUserContext = () => useContext(UserContext);
