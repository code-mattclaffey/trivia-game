import React from "react";
import { useFirebaseWrapper } from "../firebase-wrapper/firebase-wrapper.component";
import { GameStatuses } from "../../types";
import Scoreboard from "../scoreboard";

const HostPanel: React.FC = () => {
  const { updateStatus } = useFirebaseWrapper();

  return (
    <>
      <Scoreboard />
      <button type="button" onClick={() => updateStatus(GameStatuses.IN_PLAY)}>
        Start game
      </button>
      <button type="button" onClick={() => updateStatus(GameStatuses.FINISHED)}>
        End game
      </button>
    </>
  );
};

export default HostPanel;
