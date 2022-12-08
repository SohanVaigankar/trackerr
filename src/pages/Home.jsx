import React, { useEffect } from "react";
import axios from "axios";

// context
import { FETCH_ALL_VEHICLES, LOADING_VEHICLES } from "../context/action.types";
import { useUserContext } from "../context/UserContext";

// components
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Gallery from "../components/Gallery";

const Home = () => {
  // console.log('Home.jsx')
  const { dispatch, vehicles } = useUserContext();

  // Loading data of all the vehicles of the user
  useEffect(() => {
    const fetchVehicleData = async () => {
      dispatch({ type: LOADING_VEHICLES });
      try {
        // fetching the bearer token from localstorage
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("AUTH_TOKEN")
            )}`,
          },
        };

        const res = await axios.get(
          `https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles`,
          config
        );

        // console.log(res.data.data) //org data
        await dispatch({
          type: FETCH_ALL_VEHICLES,
          payload: { vehicles: res.data.data[0].vehicles },
        });

        dispatch({ type: LOADING_VEHICLES });
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicleData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className=" w-[95%] md:w-[90%] lg:w-[85%] mx-auto  p-5 bg-primary-font text-secondary-font rounded-xl my-5 lg:mt-14 pt-24 md:pb-10 lg:py-10">
        <SearchBar />
        <Gallery data={vehicles} title="All vehicles:" />
      </div>
    </div>
  );
};

export default Home;
