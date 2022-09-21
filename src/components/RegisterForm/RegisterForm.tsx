import React, { useState } from "react";
import { useInitialFieldState } from "../../hooks/useLiveValidation";
import { useLiveValidation } from "../../hooks/useLiveValidation";
import { registerAsyncAccount } from "../../lib/api";
import Alert from "../../lib/Alert";
import { updateState } from "../../utils/updateState";

const RegisterForm = () => {

    const [userName, setUserName] = useState(useInitialFieldState());
    const [email, setEmail] = useState(useInitialFieldState());
    const [password, setPassword] = useState(useInitialFieldState());
    const [confirmPassword, setConfirmPassword] = useState(useInitialFieldState());

    const { getFormErrors }: any = useLiveValidation({
        
        userName: {
            state: userName,
            setState: setUserName,
            ...userName
        },

        email: {
            state: email,
            setState: setEmail,
            ...email
        },

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

            registerAsyncAccount(userName.value, email.value, password.value, {
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
                <div ref={userName.errorRef} className="alert alert-danger small liveValidateMessage">{userName.error}</div> 
                <input 
                    type="text"
                    ref={userName.ref} 
                    value={userName.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setUserName, "value", e.target.value)}
                    required
                    autoFocus 
                    data-testid="input-userName" 
                />
                <label>Nick</label>
            </div>

            <div className="inputBox">
                <div ref={email.errorRef} className="alert alert-danger small liveValidateMessage">{email.error}</div>
                <input 
                    type="email"
                    ref={email.ref}
                    value={email.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setEmail, "value", e.target.value)}
                    required 
                />
                <label>Email</label>
            </div>

            <div className="inputBox">
                <div ref={password.errorRef} className="alert alert-danger small liveValidateMessage">{password.error}</div>
                <input
                    type="password" 
                    ref={password.ref}
                    value={password.value} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setPassword, "value", e.target.value)}
                    required 
                />
                <label>hasło</label>
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
                <label>Potwierdzenie hasła</label>
            </div> 
            
            <input type="submit" value="Rejestruj" />
        </form>
    )
}


export default RegisterForm