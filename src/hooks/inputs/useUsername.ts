import { useState } from "react";
import { FormInput } from "../../data/types/FormInput";
import { checkAsyncUsername } from "../../lib/api";
import { updateState } from "../../utils/updateState";
import { validateUserName } from "../../validators/validateUserName";
import { useInitialFieldState } from "../useLiveValidation";

export const useUsername = (): FormInput => {

    const [input, setInput] = useState(useInitialFieldState());

    const userName: FormInput = {
        state: input,
        setState: setInput,
        validator: validateUserName,
        afterDelayFn: (value: string) => checkAsyncUsername(value, {
            next: (data: any) => {
                if (data.alreadyExists) updateState(setInput, "error", "Ta nazwa użytkownika jest już zajęta");
            }
        })
    }

    return userName

}