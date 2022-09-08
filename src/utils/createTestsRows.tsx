import AppStateInterface from "../data/types/AppStateInterface";
import { UserTest } from "../data/models";
import { getTestsList } from "./getTestsList";


export const createTestsRow = (level: number, appState: AppStateInterface, startTest: Function, setChosenTest: Function) => {

    const userTests: UserTest[] = [...appState.user.tests];
    const levelTestsList: UserTest[] = getTestsList(level, userTests);


    return (
        <div key={`${level}test`} className="elementRow">

            <div className="buttons">
                <span className="rowNumber">Level {level}</span>
                {appState.user.level >= level -1 && <button className="btn btn_blue" onClick={ () => startTest(level)}>START TEST</button>}
            </div>

            <div className="testsContainer">
                {levelTestsList.map((test: UserTest, index: number) => {
                    return (
                        <div key={`${test.created_at}${index}`} className="testBackground flex" onClick={() => setChosenTest(test)}>
                            {test.status === "failed" && <img  className="failed" src="/images/failed.png" alt="failed"/>}
                            {test.status === "passed" && <img  className="passed" src="/images/test.png" alt="passed" />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}