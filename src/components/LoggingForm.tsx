import React, { useContext, useState } from "react";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { AppAction } from "../data/actions/AppAction";
import Alert from "../lib/Alert";
import { loginAsync } from "../lib/api";

export const LoggingForm = () => {

    const appDispatch = useContext(AppDispatchContext);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e: any) => {

        e.preventDefault();

        if(login.length < 3) return new Alert("warning", "Podaj nazwę użytkownika lub e-mail");
        if(password.length < 6) return new Alert("warning", "Podaj hasło, które ma minimum 6 znaków");

        loginAsync(login, password, {
            next: (data: any) => {
                
                if (data.user && data.user.token) {
                    const action: AppAction = {type: "login", payload: data.user}
                    return appDispatch(action);
                } 
    
                if (data.error) new Alert("error", data.error);
            }
        })
    };


    return (
        <form method="POST" onSubmit={(e) => handleSignIn(e)}>

            <div className="inputBox">
                <input type="text" required autoFocus onChange={e => setLogin(e.target.value)} />

                <label>login</label>
            </div>
            <div className="inputBox">
                <input type="password" name="password" required onChange={e => setPassword(e.target.value)} />

                <label>hasło</label>
            </div>
            <input type="submit" value="Zaloguj"  />
        
        </form>
    )
}