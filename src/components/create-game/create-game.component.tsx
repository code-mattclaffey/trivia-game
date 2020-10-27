import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";
import { withTypes } from "react-final-form";
import { categories, difficulties, types } from "./form-values";
import { I18nProps } from "../../locales/en";
import { getQuestions } from "../../requests/trivia-api";
import FieldRow from "../field";
import FormContainer from "../form";
import Card from "../card";

interface CreateGameProps {
  i18n: I18nProps;
}

const CreateGame: React.FC<CreateGameProps> = ({ i18n }) => {
  const { createGame } = useFirebaseWrapper();

  const onSubmit = async (values: OpenTbdApi) => {
    const { results } = await getQuestions(values);

    createGame(results);
  };

  const { Form } = withTypes<OpenTbdApi>();

  return (
    <Form onSubmit={onSubmit} initialValues={{ amount: 10 }}>
      {({ handleSubmit }) => {
        return (
          <Card>
            <FormContainer
              title={i18n.createGameTitle}
              onSubmit={handleSubmit}
              submitText={i18n.playGameCta}
            >
              <FieldRow
                label={i18n.amountLabel}
                id="amount"
                component="input"
                type="text"
                placeholder={i18n.amountPlaceholder}
              />

              <FieldRow
                label={i18n.difficultyLabel}
                id="difficulty"
                component="select"
                options={difficulties}
              />

              <FieldRow
                label={i18n.categoryLabel}
                id="category"
                component="select"
                options={categories}
              />

              <FieldRow
                label={i18n.typeLabel}
                id="type"
                component="select"
                options={types}
              />
            </FormContainer>
          </Card>
        );
      }}
    </Form>
  );
};

export default CreateGame;
