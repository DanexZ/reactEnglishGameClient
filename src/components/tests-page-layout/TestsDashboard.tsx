import React from "react";
import { TestWord, UserTest } from "../../data/models";
import AppStateInterface from "../../data/types/AppStateInterface";
import { TestFeatureInterface } from "../../game-pages/tests-page/tests-page";
import { round } from "../../utils/round";

const TestsDashboard = ({testState, appState, chosenTest}: {testState: TestFeatureInterface, appState: AppStateInterface, chosenTest: UserTest | null}) => {
    return (
        <div className={`blueBar flex${appState.startedTest ? " sticky" : ""}`}>
            <div className="raisedText center">

                {!appState.startedTest && !chosenTest &&
                    <React.Fragment>
                        <div>All tests: {appState.user.tests.length}</div>
                        <div>Passed tests: {appState.user.tests.filter((test: UserTest) => test.status === "passed").length}</div>
                        <div>Failed tests: {appState.user.tests.filter((test: UserTest) => test.status === "failed").length}</div>
                    </React.Fragment>
                }

                {appState.startedTest && 
                    <React.Fragment>
                        <div>Answers required to pass the test: {testState.passedWords}/{testState.requiredWords}</div>
                        <div>Saved time: {testState.savedTime}</div>
                        <div>Total points: {testState.points}</div>
                    </React.Fragment>
                }

                {chosenTest !== null &&
                    <React.Fragment>
                        <div>Test {chosenTest.status}</div>
                        <div>
                            Answers required to pass the test: {chosenTest.words.filter((word: TestWord) => word.status === "passed").length}/{round(chosenTest.words.length * .8, 0)} 
                        </div>
                    </React.Fragment>
                }

            </div>
        </div>
    )
}

export default TestsDashboard