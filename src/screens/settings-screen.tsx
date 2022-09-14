import React, { useContext } from 'react';
import { AppDispatchContext } from '../context/AppDispatchContext';
import { SCREEN_NAMES } from '../data/constants';
import { AppAction } from '../data/actions/AppAction';
import TransparentBox from '../components/shared/TransparentBox/TransparentBox';

const SettingsScreen = () => {

    const appDispatch = useContext(AppDispatchContext);

    const exitScreen = (action: AppAction) => appDispatch(action);
    

    return (
        <div className="boxes-wrapper">
            <div className="exit" onClick={() => exitScreen({type: "setCurrentScreen", payload: SCREEN_NAMES.GAMEMENU}) }>X</div>
    
            <TransparentBox>
                <h2>Zmiana hasła</h2>
    
                <div className="inputBox">
                    <input type="password" name="password" required />
                    <label>Nowe hasło</label>
                </div>
                
                <div className="inputBox">
                    <input type="password" name="repeatPassword" required />
                    <label>Powtórz</label>
                </div>
    
                <input type="submit" value="Zatwierdź" />
            </TransparentBox>
    
            <TransparentBox>
                <h2>Zmiana e-mail</h2>
                <div className="inputBox">
                    <input type="email" name="email" required />
                    <label>Nowy e-mail</label>
                </div>
                
                <div className="inputBox">
                    <input type="email" name="repeatEmail" required />
                    <label>Powtórz</label>
                </div>
                
                <input type="submit" value="Zatwierdź" />
            </TransparentBox>
        </div>
    )
}

export default SettingsScreen