import { useContext } from "react";
import AppStateContext from "../context/AppStateContext";
import AppDispatchContext from "../context/AppDispatchContext";
import { addAsyncCorrectness, addAsyncUserEvent, addAsyncUserMessage, addAsyncUserWord, createAsyncTestWords, createAsyncUserTest, saveAsyncUserDay, updateAsyncTestWord, updateAsyncUserLevel, updateAsyncUserLifes, updateAsyncUserPoints, updateAsyncUserTest } from "../lib/api";
import { addAsyncMistake } from "../lib/api";
import { AppAction } from "../data/actions/AppAction";
import AppStateInterface from "../data/types/AppStateInterface";
import Alert from "../lib/Alert";
import { SCREEN_NAMES, SOUNDS } from "../data/constants";
import { TestWord, UserDay, UserTest, UserWord } from "../data/models";
import { ExamStatus } from "../data/types/ExamStatus";
import { EventType } from "../data/types/EventType";
import { getDate } from "../utils/date/getDate";
import { getRandomSet } from "../utils/getRandomSet";
/* eslint-disable */
const {Howl, Howler} = require('howler');
/* eslint-enable */

 
export const useSavingHandlers = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch = useContext(AppDispatchContext);




    const handleError = (error: string) => {
        new Howl(SOUNDS.OOT_ERROR).play();
    
        const action: AppAction = {type: "setCurrentScreen", payload: SCREEN_NAMES.GAMEMENU}
        const onClickFn = () => appDispatch(action);
    
        new Alert("error", error, onClickFn);
    }




    const saveUserEvent = (type: EventType) => {

        addAsyncUserEvent(appState.user.id, type, appState.user.token, {
            next: () => {

                const unlockedLevels = [...appState.user.events.unlockedLevels];
                const unlockedTests = [...appState.user.events.unlockedTests];
                let unlockedDialogues = false;

                if (type === "unlocked_level") unlockedLevels.push({ type: "unlocked_level" });
                if (type === "unlocked_test") unlockedTests.push({ type: "unlocked_test" });
                if (type === "unlocked_dialogues") unlockedDialogues = true;

                const action: AppAction = {type: "setUserEvents", payload: { unlockedLevels, unlockedDialogues, unlockedTests }}
                appDispatch(action);
            },
            
            errorHandler: (e: string) => handleError(e)
        });

    }



    const saveUserDay = ({points, words, badges}: {points?: number, words?: number, badges?: number}) => {

        const updatedDay: UserDay = {...appState.user.days[appState.user.days.length -1]};
        if (points) updatedDay.points += points;
        if (words) updatedDay.words += words;
        if (badges) updatedDay.badges += badges;

        const action: AppAction = { type: "updateCurrentUserDay", payload: updatedDay }
        appDispatch(action);

        saveAsyncUserDay(updatedDay, appState.user.token, {
            errorHandler: (e: string) => handleError(e)
        });

    }




    const createTest = (level: number) => {

        createAsyncUserTest(appState.user.id, appState.user.token, {
            next: (({test_id, created_at}: any) => {

                const randomUserWords: UserWord[] = getRandomSet([...appState.user.words], (level*2)+4);

                const words: TestWord[] = randomUserWords.map((userWord) => {
                    return {
                        ...userWord,
                        test_id,
                        status: "initial",
                    }
                });

                const action: AppAction = {type: "setUserTests", payload: [
                    ...appState.user.tests, 
                    {
                        id: test_id,
                        initialIndex: appState.user.tests.length,
                        status: "initial",
                        words,
                        created_at
                    }
                ]}
                
                appDispatch(action);
            }),
            errorHandler: (e: string) => handleError(e)
        })
    }



    const createTestWords = (test: UserTest) => {

        createAsyncTestWords(test.id, test.words, appState.user.token, {
            errorHandler: (e: string) => handleError(e)
        });
    }



    const updateTestWord = (test: UserTest, word_id: number, status: ExamStatus) => {

        const action: AppAction = {type: "updateTestWord", payload: { testInitialIndex: test.initialIndex, word_id, status}}
        appDispatch(action);

        updateAsyncTestWord(test.id, word_id, status, appState.user.token, {
            errorHandler: (e: string) => handleError(e)
        });
    }



    const updateUserTest = (test: UserTest, status: ExamStatus) => {

        const action: AppAction = {type: "updateUserTest", payload: { testInitialIndex: test.initialIndex, status}}
        appDispatch(action);

        updateAsyncUserTest(test.id, status, appState.user.token, {
            errorHandler: (e: string) => handleError(e)
        })
    }




    const savePoints = (points: number) => {

        new Howl(SOUNDS.SMB_1_UP).play();

        const action: AppAction = {type: "updateUserPoints", payload: points}
        appDispatch(action);

        updateAsyncUserPoints(appState.user.id, points, appState.user.token, {

            errorHandler: (e: string) => handleError(e)
        });
        
    }



    const saveLifes = (lifes: number) => {

        const action: AppAction = {type: "updateUserLifes", payload: lifes}
        appDispatch(action);

        localStorage.setItem("englishGame_lifes", String(lifes));

        updateAsyncUserLifes(appState.user.id, lifes, appState.user.token, {

            errorHandler: (e: string) => handleError(e)
        });
        
    }




    const saveCorrectness = async (word_id: number, initialIndex?: number) => {

        const currentDate = new Date();
        const created_at = getDate({date: currentDate, separator: "-", format: "ang", showTime: true});

        if (initialIndex) {
            const action: AppAction = {type: "addUserWordCorrectness", payload: {initialIndex, created_at}}
            appDispatch(action);
        }

        addAsyncCorrectness(appState.user.id, word_id, appState.user.token, {
            errorHandler: (e: string) => handleError(e)
        });

    }




    const saveMistake = async (word_id: number, initialIndex?: number) => {

        const currentDate = new Date();
        const created_at = getDate({date: currentDate, separator: "-", format: "ang", showTime: true});

        if (initialIndex) {
            const action: AppAction = {type: "addUserWordMistake", payload: {initialIndex, created_at}}
            appDispatch(action);
        }

        addAsyncMistake(appState.user.id, word_id, appState.user.token, {
            errorHandler: (e: string) => handleError(e)
        });
    }




    const addUserMessage = (message_id: number) => {

        addAsyncUserMessage(appState.user.id, message_id, appState.user.token, {
            errorHandler: (e: string) => handleError(e)
        });

    }
    



    const addUserWord = async (word_id: number, callback: Function) => {

        addAsyncUserWord(appState.user.id, word_id, appState.user.token, {
            next: (data: any) => {

                const action: AppAction = {type: "addUserWord", payload: data.word}
                appDispatch(action);

                new Howl(SOUNDS.OOT_FANFARE_ITEM).play();

                callback(data.word);
            },

            errorHandler: (e: string) => handleError(e)
        });
    }



    const saveUserLevel = async (level: number) => {

        const action: AppAction = { type: "updateUserLevel", payload: appState.chosenLevel}
        appDispatch(action);

        updateAsyncUserLevel(appState.user.id, level, appState.user.token, {
            errorHandler: (e: string) => handleError(e)
        })

    }



    return {
        savePoints, 
        saveCorrectness, 
        saveMistake, 
        addUserWord, 
        addUserMessage, 
        handleError, 
        saveUserDay, 
        createTest,
        updateTestWord,
        saveUserEvent,
        saveUserLevel,
        saveLifes,
        createTestWords,
        updateUserTest
    }
}