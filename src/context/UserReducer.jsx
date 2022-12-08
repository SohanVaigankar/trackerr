import {
  LOADING_VEHICLES,
  // LOAD_VEHICLE_LIVE_INFO,
  FETCH_ALL_VEHICLES,
  LOGIN,
  LOGOUT,
  SHOW_LOCATION,
} from "./action.types";
const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload.user };
    case LOGOUT:
      localStorage.removeItem("AUTH_TOKEN");
      return { ...state, user: null };
    case FETCH_ALL_VEHICLES:
      return {
        ...state,
        vehicles: action.payload.vehicles,
      };
    case LOADING_VEHICLES:
      return { ...state, loadingVehicles: !state.loadingVehicles };
    // case LOAD_VEHICLE_LIVE_INFO:
      // return { ...state, liveData: action.payload.liveData };
    case SHOW_LOCATION:
      return { ...state };
    default:
      return { ...state };
  }
};

export default UserReducer;
