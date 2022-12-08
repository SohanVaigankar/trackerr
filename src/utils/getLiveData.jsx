// firebase
import { db } from "../configs/firebase.config";
import { ref, onValue } from "firebase/database";

export const getLiveData = (path,setLiveData) => {
    const vehicleRef = ref(db, path);
    // const vehicleRef = ref(db);
    onValue(
      vehicleRef,
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