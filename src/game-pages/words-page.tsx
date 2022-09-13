import React, { useContext, useState } from "react";
import { AppStateContext } from "../context/AppStateContext";
import { WordsPageStateContext } from "../context/WordsPageStateContext";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import WordsPageDashboard from "../components/learning-words-layout/WordsPageDashboard";
import Tip from "../components/shared/Tip";
import WordsList from "../components/learning-words-layout/WordsList";
import Pagination from "../components/shared/Pagination/Pagination";
import AdditionalButtons from "../components/learning-words-layout/AdditionalButtons";
import { usePagination } from "../hooks/usePagination";
import { WordsPageState } from "../data/types/WordsPageState";
import { AppStateInterface } from "../data/types/AppStateInterface";
import Jigsaw from "../components/learning-words-layout/JigSaw/Jigsaw";
import ListeningFeature from "../features/listening-feature";
import TrainingWordFeature from "../features/training-word-feature";
import WordsSubMenu from "../components/learning-words-layout/WordsSubMenu";
import MemoryExerciseFeature from "../features/memory-exercise-feature";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import FixedScreenWrapper from "../components/shared/FixedScreenWrapper/FixedScreenWrapper";
import Popup from "../components/shared/Popup/Popup";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import { AppAction } from "../data/actions/AppAction";
import { AppDispatchContext } from "../context/AppDispatchContext";

const WordsPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);
    const featureState: WordsPageState = useContext(WordsPageStateContext);

    const {pagination, rowsOnPage, currentPageIndex, setSort, pages}: any = usePagination({
        rowsPerPage: 30, 
        kind: "word",
        elements: appState.user.words
    });

    const {recognition, micBtnRef, userSpeech, finalTranscript} = useSpeechRecognition();

    const [isJigsawDisplayed, setIsJigsawDisplayed] = useState(false);

    const minimumWords: number = (appState.user.level > 1) ? (appState.user.level * 2) + 5 : 3;

    const exitSpeakingFn = () => {
        const action: AppAction = {type: "deactivateSpeakingFeature"}
        appDispatch(action)
    }



    return (
        <SinglePageWrapper additionClasses={"wordsPage"}>

            {!appState.speaking &&
                <React.Fragment>
                    <WordsPageDashboard setSort={setSort} pages={pages} />
                    <WordsSubMenu />
                    {!appState.user.words.length && <Tip kind="words" />}
                    {featureState.trainWord && <TrainingWordFeature />}
                    <WordsList rowsOnPage={rowsOnPage} />
                    <Pagination pagination={pagination} currentPageIndex={currentPageIndex} />
                    <AdditionalButtons setIsJigsawDisplayed={setIsJigsawDisplayed} />
                    {isJigsawDisplayed && <Jigsaw setIsJigsawDisplayed={setIsJigsawDisplayed} />}
                    {appState.listening && <ListeningFeature />}
                </React.Fragment>
            }

            {appState.speaking && appState.user.words.length < minimumWords && 
                <FixedScreenWrapper>
                    <Popup>
                        <TransparentBox>
                            <h2>You must collect at least {minimumWords} words</h2>

                            <div className="buttons">
                                <button className="btn btn_blue" onClick={exitSpeakingFn}>OK</button>
                            </div>
                        </TransparentBox>
                    </Popup>
                </FixedScreenWrapper>
            }
            
            {appState.speaking && appState.user.words.length >= minimumWords &&
                <MemoryExerciseFeature 
                    recognition={recognition}
                    micBtnRef={micBtnRef}
                    userSpeech={userSpeech}
                    finalTranscript={finalTranscript}
                    minimumWords={minimumWords}
                    exitFn={exitSpeakingFn}
                />
            }
        </SinglePageWrapper>
    )

}

export default WordsPage