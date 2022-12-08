import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// context
import { useUserContext } from "../context/UserContext";

// icons
import { BsXLg } from "react-icons/bs";

// components
import Navbar from "../components/Navbar";
import InfoGridCard from "../components/InfoGridCard";
import LiveMap from "../components/LiveMap";

// utils
import { getLiveData } from "../utils/getLiveData";

const VehicleInfo = () => {
  // console.log("VehicleInfo.jsx");
  const { vehicles, dispatch } = useUserContext();
  const navigate = useNavigate();
  // destructuring params to get vehicle id and vrn
  const { vid, vrn } = useParams();
  // state to track the general data of the selected vehicle
  const [data, setData] = useState([]);
  // state to keep track of vehicle info
  const [info, setInfo] = useState([]);
  // state to store live data of the vehicle
  const [liveData, setLiveData] = useState(null);

  // filtering out the selected vehicle
  useEffect(() => {
    setData(vehicles.filter((vehicle) => parseInt(vid) == vehicle.id)[0]);
  }, [vid]);

  // vehicle live info from firebase real time db
  useEffect(() => {
    getLiveData(`${vid}-${vrn}`, setLiveData);
  }, []);

  // array containing vehicle info properties
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
          : parseFloat(
              (liveData?.location?.totalOdometer / 1000).toFixed(2)
            ).toLocaleString("en-in") + " KM",
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
          : Date(liveData?.timestamp).toLocaleString("en-US").slice(0, 21),
    },
  ];

  // updating the info when the data or livedata updates
  useEffect(() => {
    data && setInfo(infoProps);
  }, [data, liveData]);

  return (
    <div>
      <Navbar />
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-5 w-[95%] md:w-[90%] lg:w-[85%] mx-auto  p-5 bg-primary-font text-secondary-font rounded-xl my-5 py-8 lg:py-10">
        <BsXLg
          className="text-primary-bg absolute right-2 top-1 m-5 cursor-pointer hover:text-[#ef3b3ba3] hover:scale-[1.3]"
          onClick={() => {
            navigate(-1);
          }}
        />
        {/* map container */}
        <div className="flex-1 flex flex-col h-[50vh] md:h-[70vh] lg:h-full w-full gap-4 mt-5 sm:mt-5 md:mt-0">
          <p className="text-[1.5rem]  text-primary-bg font-[600] pl-5 w-full mx-auto">
            Vehicle Location
          </p>
          <LiveMap
            path={vid + "-" + vrn}
            locationData={liveData?.location ? liveData.location : null}
          />
        </div>
        {/* info */}
        <div className="flex flex-col gap-5 ">
          <p className="text-[1.5rem] md:pl-5 text-primary-bg font-[600] pl-5 w-full mx-auto">
            Vehicle Information
          </p>
          <InfoGridCard data={info} />
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;
