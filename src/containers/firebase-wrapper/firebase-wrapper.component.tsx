import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { GameStatuses } from "../../types";

interface FirebaseWrapperContextProps extends Game {
  createGame: (questions: Array<Question>) => void;
  addPlayer: (player: Player) => void;
  updateStatus: (status: GameStatuses) => void;
  nextQuestion: () => void;
  updatePlayerScore: (player: Player) => void;
}

export const defaultGameState: Game = {
  gameId: null,
  status: GameStatuses.NOT_STARTED,
  questionStage: 0,
  questions: [],
  players: [],
};

const contextState: FirebaseWrapperContextProps = {
  ...defaultGameState,
  createGame: () => null,
  addPlayer: () => null,
  updateStatus: () => null,
  nextQuestion: () => null,
  updatePlayerScore: () => null,
};

export const FirebaseWrapperContext = createContext<
  FirebaseWrapperContextProps
>(contextState);

export const useFirebaseWrapper = () => useContext(FirebaseWrapperContext);

const FirebaseWrapper: React.FC<{ gameId?: string }> = ({
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
      firebase
        .database()
        .ref(gameId)
        .on("value", (snapshot) => {
          setData(snapshot.val());
          localStorage.setItem("trivia-state", JSON.stringify(snapshot.val()));
        });
    }
  }, [gameId]);

  const createGame = (questions: Array<Question>) => {
    const id = uuidv4();

    const newGameState = {
      ...defaultGameState,
      questions,
      id,
    };

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

  const updateStatus = (status: keyof typeof GameStatuses) => {
    firebase
      .database()
      .ref(gameId)
      .update({ status })
      .then(() => {
        const newGameState: Game = {
          ...data,
          status,
        };

        setData(newGameState);
        localStorage.setItem("trivia-state", JSON.stringify(newGameState));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const nextQuestion = () => {
    firebase
      .database()
      .ref(gameId)
      .update({ questionStage: data.questionStage + 1 })
      .then(() => {
        const newGameState: Game = {
          ...data,
          questionStage: data.questionStage + 1,
        };

        setData(newGameState);
        localStorage.setItem("trivia-state", JSON.stringify(newGameState));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updatePlayerScore = (player: Player) => {
    const players = data.players;

    players?.map((currentPlayer) => {
      if (currentPlayer.playerId === player.playerId) {
        return player;
      }

      return currentPlayer;
    });

    firebase
      .database()
      .ref(gameId)
      .update({ players })
      .then(() => {
        const newGameState: Game = {
          ...data,
          players,
        };

        setData(newGameState);
        localStorage.setItem("trivia-state", JSON.stringify(newGameState));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addPlayer = (player: Player) => {
    const oldState = data;

    const newGameState = {
      ...oldState,
    };

    newGameState.players = newGameState.players || [];

    newGameState.players.push(player);

    firebase
      .database()
      .ref(gameId)
      .set(newGameState)
      .then(() => {
        setData(newGameState);
        localStorage.setItem("trivia-state", JSON.stringify(newGameState));
        router.push(`/quiz/${gameId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const context = {
    ...data,
    createGame,
    addPlayer,
    updateStatus,
    nextQuestion,
    updatePlayerScore,
  };

  return (
    <FirebaseWrapperContext.Provider value={context}>
      {children}
    </FirebaseWrapperContext.Provider>
  );
};

export default FirebaseWrapper;
