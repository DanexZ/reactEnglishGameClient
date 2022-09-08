import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { appReducer } from "./data/reducers/appReducer";
import AppStateContext from "./context/AppStateContext";
import AppDispatchContext from "./context/AppDispatchContext";

import { SCREEN_NAMES, PAGES } from "./data/constants";
import { NotLoggedScreen } from "./screens/not-logged-screen";
import { LoggingScreen } from "./screens/logging-screen";
import { RegisterScreen } from "./screens/register-screen";
import { GameMenuScreen } from "./screens/game-menu-screen";
import { SettingsScreen } from "./screens/settings-screen";
import { DataLoadingScreen } from "./screens/data-loading-screen";
import { GameStartingScreen } from "./screens/game-starting-screen";
import PPScreen from "./screens/pp-screen";

import { User } from "./data/models";
import AppStateInterface from "./data/types/AppStateInterface";

import "./assets/global/common.css";
import "./assets/style.scss";
import "./assets/global/scrollbars.scss";
import "./assets/global/alerts.scss";
import "./assets/global/buttons.css";
import "./assets/global/darkCheckbox.scss";
import "./assets/dialogues.scss";
import "./assets/statistics.css";
import "./assets/wordsPage.scss";
import "./assets/hearts.scss";



function App() {

    const user: User = {
        id: Number(localStorage.getItem("englishGame_id")) || 0,
        nick: localStorage.getItem("englishGame_nick") || "",
        token: localStorage.getItem("englishGame_token") || "",
        level: Number(localStorage.getItem("englishGame_level")) || 0,
        lifes: Number(localStorage.getItem('englishGame_lifes')) || 3,
        points: Number(localStorage.getItem("englishGame_points")) || 0,
        password: localStorage.getItem("englishGame_userHash") || "",
        words: [],
        customWords: [],
        phrases: [],
        tests: [],
        days: [],
        receivedMessages: [],
        conversations: [],
        efficiency: 0,
        ranking: 1,
        events: {
            unlockedLevels: [{type: "unlocked_level"}],
            unlockedTests: [],
            unlockedDialogues: false
        }
    }

    const initialAppState: AppStateInterface = {
        isLogged: Boolean(localStorage.getItem("englishGame_token")),
        flashMessages: [],
        user,
        users: [],
        currentScreen: (Boolean(localStorage.getItem("englishGame_token"))) ? SCREEN_NAMES.GAMEMENU : SCREEN_NAMES.NOTLOGGED,
        currentTab: PAGES.NONE,
        words: [],
        dialogues: [],
        badges: [],
        phrases: [],
        showBottomNav: true,
        showTalkingContainer: false,
        tutorialStage: 0,
        RootaTexts: [],
        chosenLevel: 0,
        chosenDialogue: 0,
        listening: false,
        speaking: false,
        startedTest: false,
        interval: setInterval(() => {}),
        timeout: setTimeout(() => {}),
        recognition: null
    };



    const [appState, appDispatch] = useImmerReducer(appReducer, initialAppState);



    useEffect(() => {

        if (appState.isLogged) {
            localStorage.setItem("englishGame_token", appState.user.token);
            localStorage.setItem("englishGame_id", String(appState.user.id));
            localStorage.setItem("englishGame_nick", appState.user.nick);
            localStorage.setItem("englishGame_level", String(appState.user.level));
            localStorage.setItem("englishGame_lifes", String(appState.user.lifes));
            localStorage.setItem("englishGame_points", String(appState.user.points));
            localStorage.setItem("englishGame_userHash", String(appState.user.password));
        } else {
            localStorage.removeItem("englishGame_token");
            localStorage.removeItem("englishGame_id");
            localStorage.removeItem("englishGame_nick");
            localStorage.removeItem("englishGame_level");
            localStorage.removeItem("englishGame_lifes");
            localStorage.removeItem("englishGame_points");
            localStorage.removeItem("englishGame_userHash");
        }

    }, [appState.isLogged]);



    if(!appState.isLogged) {
        return (
            <AppStateContext.Provider value={appState}>
                <AppDispatchContext.Provider value={appDispatch}>
                    <div id="board">
                        {appState.currentScreen === SCREEN_NAMES.NOTLOGGED && <NotLoggedScreen />}
                        {appState.currentScreen === SCREEN_NAMES.LOGGING && <LoggingScreen />}
                        {appState.currentScreen === SCREEN_NAMES.REGISTER && <RegisterScreen />}
                    </div>
                    <div className="mountains"></div>
                </AppDispatchContext.Provider>
            </AppStateContext.Provider>
        )
    }


    return (
        <AppStateContext.Provider value={appState}>
            <AppDispatchContext.Provider value={appDispatch}>
                <div id="board">
                    {appState.currentScreen === SCREEN_NAMES.GAMEMENU && <GameMenuScreen />}
                    {appState.currentScreen === SCREEN_NAMES.SETTINGS && <SettingsScreen />}
                    {appState.currentScreen === SCREEN_NAMES.PP && <PPScreen />}
                    {appState.currentScreen === SCREEN_NAMES.DATA_LOADER && <DataLoadingScreen />}
                    {appState.currentScreen === SCREEN_NAMES.GAME_INDEX && <GameStartingScreen />}
                    {/*<div id="player"></div>*/}
                </div>
                <div className="mountains"></div>
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}

export default App;
