import firebase from "firebase/app";
import "firebase/database";
import { useEffect, useState } from "react";
import firebaseConfig from "./config";
export const useFirebase = () => {
  const [app, setFirebaseInstance] = useState<{ apps: Array<any> }>();

  // Lazy initializer
  const [data, setData] = useState<{ test: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<boolean>(false);

  useEffect(() => {
    const storage = localStorage.getItem("trivia-state");

    if (storage) {
      setData(JSON.parse(storage));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!app?.apps.length) {
      firebase.initializeApp(firebaseConfig);

      setFirebaseInstance(firebase);

      firebase
        .database()
        .ref("trivia")
        .on("value", (snapshot) => {
          setData(snapshot.val());
          localStorage.setItem("trivia-state", JSON.stringify(snapshot.val()));
          setLoading(false);
        });
    }
  }, [app]);

  return {
    data,
    loading,
    error,
  };
};
