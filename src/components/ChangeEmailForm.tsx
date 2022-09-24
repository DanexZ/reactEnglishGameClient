import { useContext } from "react";
import { AppStateContext } from "../context/AppStateContext";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { useConfirmField } from "../hooks/inputs/useConfirmField";
import { useEmail } from "../hooks/inputs/useEmail";
import { useLiveValidation } from "../hooks/useLiveValidation";
import Alert from "../lib/Alert";
import { changeAsyncEmail } from "../lib/api";
import { updateState } from "../utils/updateState";

const ChangeEmailForm = () => {

    const appState: AppStateInterface = useContext(AppStateContext);

    const email = useEmail();
    const confirmField = useConfirmField(email.state);

    const { getFormErrors } = useLiveValidation({ email, confirmField });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = getFormErrors();

        if (!errors.length) {

            changeAsyncEmail(appState.user.id, email.state.value, appState.user.token, {
                next: (data: any) => {
                    if (data.success) {
                        new Alert("success", `Twój e-mail został zmieniony`);

                        updateState(email.setState, "value", "");
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
            <h2>Zmiana e-maila</h2>

            <div className="inputBox">
                <div ref={email.state.errorRef} className="alert alert-danger small liveValidateMessage">{email.state.error}</div>
                <input
                    type="email" 
                    ref={email.state.ref}
                    value={email.state.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(email.setState, "value", e.target.value)}
                    required 
                />
                <label>Nowy e-mail</label>
            </div>

            <div className="inputBox">
                <div ref={confirmField.state.errorRef} className="alert alert-danger small liveValidateMessage">{confirmField.state.error}</div>
                <input
                    type="email"
                    ref={confirmField.state.ref}
                    value={confirmField.state.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(confirmField.setState, "value", e.target.value)}
                    required 
                />
                <label>Potwierdź nowy e-mail</label>
            </div> 

            <input type="submit" value="Zatwierdź" />
        </form>
    )
}

export default ChangeEmailForm