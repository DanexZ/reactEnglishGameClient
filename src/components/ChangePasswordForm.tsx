import { useContext, useState } from "react";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { AppStateContext } from "../context/AppStateContext";
import { AppAction } from "../data/actions/AppAction";
import { SCREEN_NAMES } from "../data/constants";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { useInitialFieldState, useLiveValidation } from "../hooks/useLiveValidation";
import Alert from "../lib/Alert";
import { changeAsyncPassword } from "../lib/api";
import { updateState } from "../utils/updateState";
import { useSearchParams } from "react-router-dom";

const ChangePasswordForm = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const [password, setPassword] = useState(useInitialFieldState());
    const [confirmPassword, setConfirmPassword] = useState(useInitialFieldState());

    const [searchParams, setSearchParams] = useSearchParams();

    const { getFormErrors }: any = useLiveValidation({
        
        password: {
            state: password,
            setState: setPassword,
            ...password
        },

        fieldToConfirm: {
            state: password,
            setState: setPassword,
            ...password
        },

        confirmField: {
            state: confirmPassword,
            setState: setConfirmPassword,
            ...confirmPassword
        }

    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const errors = getFormErrors();

        if (!errors.length) {

            changeAsyncPassword(appState.emailToken, password.value, appState.user.id, {
                next: (data: any) => {
                    if (data.success) {
                        
                        new Alert("success", "Hasło zostało zmienione. Możesz się teraz za jego pomocą zalogować.", () => {

                            if (appState.emailToken) {

                                console.log(searchParams);
                                searchParams.delete('token');
                                setSearchParams(searchParams);

                                const actions: AppAction[] = [
                                    { type: "setEmailToken", payload: ""},
                                    { type: "setCurrentScreen", payload: SCREEN_NAMES.LOGGING }
                                ];

                                appDispatch(actions[0]);
                                appDispatch(actions[1]);

                            }
                            
                        });

                        updateState(setPassword, "value", "");
                        updateState(setConfirmPassword, "value", "");

                    } else {
                        new Alert("error", data.error);
                    }
                },

                errorHandler: (e: string) => new Alert("error", e)
            });
        }

    }


    return (
        <form method="POST" onSubmit={handleSubmit}>
            <h2>Zmiana hasła</h2>

            <div className="inputBox">
                <div ref={password.errorRef} className="alert alert-danger small liveValidateMessage">{password.error}</div>
                <input
                    type="password" 
                    ref={password.ref}
                    value={password.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setPassword, "value", e.target.value)}
                    required 
                />
                <label>Nowe hasło</label>
            </div>

            <div className="inputBox">
                <div ref={confirmPassword.errorRef} className="alert alert-danger small liveValidateMessage">{confirmPassword.error}</div>
                <input
                    type="password"
                    ref={confirmPassword.ref}
                    value={confirmPassword.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setConfirmPassword, "value", e.target.value)}
                    required 
                />
                <label>Potwierdź nowe hasło</label>
            </div> 

            <input type="submit" value="Zatwierdź" />
        </form>
    )
}

export default ChangePasswordForm