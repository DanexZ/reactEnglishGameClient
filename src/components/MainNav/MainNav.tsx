import React, { useContext } from "react";
import AppDispatchContext from "../../context/AppDispatchContext";
import AppStateContext from "../../context/AppStateContext";
import { AppAction } from "../../data/actions/AppAction";
import { PAGES } from "../../data/constants";
import AppStateInterface from "../../data/types/AppStateInterface";
import "./MainNav.scss";

const MainNav = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const setCurrentTab = (action: AppAction) => appDispatch(action);

    return (
        <nav className="main_nav">
            <div id="badges"></div>
            <ul>
                <li onClick={() => setCurrentTab({type: "setCurrentTab", payload: PAGES.COLLECT})}>
                    {appState.tutorialStage === 8 && <img className="arrow arrowTop" src="/images/arrow-up.png" />}
                    <div className="flex"><span>{PAGES.COLLECT}</span></div>
                </li>

                <li onClick={() => setCurrentTab({type: "setCurrentTab", payload: PAGES.DIALOGUES})}>
                    <div className="flex"><span>{PAGES.DIALOGUES}</span></div>
                </li>

                <li onClick={() => setCurrentTab({type: "setCurrentTab", payload: PAGES.DIARY})}>
                    <div className="flex"><span>{PAGES.DIARY}</span></div>
                </li>

                <li onClick={() => setCurrentTab({type: "setCurrentTab", payload: PAGES.WORDS})}>
                    {appState.tutorialStage === 3 && <img className="arrow arrowTop" src="/images/arrow-up.png" />}
                    <div className="flex"><span>{PAGES.WORDS}</span></div>
                </li>

                <li onClick={() => setCurrentTab({type: "setCurrentTab", payload: PAGES.TESTS})}>
                    {appState.tutorialStage === 6 && <img className="arrow arrowTop" src="/images/arrow-up.png" />}
                    <div className="flex"><span>{PAGES.TESTS}</span></div>
                </li>

                <li onClick={() => setCurrentTab({type: "setCurrentTab", payload: PAGES.PHRASES})}>
                    <div className="flex"><span>{PAGES.PHRASES}</span></div>
                </li>
            </ul>
        </nav>
    )
}

export default MainNav