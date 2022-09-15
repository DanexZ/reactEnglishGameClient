import { useContext, useState } from "react";
import { AppStateContext } from "../context/AppStateContext";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { useInitialFieldState, useLiveValidation } from "../hooks/useLiveValidation";
import Alert from "../lib/Alert";
import { changeAsyncEmail } from "../lib/api";
import { updateState } from "../utils/updateState";

const ChangeEmailForm = () => {

    const appState: AppStateInterface = useContext(AppStateContext);

    const [email, setEmail] = useState(useInitialFieldState());
    const [confirmEmail, setConfirmEmail] = useState(useInitialFieldState());

    const { getFormErrors }: any = useLiveValidation({
        
        email: {
            state: email,
            setState: setEmail,
            ...email,
            noAsync: true
        },

        fieldToConfirm: {
            state: email,
            setState: setEmail,
            ...email
        },

        confirmField: {
            state: confirmEmail,
            setState: setConfirmEmail,
            ...confirmEmail
        }

    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = getFormErrors();

        if (!errors.length) {

            changeAsyncEmail(appState.user.id, email.value, appState.user.token, {
                next: (data: any) => {
                    if (data.success) {
                        new Alert("success", `Twój e-mail został zmieniony`);

                        updateState(setEmail, "value", "");
                        updateState(setConfirmEmail, "value", "");

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
            <h2>Zmiana e-maila</h2>

            <div className="inputBox">
                <div ref={email.errorRef} className="alert alert-danger small liveValidateMessage">{email.error}</div>
                <input
                    type="email" 
                    ref={email.ref}
                    value={email.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setEmail, "value", e.target.value)}
                    required 
                />
                <label>Nowy e-mail</label>
            </div>

            <div className="inputBox">
                <div ref={confirmEmail.errorRef} className="alert alert-danger small liveValidateMessage">{confirmEmail.error}</div>
                <input
                    type="email"
                    ref={confirmEmail.ref}
                    value={confirmEmail.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setConfirmEmail, "value", e.target.value)}
                    required 
                />
                <label>Potwierdź nowy e-mail</label>
            </div> 

            <input type="submit" value="Zatwierdź" />
        </form>
    )
}

export default ChangeEmailForm