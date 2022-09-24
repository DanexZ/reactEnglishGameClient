import { useContext } from "react";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { AppStateContext } from "../context/AppStateContext";
import { AppAction } from "../data/actions/AppAction";
import { SCREEN_NAMES } from "../data/constants";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { useLiveValidation } from "../hooks/useLiveValidation";
import Alert from "../lib/Alert";
import { changeAsyncPassword } from "../lib/api";
import { updateState } from "../utils/updateState";
import { useSearchParams } from "react-router-dom";
import { usePassword } from "../hooks/inputs/usePassword";
import { useConfirmField } from "../hooks/inputs/useConfirmField";

const ChangePasswordForm = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const appDispatch: Function = useContext(AppDispatchContext);

    const password = usePassword();
    const confirmField = useConfirmField(password.state);

    const { getFormErrors }: any = useLiveValidation({ password, confirmField });

    const [searchParams, setSearchParams] = useSearchParams();

    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const errors = getFormErrors();

        if (!errors.length) {

            changeAsyncPassword(appState.emailToken, password.state.value, appState.user.id, {
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

                        updateState(password.setState, "value", "");
                        updateState(confirmField.setState, "value", "");

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
                <div ref={password.state.errorRef} className="alert alert-danger small liveValidateMessage">{password.state.error}</div>
                <input
                    type="password" 
                    ref={password.state.ref}
                    value={password.state.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(password.setState, "value", e.target.value)}
                    required 
                />
                <label>Nowe hasło</label>
            </div>

            <div className="inputBox">
                <div ref={confirmField.state.errorRef} className="alert alert-danger small liveValidateMessage">{confirmField.state.error}</div>
                <input
                    type="password"
                    ref={confirmField.state.ref}
                    value={confirmField.state.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(confirmField.setState, "value", e.target.value)}
                    required 
                />
                <label>Potwierdź nowe hasło</label>
            </div> 

            <input type="submit" value="Zatwierdź" />
        </form>
    )
}

export default ChangePasswordForm