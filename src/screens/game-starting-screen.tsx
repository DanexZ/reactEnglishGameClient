import React, { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../context/AppStateContext";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { AppStateInterface } from "../data/types/AppStateInterface";
import Header from "../components/Header/Header";
import MainNav from "../components/MainNav/MainNav";
import BottomNav from "../components/BottomNav/BottomNav";
import TutorialFeature from "../features/tutorial-feature";
import { PAGES } from "../data/constants";
import LevelsPage from "../game-pages/levels-page";
import TestsPage from "../game-pages/tests-page/tests-page";
import DialoguesPage from "../game-pages/dialogues-page";
import WordsPageFeature from "../features/words-page-feature";
import PhrasesPage from "../game-pages/phrases-page";
import DiaryPage from "../game-pages/diary-page";
import RankingPage from "../game-pages/ranking-page/ranking-page";
import PreferencesPage from "../game-pages/preferences-page";
import SupportPage from "../game-pages/support-page";
import { AppAction } from "../data/actions/AppAction";
import AddPhrasePage from "../game-pages/add-phrase-page";
import UserPhrasesPage from "../game-pages/user-phrases-page";
import AddWordPage from "../game-pages/add-word-page";



const GameStartingScreen = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch = useContext(AppDispatchContext);
    const [prevPage, setPrevPage] = useState(appState.currentTab); 



    useEffect(() => {

        if (appState.chosenLevel || 
            appState.chosenDialogue || 
            appState.tutorialStage || 
            appState.startedTest || 
            appState.speaking
        ) {
            const action: AppAction = {type: "hideBottomNav"}
            appDispatch(action);

        } else {

            if (appState.recognition) appState.recognition.stop();
            
            const actions: AppAction[] = [
                {type: "showBottomNav"},
                {type: "clearInterval"}
            ];

            appDispatch(actions[0]);
            appDispatch(actions[1]);
        }


    }, [appState.chosenLevel, appState.chosenDialogue, appState.tutorialStage, appState.startedTest, appState.speaking]);



    useEffect(() => {

        if (appState.currentTab !== prevPage) {
            
            if (appState.recognition) appState.recognition.stop();

            const actions: AppAction[] = [
                {type: "deactivateSpeakingFeature"}
            ];

            appDispatch(actions[0]);
            
            setPrevPage(appState.currentTab);
        }

    }, [appState.currentTab]);



    useEffect(() => {

        if (!appState.listening) {
            const action: AppAction = {type: "clearTimeout"}
            appDispatch(action);
        }

    }, [appState.listening]);




    return (
        <React.Fragment>
            <Header />

            <div className="mainWrapper">
                <MainNav />
                
                {(appState.tutorialStage || (appState.currentTab === PAGES.NONE)) && <TutorialFeature />}

                {appState.currentTab === PAGES.COLLECT && <LevelsPage />}
                {appState.currentTab === PAGES.DIALOGUES && <DialoguesPage />}
                {appState.currentTab === PAGES.DIARY && <DiaryPage />}
                {(appState.currentTab === PAGES.WORDS || appState.currentTab === PAGES.USER_WORDS) && <WordsPageFeature />}
                {appState.currentTab === PAGES.ADD_CUSTOM_WORD && <AddWordPage />}
                {appState.currentTab === PAGES.TESTS && <TestsPage />}
                {appState.currentTab === PAGES.PHRASES && <PhrasesPage />}
                {appState.currentTab === PAGES.USER_PHRASES && <UserPhrasesPage />}
                {appState.currentTab === PAGES.ADD_CUSTOM_PHRASE && <AddPhrasePage />}
                {appState.currentTab === PAGES.RANKING && <RankingPage />}
                {appState.currentTab === PAGES.PREFERENCES && <PreferencesPage />}
                {appState.currentTab === PAGES.SUPPORT && <SupportPage />}
            </div>

            {appState.showBottomNav && <BottomNav />}
        </React.Fragment>
    )
}

export default GameStartingScreen