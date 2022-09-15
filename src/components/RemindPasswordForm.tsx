import { useState } from "react";
import { useInitialFieldState, useLiveValidation } from "../hooks/useLiveValidation";
import { updateState } from "../utils/updateState";
import { resetAsyncPassword } from "../lib/api";
import Alert from "../lib/Alert";

const RemindPasswordForm = () => {

    const [email, setEmail] = useState(useInitialFieldState());

    const { getFormErrors }: any = useLiveValidation({
        
        email: {
            state: email,
            setState: setEmail,
            ...email,
            noAsync: true
        },

    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = getFormErrors();

        if (!errors.length) {

            resetAsyncPassword(email.value, {
                next: (data: any) => {
                    if (data.success) new Alert("success", "Link do zresetowania hasła został wysłany")
                },

                errorHandler: (e: string) => new Alert("error", e)
            });

        }
    }


    return (
        <form method="POST" onSubmit={handleSubmit}>           

            <div className="inputBox">
                <div ref={email.errorRef} className="alert alert-danger small liveValidateMessage">{email.error}</div>
                <input 
                    type="email"
                    ref={email.ref}
                    value={email.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setEmail, "value", e.target.value)}
                    required 
                />

                <label>e-mail</label>
            </div>

            <input type="submit" value="Przypomnij hasło" />
        </form>
    )
}

export default RemindPasswordForm