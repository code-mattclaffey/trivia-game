import React from "react";
import ReactHtmlParser from "react-html-parser";
import { useFirebaseWrapper } from "../firebase-wrapper/firebase-wrapper.component";
import { GameStatuses } from "../../types";

const Quiz: React.FC = () => {
  const { status, questions, questionStage } = useFirebaseWrapper();

  if (status === GameStatuses.NOT_STARTED) {
    return <p>Waiting for host to start the game...</p>;
  }

  if (status === GameStatuses.FINISHED) {
    return <p>Game over</p>;
  }

  const question: Question = questions[questionStage];

  if (!question) {
    return <p>Error</p>;
  }

  let answers = [...question.incorrect_answers, question.correct_answer];

  if (question.type === "multiple") {
    answers.sort(() => Math.random() - 0.5);
  }

  return (
    <>
      <h1>{ReactHtmlParser(question.question)}</h1>
      {answers.map((answer: string) => (
        <button type="button">{answer}</button>
      ))}
    </>
  );
};

export default Quiz;
