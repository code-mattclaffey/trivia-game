export interface I18nProps {
  shareLinkTitle: string;
  shareLinkText: string;
  shareLinkCopiedText: string;
  showWinnerCta: string;
  startGameCta: string;
  nextQuestionCta: string;
  joinGameTitle: string;
  playerNameLabel: string;
  playerNamePlaceholder: string;
  playGameCta: string;
  createGameTitle: string;
  amountLabel: string;
  amountPlaceholder: string;
  difficultyLabel: string;
  categoryLabel: string;
  typeLabel: string;
  pageTitles: {
    host: string;
    create: string;
    join: string;
    quiz: string;
    home: string;
  };
}

const i18n: I18nProps = {
  shareLinkTitle: "Quiz Night",
  shareLinkText: "Share link with friends",
  shareLinkCopiedText: "Link copied",
  showWinnerCta: "Show winner",
  startGameCta: "Start game",
  nextQuestionCta: "Next question",
  joinGameTitle: "Join game",
  playerNameLabel: "Player name",
  playerNamePlaceholder: "Player name",
  playGameCta: "Play game",
  createGameTitle: "Create game",
  amountLabel: "Amount",
  amountPlaceholder: "Amount",
  difficultyLabel: "Difficulty",
  categoryLabel: "Category",
  typeLabel: "Type",
  pageTitles: {
    host: "Trivia - Quiz Host",
    create: "Trivia - Create Game",
    join: "Trivia - Join Game",
    quiz: "Trivia - Quiz",
    home: "Trivia - Quiz Game",
  },
};

export default i18n;
