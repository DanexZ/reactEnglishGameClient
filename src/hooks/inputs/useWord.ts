import { useState } from "react";
import { FormInput } from "../../data/types/FormInput";
import { checkAsyncWord } from "../../lib/api";
import { updateState } from "../../utils/updateState";
import { validateWord } from "../../validators/validateWord";
import { useInitialFieldState } from "../useLiveValidation";

export const useWord = (user_id: number, userToken: string): FormInput => {

    const [input, setInput] = useState(useInitialFieldState());

    const password: FormInput = {
        state: input,
        setState: setInput,
        validator: validateWord,
        afterDelayFn: (value: string) => checkAsyncWord(user_id, value, userToken, {
            next: (data: any) => {
                if (data.alreadyExists) updateState(setInput, "error", "Dodano już to słówko lub musisz je zdobyć");
            }
        })
    }

    return password

}