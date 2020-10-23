import React from "react";
import { useFirebaseWrapper } from "../firebase-wrapper/firebase-wrapper.component";
import { withTypes, Field } from "react-final-form";

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
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Field>

              <label htmlFor="category">Category</label>
              <Field
                id="category"
                name="category"
                component="select"
                placeholder="Amount"
              >
                <option value="any">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">
                  Entertainment: Musicals &amp; Theatres
                </option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">
                  Entertainment: Japanese Anime &amp; Manga
                </option>
                <option value="32">
                  Entertainment: Cartoon &amp; Animations
                </option>
              </Field>

              <label htmlFor="type">Type</label>
              <Field id="type" name="type" component="select">
                <option value="any">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
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
