import React from "react";

const InfoGridCard = ({ data }) => {
  return (
    <div className="flex flex-col justify-between items-center w-[70%] sm:w-full mx-auto">
      {data.map((entry, index) => (
        <div
          key={index}
          className="flex justify-start sm:pl-5  sm:leading-10 items-center w-full gap-5 font-[600] text-primary-bg text-[1rem] sm:text-[1.2rem] flex-wrap"
        >
          <p className="font-[400]">{entry.title}</p>
          <p>{entry.infoValue == null ? "N/A" : entry.infoValue}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoGridCard;
