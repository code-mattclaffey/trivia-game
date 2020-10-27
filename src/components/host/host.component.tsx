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
      <Card title={i18n.wouldYouLikeToPlayAgainTitle}>
        <Link href="/create">
          <Button element="a">{i18n.playAgain}</Button>
        </Link>
      </Card>
    );
  }

  let title: any = i18n.invitePlayersTitle;
  let Component: JSX.Element | null = null;

  if (questionStage === questions.length - 1) {
    title = i18n.showWinnerTitle;

    Component = (
      <Card title={title}>
        <Button onClick={showWinner}>{i18n.showWinnerCta}</Button>
      </Card>
    );
  }

  if (status === GameStatuses.NOT_STARTED) {
    title = i18n.invitePlayersTitle;

    if (players && players.length > 0) {
      title = i18n.readyToPlayTitle;
    }

    Component = (
      <Card title={title}>
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
      </Card>
    );
  }

  if (status === GameStatuses.NOT_STARTED && players && players?.length > 0) {
    title = i18n.readyToPlayTitle;
  }

  if (
    questionStage !== questions.length - 1 &&
    status === GameStatuses.IN_PLAY
  ) {
    title = ReactHtmlParser(questions[questionStage].question);

    Component = (
      <Card title={title}>
        <Button onClick={nextQuestion} variant="alt-black">
          {i18n.nextQuestionCta}
        </Button>
      </Card>
    );
  }

  return (
    <>
      {Component}
      <Scoreboard title={i18n.playersJoined} />
    </>
  );
};

export default HostPanel;
