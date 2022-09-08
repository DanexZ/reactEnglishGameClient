import React, { useContext, useEffect, useState } from "react";
import AppStateContext from "../../context/AppStateContext";
import TestsList from "../../components/tests-page-layout/TestsList";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import TestsDashboard from "../../components/tests-page-layout/TestsDashboard";
import FinishedTest from "./FinishedTest";
import SinglePageWrapper from "../../components/shared/SinglePageWrapper";
import TestFeature from "../../features/test-feature";
import { UserTest } from "../../data/models";
import { AppAction } from "../../data/actions/AppAction";
import AppDispatchContext from "../../context/AppDispatchContext";
import { updateState } from "../../utils/updateState";
import { round } from "../../utils/round";
import AppStateInterface from "../../data/types/AppStateInterface";
import "./TestsPage.scss";
import { useSavingHandlers } from "../../hooks/useSavingHandlers";



export interface TestFeatureInterface {
    passedWords: number
    requiredWords: number
    savedTime: number
    points: number
    currentWordIndex: number
}

const TestsPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);
    const {recognition, userSpeech, finalTranscript} = useSpeechRecognition();
    const [prevUserTestsNumber, setPrevUserTestsNumber] = useState(appState.user.tests.length);
    const savingHandlers = useSavingHandlers();
    const [currentTest, setCurrentTest] = useState(appState.user.tests[0]);

    const [chosenTest, setChosenTest]: [UserTest | null, Function] = useState(null);

    const initialTestFeatureState: TestFeatureInterface = {
        passedWords: 0,
        requiredWords: 0,
        savedTime: 0,
        points: 0,
        currentWordIndex: -1
    }

    const [testState, setTestState] = useState(initialTestFeatureState);

    useEffect(() => {

        if (appState.user.tests.length > prevUserTestsNumber) {
            setPrevUserTestsNumber(appState.user.tests.length);

            const newTest = appState.user.tests[appState.user.tests.length - 1];
            savingHandlers.createTestWords(newTest);
            setCurrentTest(newTest);

            updateState(setTestState, "requiredWords", round(0.8 * newTest.words.length, 0));

            const action: AppAction = {type: "setStartedTest", payload: true}
            appDispatch(action)

        } else {
            const action: AppAction = {type: "setStartedTest", payload: false}
            appDispatch(action)
        }

    }, [appState.user.tests.length]);


    useEffect(() => {

        if (!appState.startedTest) {
            setTestState((prev: TestFeatureInterface) => prev = initialTestFeatureState);
        };

    }, [appState.startedTest])



    if (appState.user.level < 2) {
        return (
            <SinglePageWrapper additionClasses="blueBar">
                <h3>Want tests?<br/>Reach 2 level to unlock this section.</h3>
            </SinglePageWrapper>
        )
    }


    return (
        <SinglePageWrapper additionClasses="testsPage">
            <TestsDashboard testState={testState} appState={appState} chosenTest={chosenTest} />
            {!appState.startedTest && !chosenTest && appState.user.level >= 2 && <TestsList setChosenTest={setChosenTest} />}
            {appState.startedTest && <TestFeature 
                                        recognition={recognition} 
                                        userSpeech={userSpeech}
                                        finalTranscript={finalTranscript}
                                        testState={testState} 
                                        currentTest={currentTest}
                                        setTestState={setTestState} />}
            {chosenTest !== null && <FinishedTest chosenTest={chosenTest} setChosenTest={setChosenTest} />}
        </SinglePageWrapper>
    )
}

export default TestsPage