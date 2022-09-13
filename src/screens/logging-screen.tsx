import React, { useContext, useRef } from "react";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { SCREEN_NAMES } from "../data/constants";
import { LoggingForm } from "../components/LoggingForm";
import { AppAction } from "../data/actions/AppAction";
import Popup from "../components/shared/Popup/Popup";
import FixedScreenWrapper from "../components/shared/FixedScreenWrapper/FixedScreenWrapper";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";

const LoggingScreen = () => {

    const appDispatch = useContext(AppDispatchContext);

    const innerBoxRef = useRef<HTMLDivElement>(null!);

    const showInnerBox = () => {
        innerBoxRef.current.style.top="0%";
    }

    const hideInnerBox = () => {
        innerBoxRef.current.style.top="-100%";
    }


    const exitScreen = () => {
        const action: AppAction = {type: "setCurrentScreen", payload: SCREEN_NAMES.NOTLOGGED}
        appDispatch(action);
    }

    const goToRegisterScreen = (action: AppAction) => {
        appDispatch(action);
    }


    return (
        <FixedScreenWrapper>
            <Popup>
                <TransparentBox exitFn={exitScreen}>
                    <h2>Logowanie</h2>
                    
                    <LoggingForm />

                    <p onClick={showInnerBox}>Zapomniałeś hasła?</p>                
                    <p onClick={() => goToRegisterScreen({type: "setCurrentScreen", payload: SCREEN_NAMES.REGISTER}) }>Nie masz jeszcze konta?</p>
                </TransparentBox>

                <TransparentBox extraClass="innerBox" refs={innerBoxRef} exitFn={hideInnerBox}>

                    <form method="POST">           

                        <div className="inputBox">
                            <input type="email" name="email" required />

                            <label>e-mail</label>
                        </div>

                        <input type="submit" name="" value="Resetuj hasło" />
                    </form>
                </TransparentBox>
            </Popup>
        </FixedScreenWrapper>
    )
}

export default LoggingScreen