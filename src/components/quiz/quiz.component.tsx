import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";
import { GameStatuses } from "../../types";
import Button from "../button";
import Giphy from "../giphy";
import { i18n } from "../../locales";

const Quiz: React.FC = () => {
  const [playerId, setPlayerId] = useState<string>();
  const [disabledAnswers, setDisableAnswers] = useState<boolean>(false);
  const {
    status,
    questions,
    questionStage,
    updatePlayerScore,
    players,
  } = useFirebaseWrapper();

  const randomiseAnswers = (question: Question) => {
    let answers = [...question.incorrect_answers, question.correct_answer];

    if (question.type === "multiple") {
      answers.sort(() => Math.random() - 0.5);
    }

    return answers;
  };

  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const question: Question = questions[questionStage];

    if (question) {
      setDisableAnswers(false);
      setAnswers(randomiseAnswers(question));
    }
  }, [questionStage]);

  useEffect(() => {
    const currentPlayerId = sessionStorage.getItem("playerId");

    if (currentPlayerId) {
      setPlayerId(currentPlayerId);
    }
  }, []);

  const answerQuestion = (answer: string) => {
    const isCorrectAnswer = answer === question.correct_answer;
    const player = players?.filter(
      (player) => player.playerId === playerId
    )[0]!;

    setDisableAnswers(true);

    updatePlayerScore({
      playerId: player.playerId,
      name: player.name,
      correctAnswers: isCorrectAnswer
        ? player.correctAnswers++
        : player.correctAnswers,
      incorrectAnswers: !isCorrectAnswer
        ? player.incorrectAnswers++
        : player.incorrectAnswers,
    });
  };

  if (status === GameStatuses.NOT_STARTED) {
    return (
      <div className="card">
        <p>{i18n.waitingToPlay}</p>
      </div>
    );
  }

  if (status === GameStatuses.FINISHED) {
    const isWinner =
      players?.sort((a, b) => b.correctAnswers - a.correctAnswers)[0]
        .playerId === playerId;

    return (
      <Giphy
        isWinner={isWinner}
        i18n={{
          winnerText: i18n.winnerText,
          loserText: i18n.loserText,
        }}
      />
    );
  }

  const question: Question = questions[questionStage];

  if (!question || !playerId) {
    return null;
  }

  return (
    <div className="card">
      <h1>{ReactHtmlParser(question.question)}</h1>
      {answers.map((answer: string) => (
        <Button
          key={answer}
          onClick={() => answerQuestion(answer)}
          disabled={disabledAnswers}
        >
          {answer}
        </Button>
      ))}
    </div>
  );
};

export default Quiz;
