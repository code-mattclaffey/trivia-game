import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./config";

export const defaultGameState: Game = {
  id: "",
  status: "NOT_STARTED",
  currentQuestionId: "",
  questionStage: 0,
  questions: [],
  players: [],
};

export const FirebaseWrapperContext = createContext<Game>(defaultGameState);

export const useFirebaseWrapper = () => useContext(FirebaseWrapperContext);

const FirebaseWrapper: React.FC = ({ children }) => {
  const [app, setFirebaseInstance] = useState<{ apps: Array<any> }>();
  const [data, setData] = useState<Game>(defaultGameState);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) return <p>Loading</p>;

  return (
    <FirebaseWrapperContext.Provider value={data}>
      {children}
    </FirebaseWrapperContext.Provider>
  );
};

export default FirebaseWrapper;
