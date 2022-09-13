import React, { useContext } from "react";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { SCREEN_NAMES } from "../data/constants";
import Tile3d from "../components/shared/Tile3d/Tile3d";
import { AppAction } from "../data/actions/AppAction";
import { LogIn, Accessibility } from 'react-ionicons';
import FixedScreenWrapper from "../components/shared/FixedScreenWrapper/FixedScreenWrapper";
import GameMenu from "../components/GameMenu/GameMenu";

const NotLoggedScreen = () => {

    const appDispatch = useContext(AppDispatchContext);

    const handleTabAction = (action: AppAction) => appDispatch(action);

    return (
        <FixedScreenWrapper>
            <GameMenu>
                <li onClick={() => handleTabAction({type: "setCurrentScreen", payload: SCREEN_NAMES.LOGGING})}>
                    <Tile3d cssClass="static" onClickFn={() => {}} >
                        <div className="wordName">
                            <LogIn /> Log in
                        </div>
                    </Tile3d>
                </li>

                <li onClick={() => handleTabAction({type: "setCurrentScreen", payload: SCREEN_NAMES.REGISTER})}>
                    <Tile3d cssClass="static" onClickFn={() => {}}>
                        <div className="wordName">
                            <Accessibility /> Register
                        </div>
                    </Tile3d>
                </li>
            </GameMenu>
        </FixedScreenWrapper>
    )
}

export default NotLoggedScreen