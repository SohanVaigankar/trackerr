import React from "react";
import { useNavigate } from "react-router-dom";


const Card = ({ data }) => {
  const navigate = useNavigate();

  // fn to handle clicks to check specific vehicle info
  const handleVehicleInfo = (e) => {
    e.preventDefault();
    navigate(`/vehicle-info/${data?.id}-${data?.registrationNumber}`);
  };

  return (
    <div
      className="bg-primary-bg text-primary-font  rounded-xl cursor-pointer shadow-lg hover:scale-[1.015] overflow-hidden md:max-w-[20rem] min-h-[8rem] broder-solid border-2 border-[#00000034] hover:bg-[#1823fb70]"
      onClick={handleVehicleInfo}
    >
      <div className="flex justify-between items-center relative px-5 py-4 bg-[#00000021]">
        <div>
          <p className="text-[0.7rem]">Reg. No.</p>
          <p className="font-[600]">{data?.registrationNumber}</p>
        </div>

        <div
          className={` h-2 w-2 rounded-full border-solid border-[1px] border-[#ffffff56] absolute right-4 top-2   ${
            data?.status == "Online"
              ? "bg-[#2de439]"
              : data?.status == "Suspended"
              ? "bg-[#d80d0d]"
              : "bg-[#939393]"
          }`}
        ></div>
      </div>
      <div className="p-5 bg-[#00000010] h-full text-[0.85rem] flex flex-col  gap-3">
        <p>{`Status: ${data?.status ? data.status : "N/A"}`}</p>
        <p>{`Type: ${data?.type ? data.type : "N/A"}`}</p>
        <div className="flex justify-between items-center flex-wrap gap-1 ">
          <p>{`Make: ${data?.make ? data.make : "N/A"}`}</p>
          <p>{`Model: ${data?.model ? data.model : "N/A"}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
