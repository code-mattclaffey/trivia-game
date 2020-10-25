import React from "react";
import { useFirebaseWrapper } from "../firebase-wrapper/firebase-wrapper.component";
import { GameStatuses } from "../../types";
import Scoreboard from "../scoreboard";
import ShareLink from "../share-link";

const HostPanel: React.FC = () => {
  const {
    updateStatus,
    nextQuestion,
    questions,
    questionStage,
    status,
    gameId,
  } = useFirebaseWrapper();

  return (
    <>
      <Scoreboard />
      {status === GameStatuses.NOT_STARTED && (
        <>
          <ShareLink url={`/join/${gameId}`} />
          <button
            type="button"
            onClick={() => updateStatus(GameStatuses.IN_PLAY)}
          >
            Start game
          </button>
        </>
      )}
      {questionStage !== questions.length - 1 && (
        <button type="button" onClick={nextQuestion}>
          Next question
        </button>
      )}
      {questionStage === questions.length - 1 && (
        <button
          type="button"
          onClick={() => updateStatus(GameStatuses.FINISHED)}
        >
          Show winner
        </button>
      )}
    </>
  );
};

export default HostPanel;
