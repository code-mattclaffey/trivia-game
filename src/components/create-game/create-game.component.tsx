import React from "react";
import { useFirebaseWrapper } from "../firebase-wrapper/firebase-wrapper.component";
import { withTypes, Field } from "react-final-form";
import { categories, difficulties, types } from "./form-values";

const buildTrivaUrl = ({
  amount,
  difficulty,
  type,
  category,
  token,
}: OpenTbdApi) => {
  return `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}&token=${token}`;
};

const CreateGame = () => {
  const { createGame } = useFirebaseWrapper();

  const onSubmit = (values: OpenTbdApi) => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then((res) => res.json())
      .then(({ token }) => {
        const apiUrl = buildTrivaUrl({ ...values, token });

        fetch(apiUrl)
          .then((response) => response.json())
          .then(({ results }) => {
            createGame(results);
          });
      });
  };

  const { Form } = withTypes<OpenTbdApi>();

  return (
    <Form onSubmit={onSubmit} initialValues={{ amount: 10 }}>
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Create game</legend>
              <label htmlFor="amount">Amount</label>
              <Field
                id="amount"
                name="amount"
                component="input"
                type="text"
                placeholder="Amount"
              />

              <label htmlFor="difficulty">Difficulty</label>
              <Field
                id="difficulty"
                name="difficulty"
                component="select"
                placeholder="Amount"
              >
                {difficulties.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
              </Field>

              <label htmlFor="category">Category</label>
              <Field
                id="category"
                name="category"
                component="select"
                placeholder="Amount"
              >
                {categories.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
              </Field>

              <label htmlFor="type">Type</label>
              <Field id="type" name="type" component="select">
                {types.map(({ label, value }) => (
                  <option value={value}>{label}</option>
                ))}
              </Field>
              <button type="submit">Play game</button>
            </fieldset>
          </form>
        );
      }}
    </Form>
  );
};

export default CreateGame;
