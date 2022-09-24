import { useState } from "react";
import { FormInput } from "../../data/types/FormInput";
import { validateConversationTitle } from "../../validators/validateConversationTitle";
import { useInitialFieldState } from "../useLiveValidation";

export const useConversationTitle = (): FormInput => {

    const [input, setInput] = useState(useInitialFieldState());

    const title: FormInput = {
        state: input,
        setState: setInput,
        validator: validateConversationTitle
    }

    return title

}