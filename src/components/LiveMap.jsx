import React, { useEffect, useState, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

// components
import Loader from "./Loader";

const LiveMap = ({ locationData }) => {

  // loading google maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API,
  });

  // const position = useMemo(
  //   () => ({ lat: data.latitude, lng: data.longitude }),
  //   [data]
  // );

  //  data &&  console.log(data);

  return isLoaded ? (
    locationData === null ? (
      <div className="flex h-full bg-[#33333318] justify-center sm:pl-5  sm:leading-10 items-center w-full gap-5 font-[600] text-primary-bg text-[1rem] sm:text-[1.2rem] flex-wrap">
        <div>{`Live Location Not Available :(`}</div>
      </div>
    ) : (
      <GoogleMap
        zoom={15}
        center={{
          lat: locationData?.latitude && locationData.latitude,
          lng: locationData?.longitude && locationData.longitude,
        }}
        mapContainerClassName="h-full w-full"
      >
        <MarkerF
          position={{
            lat: locationData?.latitude && locationData.latitude,
            lng: locationData?.longitude && locationData.longitude,
          }}
        />
      </GoogleMap>
    )
  ) : (
    <Loader />
  );
};

export default LiveMap;
