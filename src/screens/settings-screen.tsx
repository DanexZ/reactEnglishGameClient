import React, { useContext } from 'react';
import { AppDispatchContext } from '../context/AppDispatchContext';
import { SCREEN_NAMES } from '../data/constants';
import { AppAction } from '../data/actions/AppAction';
import TransparentBox from '../components/shared/TransparentBox/TransparentBox';
import ChangePasswordForm from '../components/ChangePasswordForm';
import ChangeEmailForm from '../components/ChangeEmailForm';

const SettingsScreen = () => {

    const appDispatch = useContext(AppDispatchContext);

    const exitScreen = (action: AppAction) => appDispatch(action);
    

    return (
        <div className="boxes-wrapper">
            <div className="exit" onClick={() => exitScreen({type: "setCurrentScreen", payload: SCREEN_NAMES.GAMEMENU}) }>X</div>
    
            <TransparentBox>
                <ChangePasswordForm />
            </TransparentBox>
    
            <TransparentBox>
                <ChangeEmailForm />
            </TransparentBox>
        </div>
    )
}

export default SettingsScreen