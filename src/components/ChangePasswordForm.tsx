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

const ChangePasswordForm = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const [password, setPassword] = useState(useInitialFieldState());
    const [confirmPassword, setConfirmPassword] = useState(useInitialFieldState());

    const { getFormErrors }: any = useLiveValidation({
        
        password: {
            state: password,
            setState: setPassword,
            ...password
        },

        confirmPassword: {
            state: confirmPassword,
            setState: setConfirmPassword,
            ...confirmPassword
        }

    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const errors = getFormErrors();

        if (!errors.length) {

            changeAsyncPassword(appState.emailToken, password.value, 0, {
                next: (data: any) => {
                    if (data.success) {
                        new Alert("success", "Hasło zostało zmienione. Możesz się teraz za jego pomocą zalogować.", () => {
                            const action: AppAction = { type: "setCurrentScreen", payload: SCREEN_NAMES.LOGGING }
                            appDispatch(action);
                        });

                    } else {
                        new Alert("error", data.error);
                    }
                },

                errorHandler: (e: string) => new Alert("error", "Coś nie tak. Prosimy spróbować później")
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