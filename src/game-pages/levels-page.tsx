import React, { useContext, useState } from "react";
import AppStateContext from "../context/AppStateContext";
import LevelsList from "../components/collect-words-layout/LevelsList";
import CollectWordsFeature from "../features/collect-words-feature";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

const LevelsPage = () => {

    const appState = useContext(AppStateContext);
    const [remainingWords, setRemainingWords] = useState(5);
    const {recognition, micBtnRef, userSpeech, finalTranscript} = useSpeechRecognition();


    return (
        <React.Fragment>
            {!appState.chosenLevel && <LevelsList setRemainingWords={setRemainingWords} />}
            {appState.chosenLevel && <CollectWordsFeature 
                                        remainingWords={remainingWords}
                                        setRemainingWords={setRemainingWords} 
                                        recognition={recognition} 
                                        micBtnRef={micBtnRef}
                                        userSpeech={userSpeech}
                                        finalTranscript={finalTranscript}
                                    />}
        </React.Fragment>
    )
}

export default LevelsPage