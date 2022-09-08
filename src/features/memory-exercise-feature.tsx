import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import AppStateContext from "../context/AppStateContext";
import { getRandomSet } from "../utils/getRandomSet";
import { UserMessage, UserWord } from "../data/models";
import AppStateInterface from "../data/types/AppStateInterface";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import { AppAction } from "../data/actions/AppAction";
import AppDispatchContext from "../context/AppDispatchContext";
import Lifes from "../components/Lifes/Lifes";
import MicBtn from "../components/shared/MicBtn/MicBtn";
import Transcriptions from "../components/shared/Transcriptions";
import Tile3d from "../components/shared/Tile3d/Tile3d";
import { useTalkingContainer } from "../hooks/useTalkingContainer";
import TalkingContainer from "../components/TalkingContainer/TalkingContainer";
import { SpeakUsingTalkingContainer } from "../data/types/SpeakData";
import { speak } from "../utils/speak";
import { ANIMATIONS, SOUNDS } from "../data/constants";
import { useSavingHandlers } from "../hooks/useSavingHandlers";
import { getRandomItem } from "../utils/getRandomItem";
import { isUserTranscriptAcceptable } from "../utils/isUserTranscriptAcceptable";
import { updateState } from "../utils/updateState";
import { calculateEfficiency } from "../utils/calculateEfficiency";
import { getDate } from "../utils/date/getDate";
import FixedScreenWrapper from "../components/shared/FixedScreenWrapper/FixedScreenWrapper";
import Popup from "../components/shared/Popup/Popup";
import { isHeartWinner } from "../utils/isHeartWinner";
import { getProgressBarColor } from "../utils/getProgressBarColor";
const {Howl, Howler} = require('howler');


interface Props {
    recognition: any
    micBtnRef: any
    userSpeech: string
    finalTranscript: string
    minimumWords: number
    exitFn: Function
}


interface FeatureState {
    score: number
    newPoints: number
    lifes: number
    randomUserWords: UserWord[]
    currentUserWord: UserWord
    featureStep: number
}



const MemoryExerciseFeature = ({recognition, micBtnRef, userSpeech, finalTranscript, minimumWords, exitFn}: Props) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);
    const userSpeechRef = useRef<HTMLSpanElement>(null!);
    const showTalkingContainerImmediately = (!appState.user.receivedMessages.find((userMessage: UserMessage) => userMessage.message_id === 5)) ? true : false;
    const [refs, rootaSentence, setRootaSentence]: any = useTalkingContainer(showTalkingContainerImmediately);
    const savingHandlers = useSavingHandlers();

    const randomUserWords = useMemo(() => {

        const randomWords = getRandomSet([...appState.user.words], minimumWords).map((w: UserWord, index: number) => {
            const copy = {...w}
            copy.featureInitialIndex = index;
            return copy
        });

        return randomWords

    }, []);

    const initialState: FeatureState = {
        score: 0,
        newPoints: 0,
        lifes: appState.user.lifes,
        randomUserWords,
        currentUserWord: getRandomItem(randomUserWords),
        featureStep: 1
    }


    const [prevFinalTranscript, setPrevFinalTranscript]: [string, Function] = useState(finalTranscript);
    const [featureState, setFeatureState] = useState(initialState);
    const [winningPrize, setWinningPrize]: [Boolean, Function] = useState(false);


    const combos = useMemo(() => {

        const combos: any = {}

        featureState.randomUserWords.forEach((userWord: UserWord) => {
            combos[userWord.word_id] = { combo: 1 }
        });

        return combos

    }, [featureState.randomUserWords]);



    useEffect(() => {

        if (appState.showTalkingContainer) {
            
            const txtToSay = appState.RootaTexts[4].content;
            

            const speakData: SpeakUsingTalkingContainer = {
                
                txtToSay,
                setRootaSentence,
                rootaSentenceRef: refs.rootaSentenceRef,
                forwardBtnRef: refs.forwardBtnRef,
                finishBtnRef: refs.finishBtnRef,
                callbacks: [

                    () => {

                        updateState(setFeatureState, "featureStep", 2)

                        speakData.txtToSay = `Here are the words that I've drawn from your current collection.`;
                        speak(speakData);

                    },

                    () => {

                        updateState(setFeatureState, "featureStep", 3)

                        speakData.txtToSay = `When the program starts, the translation of one of these words will be displayed here. 
                        Your job is guess which one it is and properly pronounce that word in english.`;
                        speak(speakData);

                    },

                    () => {

                        updateState(setFeatureState, "featureStep", 4)

                        speakData.txtToSay = `If you do it properly you get points.`;
                        speak(speakData);

                    },

                    () => {

                        updateState(setFeatureState, "featureStep", 5)

                        speakData.txtToSay = `Otherwise you lose lifes. Got it?`;
                        speak(speakData);

                    },

                    () => {

                        updateState(setFeatureState, "featureStep", 6)

                        speakData.txtToSay = `So this is the place where you can check both your pronunciation and knowledge of english vocabulary. You
                        can back here any time you want. Ok, now let's get started. It will be pretty fun...`;
                        speak(speakData);

                    },

                    () => {

                        updateState(setFeatureState, "featureStep", 7)
                        savingHandlers.addUserMessage(appState.RootaTexts[4].id);

                        const action: AppAction = {type: "toggleTalkingContainer"}
                        appDispatch(action);
                        
                        const randomUserWord = getRandomItem(randomUserWords);
                        updateState(setFeatureState, "currentUserWord", randomUserWord);
                    }
                ]
            }


        
            setTimeout(() => {

                speak(speakData);
                
            }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
        }

    }, [appState.showTalkingContainer]);



    const continueProgram = () => {
        setWinningPrize(false);
        recognition.start();
    }



    useEffect(() => {

        if (featureState.lifes < 1) {

            new Howl(SOUNDS.SMB_OVER).play();
            setTimeout(() => exitFn(), 1000);

        } else if (isHeartWinner(featureState.score, appState.user.level, appState.user.lifes)) {

            setWinningPrize(true);
            new Howl(SOUNDS.OOT_FANFARE_HEARTCONTAINER).play();

            const lifes = appState.user.lifes + 1;

            savingHandlers.saveLifes(lifes);
            updateState(setFeatureState, "lifes", lifes);

        } else if (featureState.currentUserWord) recognition.start();

    }, [featureState.currentUserWord]);



    useEffect(() => {

        if (finalTranscript && finalTranscript !== prevFinalTranscript) {
            recognition.stop();

            setPrevFinalTranscript(finalTranscript);
            userSpeechRef.current.innerText = finalTranscript;

            const nextWord = getRandomItem(randomUserWords);

            let pointsForAnswer = (appState.user.level < 2) ? 1 : appState.user.level;

            if( isUserTranscriptAcceptable(finalTranscript, featureState.currentUserWord.name) ) {

                combos[featureState.currentUserWord.word_id].combo += 1;
                pointsForAnswer *= combos[featureState.currentUserWord.word_id].combo;
                
                savingHandlers.saveCorrectness(featureState.currentUserWord.word_id, featureState.currentUserWord.initialIndex);
                savingHandlers.savePoints(pointsForAnswer);
                savingHandlers.saveUserDay({points: pointsForAnswer});

                updateState(setFeatureState, "score", featureState.score + pointsForAnswer)

                setFeatureState((state: FeatureState) => {
                    const copy = {...state};
                    
                    copy.score = featureState.score + pointsForAnswer;
                    copy.newPoints = pointsForAnswer;

                    const word = {...copy.randomUserWords[featureState.currentUserWord.featureInitialIndex]}
                    word.correctnesses = [...word.correctnesses, {created_at: getDate({ date: new Date(), separator: "-", showTime: true })}];
                    word.power = calculateEfficiency(word.correctnesses.length, word.mistakes.length);
                    
                    copy.randomUserWords[featureState.currentUserWord.featureInitialIndex] = word;

                    return copy
                });

                setTimeout(() => updateState(setFeatureState, "newPoints", 0), ANIMATIONS.ADDING_POINTS.duration);
                setTimeout(() => updateState(setFeatureState, "currentUserWord", nextWord), 1500);
                

            } else {

                setTimeout(() => {

                    savingHandlers.saveMistake(featureState.currentUserWord.word_id, featureState.currentUserWord.initialIndex);

                    new Howl(SOUNDS.OOT_GET_HEART).play();

                    setFeatureState((state: FeatureState) => {
                        const copy = {...state}
    
                        copy.lifes = featureState.lifes - 1;
                        copy.currentUserWord = nextWord;
    
                        return copy
                    });

                }, 200)

            }

        }



    }, [finalTranscript])


    



    return (
        <React.Fragment>
            <div className="blueBar">
                <h2 style={{position: "relative"}}>
                    Score: {featureState.score} {featureState.newPoints > 0 && <span className="points">+{featureState.newPoints}</span>}
                    {featureState.featureStep === 4 && <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
                </h2>
            </div>


            {winningPrize && 
                <FixedScreenWrapper>
                    <Popup>
                        <TransparentBox>
                            <h2>You've got:</h2>

                            <div className="itemContainer">
                                <div className="heartBig heartFull">
                                    <div className="circle1"></div>
                                    <div className="circle2"></div>
                                </div>
                            </div>

                            <p className="underHeart">This is an extra heart container for you! 
                            Since now you will have one more heart container during memory exercises. 
                            Try to knock the bigger score if you want the next...</p>

                            <div className="buttons">
                                <button className="btn btn_blue" onClick={continueProgram}>OK</button>
                            </div>
                        </TransparentBox>
                    </Popup>
                </FixedScreenWrapper>
            }


            <TransparentBox extraClass="noPopup">
                <span className="exit" onClick={() => exitFn()}>Exit</span>

                <Lifes appUserLifes={appState.user.lifes} featureUserlifes={featureState.lifes} featureStep={featureState.featureStep} />

                <div className="content">

                {featureState.featureStep === 2 && <img className="arrow arrowBottom" src="/images/arrow-down.png" />}

                    {featureState.randomUserWords.map((userWord: UserWord) => {
                        return (<Tile3d key={`${userWord.name}`} cssClass={"static"} onClickFn={() => {}} >
                            <div className="correctnesses flex">
                                <img src="images/correct.png" />
                                <span>{userWord.correctnesses.length}</span>
                            </div>

                            <div className="mistakes flex">
                                <img src="images/uncorrect.png" />
                                <span>{userWord.mistakes.length}</span>
                            </div>

                            <div className="wordName">{userWord.name}</div>

                            <div className="wordPower">{userWord.power}%</div>

                            <div className="tile-progress">
                                <div style={{width: `${userWord.power}%`, backgroundColor: `${getProgressBarColor(userWord.power)}`}}></div>
                            </div>
                        </Tile3d>)
                    })}
                </div>

            </TransparentBox>

            <div className="bottomAdditionalBar flex column bottomSticky">
                <div style={{position: "relative"}}>
                    Polish translation: <Transcriptions translations={featureState.currentUserWord.translations} />
                    {featureState.featureStep === 3 && <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
                </div>
                <div>Your speech: <span ref={userSpeechRef}>{userSpeech}</span></div>

                <div className="buttons">                    
                    <MicBtn micBtnRef={micBtnRef} />
                </div>
            </div>

            <TalkingContainer refs={refs} rootaSentence={rootaSentence} />
            
        </React.Fragment>
    )
}

export default MemoryExerciseFeature