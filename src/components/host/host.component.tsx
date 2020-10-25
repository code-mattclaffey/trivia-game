import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";
import { GameStatuses } from "../../types";
import Scoreboard from "../scoreboard";
import ShareLink from "../share-link";
import { I18nProps } from "../../locales/en";
import Button from "../button";

interface HostPanelProps {
  i18n: I18nProps;
}

const HostPanel: React.FC<HostPanelProps> = ({ i18n }) => {
  const {
    updateStatus,
    nextQuestion,
    questions,
    questionStage,
    status,
    gameId,
  } = useFirebaseWrapper();

  const startGame = () => {
    updateStatus(GameStatuses.IN_PLAY);
  };

  const showWinner = () => {
    updateStatus(GameStatuses.FINISHED);
  };

  return (
    <>
      <Scoreboard />
      {status === GameStatuses.NOT_STARTED && (
        <>
          <ShareLink
            url={`/join/${gameId}`}
            i18n={{
              shareLinkText: i18n.shareLinkText,
              shareLinkTitle: i18n.shareLinkTitle,
            }}
          />
          <Button onClick={startGame}>{i18n.startGameCta}</Button>
        </>
      )}
      {questionStage !== questions.length - 1 &&
        status === GameStatuses.IN_PLAY && (
          <Button onClick={nextQuestion}>{i18n.nextQuestionCta}</Button>
        )}
      {questionStage === questions.length - 1 && (
        <Button onClick={showWinner}>{i18n.showWinnerCta}</Button>
      )}
    </>
  );
};

export default HostPanel;
