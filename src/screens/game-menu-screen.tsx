import React, { useContext, useEffect } from "react";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { SCREEN_NAMES } from "../data/constants";
import Tile3d from "../components/shared/Tile3d/Tile3d";
import { AppAction } from "../data/actions/AppAction";
import { GameController, Settings, LogoUsd, Power } from 'react-ionicons';
import FixedScreenWrapper from "../components/shared/FixedScreenWrapper/FixedScreenWrapper";
import GameMenu from "../components/GameMenu/GameMenu";
import { checkPermissions } from "../utils/checkPermissions";


const GameMenuScreen = () => {
    
    const appDispatch = useContext(AppDispatchContext);

    const handleTabAction: Function = (action: AppAction) => appDispatch(action);

    useEffect(() => checkPermissions(), []);
    

    return (
        <FixedScreenWrapper>
            <GameMenu>
                <li onClick={() => handleTabAction({type: "setCurrentScreen", payload: SCREEN_NAMES.DATA_LOADER})} >
                    <Tile3d cssClass="static">
                        <div className="wordName">
                            <GameController style={{ verticalAlign: 'middle' }} /> PLAY
                        </div>
                    </Tile3d>
                </li>

                <li onClick={() => handleTabAction({type: "setCurrentScreen", payload: SCREEN_NAMES.SETTINGS})}>
                    <Tile3d cssClass="static">
                        <div className="wordName">
                            <Settings style={{ verticalAlign: 'middle' }} /> Settings
                        </div>
                    </Tile3d>
                </li>

                <li onClick={() => handleTabAction({type: "setCurrentScreen", payload: SCREEN_NAMES.PP})}>
                    <Tile3d cssClass="static">
                        <div className="wordName">
                            <LogoUsd style={{ verticalAlign: 'middle' }} /> PP
                        </div>
                    </Tile3d>
                </li>
                
                <li onClick={() => handleTabAction({type: "logout"})}>
                    <Tile3d cssClass="static">
                        <div className="wordName">
                            <Power style={{ verticalAlign: 'middle' }} /> Log out
                        </div>
                    </Tile3d>
                </li>
            </GameMenu>
        </FixedScreenWrapper>
    )
}

export default GameMenuScreen