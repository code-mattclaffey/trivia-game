import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";
import { withTypes } from "react-final-form";
import { v4 as uuidv4 } from "uuid";
import { I18nProps } from "../../locales/en";
import FormContainer from "../form";
import FieldRow from "../field";
import Card from "../card";
import { GameStatuses } from "../../types";
import Link from "next/link";
import Button from "../button";

interface JoinGameProps {
  i18n: I18nProps;
}

const JoinGame: React.FC<JoinGameProps> = ({ i18n }) => {
  const { addPlayer, status } = useFirebaseWrapper();
  const playerId = uuidv4();

  if (status !== GameStatuses.NOT_STARTED) {
    return (
      <Card>
        <h1 className="quiz__title">{i18n.gameHasStartedTitle}</h1>
        <Link href="/create">
          <Button element="a">{i18n.gameHasStartedCtaText}</Button>
        </Link>
      </Card>
    );
  }

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
          <Card>
            <FormContainer
              title={i18n.joinGameTitle}
              onSubmit={handleSubmit}
              submitText={i18n.playGameCta}
            >
              <FieldRow id="playerId" component="input" type="hidden" />
              <FieldRow id="correctAnswers" component="input" type="hidden" />
              <FieldRow id="incorrectAnswers" component="input" type="hidden" />
              <FieldRow
                id="name"
                component="input"
                type="text"
                placeholder={i18n.playerNamePlaceholder}
                label={i18n.playerNameLabel}
              />
            </FormContainer>
          </Card>
        );
      }}
    </Form>
  );
};

export default JoinGame;
