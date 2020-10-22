import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

interface FirebaseWrapperContextProps extends Game {
  createGame: (questions: Array<Question>) => void;
}

export const defaultGameState: Game = {
  id: "",
  status: "NOT_STARTED",
  currentQuestionId: "",
  questionStage: 0,
  questions: [],
  players: [],
};

const contextState: FirebaseWrapperContextProps = {
  ...defaultGameState,
  createGame: () => null,
};

export const FirebaseWrapperContext = createContext<
  FirebaseWrapperContextProps
>(contextState);

export const useFirebaseWrapper = () => useContext(FirebaseWrapperContext);

const FirebaseWrapper: React.FC<{ gameId?: string | string[] }> = ({
  children,
  gameId,
}) => {
  const router = useRouter();
  const [data, setData] = useState<Game>(defaultGameState);

  useEffect(() => {
    const storage = localStorage.getItem("trivia-state");

    if (storage) {
      setData(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    if (gameId !== undefined) {
      const id: any = gameId;

      firebase
        .database()
        .ref(id)
        .on("value", (snapshot) => {
          setData(snapshot.val());
          localStorage.setItem("trivia-state", JSON.stringify(snapshot.val()));
        });
    }
  }, [gameId]);

  const createGame = (questions: Array<Question>) => {
    const id = uuidv4();

    const newGameState = {
      ...data,
      questions,
      id,
    };

    console.log(newGameState);

    firebase
      .database()
      .ref(id)
      .set(newGameState)
      .then(() => {
        setData(newGameState);
        localStorage.setItem("trivia-state", JSON.stringify(newGameState));
        router.push(`/host/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const context = {
    ...data,
    createGame,
  };

  return (
    <FirebaseWrapperContext.Provider value={context}>
      {children}
    </FirebaseWrapperContext.Provider>
  );
};

export default FirebaseWrapper;
