import React, { useContext, useEffect, useRef, useState } from "react";
import AppStateContext from "../context/AppStateContext";
import AppDispatchContext from "../context/AppDispatchContext";
import AppStateInterface from "../data/types/AppStateInterface";
import { AppAction } from "../data/actions/AppAction";
import TalkingContainer from "../components/TalkingContainer/TalkingContainer";
import { useTalkingContainer } from "../hooks/useTalkingContainer";
import { speak } from "../utils/speak";
import { SpeakJustSay, SpeakUsingTalkingContainer } from "../data/types/SpeakData";
import { randomizeWords } from "../utils/randomizeWords";
import { ANIMATIONS, messagesStartingCollectingWords } from "../data/constants";
import { getRandomItem } from "../utils/getRandomItem";
import { useSavingHandlers } from "../hooks/useSavingHandlers";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import MicBtn from "../components/shared/MicBtn/MicBtn";
import { UserMessage, UserWord, Word } from "../data/models";
import Transcriptions from "../components/shared/Transcriptions";
import { isUserTranscriptAcceptable } from "../utils/isUserTranscriptAcceptable";
import { handleRepeat } from "../utils/handleRepeat";
import Tile3d from "../components/shared/Tile3d/Tile3d";
import GainedWordPopup from "../components/collect-words-layout/GainedWordPopup";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import { getProgressBarColor } from "../utils/getProgressBarColor";


interface Props {
    remainingWords: number
    setRemainingWords: Function
    recognition: any
    micBtnRef: any
    userSpeech: string
    finalTranscript: string
}


const CollectWordsFeature = ({remainingWords, setRemainingWords, recognition, micBtnRef, userSpeech, finalTranscript}: Props) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const userSpeechRef = useRef<HTMLSpanElement>(null!);
    const showTalkingContainerImmediately = true;
    const [refs, rootaSentence, setRootaSentence]: any = useTalkingContainer(showTalkingContainerImmediately);
    const savingHandlers = useSavingHandlers();

    const [listen, setListen]: [boolean, Function] = useState(false);
    const [rootaSaysWord, setRootaSaysWord]: [boolean, Function] = useState(false);
    const [prevFinalTranscript, setPrevFinalTranscript]: [string, Function] = useState(finalTranscript);
    const [wordsForLevel]: [Word[], Function] = useState(randomizeWords([...appState.words], [...appState.user.words], remainingWords));
    const [gainedWord, setGainedWord]: [UserWord | null, Function] = useState(null);
    const [gainedWords, setGainedWors]: [UserWord[], Function] = useState([]);
    const [currentWordIndex, setCurrentWordIndex]: [number, Function] = useState(0); 



    const finishProgram = () => {
        const action: AppAction = {type: "setChosenLevel", payload: 0}
        appDispatch(action);
    }



    const clickBtnFn = (remainingWords: number) => {

        if (remainingWords) {
            setGainedWord(null);
            setRootaSaysWord(true);
        } else finishProgram();
        
    }



    useEffect(() => {

        if (!remainingWords) savingHandlers.saveUserLevel(appState.chosenLevel);

    }, [remainingWords]);



    useEffect(() => {


        if (finalTranscript && finalTranscript !== prevFinalTranscript) {

            setPrevFinalTranscript(finalTranscript);
            recognition.stop();
            setListen(false);
            
            userSpeechRef.current.innerText = finalTranscript;
            const currentWord = wordsForLevel[currentWordIndex];

            if( isUserTranscriptAcceptable(finalTranscript, currentWord.name) ) {

                savingHandlers.saveCorrectness(currentWord.id);
                savingHandlers.savePoints(1);

                setCurrentWordIndex((prev: number) => prev + 1);
                setRemainingWords((prev: number) => prev - 1);

                savingHandlers.addUserWord(currentWord.id, (gainedWord: any) => {
                    setGainedWord(gainedWord);
                    setGainedWors((prev: UserWord[]) => [...prev, gainedWord]);
                });

                savingHandlers.saveUserDay({points: 1, words: 1});
                

            } else {

                savingHandlers.saveMistake(currentWord.id);

                const callback = () => setTimeout(() => setRootaSaysWord(true), 700);
                handleRepeat(callback);

            }

        }
    

    }, [finalTranscript]);



    useEffect( () => {


        if (rootaSaysWord) {

            userSpeechRef.current.innerText = "";

            const callback = () => {

                recognition.start();

                setTimeout(() => {
                    
                    setRootaSaysWord(false);
                    setListen(true);

                }, 1000);
                
            }


            const speakData: SpeakJustSay = {
                txtToSay: wordsForLevel[currentWordIndex].name,
                callbacks: [callback]
            }

            speak(speakData);

        }

    }, [rootaSaysWord]);
    

      

    useEffect(() => {

        if(appState.showTalkingContainer) {

            let isHereNotFirstTime = true;

            if (appState.user.words.length < 1 && !appState.user.receivedMessages.find((userMessage: UserMessage) => userMessage.message_id === 1)) {
                isHereNotFirstTime = false;
            }

            const txtToSay = (isHereNotFirstTime) ? getRandomItem(messagesStartingCollectingWords) : appState.RootaTexts[0].content;

            const speakData: SpeakUsingTalkingContainer = {
                txtToSay,
                setRootaSentence,
                rootaSentenceRef: refs.rootaSentenceRef,
                forwardBtnRef: refs.forwardBtnRef,
                finishBtnRef: refs.finishBtnRef,
                callbacks: [
                    () => {

                        const action: AppAction = {type: "toggleTalkingContainer"}
                        appDispatch(action);

                        savingHandlers.addUserMessage(appState.RootaTexts[0].id);
    
                        setTimeout(() => setRootaSaysWord(true), ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
                    }
                ]
            }


        
            setTimeout(() => {
                speak(speakData);
            }, 400)
        }

    }, [appState.showTalkingContainer]);


    

    return (
        <React.Fragment>

            {gainedWord && <GainedWordPopup gainedWord={gainedWord} remainingWords={remainingWords} clickBtnFn={clickBtnFn} />}

            <SinglePageWrapper>
                <div className="blueBar flex">
                    <span className="rowNumber">{appState.chosenLevel}</span>
                    <div>
                        Remaining words: {remainingWords}
                    </div>
                </div>

                <TransparentBox extraClass="noPopup">
                    <span className="exit" onClick={finishProgram}>Exit</span>

                    <div className="content">
                    
                        {gainedWords.map((gainedWord: UserWord) => {
                            return (<Tile3d key={`${gainedWord.name}`} cssClass={"dynamic"} onClickFn={() => {}} >
                                <div className="correctnesses flex">
                                    <img src="images/correct.png" />
                                    <span>{gainedWord.correctnesses.length}</span>
                                </div>

                                <div className="mistakes flex">
                                    <img src="images/uncorrect.png" />
                                    <span>{gainedWord.mistakes.length}</span>
                                </div>

                                <div className="wordName">{gainedWord.name}</div>

                                <div className="wordPower">{gainedWord.power}%</div>

                                <div className="tile-progress">
                                    <div style={{width: `${gainedWord.power}%`, backgroundColor: `${getProgressBarColor(gainedWord.power)}`}}></div>
                                </div>
                            </Tile3d>)
                        })}
                        
                    </div>
                </TransparentBox>

                <div className="bottomAdditionalBar flex column">
                    <div>Word: {listen && wordsForLevel[currentWordIndex]?.name}</div>
                    <div>Polish meaning: {listen && wordsForLevel[currentWordIndex] && <Transcriptions translations={wordsForLevel[currentWordIndex].translations} />}</div>
                    <div>Your speech: <span ref={userSpeechRef}>{userSpeech}</span></div>

                    <div className="buttons">
                        <MicBtn micBtnRef={micBtnRef} />
                    </div>
                </div>
            </SinglePageWrapper>
            
            <TalkingContainer refs={refs} rootaSentence={rootaSentence} />
        </React.Fragment>
    )
}

export default CollectWordsFeature