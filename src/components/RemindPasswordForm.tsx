import { useLiveValidation } from "../hooks/useLiveValidation";
import { updateState } from "../utils/updateState";
import { resetAsyncPassword } from "../lib/api";
import Alert from "../lib/Alert";
import { useEmail } from "../hooks/inputs/useEmail";

const RemindPasswordForm = () => {

    const email = useEmail();

    const { getFormErrors } = useLiveValidation({ email });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = getFormErrors();

        if (!errors.length) {

            resetAsyncPassword(email.state.value, {
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
                <div ref={email.state.errorRef} className="alert alert-danger small liveValidateMessage">{email.state.error}</div>
                <input 
                    type="email"
                    ref={email.state.ref}
                    value={email.state.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(email.setState, "value", e.target.value)}
                    required 
                />

                <label>e-mail</label>
            </div>

            <input type="submit" value="Przypomnij hasło" />
        </form>
    )
}

export default RemindPasswordForm