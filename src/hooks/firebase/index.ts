import firebase from "firebase/app";
import "firebase/database";
import { useEffect, useState } from "react";
import firebaseConfig from "./config";
export const useFirebase = () => {
  const [app, setFirebaseInstance] = useState<{ apps: Array<any> }>();
  const [data, setData] = useState<{ test: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!app?.apps.length) {
      firebase.initializeApp(firebaseConfig);

      setFirebaseInstance(firebase);
      // the ref could be the idea of the game
      firebase
        .database()
        .ref("trivia")
        .set({
          test: "MEEEE",
        })
        .then(() => {
          setData({
            test: "MEEEE",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(true);
        });

      firebase
        .database()
        .ref("trivia")
        .on("value", (snapshot) => {
          setData(snapshot.val());
        });
    }
  }, [app]);

  return {
    data,
    loading,
    error,
  };
};
