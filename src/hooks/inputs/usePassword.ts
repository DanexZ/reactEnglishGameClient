import { useState } from "react";
import { FormInput } from "../../data/types/FormInput";
import { validatePassword } from "../../validators/validatePassword";
import { useInitialFieldState } from "../useLiveValidation";

export const usePassword = (): FormInput => {

    const [input, setInput] = useState(useInitialFieldState());

    const password: FormInput = {
        state: input,
        setState: setInput,
        validator: validatePassword
    }

    return password

}