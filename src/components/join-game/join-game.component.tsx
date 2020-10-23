import React from "react";
import { useFirebaseWrapper } from "../firebase-wrapper/firebase-wrapper.component";
import { withTypes, Field } from "react-final-form";
import { v4 as uuidv4 } from "uuid";

const JoinGame: React.FC = () => {
  const { addPlayer } = useFirebaseWrapper();
  const playerId = uuidv4();

  const onSubmit = (values: Player) => {
    sessionStorage.setItem("playerId", playerId);
    addPlayer(values);
  };

  const { Form } = withTypes<Player>();

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        playerId,
        correctAnswers: 0,
        incorrectAnswers: 0,
      }}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Join game</legend>
              <Field
                id="playerId"
                name="playerId"
                component="input"
                type="hidden"
              />
              <Field
                id="correctAnswers"
                name="correctAnswers"
                component="input"
                type="hidden"
              />
              <Field
                id="incorrectAnswers"
                name="incorrectAnswers"
                component="input"
                type="hidden"
              />

              <label htmlFor="name">Player name</label>
              <Field
                id="name"
                name="name"
                component="input"
                type="text"
                placeholder="Player name"
              />
              <button type="submit">Play game</button>
            </fieldset>
          </form>
        );
      }}
    </Form>
  );
};

export default JoinGame;
