import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";

const Scoreboard: React.FC = () => {
  const { players } = useFirebaseWrapper();

  return (
    <div className="scoreboard">
      <h2 className="scoreboard__title">Players joined</h2>
      {players
        ?.sort((a, b) => b.correctAnswers - a.correctAnswers)
        .map((player: Player) => (
          <div className="scoreboard__player" key={player.playerId}>
            <p>{player.name}</p>
            <p className="scoreboard__player-score">
              Correct: {player.correctAnswers} Incorrect:{" "}
              {player.incorrectAnswers}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Scoreboard;
