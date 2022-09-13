import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { AppStateContext } from "../context/AppStateContext";
import { AppDispatchContext } from "../context/AppDispatchContext";
import SingleSentence from "../components/dialogues-layout/SingleSentence";
import TalkingContainer from "../components/TalkingContainer/TalkingContainer";
import { SpeakUsingTalkingContainer } from "../data/types/SpeakData";
import { useTalkingContainer } from "../hooks/useTalkingContainer";
import { useSavingHandlers } from "../hooks/useSavingHandlers";

import { AppAction } from "../data/actions/AppAction";
import { ANIMATIONS, messagesStartingTrainingDialogue } from "../data/constants";
import { getRandomItem } from "../utils/getRandomItem";
import { speak } from "../utils/speak";
import { Sentence, UserMessage } from "../data/models";
import { trainSentences } from "../utils/trainSentences";
import MicBtn from "../components/shared/MicBtn/MicBtn";

const DialogueFeature = ({recognition, micBtnRef}: any) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch = useContext(AppDispatchContext);

    
    const [sentences]: any[] = useState(appState.dialogues[appState.chosenDialogue - 1].sentences);
    const [modyfiedSentences, setModyfiedSentences]: any = useState([]);
    const [featureStage, setFeatureStage] = useState(1);

    const showTalkingContainerImmediately = true;
    const [refs, rootaSentence, setRootaSentence]: any = useTalkingContainer(showTalkingContainerImmediately);
    const savingHandlers = useSavingHandlers();


    const refsById = useMemo(() => {

        const refs: any = {}

        sentences.forEach((sentence: Sentence) => {
            refs[sentence.id] = React.createRef()
        });

        return refs

    }, [sentences]);



    const buildSentences = () => {

        const modifiedSentences = [];

        for (let i=0; i<sentences.length; i++) {

            const sentence: Sentence = sentences[i];
            const speaker: number = sentence.speaker;
            let textColor: string = "white";

            if (refsById[sentence.id].current) refsById[sentence.id].current.innerText = "";
            if (refsById[sentence.id].current) refsById[sentence.id].current.classList.remove("green_text");
 
            if (featureStage > 1 && speaker === 1) textColor = "blue";
            if (featureStage > 1 && speaker === 2) textColor = "red";

            modifiedSentences.push(<SingleSentence key={sentence.name} userSpeechRef={refsById[sentence.id]} textColor={textColor} text={sentence.name} />)
        }

        setModyfiedSentences(modifiedSentences);
    }



    useEffect(() => {

        buildSentences();

    }, [featureStage]);



    const handleExit = () => {
        const action: AppAction = {type: "setChosenDialogue", payload: 0}
        appDispatch(action);
    }


    useEffect(() => {

        if(appState.showTalkingContainer) {
            
            const dialogueLoop = () => {

                const action: AppAction = {type: "toggleTalkingContainer"}
                appDispatch(action);

                const listenData: any = {
                    sentenceIndex: 0,
                    sentences: [...sentences],
                    featureStage,
                    setFeatureStage,
                    dialogueLoop: () => appDispatch(action),
                    recognition,
                    userSpeechRefs: refsById,
                    appState,
                    savingHandlers
                }

                setTimeout(() => {
                    trainSentences(listenData);
                }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration + 300);
            }


            let txtToSay: string = getRandomItem(messagesStartingTrainingDialogue[featureStage - 1]);

            if (!appState.user.receivedMessages.find((userMessage: UserMessage) => userMessage.message_id === 3)) {
                txtToSay = appState.RootaTexts[2].content;
            }

            const speakData: SpeakUsingTalkingContainer = {
                
                txtToSay,
                setRootaSentence,
                rootaSentenceRef: refs.rootaSentenceRef,
                forwardBtnRef: refs.forwardBtnRef,
                finishBtnRef: refs.finishBtnRef,
                callbacks: [
                    () => {

                        if (!appState.user.receivedMessages.find((userMessage: UserMessage) => userMessage.message_id === 3)) {
                            savingHandlers.addUserMessage(appState.RootaTexts[2].id);
                        }

                        if (featureStage === 4) {
                            const action: AppAction = {type: "setChosenDialogue", payload: 0}
                            return setTimeout(() => {
                                appDispatch(action);
                            }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
                        }
    
                        dialogueLoop();
                    }
                ]
            }


        
            setTimeout(() => {

                speak(speakData);
                
            }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
        }

    }, [appState.showTalkingContainer]);


    return (
        <React.Fragment>
            <div className="singleDialogueView">
                <span className="exit" onClick={handleExit}>Exit</span>
                {modyfiedSentences}
            </div>
            <div className="bottomAdditionalBar flex">
                <MicBtn micBtnRef={micBtnRef} />
            </div>
            <TalkingContainer refs={refs} rootaSentence={rootaSentence} />
        </React.Fragment>
    )
}

export default DialogueFeature