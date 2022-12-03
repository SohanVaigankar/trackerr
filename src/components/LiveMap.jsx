import React, { useEffect, useState, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { db } from "../configs/firebase.config";
import { ref, onValue } from "firebase/database";

// components
import Loader from "./Loader";

const LiveMap = ({ path }) => {
  const [data, setData] = useState();

  // loading google maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API,
  });

  useEffect(() => {
    const getLocation = () => {
      // const vehicleMapRef = ref(db, `${path}/location`);
      const vehicleMapRef = ref(db, `117-KA 05 AH 9754/location`);
      // const testRef = ref(db);
      onValue(
        vehicleMapRef,
        (snapshot) => {
          const updatedMapData = snapshot.val();
          setData(updatedMapData);
        },
        (error) => {
          console.log(error);
        }
      );
    };

    getLocation();
  }, []);

  // const position = useMemo(
  //   () => ({ lat: data.latitude, lng: data.longitude }),
  //   [data]
  // );

  // console.log(data.latitude);

  return isLoaded ? (
    <GoogleMap
      zoom={15}
      center={{
        lat: data?.latitude && data.latitude,
        lng: data?.longitude && data.longitude,
      }}
      mapContainerClassName="h-full w-full"
    >
      <MarkerF
        position={{
          lat: data?.latitude && data.latitude,
          lng: data?.longitude && data.longitude,
        }}
      />
    </GoogleMap>
  ) : (
    <Loader />
  );
};

export default LiveMap;
