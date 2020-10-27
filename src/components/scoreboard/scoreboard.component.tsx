import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";
import Card from "../card";

const Scoreboard: React.FC<{ title: string }> = ({ title }) => {
  const { players } = useFirebaseWrapper();

  return (
    <Card title={title}>
      <div className="scoreboard">
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
    </Card>
  );
};

export default Scoreboard;
