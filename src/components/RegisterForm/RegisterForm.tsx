import { useLiveValidation } from "../../hooks/useLiveValidation";
import { registerAsyncAccount } from "../../lib/api";
import Alert from "../../lib/Alert";
import { updateState } from "../../utils/updateState";
import { useUsername } from "../../hooks/inputs/useUsername";
import { useEmail } from "../../hooks/inputs/useEmail";
import { usePassword } from "../../hooks/inputs/usePassword";
import { useConfirmField } from "../../hooks/inputs/useConfirmField";

const RegisterForm = () => {

    const userName = useUsername();
    const email = useEmail()
    const password = usePassword();
    const confirmField = useConfirmField(password.state);

    const { getFormErrors } = useLiveValidation({ userName, email, password, confirmField });



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const errors = getFormErrors();

        if (!errors.length) {

            registerAsyncAccount(userName.state.value, email.state.value, password.state.value, {
                next: (data: any) => {

                    if (data.success) {

                        return new Alert("success", "Nowe konto użytkownika utworzone. Możesz teraz się zalogować");

                    }

                    if (data.error) new Alert("error", data.error);
                }
            });
        }

    }



    return (
        <form method="POST" onSubmit={handleSubmit}>
            <div className="inputBox">  
                <div ref={userName.state.errorRef} className="alert alert-danger small liveValidateMessage">{userName.state.error}</div> 
                <input 
                    type="text"
                    ref={userName.state.ref} 
                    value={userName.state.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(userName.setState, "value", e.target.value)}
                    required
                    autoFocus 
                    data-testid="input-userName" 
                />
                <label>Nick</label>
            </div>

            <div className="inputBox">
                <div ref={email.state.errorRef} className="alert alert-danger small liveValidateMessage">{email.state.error}</div>
                <input 
                    type="email"
                    ref={email.state.ref}
                    value={email.state.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(email.setState, "value", e.target.value)}
                    required 
                />
                <label>Email</label>
            </div>

            <div className="inputBox">
                <div ref={password.state.errorRef} className="alert alert-danger small liveValidateMessage">{password.state.error}</div>
                <input
                    type="password" 
                    ref={password.state.ref}
                    value={password.state.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(password.setState, "value", e.target.value)}
                    required 
                />
                <label>hasło</label>
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
                <label>Potwierdzenie hasła</label>
            </div> 
            
            <input type="submit" value="Rejestruj" />
        </form>
    )
}


export default RegisterForm