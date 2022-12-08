import React from "react";
import Card from "./Card";

import { useUserContext } from "../context/UserContext";
import Loader from "./Loader";

const Gallery = ({ data, title }) => {
  const { loadingVehicles } = useUserContext();
  return (
    <div className=" md:mt-10 pb-5">
      <h3 className="text-primary-bg mb-2 text-[1.7rem] md:text-[2rem] text-center py-10 ">
        {title}
      </h3>
      {loadingVehicles ? (
        <Loader />
      ) : data.length === 0 ? (
        <div className="text-center text-[1.3rem] font-[600]">{`Oops... no vehicles found :(`}</div>
      ) : (
        <div className="  w-full flex flex-wrap justify-evenly items-center gap-5 px-7">
          {data.map((vehicle) => (
            <Card data={vehicle} key={vehicle.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
