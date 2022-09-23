import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { appReducer } from "./data/reducers/appReducer";
import { AppStateContext } from "./context/AppStateContext";
import { AppDispatchContext } from "./context/AppDispatchContext";
import { initialAppState } from "./data/initialAppState";
import { setUserItems } from "./utils/setUserItems";
import { removeUserItems } from "./utils/removeUserItems";
import AppropriateScreen from "./screens/appropriate-screen";

import "./assets/global/common.scss";
import "./assets/style.scss";
import "./assets/global/scrollbars.scss";
import "./assets/global/alerts.scss";
import "./assets/global/buttons.scss";
import "./assets/global/darkCheckbox.scss";
import "./assets/dialogues.scss";
import "./assets/statistics.scss";
import "./assets/wordsPage.scss";
import "./assets/hearts.scss";



const App = () => {

    const [appState, appDispatch] = useImmerReducer(appReducer, initialAppState);


    useEffect(() => {

        if (appState.isLogged) setUserItems(appState)
            else removeUserItems()

    }, [appState.isLogged]);



   
    return (
        <AppStateContext.Provider value={appState}>
            <AppDispatchContext.Provider value={appDispatch}>
                <AppropriateScreen />
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )
}

export default App;
