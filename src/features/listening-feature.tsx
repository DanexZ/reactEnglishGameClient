import React, { useContext, useState, useEffect } from "react";
import ListeningPopup from "../components/shared/ListeningPopup";
import { WordsPageState } from "../data/types/WordsPageState";
import { WordsPageStateContext } from "../context/WordsPageStateContext";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { LANGS } from "../data/constants";
import { AppAction } from "../data/actions/AppAction";
import { speak } from "../utils/speak";
import { SpeakJustSay } from "../data/types/SpeakData";
import { Translation } from "../data/models";
import FixedScreenWrapper from "../components/shared/FixedScreenWrapper/FixedScreenWrapper";
import Popup from "../components/shared/Popup/Popup";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";

const ListeningFeature = () => {

    const appDispatch: Function = useContext(AppDispatchContext);
    const featureState: WordsPageState = useContext(WordsPageStateContext);
    
    const [wordIndex, setWordIndex]: [number, Function] = useState(0);


    const exitFn = () => {

        const actions: AppAction[] = [
            {type: "deactivateListeningFeature"},
            {type: "clearTimeout"}
        ];

        appDispatch(actions[0]);
        appDispatch(actions[1]);
    }



    const listenSingleWordLoop = (repetitions: number) => {

        const speakData: SpeakJustSay = {
            txtToSay: featureState.learningWords[wordIndex].name,
            callbacks: [
                () => {

                    const speakData: SpeakJustSay = {
                        txtToSay: featureState.learningWords[wordIndex].translations.map((t: Translation) => t.polish ).join("."),
                        lang: LANGS.PL,
                        callbacks: [() => {

                            repetitions--

                            console.log(repetitions);

                            if (!repetitions) return setWordIndex((prev: number) => prev + 1);
                            listenSingleWordLoop(repetitions);

                        }]
                    }

                    const action: AppAction = {
                        type: "setTimeout", 
                        payload: setTimeout(() => speak(speakData), 2000)
                    }

                    appDispatch(action);
                }
            ]
        }


        const action: AppAction = {
            type: "setTimeout", 
            payload: setTimeout(() => speak(speakData), 1800)
        }

        appDispatch(action);

    }




    useEffect(() => {

        if (featureState.learningWords[wordIndex]) {

            listenSingleWordLoop(featureState.listeningRepetitions);

        } else if (featureState.learningWords.length) exitFn();
        

    }, [wordIndex]);




    if (!wordIndex && !featureState.learningWords.length) {

        return (
            <FixedScreenWrapper>
                <Popup>
                    <TransparentBox>
                        <h2>Choose at least one word</h2>

                        <div className="buttons">
                            <button className="btn btn_blue" onClick={exitFn}>OK</button>
                        </div>
                    </TransparentBox>
                </Popup>
            </FixedScreenWrapper>
        )
    }
    

    return <ListeningPopup 
                currentWord={featureState.learningWords[wordIndex]}
                wordIndex={wordIndex} 
                exitFn={exitFn} 
            />
}


export default ListeningFeature