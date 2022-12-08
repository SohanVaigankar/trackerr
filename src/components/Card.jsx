import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// context
import { LOAD_VEHICLE_LIVE_INFO } from "../context/action.types";
import { useUserContext } from "../context/UserContext";
// firebase
import { db } from "../configs/firebase.config";
import { ref, onValue } from "firebase/database";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const { dispatch } = useUserContext();
  const [liveData, setLiveData] = useState(null);

  // vehicle live info from firebase real time db
  useEffect(() => {
    const getLocation = () => {
      const vehicleMapRef = ref(db, `${data.id}-${data.registrationNumber}`);
      // const vehicleMapRef = ref(db);
      onValue(
        vehicleMapRef,
        (snapshot) => {
          const updatedMapData = snapshot.val();
          // console.log(updatedMapData);
          updatedMapData == null
            ? setLiveData(null)
            : setLiveData(updatedMapData);
        },
        (error) => {
          console.log(error);
        }
      );
    };

    getLocation();

    // return () => {
    //   getLocation();
    // };
  }, []);

  // fn to handle clicks to check specific vehicle info
  const handleVehicleInfo = async (e) => {
    e.preventDefault();
    await dispatch({
      type: LOAD_VEHICLE_LIVE_INFO,
      payload: { liveData: liveData },
    });
    navigate(`/vehicle-info/${data?.id}-${data?.registrationNumber}`);
  };

  return (
    <div
      className="bg-[#1823fb5c] text-primary-font  rounded-xl cursor-pointer shadow-lg hover:scale-[1.015] overflow-hidden md:max-w-[20rem] min-h-[8rem] broder-solid border-2 border-[#00000034] hover:bg-[#1823fb70] w-full sm:w-[48%] md:w-[45%] lg:w-[31.6%] "
      onClick={handleVehicleInfo}
    >
      <div className="flex justify-between items-center relative px-5 py-4 bg-[#00000021]">
        <div>
          <p className="text-[0.7rem]">Reg. No.</p>
          <p className="font-[600]">{data?.registrationNumber}</p>
        </div>

        <div>
          <div
            className={` h-2 w-2 rounded-full border-solid border-[1px] border-[#ffffff56] absolute right-4 top-2   ${
              data?.status == "Online"
                ? "bg-[#2de439]"
                : data?.status == "Suspended"
                ? "bg-[#d80d0d]"
                : "bg-[#939393]"
            }`}
          ></div>
          <p className=" mt-4">{`${
            liveData?.location?.speed === undefined
              ? "--"
              : liveData?.location?.speed
          } Kmph`}</p>
        </div>
      </div>
      <div className="p-5 bg-[#00000010] h-full text-[0.85rem] flex flex-col  gap-3">
        <p>{`Ignition status: ${
          liveData?.ignition === undefined
            ? "N/A"
            : liveData?.ignition?.status
            ? "ON"
            : "OFF"
        }`}</p>
        <p>{`Movement status: ${
          liveData?.movement === undefined
            ? "N/A"
            : liveData?.movement?.status
            ? "On the move"
            : "Stopped"
        }`}</p>
        <p>{`Type: ${data?.type ? data.type : "N/A"}`}</p>
        <div className="flex justify-between items-center flex-wrap gap-2 ">
          <p>{`Make: ${data?.make ? data.make : "N/A"}`}</p>
          <p>{`Model: ${data?.model ? data.model : "N/A"}`}</p>
        </div>
        <p className="text-[0.7rem] text-center">{`data last updated at ${
          liveData?.timestamp == undefined
            ? "--"
            : liveData?.timestamp.slice(11, 16)
        }`}</p>
      </div>
    </div>
  );
};

export default Card;
