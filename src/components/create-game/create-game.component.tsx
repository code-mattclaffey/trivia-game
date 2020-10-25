import React from "react";
import { useFirebaseWrapper } from "../../containers/firebase-wrapper/firebase-wrapper.component";
import { withTypes, Field } from "react-final-form";
import { categories, difficulties, types } from "./form-values";

const buildTrivaUrl = ({
  amount,
  difficulty = "any",
  type = "any",
  category = "any",
  token,
}: OpenTbdApi) => {
  let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;

  if (!difficulty && difficulty !== "any") {
    apiUrl += `&difficulty=${difficulty}`;
  }

  if (!type && type !== "any") {
    apiUrl += `&type=${type}`;
  }

  if (!category && category !== "any") {
    apiUrl += `&category=${category}`;
  }

  return `${apiUrl}&token=${token}`;
};

const CreateGame: React.FC = () => {
  const { createGame } = useFirebaseWrapper();

  const onSubmit = ({
    amount = 10,
    difficulty,
    type,
    category,
  }: OpenTbdApi) => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then((res) => res.json())
      .then(({ token }) => {
        const apiUrl = buildTrivaUrl({
          amount,
          difficulty,
          type,
          category,
          token,
        });

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
