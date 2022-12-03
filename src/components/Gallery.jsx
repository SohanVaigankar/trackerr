import React from "react";
import Card from "./Card";

import { useUserContext } from "../context/UserContext";
import Loader from "./Loader";

const Gallery = ({ data, title }) => {
  const { loadingVehicles } = useUserContext();
  return (
    <div className=" md:mt-10">
      <h3 className="text-primary-bg mb-2 text-[2rem] text-center py-10 ">
        {title}
      </h3>
      {loadingVehicles ? (
        <Loader />
      ) : data.length === 0 ? (
        <div className="text-center text-[1.3rem] font-[600]">{`Oops... no vehicles found :(`}</div>
      ) : (
        <div className="grid  w-full grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 px-7">
          {data.map((vehicle) => (
            <Card data={vehicle} key={vehicle.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
