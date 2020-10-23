import React from "react";
import { useFirebaseWrapper } from "../firebase-wrapper/firebase-wrapper.component";
import { GameStatuses } from "../../types";
import Scoreboard from "../scoreboard";

const HostPanel: React.FC = () => {
  const {
    updateStatus,
    nextQuestion,
    questions,
    questionStage,
    status,
    gameId,
  } = useFirebaseWrapper();

  const onClick = (url: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Quiz time!",
          url: url,
        })
        .catch(console.error);
    } else {
      // fallback
    }
  };

  return (
    <>
      <Scoreboard />
      {status === GameStatuses.NOT_STARTED && (
        <>
          <button onClick={() => onClick(`/join/${gameId}`)}>
            Share link with friends
          </button>
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
