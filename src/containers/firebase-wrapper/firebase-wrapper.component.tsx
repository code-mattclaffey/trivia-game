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
  const KEY = "trivia-state";
  const router = useRouter();

  const [data, setData] = useState<Game>(() => {
    if (!process.browser) return defaultGameState;

    const storage = localStorage.getItem("trivia-state");

    if (storage) {
      return JSON.parse(storage);
    }

    return defaultGameState;
  });

  useEffect(() => {
    if (gameId !== undefined) {
      getGameRef(gameId).on("value", (snapshot) => {
        if (snapshot.exists()) {
          updateState(snapshot.val());
          return;
        }

        router.push("/");
      });
    }
  }, [gameId]);

  const getGameRef = (id: string) => {
    return firebase.database().ref(id);
  };

  const updateGame = (id: string, state: Partial<Game>) => {
    return getGameRef(id).update({ ...state });
  };

  const setGame = (id: string, state: Partial<Game>) => {
    return getGameRef(id).set({ ...state });
  };

  const updateState = (state: Game) => {
    setData(state);
    localStorage.setItem(KEY, JSON.stringify(state));
  };

  const logError = (error: Error) => console.error(error);

  const createGame = (questions: Array<Question>) => {
    const id = uuidv4();

    const newGameState = {
      ...defaultGameState,
      questions,
      gameId: id,
    };

    setGame(id, newGameState)
      .then(() => {
        updateState(newGameState);
        router.push(`/host/${id}`);
      })
      .catch(logError);
  };

  const updateStatus = (status: keyof typeof GameStatuses) => {
    updateGame(gameId!, { status })
      .then(() => {
        updateState({
          ...data,
          status,
        });
      })
      .catch(logError);
  };

  const nextQuestion = () => {
    const newGameState: Game = {
      ...data,
      questionStage: data.questionStage + 1,
    };

    updateGame(gameId!, { questionStage: newGameState.questionStage })
      .then(() => {
        setData(newGameState);
        localStorage.setItem("trivia-state", JSON.stringify(newGameState));
      })
      .catch(logError);
  };

  const updatePlayerScore = (player: Player) => {
    const players = data.players;

    players?.map((currentPlayer) => {
      if (currentPlayer.playerId === player.playerId) {
        return player;
      }

      return currentPlayer;
    });

    updateGame(gameId!, { players })
      .then(() => {
        updateState({
          ...data,
          players,
        });
      })
      .catch(logError);
  };

  const addPlayer = (player: Player) => {
    const newGameState = {
      ...data,
    };

    newGameState.players = newGameState.players || [];

    newGameState.players.push(player);

    updateGame(gameId!, { players: newGameState.players })
      .then(() => {
        updateState(newGameState);
        router.push(`/quiz/${gameId}`);
      })
      .catch(logError);
  };

  const context: FirebaseWrapperContextProps = {
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
