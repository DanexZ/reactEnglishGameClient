import React, { useContext } from "react";
import FixedScreenWrapper from "../components/shared/FixedScreenWrapper/FixedScreenWrapper";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import { AppAction } from "../data/actions/AppAction";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { SCREEN_NAMES } from "../data/constants";


const PPScreen = () => {

    const appDispatch: Function = useContext(AppDispatchContext);

    const exitScreen = () => {
        const action: AppAction = {type: "setCurrentScreen", payload: SCREEN_NAMES.GAMEMENU}
        appDispatch(action);
    }

    return (
        <FixedScreenWrapper>
            <TransparentBox extraClass="smallBox" exitFn={exitScreen}>

                <h2>Może by tak dorobić?</h2>
                <p className="center">Zarejestruj się do programu afiliacyjnego, polecaj aplikację Angielski z Rutą i zarabiaj.</p>
                <h3>10% miesięcznie od wszystkich płatności</h3>

                <div className="buttons">
                    <a href="https://affiliate.moneyu.pl/registry" target="blank">
                        <button className="btn btn_blue">CHCĘ ZARABIAĆ</button>
                    </a>
                </div>
            </TransparentBox>
        </FixedScreenWrapper>
    )
}

export default PPScreen