import { useState } from "react";
import { FormInput } from "../../data/types/FormInput";
import { checkAsyncEmail } from "../../lib/api";
import { updateState } from "../../utils/updateState";
import { validateEmail } from "../../validators/validateEmail";
import { useInitialFieldState } from "../useLiveValidation";

export const useEmail = (): FormInput => {

    const [input, setInput] = useState(useInitialFieldState());

    const email: FormInput = {
        state: input,
        setState: setInput,
        validator: validateEmail,
        afterDelayFn: (value: string) => checkAsyncEmail(value, {
            next: (data: any) => {
                if (data.alreadyExists) updateState(setInput, "error", "Ten e-mail jest już zajęty");
            }
        }),
    }

    return email

}