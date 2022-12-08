import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// context
import { useUserContext } from "../context/UserContext";
import { LOAD_VEHICLE_LIVE_INFO } from "../context/action.types";

// icons
import { BsXLg } from "react-icons/bs";

// components
import Navbar from "../components/Navbar";
import InfoGridCard from "../components/InfoGridCard";
import LiveMap from "../components/LiveMap";

const VehicleInfo = () => {
  // console.log("VehicleInfo.jsx");
  const { vehicles, liveData, dispatch } = useUserContext();
  const navigate = useNavigate();
  const { vid, vrn } = useParams();
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setData(vehicles.filter((vehicle) => parseInt(vid) == vehicle.id)[0]);
  }, [vid]);

  const infoProps = [
    { title: "Registration Number:", infoValue: data?.registrationNumber },
    { title: "Make:", infoValue: data?.make },
    { title: "Model:", infoValue: data?.model },
    // { title: "Driver:", infoValue: data?.driver },

    { title: "Status:", infoValue: data?.status },
    { title: "Type:", infoValue: data?.type },
    { title: "Chassis Number:", infoValue: data?.chassisNumber },
    {
      title: "Odometer Reading:",
      infoValue:
        liveData?.location?.totalOdometer === undefined
          ? "--"
          : liveData?.location?.totalOdometer.toLocaleString("en-in") + " KM",
    },

    { title: "Speed Limit:", infoValue: data?.speedLimit + " km/h" },
    { title: "Tank Capacity:", infoValue: data?.tankCapacity },
    {
      title: "Ignition Status:",
      infoValue:
        liveData?.ignition === undefined
          ? "N/A"
          : liveData?.ignition?.status
          ? "ON"
          : "OFF",
    },
    {
      title: "Movement Status:",
      infoValue:
        liveData?.movement === undefined
          ? "N/A"
          : liveData?.movement?.status
          ? "On the move"
          : "Stopped",
    },
    {
      title: "Speed:",
      infoValue:
        liveData?.location?.speed === undefined
          ? "--"
          : liveData?.location?.speed + " km/h",
    },
    { title: "Note:", infoValue: data?.note },
    {
      title: "Last Updated:",
      infoValue:
        liveData?.timestamp == undefined
          ? "--"
          :  Date(liveData?.timestamp).toLocaleString('en-US').slice(0,21),
    },
  ];

  useEffect(() => {
    data && setInfo(infoProps);
  }, [data]);

  return (
    <div>
      <Navbar />
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-5 w-[95%] md:w-[90%] lg:w-[85%] mx-auto  p-5 bg-primary-font text-secondary-font rounded-xl my-5 py-8 lg:py-10">
        <BsXLg
          className="text-primary-bg absolute right-2 top-1 m-5 cursor-pointer hover:text-[#ef3b3ba3] hover:scale-[1.3]"
          onClick={() => {
            dispatch({
              type: LOAD_VEHICLE_LIVE_INFO,
              payload: { liveData: null },
            });
            navigate(-1);
          }}
        />
        {/* map container */}
        <div className="flex-1 flex flex-col h-[50vh] md:h-[70vh] lg:h-full w-full gap-4">
          <p className="text-[1.5rem]  text-primary-bg font-[600] w-[70%] sm:w-full mx-auto">
            Vehicle Location
          </p>
          <LiveMap
            path={vid + "-" + vrn}
            locationData={liveData?.location ? liveData.location : null}
          />
        </div>
        {/* info */}
        <div className="flex flex-col gap-5 ">
          <p className="text-[1.5rem] md:pl-5 text-primary-bg font-[600] w-[70%] sm:w-full mx-auto">
            Vehicle Information
          </p>
          <InfoGridCard data={info} />
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;
