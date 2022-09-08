import React, { useState, useContext } from "react";
import AppDispatchContext from "../../context/AppDispatchContext";
import { AppAction } from "../../data/actions/AppAction";
import { SCREEN_NAMES, PAGES } from "../../data/constants";
import { Settings, Power } from "react-ionicons";
import "./BottomNav.scss";


const BottomNav = () => {

    const appDispatch = useContext(AppDispatchContext);

    const [isActive, setIsActive]: [boolean, Function] = useState(false);

    const exitScreen = () => {

        const actions : AppAction[] = [
            { type: "setCurrentScreen", payload: SCREEN_NAMES.GAMEMENU},
            { type: "setCurrentTab", payload: PAGES.NONE}
        ];

        appDispatch(actions[0]);
        appDispatch(actions[1]);
    }

    const showPreferencesPage = () => {
        const action: AppAction = {type: "setCurrentTab", payload: PAGES.PREFERENCES}
        appDispatch(action);
    }

    const showSupportPage = () => {
        const action: AppAction = {type: "setCurrentTab", payload: PAGES.SUPPORT}
        appDispatch(action);
    }


    return (
        <div>
            <div className={`bottomNavigate ${isActive ? "maxNavigateWidth navigateWidth" : ""}`}>
                <div>
                    <div className="bottomArrowDiv" onClick={() => setIsActive(!isActive)}>
                        <img src="images/navigate1.png" className={ isActive ? "turnRight" : "" } alt={"Roota"} />     
                    </div>
                </div>
                <div>
                    <div className={`slideNav${isActive ? " maxNavigateWidth slideNavWidth" : ""}`}>
                        <div className="bottomTile" onClick={showPreferencesPage}>
                            <Settings 
                                color={"#54BDF1"}
                                width="38px"
                                height="38px" 
                                style={{ verticalAlign: 'middle' }}
                            />
                        </div>
                        <div className="bottomTile" onClick={showSupportPage}>Support</div>
                        <div className="bottomTile" onClick={exitScreen}>
                            <Power 
                                color={"#54BDF1"}
                                width="38px"
                                height="38px" 
                                style={{ verticalAlign: 'middle' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="cyborgContainer">
                <div className="cyborgDiv bottomTile">
                    <img src="images/robot-girl1-min.png" />
                </div>
            </div>
        </div>
    )
}

export default BottomNav