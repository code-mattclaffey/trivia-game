import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";
import { GameStatuses } from "../../types";
import Scoreboard from "../scoreboard";
import ShareLink from "../share-link";
import { I18nProps } from "../../locales/en";
import Button from "../button";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import Card from "../card";

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
    players,
  } = useFirebaseWrapper();

  const startGame = () => {
    updateStatus(GameStatuses.IN_PLAY);
  };

  const showWinner = () => {
    updateStatus(GameStatuses.FINISHED);
  };

  if (status === GameStatuses.FINISHED) {
    return (
      <Card>
        <h1 className="quiz__title">Would you like to play again?</h1>
        <Link href="/create">
          <Button element="a">{i18n.playAgain}</Button>
        </Link>
      </Card>
    );
  }

  return (
    <>
      <div className="card">
        <h1 className="quiz__title">
          {status === GameStatuses.NOT_STARTED && !players && (
            <>Now let's start inviting players</>
          )}
          {status === GameStatuses.NOT_STARTED &&
            players &&
            players?.length > 0 && <>Ready to play?</>}
        </h1>
        {status === GameStatuses.NOT_STARTED && (
          <>
            <ShareLink
              url={`/join/${gameId}`}
              i18n={{
                shareLinkText: i18n.shareLinkText,
                shareLinkTitle: i18n.shareLinkTitle,
                shareLinkCopiedText: i18n.shareLinkCopiedText,
              }}
            />
            {players && players.length > 0 && (
              <Button onClick={startGame}>{i18n.startGameCta}</Button>
            )}
          </>
        )}
        {questionStage !== questions.length - 1 &&
          status === GameStatuses.IN_PLAY && (
            <>
              <h1 className="quiz__title">
                {ReactHtmlParser(questions[questionStage].question)}
              </h1>

              <Button onClick={nextQuestion} variant="alt-black">
                {i18n.nextQuestionCta}
              </Button>
            </>
          )}
        {questionStage === questions.length - 1 && (
          <>
            <h1 className="quiz__title">It's time for the big reveal! 🥁 🥁</h1>
            <Button onClick={showWinner}>{i18n.showWinnerCta}</Button>
          </>
        )}
      </div>

      <div className="card">
        <Scoreboard />
      </div>
    </>
  );
};

export default HostPanel;
