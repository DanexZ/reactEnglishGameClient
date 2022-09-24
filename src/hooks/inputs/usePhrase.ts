import { useState } from "react";
import { FormInput } from "../../data/types/FormInput";
import { checkAsyncPhrase } from "../../lib/api";
import { updateState } from "../../utils/updateState";
import { validatePhrase } from "../../validators/validatePhrase";
import { useInitialFieldState } from "../useLiveValidation";

export const usePhrase = (user_id: number, userToken: string): FormInput => {

    const [input, setInput] = useState(useInitialFieldState());

    const password: FormInput = {
        state: input,
        setState: setInput,
        validator: validatePhrase,
        afterDelayFn: (value: string) => checkAsyncPhrase(user_id, value, userToken, {
            next: (data: any) => {
                if (data.alreadyExists) updateState(setInput, "error", "Posiadasz już tą frazę w kolekcji");
            }
        })
    }

    return password

}