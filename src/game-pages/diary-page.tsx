import React, { useContext, useEffect, useMemo, useState } from "react";
import AppStateInterface from "../data/types/AppStateInterface";
import Calendar from "../components/Calendar/Calendar";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import { getMonths, UserMonth } from "../utils/getMonths";
import AppStateContext from "../context/AppStateContext";
import { getDate } from "../utils/date/getDate";
import ProblematicWords from "../components/ProblematicWords/ProblematicWords";

const DiaryPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);    

    const userMonths = useMemo( () => {
        
        return getMonths(appState.user.days, appState.user.words, appState.user.tests);

    }, [appState.user.days, appState.user.words, appState.user.tests]);

    const [currentMonthIndex, setCurrentMonthIndex] = useState(userMonths.length - 1);
    const [currentMonth, setCurrentMonth]: [UserMonth, Function] = useState(userMonths[userMonths.length - 1]);
    const [currentDay, setCurrentDay] = useState(currentMonth.days[currentMonth.days.length - 1]);
    const [displayMonthSummary, setDisplayMonthSummary] = useState(true);

    useEffect(() => {

        setCurrentMonth(userMonths[currentMonthIndex]);

    }, [currentMonthIndex]);


    return (
        <SinglePageWrapper>
            <div className="blueBar">
                <h2>Your activity</h2>
            </div>

            <div id="profile">

                <Calendar 
                    months={userMonths}
                    currentMonth={currentMonth}
                    currentMonthIndex={currentMonthIndex} 
                    setCurrentMonthIndex={setCurrentMonthIndex}
                    setCurrentDay={setCurrentDay}
                    setDisplayMonthSummary={setDisplayMonthSummary}
                /> 

                <h2 id="title2">
                    {(displayMonthSummary) ? currentMonth.formatedName : getDate({ date: currentDay.created_at })} summary
                </h2>

                <div className="underTheProfile">
                    <div className="leftSideStatistics">
                        <h3>Acquired points: {(displayMonthSummary) ? currentMonth.points : currentDay.points}</h3>
                        <h3>Collected words: {(displayMonthSummary) ? currentMonth.words : currentDay.words}</h3>
                        <h3>Correctnesses: {(displayMonthSummary) ? currentMonth.correctnesses : currentDay.correctnesses}</h3>
                        <h3>Mistakes: {(displayMonthSummary) ? currentMonth.mistakes : currentDay.mistakes}</h3>
                        <h3>Passed tests: {(displayMonthSummary) ? currentMonth.passedTests : currentDay.passedTests}</h3>
                        <h3>Failed tests: {(displayMonthSummary) ? currentMonth.failedTests : currentDay.failedTests}</h3>
                    </div>
                    <div>
                        <h3>The most problematic words</h3>
                        <ProblematicWords userWords={appState.user.words} />
                    </div>
                </div>
            </div>
        </SinglePageWrapper>
    )
}

export default DiaryPage