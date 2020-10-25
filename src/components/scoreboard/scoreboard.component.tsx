import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";

const Scoreboard: React.FC = () => {
  const { players } = useFirebaseWrapper();

  return (
    <>
      {players
        ?.sort((a, b) => b.correctAnswers - a.correctAnswers)
        .map((player: Player) => (
          <div key={player.playerId}>
            <p>{player.name}</p>
            <p>
              Correct: {player.correctAnswers} Incorrect:{" "}
              {player.incorrectAnswers}
            </p>
          </div>
        ))}
    </>
  );
};

export default Scoreboard;
