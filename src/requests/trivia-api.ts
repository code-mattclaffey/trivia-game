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

export const getApiToken = async () => {
  try {
    const response = await fetch(
      "https://opentdb.com/api_token.php?command=request"
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const getQuestions = async ({
  amount = 10,
  difficulty,
  type,
  category,
}: OpenTbdApi) => {
  try {
    const { token } = await getApiToken();

    const apiUrl = buildTrivaUrl({
      amount,
      difficulty,
      type,
      category,
      token,
    });

    const response = await fetch(apiUrl);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
