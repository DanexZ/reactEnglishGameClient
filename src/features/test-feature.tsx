import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import InitialTestRow from "../components/tests-page-layout/InitialTestRow";
import TalkingContainer from "../components/TalkingContainer/TalkingContainer";
import AppDispatchContext from "../context/AppDispatchContext";
import AppStateContext from "../context/AppStateContext";
import { AppAction } from "../data/actions/AppAction";
import { ANIMATIONS, SOUNDS } from "../data/constants";
import { TestWord, UserTest, UserWord } from "../data/models";
import AppStateInterface from "../data/types/AppStateInterface";
import { SpeakJustSay, SpeakUsingTalkingContainer } from "../data/types/SpeakData";
import { TestFeatureInterface } from "../game-pages/tests-page/tests-page";
import { useSavingHandlers } from "../hooks/useSavingHandlers";
import { isUserTranscriptAcceptable } from "../utils/isUserTranscriptAcceptable";
import { speak } from "../utils/speak";
import { updateState } from "../utils/updateState";
import { useTalkingContainer } from "../hooks/useTalkingContainer";
import { UserMessage } from "../data/models";
import { ExamStatus } from "../data/types/ExamStatus";
/* eslint-disable */
const {Howl, Howler} = require('howler');
/* eslint-enable */

interface Props {
    recognition: any 
    userSpeech: string
    finalTranscript: string
    testState: TestFeatureInterface
    setTestState: Function
    currentTest: UserTest
}

const TestFeature = ({recognition, testState, currentTest, setTestState, userSpeech, finalTranscript}: Props) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const [rows, setRows]: any = useState([]);
    const [prevFinalTranscript, setPrevFinalTranscript] = useState(finalTranscript);

    const showTalkingContainerImmediately = useMemo(() => {

        return (!appState.user.receivedMessages.find((userMessage: UserMessage) => userMessage.message_id === 6)) ? true : false;

    }, []); 

    const [talkingContainerRefs, rootaSentence, setRootaSentence]: any = useTalkingContainer(showTalkingContainerImmediately);
    const savingHandlers = useSavingHandlers();

    const counterRef = useRef<HTMLSpanElement>(null!);
    const [wait, setWait] = useState(true);
    const [timeToStart, setTimeToStart] = useState(3);
    
    
    const wordsRefs = useMemo(() => {

        const refs: any = {}
        const rows: any[] = [];

        currentTest.words.forEach((testWord: TestWord, index: number) => {
            appState.user.words.forEach((userWord: UserWord) => {

                if (userWord.word_id === testWord.word_id) {

                    refs[userWord.word_id] = {
                        userSpeech: React.createRef(),
                        time: React.createRef(),
                        clock: React.createRef()
                    } 
        
                    rows.push(<InitialTestRow key={`${userWord.name}`} word={userWord} rowIndex={index} refs={refs} time={7} />);
                }
            })

        });

        setRows(rows);

        return refs

    }, []);



    const startCountingTimeToStart = () => {

        const action: AppAction = {type: "setInterval", payload: setInterval(() => {

            setTimeToStart((prev: number) => prev - 1);

        }, 1000)}

        setTimeout(() => appDispatch(action), 200);
    }




    const startSingleWordRow = () => {

        const ref = wordsRefs[currentTest.words[testState.currentWordIndex].word_id];
        ref.clock.current.innerHTML = `<img className="clock" src="/images/clock.png" />`;
        recognition.start();

        const action: AppAction = {type: "setInterval", payload: setInterval(() => {

            const time: number = Number(ref.time.current.innerText) - 1;
            ref.time.current.innerText = time;

            if (!time) {

                const callback = (currentTest.words[testState.currentWordIndex + 1])
                    ? () => updateState(setTestState, "currentWordIndex", testState.currentWordIndex + 1)
                    : () => summarizeTest(ref);

                const actions: AppAction[] = [
                    {type: "clearInterval"},
                    {
                        type: "setTimeout", 
                        payload: setTimeout( () => callback(), 1000 )}
                ]

                appDispatch(actions[0]);

                ref.clock.current.innerHTML = "";
                recognition.stop();

                window.scrollBy(0, ref.userSpeech.current.parentNode.offsetHeight);

                appDispatch(actions[1]);

                
            }

        }, 1000 )}


        setTimeout(() => {
            appDispatch(action);
        
            
        }, 1000);

    }




    useEffect(() => {

        if (!showTalkingContainerImmediately) {

            counterRef.current.classList.add(ANIMATIONS.TIME_COUNTING.name);

            setTimeout(() => {

                if (counterRef.current) counterRef.current.classList.remove(ANIMATIONS.TIME_COUNTING.name);

            }, ANIMATIONS.TIME_COUNTING.duration);

            if (!timeToStart) {

                const action: AppAction = {type: "clearInterval"}
                appDispatch(action);

                counterRef.current.innerText = "START!";
                counterRef.current.style.color = "green";

                setTimeout(() => setWait(false), ANIMATIONS.TIME_COUNTING.duration);
            } 
        }

    }, [timeToStart]);



    useEffect(() => {

        if (!wait) updateState(setTestState, "currentWordIndex", 0);

    }, [wait]);




    useEffect(() => {

        if (appState.showTalkingContainer) {
            
            const txtToSay = appState.RootaTexts[5].content;

            const speakData: SpeakUsingTalkingContainer = {
                
                txtToSay,
                setRootaSentence,
                rootaSentenceRef: talkingContainerRefs.rootaSentenceRef,
                forwardBtnRef: talkingContainerRefs.forwardBtnRef,
                finishBtnRef: talkingContainerRefs.finishBtnRef,
                callbacks: [
                    () => {

                        savingHandlers.addUserMessage(appState.RootaTexts[5].id);

                        const action: AppAction = {type: "toggleTalkingContainer"}
                        appDispatch(action);


                        setTimeout( () => setWait(false), ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);
                    }
                ]

            }


            setTimeout(() => {

                speak(speakData);
                
            }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration);

        } else {
            startCountingTimeToStart()
        }

    }, [appState.showTalkingContainer])





    useEffect(() => {

        if (currentTest.words[testState.currentWordIndex]) startSingleWordRow();

    }, [testState.currentWordIndex]);





    useEffect(() => {

        if (currentTest.words[testState.currentWordIndex]) {

            const ref = wordsRefs[currentTest.words[testState.currentWordIndex].word_id];
            ref.userSpeech.current.innerText = userSpeech; 

            if (userSpeech) {
                const action: AppAction = {type: "clearInterval"}
                appDispatch(action);
            }
        }

    }, [userSpeech]);





    const continueTest = (ref: any) => {
        window.scrollBy(0, ref.userSpeech.current.parentNode.offsetHeight);
        updateState(setTestState, "currentWordIndex", testState.currentWordIndex + 1);
    }





    const summarizeTest = (ref: any) => {

        let status: ExamStatus = "failed";
        let txtToSay: string = "Sorry you did't pass this test."

        if (testState.passedWords >= testState.requiredWords) {
            status = "passed";
            txtToSay = "Congratulations! You did it!";

        } 

        const speakData: SpeakJustSay = {
            txtToSay,
            callbacks: [
                () => {

                    savingHandlers.updateUserTest(currentTest, status);

                    setTimeout(() => {
                        const action: AppAction = {type: "setStartedTest", payload: false}
                        appDispatch(action);
                    }, 200);                    
                }
            ]
        }

        countPointsAfterTest(ref, () => speak(speakData));
    }





    useEffect(() => {

        if (finalTranscript && finalTranscript !== prevFinalTranscript) {

            recognition.stop();
            setPrevFinalTranscript(finalTranscript);

            const action: AppAction = {type: "clearInterval"}
            appDispatch(action);

            const word: UserWord = currentTest.words[testState.currentWordIndex];
            const ref = wordsRefs[currentTest.words[testState.currentWordIndex].word_id];
            
            ref.userSpeech.current.innerText = finalTranscript;


            if (isUserTranscriptAcceptable(finalTranscript, word.name)) {

                new Howl(SOUNDS.SMB_1_UP).play();
                
                const savedTime: number = Number(ref.time.current.innerText);

                ref.userSpeech.current.classList.add('green_text');
                ref.userSpeech.current.classList.add('raisedText');
                ref.time.current.classList.add('green_text');
                ref.time.current.classList.add('raisedText');
                ref.time.current.innerText = `+${savedTime}`;

                updateState(setTestState, "passedWords", testState.passedWords + 1);
                updateState(setTestState, "savedTime", testState.savedTime + savedTime);
                savingHandlers.updateTestWord(currentTest, word.word_id, "passed");
                savingHandlers.saveCorrectness(word.word_id, word.initialIndex);

                if (!currentTest.words[testState.currentWordIndex + 1]) {
                    setTimeout(() => summarizeTest(ref), 700);
                } else {
                    setTimeout(() => continueTest(ref), 700);
                }

            } else {

                ref.userSpeech.current.color = "red";
                savingHandlers.updateTestWord(currentTest, word.word_id, "failed");
                savingHandlers.saveMistake(word.word_id, word.initialIndex);

                const speakData: SpeakJustSay = {
                    txtToSay: `No. ${word.name}`,
                    callbacks: [
                       () => {

                            if (!currentTest.words[testState.currentWordIndex + 1]) {
                                setTimeout(() => summarizeTest(ref), 700);
                            } else {
                                setTimeout(() => continueTest(ref), 700);
                            }
                       } 
                    ]
                }

                speak(speakData)
            }
           
        }

    }, [finalTranscript]);




    const countPointsAfterTest = (ref: any, callback: Function) => {

        let answers: number = testState.passedWords;
        let sumPoints: number = 0;
    
        const firstStep = setInterval(() => {
    
            if (answers) {
    
                answers--;
                sumPoints++

                setTestState((prev: TestFeatureInterface) => {
                    const copy = {...prev}

                    copy.passedWords = answers;
                    copy.points++;

                    return copy
                });

                new Howl(SOUNDS.SMB_COIN).play();

            } else {

                clearInterval(firstStep);
                secondTimer(ref, callback, sumPoints);
            }
    
        }, 30);
    }



    const secondTimer = (ref: any, callback: Function, sumPoints: number) => setTimeout(() => {

        let savedTime: number = testState.savedTime;

        const secondStep = setInterval(() => {

            if (savedTime) {

                savedTime--;
                sumPoints++;

                setTestState((prev: TestFeatureInterface) => {
                    const copy = {...prev}

                    copy.savedTime = savedTime;
                    copy.points++;

                    return copy
                });

                new Howl(SOUNDS.SMB_COIN).play();

            } else {

                clearInterval(secondStep);
                window.scrollBy(0, -(ref.userSpeech.current.parentNode.offsetHeight) * currentTest.words.length);

                
                setTimeout(() => {
                    savingHandlers.savePoints(sumPoints);
                    savingHandlers.saveUserDay({points: sumPoints});
                    callback();
                }, 500);
            }
        }, 30);

    }, 1000);





    return (
        <React.Fragment>
            {wait && !showTalkingContainerImmediately && <span ref={counterRef} className="screenCounter">{timeToStart}</span>}

            <div className="testView">
                <ul>
                    {rows}
                </ul>
            </div>
            <TalkingContainer refs={talkingContainerRefs} rootaSentence={rootaSentence} />
        </React.Fragment>
    )
}

export default TestFeature