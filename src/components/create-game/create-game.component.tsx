import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";
import { withTypes, Field } from "react-final-form";
import { categories, difficulties, types } from "./form-values";
import { I18nProps } from "../../locales/en";
import { getQuestions } from "../../requests/trivia-api";
import Button from "../button";

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
          <form className="card" onSubmit={handleSubmit}>
            <fieldset>
              <legend>{i18n.createGameTitle}</legend>
              <div>
                <label htmlFor="amount">{i18n.amountLabel}</label>
                <Field
                  id="amount"
                  name="amount"
                  component="input"
                  type="text"
                  placeholder={i18n.amountPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="difficulty">{i18n.difficultyLabel}</label>
                <Field id="difficulty" name="difficulty" component="select">
                  {difficulties.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))}
                </Field>
              </div>

              <div>
                <label htmlFor="category">{i18n.categoryLabel}</label>
                <Field id="category" name="category" component="select">
                  {categories.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))}
                </Field>
              </div>

              <div>
                <label htmlFor="type">{i18n.typeLabel}</label>
                <Field id="type" name="type" component="select">
                  {types.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))}
                </Field>
              </div>

              <Button type="submit">{i18n.playGameCta}</Button>
            </fieldset>
          </form>
        );
      }}
    </Form>
  );
};

export default CreateGame;
