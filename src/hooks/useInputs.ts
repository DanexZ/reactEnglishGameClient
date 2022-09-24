import { useRef, useState } from "react"
import { checkAsyncEmail, checkAsyncUsername } from "../lib/api";
import { updateState } from "../utils/updateState";
import { validateEmail } from "../validators/validateEmail";
import { validateUserName } from "../validators/validateUserName";

export const useInitialFieldState = () => {

    return {
        error: "",
        value: "", 
        timer: setTimeout(() => {}, 0),
        ref: useRef(null!),
        errorRef: useRef<HTMLDivElement>(null!)
    }
}

export const useInputs = () => {

    const [userName, setUserName] = useState(useInitialFieldState());
    const [email, setEmail] = useState(useInitialFieldState());
    const [password, setPassword] = useState(useInitialFieldState());



    return {

        userName: {
            state: userName,
            setState: setUserName,
            validator: validateUserName,
            afterDelayFn: (value: string) => checkAsyncUsername(value, {
                next: (data: any) => {
                    if (data.alreadyExists) updateState(setUserName, "error", "Ta nazwa użytkownika jest już zajęta");
                }
            })
        },

        email: {
            state: email,
            setState: setEmail,
            validator: validateEmail,
            afterDelayFn: (value: string) => checkAsyncEmail(value, {
                next: (data: any) => {
                    if (data.alreadyExists) updateState(setEmail, "error", "Ten e-mail jest już zajęty");
                }
            }),
            noAsync: true
        },

        password: {
            state: password,
            setState: setPassword,
            ...password
        }
    }

}