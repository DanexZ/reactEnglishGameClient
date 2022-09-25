import {useContext, useState, useEffect} from "react";
import { DataLoadingBox } from "../components/DataLoadingBox";
import { SCREEN_NAMES } from "../data/constants";
import { AppAction } from "../data/actions/AppAction";
import { DATA_LOADING_RANDOM_MESSAGES } from "../data/constants";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { AppStateContext } from "../context/AppStateContext";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { round } from "../utils/round";
import * as ApiRequest from "../lib/api";
import { calculateUserEfficiency } from "../utils/calculateUserEfficiency";
import { getUserRanking } from "../utils/getUserRanking";
import { useSavingHandlers } from "../hooks/useSavingHandlers";
import { getRandomItem } from "../utils/getRandomItem";
import { Event, User, UserTest, UserWord } from "../data/models";

const DataLoadingFeature = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch = useContext(AppDispatchContext);

    const [message] = useState(getRandomItem(DATA_LOADING_RANDOM_MESSAGES));
    const [loadedRequests, setLoadedRequests] = useState(0);
    const [progress, setProgress] = useState(0);
    const {handleError} = useSavingHandlers();


    const updateProgress = () => {

        const progress = round( ( loadedRequests / Object.keys(requests).length ) * 100, 0 );
        setProgress(progress);

        if (progress === 100) {

            const action: AppAction = {type: "setCurrentScreen", payload: SCREEN_NAMES.GAME_INDEX}

            setTimeout(() => {
                appDispatch(action);
            }, 500);
        }
    }


    const requestHandlerFacade = (callback: Function) => {
        return {
            next: (data: any) => {
                setLoadedRequests((prev) => prev + 1);
                callback(data)
            }, 
            errorHandler: (e: string) => handleError(e) 
        }
    }


    const requests = {

        getWords: (callback: Function) => ApiRequest.getAsyncWords(appState.user.token, requestHandlerFacade(callback)),
        getUserWords: (callback: Function) => ApiRequest.getAsyncUserWords(appState.user.id, appState.user.token, requestHandlerFacade(callback)),
        getUserTests: (callback: Function) => ApiRequest.getAsyncUserTests(appState.user.id, appState.user.token, requestHandlerFacade(callback)),
        getUsers: (callback: Function) => ApiRequest.getAsyncUsers(appState.user.token, requestHandlerFacade(callback)),
        getPhrases: (callback: Function) => ApiRequest.getAsyncPhrases(appState.user.token, requestHandlerFacade(callback)),
        getDialogues: (callback: Function) => ApiRequest.getAsyncDialogues(appState.user.token, requestHandlerFacade(callback)),
        getBagdes: (callback: Function) => ApiRequest.getAsyncBadges(appState.user.token, requestHandlerFacade(callback)),
        getRootaMessages: (callback: Function) => ApiRequest.getAsyncRootaMessages(appState.user.token, requestHandlerFacade(callback)),
        getUserMessages: (callback: Function) => ApiRequest.getAsyncUserMessages(appState.user.id, appState.user.token, requestHandlerFacade(callback)),
        getUserDays: (callback: Function) => ApiRequest.getAsyncUserDays(appState.user.id, appState.user.token, requestHandlerFacade(callback)),
        getConversations: (callback: Function) => ApiRequest.getAsyncConversations(appState.user.id, appState.user.token, requestHandlerFacade(callback)),
        getUserPhrases: (callback: Function) => ApiRequest.getAsyncUserPhrases(appState.user.id, appState.user.token, requestHandlerFacade(callback)),
        getUserEvents: (callback: Function) => ApiRequest.getAsyncUserEvents(appState.user.id, appState.user.token, requestHandlerFacade(callback))

    };


    useEffect( () => {


        requests.getWords(({words}: any) => {

            const action: AppAction = {type: "setWords", payload: words}
            appDispatch(action);

        });
        

        requests.getUserWords(({words}: any) => {

            const userAppWords: UserWord[] = [];
            const userCustomWords: UserWord[] = [];

            words.forEach( (word: UserWord) => {
                if (word.word_id > 3000) userCustomWords.push(word)
                else userAppWords.push(word)
            });

            userAppWords.forEach((w: UserWord, index: number) => {
                w.initialIndex = index
                w.featureInitialIndex = 0;
            });

        
            const userEfficiency = calculateUserEfficiency(userAppWords);

            const actions: AppAction[] = [
                {type: "setUserWords", payload: userAppWords},
                {type: "setUserCustomWords", payload: userCustomWords},
                {type: "setUserEfficiency", payload: userEfficiency}
            ];

            appDispatch(actions[0]);
            appDispatch(actions[1]);
            appDispatch(actions[2]);
        });



        requests.getUserTests(({tests}: any) => {

            tests.forEach((w: UserTest, index: number) => {
                w.initialIndex = index
            });

            const action: AppAction = { type: "setUserTests", payload: tests }
            appDispatch(action);
        });


        requests.getUsers(({users}: any) => {

            users.sort((a:User, b:User) => b.points - a.points);

            const userRanking = getUserRanking(appState.user, users);

            const actions: AppAction[] = [
                {type: "setUsers", payload: users},
                {type: "setUserRanking", payload: userRanking }
            ];

            appDispatch(actions[0]);
            appDispatch(actions[1]);
        });


        requests.getPhrases(({phrases}: any) => {
            const action: AppAction = {type: "setPhrases", payload: phrases}
            appDispatch(action);
        });


        requests.getDialogues(({dialogues}: any) => {
            const action: AppAction = {type: "setDialogues", payload: dialogues}
            appDispatch(action);
        });



        requests.getDialogues(({badges}: any) => {
            const action: AppAction = {type: "setBadges", payload: badges}
            appDispatch(action);
        });



        requests.getRootaMessages(({messages}: any) => {
            const action: AppAction = {type: "setRootaTexts", payload: messages}
            appDispatch(action);
        });



        requests.getUserMessages(({user_messages}: any) => {
            const action: AppAction = {type: "setUserReceivedMessages", payload: user_messages}
            appDispatch(action);
        });



        requests.getUserDays(({days}: any) => {
            const action: AppAction = {type: "setUserDays", payload: days}
            appDispatch(action);
        });



        requests.getConversations(({conversations}: any) => {
            const action: AppAction = {type: "setUserConversations", payload: conversations}
            appDispatch(action);
        });


        requests.getUserPhrases(({phrases}: any) => {
            const action: AppAction = {type: "setUserPhrases", payload: phrases}
            appDispatch(action);
        });


        requests.getUserEvents(({events}: any) => {

            const unlockedLevels = [...events.filter((event: Event) => event.type === "unlocked_level"), {}];
            const unlockedTests = events.filter((event: Event) => event.type === "unlocked_test");
            const unlockedDialogues = events.some((event: Event) => event.type === "unlocked_dialogues");

            const action: AppAction = {type: "setUserEvents", payload: { unlockedLevels, unlockedTests, unlockedDialogues }}
            appDispatch(action);
        });
        

    }, []);


    useEffect(() => updateProgress(), [loadedRequests]);


    return <DataLoadingBox message={message} progress={progress} />
}

export default DataLoadingFeature