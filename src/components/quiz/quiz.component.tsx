import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useFirebaseWrapper } from "../firebase-wrapper/firebase-wrapper.component";
import { GameStatuses } from "../../types";
import Scoreboard from "../scoreboard";

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

  const [answers, setAnswers] = useState(() =>
    randomiseAnswers(questions[questionStage])
  );

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
    return <p>Waiting for host to start the game...</p>;
  }

  if (status === GameStatuses.FINISHED) {
    return <Scoreboard />;
  }

  const question: Question = questions[questionStage];

  if (!question || !playerId) {
    return <p>Error</p>;
  }

  return (
    <>
      <h1>{ReactHtmlParser(question.question)}</h1>
      {answers.map((answer: string) => (
        <button
          type="button"
          key={answer}
          onClick={() => answerQuestion(answer)}
          disabled={disabledAnswers}
        >
          {answer}
        </button>
      ))}
    </>
  );
};

export default Quiz;
