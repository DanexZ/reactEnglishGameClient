import { UserWord } from "../models";

export type WordsPageAction =
    | { type: "setTrainedWord"; payload: UserWord }
    | { type: "setLearningWords"; payload: UserWord[] }
    | { type: "activeTrainWord"}
    | { type: "deactiveTrainWord" }
    | { type: "setInputChosenWords"; payload: number }
    | { type: "setListeningRepetitions"; payload: number }