import React, { useContext } from "react";
import WordsPageStateContext from "../context/WordsPageStateContext";
import WordsPageDispatchContext from "../context/WordsPageDispatchContext";
import WordsPageState from "../data/types/WordsPageState";
import { WordsPageAction } from "../data/actions/WordsPageAction";
import SingleWordBox from "../components/learning-words-layout/SingleWordBox";
import { SpeakJustSay } from "../data/types/SpeakData";
import { speak } from "../utils/speak";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import AppStateInterface from "../data/types/AppStateInterface";
import AppStateContext from "../context/AppStateContext";

const TrainingWordFeature = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const featureState: WordsPageState = useContext(WordsPageStateContext);
    const featureDispatch = useContext(WordsPageDispatchContext);
    const {micBtnRef, userSpeech} = useSpeechRecognition();


    const exitFn = () => {
        const action: WordsPageAction = {type: "deactiveTrainWord"}
        featureDispatch(action);

        if (appState.recognition) appState.recognition.stop();
    }

    const speakFn = () => {

        const speakData: SpeakJustSay = {
            txtToSay: (featureState.trainedWord) ? featureState.trainedWord.name : "",
            callbacks: []
        }

        speak(speakData);
    }


    if (featureState.trainedWord) return <SingleWordBox 
                                            exitFn={exitFn}
                                            word={featureState.trainedWord} 
                                            speakFn={speakFn}
                                            micBtnRef={micBtnRef}
                                            userSpeech={userSpeech}
                                        />

    return <React.Fragment></React.Fragment>
}

export default TrainingWordFeature