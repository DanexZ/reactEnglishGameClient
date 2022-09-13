import React, { useContext } from "react";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { SCREEN_NAMES } from "../data/constants";
import { RegisterForm } from "../components/RegisterForm";
import { AppAction } from "../data/actions/AppAction";
import FixedScreenWrapper from "../components/shared/FixedScreenWrapper/FixedScreenWrapper";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import Popup from "../components/shared/Popup/Popup";


const RegisterScreen = () => {

    const appDispatch = useContext(AppDispatchContext);

    const exitScreen = () => {
        const action: AppAction = {type: "setCurrentScreen", payload: SCREEN_NAMES.NOTLOGGED}
        appDispatch(action);
    }

    return (
        <FixedScreenWrapper>
            <Popup>
                <TransparentBox exitFn={exitScreen}>
                    <h2>Rejestracja</h2>
                    <RegisterForm />
                </TransparentBox>
            </Popup>
        </FixedScreenWrapper>
    )
}

export default RegisterScreen