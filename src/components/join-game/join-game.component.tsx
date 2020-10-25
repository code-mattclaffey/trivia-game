import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";
import { withTypes, Field } from "react-final-form";
import { v4 as uuidv4 } from "uuid";
import Button from "../button";
import { I18nProps } from "../../locales/en";

interface JoinGameProps {
  i18n: I18nProps;
}

const JoinGame: React.FC<JoinGameProps> = ({ i18n }) => {
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
              <legend>{i18n.joinGameTitle}</legend>
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

              <label htmlFor="name">{i18n.playerNameLabel}</label>
              <Field
                id="name"
                name="name"
                component="input"
                type="text"
                placeholder={i18n.playerNamePlaceholder}
              />
              <Button type="submit">{i18n.playGameCta}</Button>
            </fieldset>
          </form>
        );
      }}
    </Form>
  );
};

export default JoinGame;
