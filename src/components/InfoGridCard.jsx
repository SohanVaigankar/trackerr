import React from "react";

const InfoGridCard = ({ data }) => {
  return (
    <div className="flex flex-col justify-between items-center pl-5 w-full mx-auto">
      {data &&
        data.map((entry, index) => (
          <div
            key={index}
            className="flex justify-start  sm:leading-10 items-center w-full my-1 md:my-0 gap-5 font-[600] text-primary-bg text-[1rem] sm:text-[1.2rem] flex-wrap "
          >
            <p className="font-[400]">{entry?.title}</p>
            <p>
              {entry?.infoValue === null || entry?.infoValue === undefined
                ? "N/A"
                : entry?.infoValue}
            </p>
          </div>
        ))}
    </div>
  );
};

export default InfoGridCard;
