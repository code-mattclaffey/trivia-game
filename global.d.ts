enum GameStatuses {
  NOT_STARTED = "NOT_STARTED",
  IN_PLAY = "IN_PLAY",
  FINISHED = "FINISHED",
}

interface Player {
  id: string;
  name: string;
  score: number;
}

interface ScoreBoard {
  scores: Array<Player>;
}

interface OpenTbdApi {
  category: string;
  type: "multiple" | "true/false";
  difficulty: "easy" | "medium" | "hard";
}

interface Question extends OpenTbdApi {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

interface OpenTbdApiResponse {
  response_code: number;
  results: Array<Question>;
}

interface Game {
  id: string;
  status: keyof GameStatuses; // to change state of page when status changes
  questionStage: number; // to determine which question the user is on
  questions: Array<Question>;
}

interface FirebaseState {
  games: {
    [quid: string]: {
      // game id
      id: string; // game id
      status: keyof GameStatuses;
      questionStage: number;
      currentQuestionId: string;
      questions: Array<Question>;
      players: Array<Player>;
    };
  };
}
