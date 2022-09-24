import { useState } from "react";
import { FormInput } from "../../data/types/FormInput";
import { validateMessage } from "../../validators/validateMessage";
import { useInitialFieldState } from "../useLiveValidation";

export const useMessage = (): FormInput => {

    const [input, setInput] = useState(useInitialFieldState());

    const message: FormInput = {
        state: input,
        setState: setInput,
        validator: validateMessage
    }

    return message

}