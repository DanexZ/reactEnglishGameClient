import React, { useContext, useEffect, useState } from "react";
import AppStateContext from "../../context/AppStateContext";
import AppDispatchContext from "../../context/AppDispatchContext";
import AppStateInterface from "../../data/types/AppStateInterface";
import { AppAction } from "../../data/actions/AppAction";
import { calculateUserEfficiency } from "../../utils/calculateUserEfficiency";
import { ANIMATIONS, PAGES } from "../../data/constants";
import { round } from "../../utils/round";
import "./Header.scss";


const Header = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch = useContext(AppDispatchContext);

    const [prevEfficiency, setPrevEfficiency] = useState(appState.user.efficiency);
    const [newEfficiency, setNewEfficiency] = useState(0);
    const [prevPoints, setPrevPoints] = useState(appState.user.points);
    const [newPoints, setNewPoints] = useState(0);
    const [newWord, setNewWord] = useState(0);
    const [userWordsNr, setUserWordsNr] = useState(appState.user.words.length);


    const setCurrentTab = (action: AppAction) => appDispatch(action);


    useEffect(() => {

        const efficiency = calculateUserEfficiency(appState.user.words);

        const action: AppAction = {type: 'setUserEfficiency', payload: efficiency}
        appDispatch(action);

        const difference = round(efficiency - prevEfficiency, 2);

        if (difference) {
            setNewEfficiency(difference);
            setPrevEfficiency(efficiency);
        }
        
        setTimeout(() => {
            setNewEfficiency(0);
        }, ANIMATIONS.ADDING_POINTS.duration)

    }, [appState.user.words]);



    useEffect(() => {

        if(appState.user.words.length > userWordsNr) {

            setNewWord(1);

            setTimeout(() => {
                setNewWord(0);
            }, ANIMATIONS.ADDING_POINTS.duration);

            setUserWordsNr(appState.user.words.length);

        }

    }, [appState.user.words.length]);



    useEffect(() => {

        localStorage.setItem("englishGame_points", String(appState.user.points));

        const difference = appState.user.points - prevPoints
        setNewPoints(difference);
        setPrevPoints(appState.user.points);

        setTimeout(() => {
            setNewPoints(0);
        }, ANIMATIONS.ADDING_POINTS.duration)

    }, [appState.user.points]);

    

    return (
        <header>
            <div className="container">
                <ul className="statistics">
                    <li onClick={() => setCurrentTab({type: "setCurrentTab", payload: PAGES.RANKING})}>
                        <div><img className="statisticsImg" src="/images/ranking1.png" /></div>
                        <div>Ranking</div>
                        <div>{appState.user.ranking}</div>
                    </li>
                    <li>
                        <div><img className="statisticsImg" src="/images/level1.png" /></div>
                        <div>Level</div>
                        <div>{appState.user.level}</div>
                    </li>
                    <li>
                        <div><img className="statisticsImg" src="/images/level2.png" /></div>
                        <div>Points</div>
                        <div>
                            {appState.user.points}
                            {newPoints > 0 && <span className="points">+{newPoints}</span>}
                        </div>

                        {appState.tutorialStage === 14 && <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
                    </li>
                    <li>
                        <div><img className="statisticsImg" src="/images/efficiency3.png" /></div>
                        <div>Efficiency</div>
                        <div>
                            {appState.user.efficiency}%
                            {newEfficiency !== 0 && 
                                <span className="points" style={(newEfficiency < 0) ? {color: "red"} : {} }>
                                    {(newEfficiency > 0) ? `+${newEfficiency}` : newEfficiency}
                                </span>
                            }
                        </div>

                        {appState.tutorialStage === 15 && <img className="arrow arrowLeft" src="/images/arrow-left.png" />}
                    </li>
                    <li>
                        {appState.tutorialStage === 2 && <img className="arrow arrowTop" src="/images/arrow-up.png" />}

                        <div><img className="statisticsImg" src="images/words2.png" /></div>
                        <div>Words</div>
                        <div>
                            {appState.user.words.length}/3000
                            {newWord > 0 && <span className="points">+{newWord}</span>}
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header
