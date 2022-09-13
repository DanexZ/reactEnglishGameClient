import { WordsPageAction } from "../actions/WordsPageAction";
import { WordsPageState } from "../types/WordsPageState";

export const WordsPageReducer = (draftState: WordsPageState, action: WordsPageAction) => {
    switch (action.type) {

        case "setTrainedWord":
            draftState.trainedWord = action.payload;
            break;

        case "activeTrainWord":
            draftState.trainWord = true;
            break;

        case "deactiveTrainWord":
            draftState.trainWord = false;
            break;

        case "setLearningWords":
            draftState.learningWords = action.payload;
            break;

        case "setInputChosenWords":
            draftState.inputChosenWords = action.payload;
            break;

        case "setListeningRepetitions":
            draftState.listeningRepetitions = action.payload;
            break;
            
        default:
            return draftState;
    }
}
