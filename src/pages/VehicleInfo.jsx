import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// context
import { useUserContext } from "../context/UserContext";

// components
import Navbar from "../components/Navbar";
import InfoGridCard from "../components/InfoGridCard";
import LiveMap from "../components/LiveMap";

const VehicleInfo = () => {
  const { vehicles } = useUserContext();
  const { vid, vrn } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(vehicles.filter((vehicle) => parseInt(vid) == vehicle.id)[0]);
  }, [vid]);

  const infoProps = {
    info1: [
      { title: "Registration Number:", infoValue: data.registrationNumber },
      { title: "Make:", infoValue: data.make },
      { title: "Model:", infoValue: data.model },
      { title: "Driver:", infoValue: data.driver },
    ],
    info2: [
      { title: "Status:", infoValue: data.status },
      { title: "Type:", infoValue: data.type },
      { title: "Chassis Number:", infoValue: data.chassisNumber },
      { title: "Odometer Reading:", infoValue: data.odometerReading },
    ],
    info3: [
      { title: "Speed Limit:", infoValue: data.speedLimit },
      { title: "Tank Capacity:", infoValue: data.tankCapacity },
      { title: "Note:", infoValue: data.note },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 w-[95%] md:w-[90%] lg:w-[85%] mx-auto  p-5 bg-primary-font text-secondary-font rounded-xl my-5 py-8 lg:py-10">
        {/* map container */}
        <div className="flex-1 flex flex-col h-[50vh] md:h-[70vh] w-full gap-4">
          <p className="text-[1.5rem]  text-primary-bg font-[600] w-[70%] sm:w-full mx-auto">
            Vehicle Location
          </p>
          <LiveMap path={vid + "-" + vrn} />
        </div>
        {/* info */}
        <div className="flex flex-col gap-5 ">
          <p className="text-[1.5rem] md:pl-5 text-primary-bg font-[600] w-[70%] sm:w-full mx-auto">
            Vehicle Information
          </p>
          <InfoGridCard data={infoProps.info1} />
        <InfoGridCard data={infoProps.info2} />
        <InfoGridCard data={infoProps.info3} />
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;
