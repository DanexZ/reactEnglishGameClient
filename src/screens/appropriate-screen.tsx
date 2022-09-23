import { useContext, useEffect } from "react";
import { SCREEN_NAMES } from "../data/constants";
import NotLoggedScreen from "../screens/not-logged-screen";
import LoggingScreen from "../screens/logging-screen";
import RegisterScreen from "../screens/register-screen";
import GameMenuScreen from "../screens/game-menu-screen";
import SettingsScreen from "../screens/settings-screen";
import DataLoadingScreen from "../screens/data-loading-screen";
import GameStartingScreen from "../screens/game-starting-screen";
import PPScreen from "../screens/pp-screen";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { AppStateContext } from "../context/AppStateContext";
import { useLocation } from "react-router-dom";
import ChangePasswordScreen from "./change-password-screen";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { AppAction } from "../data/actions/AppAction";
import ScreenWrapper from "../components/ScreenWrapper";



const AppropriateScreen = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const token = params.get("token");


    useEffect(() => {

        if (token) {

            const actions: AppAction[] = [
                { type: "setEmailToken", payload: token },
                { type: "setCurrentScreen", payload: SCREEN_NAMES.CHANGE_PASSWORD }
            ];

            appDispatch(actions[0]);
            appDispatch(actions[1]);
        }

    }, [token]);


    return (
        <ScreenWrapper>
            {appState.currentScreen === SCREEN_NAMES.CHANGE_PASSWORD && <ChangePasswordScreen />}   
            {appState.currentScreen === SCREEN_NAMES.NOTLOGGED && <NotLoggedScreen />}
            {appState.currentScreen === SCREEN_NAMES.LOGGING && <LoggingScreen />}
            {appState.currentScreen === SCREEN_NAMES.REGISTER && <RegisterScreen />}  
            {appState.currentScreen === SCREEN_NAMES.GAMEMENU && <GameMenuScreen />}
            {appState.currentScreen === SCREEN_NAMES.SETTINGS && <SettingsScreen />}
            {appState.currentScreen === SCREEN_NAMES.PP && <PPScreen />}
            {appState.currentScreen === SCREEN_NAMES.DATA_LOADER && <DataLoadingScreen />}
            {appState.currentScreen === SCREEN_NAMES.GAME_INDEX && <GameStartingScreen />}
        </ScreenWrapper>
    )
}

export default AppropriateScreen