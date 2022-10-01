import { useContext } from "react";
import { useImmerReducer } from "use-immer";
import { WordsPageReducer } from "../data/reducers/WordsPageReducer";
import UserWordsPage from "../game-pages/user-words-page";
import { WordsPageStateContext } from "../context/WordsPageStateContext";
import { WordsPageDispatchContext } from "../context/WordsPageDispatchContext";
import { WordsPageState } from "../data/types/WordsPageState";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { AppStateContext } from "../context/AppStateContext";
import UserCustomWordsPage from "../game-pages/user-custom-words-page";
import { PAGES } from "../data/constants";
import UserTrickyWordsPage from "../game-pages/user-tricky-words-page";

const WordsPageFeature = () => {   

    const appState: AppStateInterface = useContext(AppStateContext);
    
    const initialFeatureState: WordsPageState = {
        inputChosenWords: 0,
        learningWords: [],
        trainWord: false,
        listening: false,
        trainedWord: null,
        listeningRepetitions: 1
    }

    const [featureState, featureDispatch] = useImmerReducer(WordsPageReducer, initialFeatureState);
    
    return (
        <WordsPageStateContext.Provider value={featureState}>
            <WordsPageDispatchContext.Provider value={featureDispatch}>
                {appState.currentTab === PAGES.USER_WORDS && <UserWordsPage />}
                {appState.currentTab === PAGES.USER_CUSTOM_WORDS && <UserCustomWordsPage />}
                {appState.currentTab === PAGES.USER_LEARNING_WORDS && <UserTrickyWordsPage />}
            </WordsPageDispatchContext.Provider>
        </WordsPageStateContext.Provider>
    )
}

export default WordsPageFeature